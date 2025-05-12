import React, { useState, useEffect } from 'react';
import { UserPlus, Search, LayoutGrid, Table } from 'lucide-react';
import StudentForm from './StudentForm';
import EditStudentForm from './EditStudentForm';
import useStudentManagement from './hooks/useStudentManagement';
import StudentTable from './components/StudentTable';
import StudentCardsView from './components/StudentCardsView';
import Pagination from './components/Pagination';
import StudentStatistics from './components/StudentStatistics';
import GradeFilter from './components/GradeFilter';
import { filterStudents, paginateStudents } from './utils/studentFilters';

const StudentManagement = () => {
  // Use the custom hook for student data management
  const { 
    students, 
    loading, 
    addStudent: handleAddStudentToAPI, 
    updateStudent: handleUpdateStudentInAPI, 
    deleteStudent: handleDeleteStudentFromAPI 
  } = useStudentManagement();
  
  // UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewMode, setViewMode] = useState(() => {
    return window.innerWidth > 768 ? 'table' : 'cards';
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGrade]);

  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth > 768 ? 'table' : 'cards');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and paginate students
  const filteredStudents = filterStudents(students, searchTerm, selectedGrade);
  const paginatedStudents = paginateStudents(filteredStudents, currentPage, pageSize);

  // Enhanced debugging for filter issues
  useEffect(() => {
    if (selectedGrade !== null) {
      console.log(`Filtering for Grade ${selectedGrade}`);
      console.log(`Total students: ${students.length}`);
      console.log(`Filtered students: ${filteredStudents.length}`);
      
      // Log first few students to check their structure
      if (students.length > 0) {
        console.log('Sample student data structure:', students[0]);
      }
    }
  }, [selectedGrade, filteredStudents.length, students.length]);

  // Handler functions
  const handleAddStudent = async (studentsData) => {
    const success = await handleAddStudentToAPI(studentsData);
    if (success) setIsFormOpen(false);
  };

  const handleEditStudent = async (updatedData) => {
    const success = await handleUpdateStudentInAPI(updatedData);
    if (success) {
      setIsEditFormOpen(false);
      setEditingStudent(null);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await handleDeleteStudentFromAPI(id);
    }
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setIsEditFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 sm:p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl p-1 sm:p-3 md:p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">Student Management</h1>
            
            <div className="flex flex-col md:flex-row gap-1 sm:gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-l-lg border border-gray-300 ${
                    viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-700'
                  }`}
                  title="Table View"
                >
                  <Table className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-r-lg border-t border-r border-b border-gray-300 ${
                    viewMode === 'cards' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-700'
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => {
                  setEditingStudent(null);
                  setIsFormOpen(true);
                }}
                className="flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                Add
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : !Array.isArray(students) || students.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-4 sm:p-12 text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Students Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Get started by adding your first student to the management system.
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <StudentStatistics 
                  students={students} 
                  filteredStudents={filteredStudents}
                  selectedGrade={selectedGrade}
                />
                <div className="md:col-span-2">
                  <GradeFilter 
                    selectedGrade={selectedGrade} 
                    setSelectedGrade={setSelectedGrade} 
                  />
                </div>
              </div>
              
              {viewMode === 'table' ? (
                <StudentTable
                  students={paginatedStudents}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onEdit={openEditForm}
                  onDelete={handleDeleteStudent}
                />
              ) : (
                <StudentCardsView
                  students={paginatedStudents}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onEdit={openEditForm}
                  onDelete={handleDeleteStudent}
                />
              )}

              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={filteredStudents.length}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
              />
            </>
          )}
        </div>
      </div>

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddStudent}
      />

      <EditStudentForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={handleEditStudent}
        student={editingStudent}
      />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @media (max-width: 768px) {
          .table-view-only {
            display: none;
          }
          
          .py-3 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          
          .px-4 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentManagement;