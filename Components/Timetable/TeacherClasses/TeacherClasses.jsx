// src/Components/TeacherClasses/TeacherClasses.js
import React, { useState, useEffect } from 'react';
import teacherClassesService from '../Services/TeacherClassesService';

const TeacherClasses = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [existingAssignments, setExistingAssignments] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch teachers and classes on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teacherData, classData, assignmentsData] = await Promise.all([
          teacherClassesService.getAllTeachers(),
          teacherClassesService.getAllClasses(),
          teacherClassesService.getAllTeacherClasses()
        ]);

        setTeachers(teacherData);
        setClasses(classData);
        setSelectedClasses([]);
        setExistingAssignments({});
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setMessage({ type: 'error', text: 'Failed to load data. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle teacher selection change
  const handleTeacherChange = async (e) => {
    const teacherId = e.target.value;
    setSelectedTeacher(teacherId);
    
    // Reset selected classes
    setSelectedClasses([]);
    
    // Reset existing assignments
    setExistingAssignments({});

    if (teacherId) {
      setLoading(true);
      try {
        // Get assignments for this teacher
        const teacherAssignments = await teacherClassesService.getClassesByTeacher(teacherId);
        
        // Update based on existing assignments
        const newExistingAssignments = {};
        
        teacherAssignments.forEach(assignment => {
          const classId = assignment.class_name;
          newExistingAssignments[classId] = assignment.id; // Store assignment ID
        });
        
        setExistingAssignments(newExistingAssignments);
      } catch (error) {
        console.error('Error fetching teacher assignments:', error);
        setMessage({ type: 'error', text: 'Failed to load teacher assignments.' });
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle class selection
  const toggleClassSelection = (classId) => {
    setSelectedClasses(prev => {
      if (prev.includes(classId)) {
        return prev.filter(id => id !== classId);
      } else {
        return [...prev, classId];
      }
    });
  };

  // Handle delete assignment
  const handleDeleteAssignment = async (classId) => {
    if (!selectedTeacher) {
      setMessage({ type: 'error', text: 'Please select a teacher.' });
      return;
    }

    setLoading(true);
    try {
      const assignmentId = existingAssignments[classId];
      
      if (assignmentId) {
        await teacherClassesService.deleteTeacherClass(assignmentId);
        
        setMessage({ type: 'success', text: 'Assignment removed successfully!' });

        // Update UI to reflect the deletion
        setExistingAssignments(prev => {
          const updated = { ...prev };
          delete updated[classId];
          return updated;
        });
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
      setMessage({ type: 'error', text: 'Failed to remove assignment. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle submit button click
  const handleSubmit = async () => {
    if (!selectedTeacher) {
      setMessage({ type: 'error', text: 'Please select a teacher.' });
      return;
    }

    // Get classes that are selected but not already assigned
    const newAssignments = selectedClasses
      .filter(classId => !existingAssignments[classId])
      .map(classId => ({
        teacher: parseInt(selectedTeacher),
        class_name: parseInt(classId)
      }));

    if (newAssignments.length === 0) {
      setMessage({ type: 'info', text: 'No new classes were selected for assignment.' });
      return;
    }

    setLoading(true);
    try {
      let response;
      
      if (newAssignments.length === 1) {
        // Create a single assignment
        const assignment = newAssignments[0];
        response = await teacherClassesService.createTeacherClass(
          assignment.teacher,
          assignment.class_name
        );
        
        // Update existingAssignments with the new assignment ID
        setExistingAssignments(prev => ({
          ...prev,
          [assignment.class_name]: response.id
        }));
      } else {
        // Create multiple assignments
        response = await teacherClassesService.createBulkTeacherClasses(newAssignments);
        
        // Refresh all assignments
        const allAssignments = await teacherClassesService.getAllTeacherClasses();
        
        // Update existingAssignments with new entries
        const newExistingAssignments = { ...existingAssignments };
        newAssignments.forEach(assignment => {
          const existingAssignment = allAssignments.find(
            a => a.teacher === assignment.teacher && a.class_name === assignment.class_name
          );
          if (existingAssignment) {
            newExistingAssignments[assignment.class_name] = existingAssignment.id;
          }
        });
        setExistingAssignments(newExistingAssignments);
      }
      
      setMessage({
        type: 'success', 
        text: `${newAssignments.length} class${newAssignments.length > 1 ? 'es' : ''} assigned successfully!`
      });
      
      // Clear selection after successful submission
      setSelectedClasses([]);
    } catch (error) {
      console.error('Error saving assignments:', error);
      setMessage({ type: 'error', text: 'Failed to save assignments. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Count selected classes that aren't already assigned
  const newSelectedCount = selectedClasses.filter(id => !existingAssignments[id]).length;

  // Get class name by ID
  const getClassName = (classId) => {
    const foundClass = classes.find(c => c.id === classId);
    return foundClass ? foundClass.name : 'Unknown Class';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Teacher Class Assignments</h1>

      {/* Alert message */}
      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 
          message.type === 'info' ? 'bg-blue-100 text-blue-700' : 
          'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Teacher dropdown */}
      <div className="mb-8">
        <label htmlFor="teacherSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Select Teacher
        </label>
        <select
          id="teacherSelect"
          value={selectedTeacher}
          onChange={handleTeacherChange}
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">-- Select a Teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Classes table */}
      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Available Classes</h2>
          <button
            onClick={handleSubmit}
            disabled={loading || newSelectedCount === 0}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : `Assign ${newSelectedCount} Class${newSelectedCount !== 1 ? 'es' : ''}`}
          </button>
        </div>

        {loading && !selectedTeacher ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading classes...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <tr key={classItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classItem.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {existingAssignments[classItem.id] ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Assigned
                        </span>
                      ) : selectedClasses.includes(classItem.id) ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Selected
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {existingAssignments[classItem.id] ? (
                        <button
                          onClick={() => handleDeleteAssignment(classItem.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleClassSelection(classItem.id)}
                          disabled={loading}
                          className={`px-3 py-1 text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            selectedClasses.includes(classItem.id)
                              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
                          }`}
                        >
                          {selectedClasses.includes(classItem.id) ? 'Deselect' : 'Select'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No classes available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Statistics */}
      {classes.length > 0 && selectedTeacher && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
            <span className="font-medium">Total Classes:</span> {classes.length}
          </div>
          <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
            <span className="font-medium">Currently Assigned:</span> {Object.keys(existingAssignments).length}
          </div>
          <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
            <span className="font-medium">New Selected:</span> {newSelectedCount}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherClasses;