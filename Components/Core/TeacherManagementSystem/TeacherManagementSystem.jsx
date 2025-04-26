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
  const [filterClass, setFilterClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const classOptions = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'
  ];

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

  const filteredTeachers = teachers
    .filter(teacher => !filterClass || teacher.class_name === filterClass)
    .filter(teacher => {
      const query = searchQuery.toLowerCase();
      return !query || teacher.class_teacher.toLowerCase().includes(query);
    });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen p-0 relative">
      <div className="max-w-7xl mx-0 bg-white dark:bg-gray-800 rounded-none sm:rounded-xl shadow-lg overflow-hidden sm:mx-auto sm:my-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 p-6 flex flex-col md:flex-row justify-between items-center text-white">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 md:mb-0">Class Teachers Management</h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
            <span className="text-sm font-medium">Total:</span>
            <span className="ml-2 font-bold text-2xl">{filteredTeachers.length}</span>
            <span className="ml-1 text-sm">teachers</span>
          </div>
        </div>

        {/* Action Button Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Class Filter */}
            <div className="relative">
              <label htmlFor="classFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Class
              </label>
              <select 
                id="classFilter"
                className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 transition-all duration-200"
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              >
                <option value="">All Classes</option>
                {classOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Search */}
            <div className="relative">
              <label htmlFor="searchField" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Teachers
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="searchField"
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100 transition-all duration-200"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Add Button */}
            <div className="flex items-end justify-start md:justify-end">
              <button 
                onClick={handleAddClick}
                className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Teacher
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 text-red-700 dark:text-red-100 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-white dark:bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 sm:p-4 md:p-6">
            <div className="-mx-4 sm:-mx-0 overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/60">
                    <tr>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase whitespace-nowrap">#</th>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">Name</th>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">Class</th>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-right text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {filteredTeachers.map((teacher, index) => (
                      <tr key={teacher.id || `teacher-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-150">
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200">{index + 1}</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{teacher.class_teacher}</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{teacher.class_name}</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4">
                          <div className="flex flex-col xs:flex-row justify-end gap-2 sm:gap-3">
                            <button 
                              onClick={() => handleEditClick(teacher)}
                              className="w-full xs:w-auto bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-amber-200 dark:hover:bg-amber-900/60 text-xs font-medium transition-colors duration-150 flex items-center justify-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(teacher.id)}
                              className="w-full xs:w-auto bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-red-200 dark:hover:bg-red-900/60 text-xs font-medium transition-colors duration-150 flex items-center justify-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* No Data Message */}
        {!loading && filteredTeachers.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No teachers found
          </div>
        )}

        {/* Teacher Modal */}
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