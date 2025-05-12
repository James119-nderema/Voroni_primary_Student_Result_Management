import React, { useState, useEffect } from 'react';
import { PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { teacherService } from '../../Services/TeacherService';
import TeacherForm from './TeacherForm';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalTeachers, setTotalTeachers] = useState(0);

  useEffect(() => {
    fetchTeachers();
  }, [currentPage, pageSize]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await teacherService.getTeachers(currentPage, pageSize);
      setTeachers(response.results);
      setTotalTeachers(response.count);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setLoading(false);
    }
  };

  const handleAddTeacher = () => {
    setCurrentTeacher(null);
    setShowForm(true);
  };

  const handleEditTeacher = (teacher) => {
    setCurrentTeacher(teacher);
    setShowForm(true);
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await teacherService.deleteTeacher(id);
        fetchTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  const handleFormSubmit = async (teacher) => {
    try {
      if (currentTeacher) {
        await teacherService.updateTeacher(currentTeacher.id, teacher);
      } else {
        await teacherService.createTeacher(teacher);
      }
      setShowForm(false);
      fetchTeachers();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const totalPages = Math.ceil(totalTeachers / pageSize);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Teacher Management</h1>
            <button
              onClick={handleAddTeacher}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Teacher
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">#</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Full Name</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Role</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Staff No.</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teachers.length > 0 ? (
                      teachers.map((teacher, index) => (
                        <tr key={teacher.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {(currentPage - 1) * pageSize + index + 1}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">{teacher.full_name}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{teacher.role}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{teacher.phone_number}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{teacher.staff_no}</td>
                          <td className="py-3 px-4 text-sm flex space-x-2">
                            <button
                              onClick={() => handleEditTeacher(teacher)}
                              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-1 px-3 rounded-md transition-colors duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded-md transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-10 text-center text-gray-500">
                          No teachers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

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
                    {`Showing ${teachers.length ? (currentPage - 1) * pageSize + 1 : 0} - ${
                      Math.min(currentPage * pageSize, totalTeachers)
                    } of ${totalTeachers}`}
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
                    disabled={currentPage === totalPages}
                    className={`p-1 rounded-md ${
                      currentPage === totalPages
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

      {showForm && (
        <TeacherForm
          teacher={currentTeacher}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default TeacherManagement;