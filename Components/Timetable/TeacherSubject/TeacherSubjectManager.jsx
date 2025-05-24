import React, { useState, useEffect } from 'react';
import teacherSubjectService from '../../Services/TeacherSubjectService';

const TeacherSubjectAssignment = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [existingAssignments, setExistingAssignments] = useState({});
  const [allTeacherSubjects, setAllTeacherSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch teachers and subjects on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teacherData, subjectData, relationshipsData] = await Promise.all([
          teacherSubjectService.getAllTeachers(),
          teacherSubjectService.getAllSubjects(),
          teacherSubjectService.getAllTeacherSubjects()
        ]);

        setTeachers(teacherData);
        setSubjects(subjectData);
        setAllTeacherSubjects(relationshipsData);

        // Initialize selected subjects object
        const initialSubjectState = {};
        subjectData.forEach(subject => {
          initialSubjectState[subject.id] = false;
        });
        setSelectedSubjects(initialSubjectState);
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
    
    // Reset existing assignments
    setExistingAssignments({});
    
    // Reset selected subjects
    const resetSubjects = {};
    subjects.forEach(subject => {
      resetSubjects[subject.id] = false;
    });
    setSelectedSubjects(resetSubjects);

    if (teacherId) {
      setLoading(true);
      try {
        // Get subjects assigned to this teacher
        const teacherSubjects = await teacherSubjectService.getSubjectsByTeacher(teacherId);
        
        // Update checkboxes based on assignments
        const newExistingAssignments = {};
        const newSelectedSubjects = { ...resetSubjects };
        
        teacherSubjects.forEach(assignment => {
          const subjectId = assignment.subject;
          newSelectedSubjects[subjectId] = true;
          newExistingAssignments[subjectId] = assignment.id; // Store relationship ID
        });
        
        setSelectedSubjects(newSelectedSubjects);
        setExistingAssignments(newExistingAssignments);
      } catch (error) {
        console.error('Error fetching teacher subjects:', error);
        setMessage({ type: 'error', text: 'Failed to load subject assignments.' });
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
    const newSelectedSubjects = { ...selectedSubjects };
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
      const relationshipId = existingAssignments[subjectId];
      
      if (relationshipId) {
        // If we know the relationship ID, use it directly
        await teacherSubjectService.deleteTeacherSubject(relationshipId);
      } else {
        // Otherwise, look it up
        await teacherSubjectService.deleteByTeacherAndSubject(selectedTeacher, subjectId);
      }
      
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

    // Get subjects that are selected but not already assigned
    const newAssignments = Object.entries(selectedSubjects)
      .filter(([id, isSelected]) => isSelected && !existingAssignments[id])
      .map(([id]) => ({ teacher: parseInt(selectedTeacher), subject: parseInt(id) }));

    if (newAssignments.length === 0) {
      setMessage({ type: 'info', text: 'No new subjects were selected for assignment.' });
      return;
    }

    setLoading(true);
    try {
      let response;
      
      if (newAssignments.length === 1) {
        // Create a single assignment
        response = await teacherSubjectService.createTeacherSubject(
          newAssignments[0].teacher, 
          newAssignments[0].subject
        );
        
        // Update existingAssignments with the new assignment ID
        setExistingAssignments(prev => ({
          ...prev,
          [newAssignments[0].subject]: response.id
        }));
      } else {
        // Create multiple assignments
        response = await teacherSubjectService.createBulkTeacherSubjects(newAssignments);
        
        // Refresh all teacher-subject relationships
        const allRelationships = await teacherSubjectService.getAllTeacherSubjects();
        setAllTeacherSubjects(allRelationships);
        
        // Update the existingAssignments with new relationships
        const newExistingAssignments = { ...existingAssignments };
        newAssignments.forEach(assignment => {
          const relationship = allRelationships.find(
            r => r.teacher === assignment.teacher && r.subject === assignment.subject
          );
          if (relationship) {
            newExistingAssignments[assignment.subject] = relationship.id;
          }
        });
        setExistingAssignments(newExistingAssignments);
      }
      
      setMessage({
        type: 'success',
        text: `${newAssignments.length} subject${newAssignments.length > 1 ? 's' : ''} assigned successfully!`
      });
    } catch (error) {
      console.error('Error saving assignments:', error);
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
              {teacher.fullName || teacher.full_name}
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
                checked={subjects.length > 0 && subjects.every(subject => selectedSubjects[subject.id])}
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