// src/components/TeacherList.jsx
import React, { useState, useEffect } from 'react';
import teacherService from '../Services/teacherService';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [teacherInputs, setTeacherInputs] = useState([{ fullName: '' }]);
  const [isMultipleTeachers, setIsMultipleTeachers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    
    try {
      console.log('Fetching teachers...');
      
      // Add a timeout to the API call to handle slow connections
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );
      
      const fetchPromise = teacherService.getAllTeachers();
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      console.log('Raw API response:', response);
      
      // Handle different response formats
      let teachersData;
      if (response && typeof response === 'object') {
        teachersData = Array.isArray(response) ? response : 
                      (response.data ? response.data : 
                       response.teachers ? response.teachers : 
                       response.results ? response.results : []);
      } else {
        teachersData = [];
      }
      
      console.log('Processed teachers data:', teachersData);
      
      if (teachersData && teachersData.length > 0) {
        setTeachers(teachersData);
      } else {
        console.warn('No teachers data found in the response');
        setTeachers([]);
      }
    } catch (error) {
      console.error('API Error details:', error);
      
      // Set appropriate error message based on the error type
      if (error.message === 'Network Error') {
        setError('Server connection failed. Please check if your backend server is running.');
      } else if (error.message === 'Request timed out') {
        setError('Request timed out. The server took too long to respond.');
      } else {
        setError(`Failed to fetch teachers: ${error.message}`);
      }
      
      setTeachers([]); 
    } finally {
      setIsLoading(false);
    }
  };

  // Add debugging function
  const checkTeachersState = () => {
    console.log('Current teachers state:', teachers);
    return teachers && teachers.length > 0;
  };

  // Handle adding new teachers
  const handleAdd = async () => {
    setIsLoading(true);
    try {
      if (isMultipleTeachers) {
        // Filter out empty inputs
        const validTeachers = teacherInputs.filter(t => t.fullName.trim() !== '');
        if (validTeachers.length > 0) {
          await teacherService.addBulkTeachers(validTeachers);
        }
      } else {
        const singleTeacher = teacherInputs[0];
        if (singleTeacher.fullName.trim() !== '') {
          await teacherService.addTeacher(singleTeacher);
        }
      }
      // Refresh teacher list and reset the form
      fetchTeachers();
      setTeacherInputs([{ fullName: '' }]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add teacher(s)');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating a teacher
  const handleUpdate = async () => {
    if (!currentTeacher || currentTeacher.fullName.trim() === '') return;
    
    setIsLoading(true);
    try {
      await teacherService.updateTeacher(currentTeacher.id, {
        fullName: currentTeacher.fullName
      });
      fetchTeachers();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update teacher');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a teacher
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setIsLoading(true);
      try {
        await teacherService.deleteTeacher(id);
        fetchTeachers();
      } catch (error) {
        console.error('Failed to delete teacher');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle input changes for multiple teacher inputs
  const handleInputChange = (index, e) => {
    const newInputs = [...teacherInputs];
    newInputs[index].fullName = e.target.value;
    setTeacherInputs(newInputs);
  };

  // Add another teacher input field
  const addTeacherInput = () => {
    setTeacherInputs([...teacherInputs, { fullName: '' }]);
  };

  // Remove a teacher input field
  const removeTeacherInput = (index) => {
    const newInputs = teacherInputs.filter((_, idx) => idx !== index);
    setTeacherInputs(newInputs);
  };

  // Open edit modal and set current teacher
  const openEditModal = (teacher) => {
    setCurrentTeacher(teacher);
    setIsEditModalOpen(true);
  };

  // Reset form when opening Add modal
  const openAddModal = () => {
    setTeacherInputs([{ fullName: '' }]);
    setIsMultipleTeachers(false);
    setIsAddModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Teachers List</h1>
        <div>
          <button
            onClick={() => fetchTeachers()} // Add refresh button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Refresh List
          </button>
          <button
            onClick={openAddModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Teacher
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Display error message if there's an error */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <div className="mt-2">
            <p className="text-sm">Troubleshooting steps:</p>
            <ul className="list-disc ml-5 text-sm">
              <li>Make sure your backend server is running</li>
              <li>Check the API endpoint URL in your service</li>
              <li>Verify network connectivity</li>
              <li>Check for CORS issues in browser console</li>
            </ul>
          </div>
        </div>
      )}

      {/* Teachers Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers && teachers.length > 0 ? (
              teachers.map((teacher, index) => (
                <tr key={teacher.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {teacher.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(teacher)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  {isLoading ? 'Loading teachers...' : 'No teachers found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isMultipleTeachers ? 'Add Multiple Teachers' : 'Add Teacher'}
            </h2>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="multipleTeachers"
                checked={isMultipleTeachers}
                onChange={() => setIsMultipleTeachers(!isMultipleTeachers)}
                className="mr-2"
              />
              <label htmlFor="multipleTeachers">Add multiple teachers</label>
            </div>

            {teacherInputs.map((input, index) => (
              <div key={index} className="mb-4 flex items-center">
                <input
                  type="text"
                  value={input.fullName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Full Name"
                  className="border rounded-lg p-2 w-full"
                />
                {isMultipleTeachers && (
                  <button
                    onClick={() => removeTeacherInput(index)}
                    className="ml-2 text-red-500"
                    disabled={teacherInputs.length === 1}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {isMultipleTeachers && (
              <button
                onClick={addTeacherInput}
                className="mb-4 text-blue-500 hover:text-blue-700"
              >
                + Add Another Teacher
              </button>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {isEditModalOpen && currentTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Teacher</h2>
            <div className="mb-4">
              <input
                type="text"
                value={currentTeacher.fullName}
                onChange={(e) =>
                  setCurrentTeacher({
                    ...currentTeacher,
                    fullName: e.target.value
                  })
                }
                placeholder="Full Name"
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;