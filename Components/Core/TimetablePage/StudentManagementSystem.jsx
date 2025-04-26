import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import StudentPopup from './StudentPopup';
import StudentService from '../../Services/StudentService';

export default function StudentManagementSystem() {
  const queryClient = useQueryClient();
  const [filterClass, setFilterClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ first_name: '', last_name: '', student_id: '', class_name: '' });
  const [showScrollButton, setShowScrollButton] = useState(false);

  // React Query hooks
  const { data: rawData, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: StudentService.fetchStudents,
  });

  // Ensure allStudents is always an array
  const allStudents = Array.isArray(rawData) ? rawData : [];

  // Filter and search logic
  const filteredStudents = allStudents
    .filter(student => !filterClass || student.class_name === filterClass)
    .filter(student => {
      const query = searchQuery.toLowerCase();
      return !query || 
        student.first_name.toLowerCase().includes(query) ||
        student.last_name.toLowerCase().includes(query) ||
        student.student_id.toLowerCase().includes(query);
    });

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: currentStudent.id, data: currentStudent });
      } else {
        await addMutation.mutateAsync(currentStudent);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  const handleDeleteClick = async (id, studentName) => {
    if (window.confirm(`Are you sure you want to delete ${studentName}?\nThis action cannot be undone.`)) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (err) {
        console.error('Error deleting student:', err);
      }
    }
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Class options for dropdown
  const classOptions = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen p-3 sm:p-6 lg:p-8 relative">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 p-6 flex flex-col md:flex-row justify-between items-center text-white">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 md:mb-0">Student Management System</h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
            <span className="text-sm font-medium">
              {filterClass ? `${filterClass}:` : 'Total:'} 
            </span>
            <span className="ml-2 font-bold text-2xl">
              {filteredStudents.length}
            </span>
            <span className="ml-1 text-sm">students</span>
          </div>
        </div>

        {/* Filters Section */}
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
                Search Students
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
                  placeholder="Search by name or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Add Button */}
            <div className="flex items-end justify-start md:justify-end">
              <button 
                onClick={() => {
                  setIsEditMode(false);
                  setCurrentStudent({ first_name: '', last_name: '', student_id: '', class_name: '' });
                  setIsModalOpen(true);
                }} 
                className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Student
              </button>
            </div>
          </div>
        </div>
        
        {/* Error Messages */}
        {error && (
          <div className="mx-6 mt-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 text-red-700 dark:text-red-100 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error.message}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Data Table */}
        <div className="p-2 sm:p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <div className="h-8 w-8 bg-white dark:bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="-mx-4 sm:-mx-0 overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/60">
                    <tr>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase whitespace-nowrap">#</th>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">Full Name</th>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase whitespace-nowrap">ID</th>
                      <th className="py-2 sm:py-3.5 px-3 sm:px-4 text-right text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {filteredStudents.map((student, index) => (
                      <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-150">
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200">{index + 1}</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          <div className="font-medium">{`${student.first_name} ${student.last_name}`}</div>
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-mono">{student.student_id}</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button 
                              onClick={() => {
                                setIsEditMode(true);
                                setCurrentStudent({ ...student });
                                setIsModalOpen(true);
                              }} 
                              className="inline-flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 rounded-md transition-all duration-200 group"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 transition-transform group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm font-medium">Edit</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(student.id, `${student.first_name} ${student.last_name}`)} 
                              className="inline-flex items-center px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:hover:bg-rose-800/50 text-rose-700 dark:text-rose-300 rounded-md transition-all duration-200 group"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 transition-transform group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm font-medium">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 transform group-hover:-translate-y-1 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {/* Student Modal */}
      {isModalOpen && (
        <StudentPopup
          isEditMode={isEditMode}
          currentStudent={currentStudent}
          setCurrentStudent={setCurrentStudent}
          setIsModalOpen={setIsModalOpen}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}