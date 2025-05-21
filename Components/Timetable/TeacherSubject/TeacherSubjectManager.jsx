import React, { useState, useEffect } from 'react';
import teacherSubjectService from '../../Services/TeacherSubjectService';

const TeacherSubjectAssignment = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [existingAssignments, setExistingAssignments] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch teachers and subjects on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teacherData, subjectData] = await Promise.all([
          teacherSubjectService.getAllTeachers(),
          teacherSubjectService.getAllSubjects()
        ]);

        setTeachers(teacherData);
        setSubjects(subjectData);

        // Initialize selected subjects object
        const initialSubjectState = {};
        subjectData.forEach(subject => {
          initialSubjectState[subject.id] = false;
        });
        setSelectedSubjects(initialSubjectState);
        setExistingAssignments({});
      } catch (error) {
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
    
    // Reset existing assignments
    setExistingAssignments({});

    if (teacherId) {
      setLoading(true);
      try {
        const statusData = await teacherSubjectService.getSubjectStatusForTeacher(teacherId);
        
        // Update checkboxes based on allocation status
        const newSelectedSubjects = {};
        const newExistingAssignments = {};
        
        statusData.forEach(item => {
          newSelectedSubjects[item.subject_id] = item.is_allocated;
          if (item.is_allocated) {
            newExistingAssignments[item.subject_id] = true;
          }
        });
        
        setSelectedSubjects(newSelectedSubjects);
        setExistingAssignments(newExistingAssignments);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load subject status.' });
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle individual subject checkbox change
  const handleSubjectChange = (subjectId) => {
    setSelectedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (isChecked) => {
    const newSelectedSubjects = { ...existingAssignments };
    subjects.forEach(subject => {
      newSelectedSubjects[subject.id] = isChecked;
    });
    setSelectedSubjects(newSelectedSubjects);
  };

  // Handle delete assignment
  const handleDeleteAssignment = async (subjectId) => {
    if (!selectedTeacher) {
      setMessage({ type: 'error', text: 'Please select a teacher.' });
      return;
    }

    setLoading(true);
    try {
      await teacherSubjectService.deleteAssignment(selectedTeacher, subjectId);
      setMessage({ type: 'success', text: 'Subject assignment removed successfully!' });

      // Update the UI to reflect the deletion
      setSelectedSubjects(prev => ({
        ...prev,
        [subjectId]: false
      }));
      
      setExistingAssignments(prev => {
        const updated = { ...prev };
        delete updated[subjectId];
        return updated;
      });
      
    } catch (error) {
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

    // Get only subjects that are selected but not already existing
    const selectedSubjectIds = Object.entries(selectedSubjects)
      .filter(([id, isSelected]) => isSelected && !existingAssignments[id])
      .map(([id]) => parseInt(id));

    if (selectedSubjectIds.length === 0) {
      setMessage({ type: 'info', text: 'No new subjects were selected for assignment.' });
      return;
    }

    setLoading(true);
    try {
      await teacherSubjectService.createAssignments(selectedTeacher, selectedSubjectIds);
      
      // Update existing assignments after successful creation
      const newExistingAssignments = { ...existingAssignments };
      selectedSubjectIds.forEach(id => {
        newExistingAssignments[id] = true;
      });
      setExistingAssignments(newExistingAssignments);
      
      setMessage({
        type: 'success',
        text: `${selectedSubjectIds.length} subject${selectedSubjectIds.length > 1 ? 's' : ''} assigned successfully!`
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save assignments. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Count selected subjects that aren't already assigned
  const newSelectedCount = Object.entries(selectedSubjects)
    .filter(([id, isSelected]) => isSelected && !existingAssignments[id])
    .length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Teacher Subject Assignment</h1>

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
              {teacher.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Subjects table */}
      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Subjects</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                id="selectAll"
                type="checkbox"
                checked={subjects.every(subject => selectedSubjects[subject.id])}
                onChange={(e) => handleSelectAll(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="selectAll" className="ml-2 text-sm text-gray-700">
                Select All
              </label>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || newSelectedCount === 0}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : `Assign ${newSelectedCount} Subject${newSelectedCount !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>

        {loading && !selectedTeacher ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading subjects...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {existingAssignments[subject.id] ? (
                        <button
                          onClick={() => handleDeleteAssignment(subject.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      ) : (
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={!!selectedSubjects[subject.id]}
                            onChange={() => handleSubjectChange(subject.id)}
                            disabled={loading}
                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                    No subjects available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Statistics */}
      {subjects.length > 0 && selectedTeacher && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
            <span className="font-medium">Total Subjects:</span> {subjects.length}
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

export default TeacherSubjectAssignment;