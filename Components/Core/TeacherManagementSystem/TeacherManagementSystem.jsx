// TeacherManagementSystem.js
import { useState, useEffect } from 'react';
import AddEditTeacherModal from './AddEditTeacherModal';
import TeacherService from '../../Services/TeacherService';

export default function TeacherManagementSystem() {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teachers from TeacherService
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await TeacherService.fetchTeachers();
      setTeachers(data || []);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError('Failed to fetch teachers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddClick = () => {
    setCurrentTeacher(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (teacher) => {
    setCurrentTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await TeacherService.deleteTeacher(id);
        fetchTeachers();
      } catch (err) {
        console.error('Error deleting teacher:', err);
        alert('Failed to delete teacher. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTeacher = () => {
    fetchTeachers();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-2 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-100">Class Teachers Management</h1>
        
        <div className="flex justify-end mb-4 sm:mb-6">
          <button 
            onClick={handleAddClick} 
            className="bg-blue-600 dark:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Teacher
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">#</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Class</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {teachers.map((teacher, index) => (
                  <tr key={teacher.id || `teacher-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{teacher.class_teacher}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{teacher.class_name}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 space-x-1 sm:space-x-2">
                      <button 
                        onClick={() => handleEditClick(teacher)} 
                        className="bg-yellow-500 dark:bg-yellow-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(teacher.id)} 
                        className="bg-red-500 dark:bg-red-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700 text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {teachers.length === 0 && !loading && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">No teachers found</div>
            )}
          </div>
        )}
        
        {isModalOpen && (
          <AddEditTeacherModal 
            teacher={currentTeacher}
            onClose={handleCloseModal}
            onSave={handleSaveTeacher}
            apiUrl={TeacherService.API_URL}
          />
        )}
      </div>
    </div>
  );
}