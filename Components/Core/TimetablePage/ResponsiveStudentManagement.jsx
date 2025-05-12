import React, { useState, useEffect } from 'react';
import { UserPlus, Search, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import StudentForm from './StudentForm';
import EditStudentForm from './EditStudentForm';
import StudentService from '../../Services/StudentService';
import StudentCard from './StudentCard';

const ResponsiveStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);
  const [viewMode, setViewMode] = useState(() => {
    // Default to table on larger screens, cards on smaller screens
    return window.innerWidth > 768 ? 'table' : 'cards';
  });

  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth > 768 ? 'table' : 'cards');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await StudentService.getAllStudents();

      let studentsArray = [];

      if (!data) {
        console.error("API returned no data");
      } else if (Array.isArray(data)) {
        studentsArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        studentsArray = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        studentsArray = data.results;
      } else if (data.students && Array.isArray(data.students)) {
        studentsArray = data.students;
      } else if (typeof data === 'object') {
        const possibleArray = Object.values(data);
        if (possibleArray.length > 0 && typeof possibleArray[0] === 'object') {
          studentsArray = possibleArray;
        }
      }

      setStudents(studentsArray);
      setTotalStudents(studentsArray.length);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentsData) => {
    try {
      setLoading(true);
      if (studentsData.length === 1) {
        await StudentService.addStudent(studentsData[0]);
      } else {
        await StudentService.addMultipleStudents(studentsData);
      }
      await fetchStudents();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = async (updatedData) => {
    try {
      setLoading(true);
      await StudentService.updateStudent(updatedData.id, updatedData);
      await fetchStudents();
      setIsEditFormOpen(false);
      setEditingStudent(null);
    } catch (error) {
      console.error(`Failed to update student:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setLoading(true);
        await StudentService.deleteStudent(id);
        await fetchStudents();
      } catch (error) {
        console.error(`Failed to delete student with id ${id}:`, error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openEditForm = async (student) => {
    try {
      setEditingStudent(student);
      setIsEditFormOpen(true);
    } catch (error) {
      console.error(`Failed to prepare student for editing:`, error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = Array.isArray(students) 
    ? students.filter(student => 
        student && (
          (student.fullName && student.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.admissionNumber && student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.upiNumber && student.upiNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
    : [];
    
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const renderCardView = () => {
    if (paginatedStudents.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No students match your search criteria
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {paginatedStudents.map((student, index) => (
          <StudentCard
            key={student.id || index}
            student={student}
            index={index}
            currentPage={currentPage}
            pageSize={pageSize}
            onEdit={openEditForm}
            onDelete={handleDeleteStudent}
          />
        ))}
      </div>
    );
  };

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">#</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Full Name</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Gender</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Grade</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Admission Number</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">UPI Number</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Birth Certificate</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paginatedStudents.length > 0 ? (
            paginatedStudents.map((student, index) => {
              const fullNameProperty = student.fullName || student.full_name || student.name || '';
              const gradeProperty = student.grade || student.class || student.gradeLevel || '';
              const admissionProperty = student.admissionNumber || student.admission_number || student.admissionNo || '';
              const upiProperty = student.upiNumber || student.upi_number || student.upi || '';
              const birthCertProperty = student.birthCertificateNumber || student.birth_certificate || student.birthCertificate || '';
              const genderProperty = student.gender || student.sex || '';
              
              return (
                <tr 
                  key={student.id || index} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 text-sm text-gray-700 text-center">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-center">{fullNameProperty || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-center">{genderProperty || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-center">{gradeProperty || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-center">{admissionProperty || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-center">{upiProperty || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-center">{birthCertProperty || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm flex justify-center space-x-2">
                    <button
                      onClick={() => openEditForm(student)}
                      className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-2 rounded-md transition-colors duration-200"
                      title="Edit Student"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-md transition-colors duration-200"
                      title="Delete Student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="py-10 text-center text-gray-500">
                No students match your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Student Management</h1>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
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
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-r-lg border-t border-r border-b border-gray-300 ${
                    viewMode === 'cards' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-700'
                  }`}
                >
                  Cards
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
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : !Array.isArray(students) || students.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
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
              {viewMode === 'table' ? renderTableView() : renderCardView()}

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    {[10, 20, 50].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span className="ml-4 text-sm text-gray-700">
                    {`Showing ${paginatedStudents.length ? (currentPage - 1) * pageSize + 1 : 0} - ${
                      Math.min(currentPage * pageSize, filteredStudents.length)
                    } of ${filteredStudents.length}`}
                  </span>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-1 rounded-md ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="mx-2 flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`p-1 rounded-md ${
                      currentPage === totalPages || totalPages === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
        }}
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
      `}</style>
    </div>
  );
};

export default ResponsiveStudentManagement;
