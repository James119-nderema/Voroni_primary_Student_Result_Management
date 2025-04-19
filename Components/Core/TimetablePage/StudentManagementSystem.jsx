import { useState, useEffect } from 'react';
import StudentPopup from './StudentPopup';
import StudentService from '../../Services/StudentService';

export default function StudentManagementSystem() {
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterClass, setFilterClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ id: null, first_name: '', last_name: '', student_id: '', class_name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const applyFilter = (data, filterValue) => {
    const filtered = filterValue 
      ? data.filter(student => student.class_name === filterValue)
      : data;
    setFilteredStudents(filtered);
  };

  const applySearchFilter = (data, query) => {
    const lowerCaseQuery = query.toLowerCase();
    return data.filter(student =>
      student.first_name.toLowerCase().includes(lowerCaseQuery) ||
      student.last_name.toLowerCase().includes(lowerCaseQuery) ||
      student.student_id.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await StudentService.fetchStudents();
      setAllStudents(data || []);
      applyFilter(data, filterClass);
    } catch (err) {
      console.error('Error fetching students:', err.message);
      setError(`Failed to fetch students. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilter(allStudents, filterClass);
  }, [filterClass, allStudents]);

  useEffect(() => {
    const filtered = applySearchFilter(allStudents, searchQuery);
    applyFilter(filtered, filterClass);
  }, [searchQuery, allStudents, filterClass]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setCurrentStudent({ id: null, first_name: '', last_name: '', student_id: '', class_name: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setIsEditMode(true);
    setCurrentStudent({ ...student });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id, studentName) => {
    if (window.confirm(`Are you sure you want to delete ${studentName}?\nThis action cannot be undone.`)) {
      try {
        await StudentService.deleteStudent(id);
        fetchStudents();
      } catch (err) {
        console.error('Error deleting student:', err);
        alert('Failed to delete student. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await StudentService.updateStudent(currentStudent.id, currentStudent);
      } else {
        await StudentService.addStudent(currentStudent);
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (err) {
      console.error('Error saving student:', err);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} student. Please try again.`);
    }
  };

  const handleFilterChange = (e) => {
    setFilterClass(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-2 sm:p-6 relative">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-100">Student Management System</h1>
        
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <label htmlFor="classFilter" className="font-medium text-gray-700 dark:text-gray-300">Filter by Class:</label>
            <select 
              id="classFilter"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              value={filterClass}
              onChange={handleFilterChange}
            >
              <option value="">All Classes</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <label htmlFor="searchField" className="font-medium text-gray-700 dark:text-gray-300">Search:</label>
            <input
              id="searchField"
              type="text"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              placeholder="Search by name or ID"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button 
            onClick={handleAddClick} 
            className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Student
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
                  <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">#</th>
                  <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                  <th className="hidden sm:table-cell py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Last Name</th>
                  <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">ID</th>
                  <th className="hidden sm:table-cell py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Class</th>
                  <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                    <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">{student.first_name}</td>
                    <td className="hidden sm:table-cell py-2 px-4 text-sm text-gray-700 dark:text-gray-300">{student.last_name}</td>
                    <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">{student.student_id}</td>
                    <td className="hidden sm:table-cell py-2 px-4 text-sm text-gray-700 dark:text-gray-300">{student.class_name}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button 
                        onClick={() => handleEditClick(student)} 
                        className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(student.id, `${student.first_name} ${student.last_name}`)} 
                        className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredStudents.length === 0 && !loading && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">No students found</div>
            )}
          </div>
        )}
        
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

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
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
    </div>
  );
}