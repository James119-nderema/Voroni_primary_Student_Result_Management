import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { teacherService } from '../../Services/TeacherService';
import TeacherForm from './TeacherForm';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teacherService.getTeachers();
      
      // Now expecting a direct array instead of paginated results
      if (response && Array.isArray(response)) {
        setTeachers(response);
      } else {
        setTeachers([]);
        setError('Invalid response format from server');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
      setError('Failed to fetch teachers');
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
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
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
                    {teachers && teachers.length > 0 ? (
                      teachers.map((teacher, index) => (
                        <tr key={teacher.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {index + 1}
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