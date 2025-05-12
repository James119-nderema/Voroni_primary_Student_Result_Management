import React, { useState, useEffect } from 'react';
import AddSubjectModal from './AddSubjectModal';
import EditSubjectModal from './EditSubjectModal';
import { getAllSubjects, deleteSubject } from '../../Services/SubjectService';

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const data = await getAllSubjects();
      console.log('API response:', data);
      
      // Print more details about the data structure
      if (data && typeof data === 'object') {
        console.log('First item properties:', Object.keys(data[0] || {}));
        console.log('Sample item:', data[0]);
      }
      
      // Simplified approach: try to extract subject data directly
      let processedSubjects = [];
      
      if (Array.isArray(data)) {
        // Process array data
        processedSubjects = data
          .filter(Boolean)
          .map((item, index) => {
            if (typeof item === 'string') {
              return { id: index + 1, name: item };
            }
            
            // For debugging - log exactly what each item looks like
            console.log(`Subject item ${index}:`, item);
            
            // Try to extract the name using various common property paths
            let name = 'Unknown Subject';
            if (item && typeof item === 'object') {
              // Try all these possible paths to find the name
              if (item.name) name = item.name;
              else if (item.Name) name = item.Name;
              else if (item.subject_name) name = item.subject_name;
              else if (item.subjectName) name = item.subjectName;
              else if (item.subject && item.subject.name) name = item.subject.name;
              // If it's an object with only one property, use that
              else if (Object.keys(item).length === 1) name = Object.values(item)[0];
            }
            
            // Use index+1 as id to ensure ascending order
            return {
              id: index + 1, // Always use index+1 for ascending order
              originalId: item && item.id ? item.id : null, // Store original ID if needed
              name: name
            };
          });
      } else if (data && typeof data === 'object') {
        // Process object data
        const keys = Object.keys(data);
        processedSubjects = keys
          .map((key, index) => {
            const item = data[key];
            
            // For debugging
            console.log(`Object item ${key}:`, item);
            
            // Handle string values
            if (typeof item === 'string') {
              return { id: index + 1, name: item };
            }
            
            // Try to extract the name using various common property paths
            let name = key; // Default to the key if no name found
            if (item && typeof item === 'object') {
              if (item.name) name = item.name;
              else if (item.Name) name = item.Name;
              else if (item.subject_name) name = item.subject_name;
              else if (item.subjectName) name = item.subjectName;
            }
            
            return {
              id: index + 1, // Always use index+1 for ascending order
              originalId: item && item.id ? item.id : null,
              name: name
            };
          });
      }
      
      console.log('Final processed subjects:', processedSubjects);
      setSubjects(processedSubjects);
      setError(null);
      
    } catch (err) {
      console.error('Error in fetchSubjects:', err);
      setError('Failed to fetch subjects. Please try again later.');
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    fetchSubjects(); // Refresh the list after adding
  };

  const handleEditSubject = (subject) => {
    setCurrentSubject(subject);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentSubject(null);
    fetchSubjects(); // Refresh the list after editing
  };

  const handleDeleteSubject = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        // Find the subject to get its original ID if available
        const subject = subjects.find(s => s.id === id);
        const idToDelete = subject && subject.originalId ? subject.originalId : id;
        
        await deleteSubject(idToDelete);
        fetchSubjects(); // Refresh the list after deleting
      } catch (err) {
        setError('Failed to delete subject. Please try again later.');
        console.error('Error deleting subject:', err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Subjects Management</h1>
        <button
          onClick={handleAddSubject}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          Add Subject
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {subjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No subjects found. Click the "Add Subject" button to add one.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map((subject, index) => subject && (
                  <tr key={subject.id || `subject-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subject.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditSubject(subject)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(subject.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {isAddModalOpen && <AddSubjectModal onClose={handleCloseAddModal} />}
      
      {isEditModalOpen && currentSubject && (
        <EditSubjectModal subject={currentSubject} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default SubjectPage;