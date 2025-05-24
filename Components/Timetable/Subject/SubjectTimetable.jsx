// src/components/SubjectList.jsx
import React, { useState, useEffect } from 'react';
import subjectService from '../Services/SubjectService';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [subjectInputs, setSubjectInputs] = useState([{ name: '' }]);
  const [isMultipleSubjects, setIsMultipleSubjects] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching subjects...');
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );
      
      const fetchPromise = subjectService.getAllSubjects();
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      console.log('Raw API response:', response);
      
      // Handle different response formats
      let subjectsData;
      if (response && typeof response === 'object') {
        subjectsData = Array.isArray(response) ? response : 
                      (response.data ? response.data : 
                       response.subjects ? response.subjects : 
                       response.results ? response.results : []);
      } else {
        subjectsData = [];
      }
      
      console.log('Processed subjects data:', subjectsData);
      
      if (subjectsData && subjectsData.length > 0) {
        setSubjects(subjectsData);
      } else {
        console.warn('No subjects data found in the response');
        setSubjects([]);
      }
    } catch (error) {
      console.error('API Error details:', error);
      
      if (error.message === 'Network Error') {
        setError('Server connection failed. Please check if your backend server is running.');
      } else if (error.message === 'Request timed out') {
        setError('Request timed out. The server took too long to respond.');
      } else {
        setError(`Failed to fetch subjects: ${error.message}`);
      }
      
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding new subjects
  const handleAdd = async () => {
    setIsLoading(true);
    try {
      if (isMultipleSubjects) {
        // Filter out empty inputs
        const validSubjects = subjectInputs.filter(s => s.name.trim() !== '');
        if (validSubjects.length > 0) {
          await subjectService.addBulkSubjects(validSubjects);
        }
      } else {
        const singleSubject = subjectInputs[0];
        if (singleSubject.name.trim() !== '') {
          await subjectService.addSubject(singleSubject);
        }
      }
      // Refresh subject list and reset the form
      fetchSubjects();
      setSubjectInputs([{ name: '' }]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add subject(s):', error);
      setError(`Failed to add subject(s): ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating a subject
  const handleUpdate = async () => {
    if (!currentSubject || currentSubject.name.trim() === '') return;
    
    setIsLoading(true);
    try {
      await subjectService.updateSubject(currentSubject.id, {
        name: currentSubject.name
      });
      fetchSubjects();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update subject:', error);
      setError(`Failed to update subject: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a subject
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setIsLoading(true);
      try {
        await subjectService.deleteSubject(id);
        fetchSubjects();
      } catch (error) {
        console.error('Failed to delete subject:', error);
        setError(`Failed to delete subject: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle input changes for multiple subject inputs
  const handleInputChange = (index, value) => {
    const newInputs = [...subjectInputs];
    newInputs[index].name = value;
    setSubjectInputs(newInputs);
  };

  // Add another subject input field
  const addSubjectInput = () => {
    setSubjectInputs([...subjectInputs, { name: '' }]);
  };

  // Remove a subject input field
  const removeSubjectInput = (index) => {
    const newInputs = subjectInputs.filter((_, idx) => idx !== index);
    setSubjectInputs(newInputs);
  };

  // Open edit modal and set current subject
  const openEditModal = (subject) => {
    setCurrentSubject(subject);
    setIsEditModalOpen(true);
  };

  // Reset form when opening Add modal
  const openAddModal = () => {
    setSubjectInputs([{ name: '' }]);
    setIsMultipleSubjects(false);
    setIsAddModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Subjects List</h1>
        <div>
          <button
            onClick={() => fetchSubjects()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Refresh List
          </button>
          <button
            onClick={openAddModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Subject
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

      {/* Subjects Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects && subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <tr key={subject.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(subject)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id)}
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
                  {isLoading ? 'Loading subjects...' : 'No subjects found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Subject Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isMultipleSubjects ? 'Add Multiple Subjects' : 'Add Subject'}
            </h2>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="multipleSubjects"
                checked={isMultipleSubjects}
                onChange={() => setIsMultipleSubjects(!isMultipleSubjects)}
                className="mr-2"
              />
              <label htmlFor="multipleSubjects">Add multiple subjects</label>
            </div>

            {subjectInputs.map((input, index) => (
              <div key={index} className="mb-4 flex items-center">
                <input
                  type="text"
                  value={input.name}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Subject Name"
                  className="border rounded-lg p-2 w-full"
                />
                {isMultipleSubjects && (
                  <button
                    onClick={() => removeSubjectInput(index)}
                    className="ml-2 text-red-500"
                    disabled={subjectInputs.length === 1}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {isMultipleSubjects && (
              <button
                onClick={addSubjectInput}
                className="mb-4 text-blue-500 hover:text-blue-700"
              >
                + Add Another Subject
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

      {/* Edit Subject Modal */}
      {isEditModalOpen && currentSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Subject</h2>
            <div className="mb-4">
              <input
                type="text"
                value={currentSubject.name}
                onChange={(e) =>
                  setCurrentSubject({
                    ...currentSubject,
                    name: e.target.value
                  })
                }
                placeholder="Subject Name"
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

export default SubjectList;