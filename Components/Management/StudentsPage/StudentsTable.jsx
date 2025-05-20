'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { studentService } from '../../../Services/StudentService';
import { getAllGrades } from '../../Services/GradeService';
import StudentForm from './StudentForm';
import TableHeader from './TableHeader';
import StatsBox from './StatsBox';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  
  // Fetch students and grades data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [studentsResponse, gradesData] = await Promise.all([
        studentService.getAllStudents(),
        getAllGrades()
      ]);
      
      // Extract students array from the paginated response
      let studentsData = [];
      if (studentsResponse && studentsResponse.results) {
        studentsData = studentsResponse.results;
      } else if (Array.isArray(studentsResponse)) {
        studentsData = studentsResponse;
      }
      
      console.log('Processed students data:', studentsData);
      setStudents(studentsData);
      setFilteredStudents(studentsData);
      setGrades(gradesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Initialize with empty arrays to prevent map errors
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Apply filters when students, searchTerm, or gradeFilter changes
  useEffect(() => {
    if (!Array.isArray(students)) {
      setFilteredStudents([]);
      return;
    }
    
    let results = [...students];
    
    if (searchTerm) {
      results = results.filter(student => 
        student.fullName && student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (gradeFilter) {
      results = results.filter(student => student.grade === gradeFilter);
    }
    
    setFilteredStudents(results);
  }, [students, searchTerm, gradeFilter]);
  
  // Handle search and filter changes
  const handleSearch = useCallback((term, grade) => {
    setSearchTerm(term);
    setGradeFilter(grade);
  }, []);
  
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setShowForm(true);
  };
  
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };
  
  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      try {
        await studentService.deleteStudent(id);
        // Refresh data after deletion
        fetchData();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };
  
  const handleFormSubmit = async (studentData) => {
    try {
      if (selectedStudent) {
        // Update existing student
        await studentService.updateStudent({
          ...studentData,
          id: selectedStudent.id
        });
      } else {
        // Add student(s) - the service handles both single and multiple
        await studentService.addStudents(studentData);
      }
      setShowForm(false);
      // Refresh data after adding/updating
      fetchData();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Students Management</h1>
      
      <TableHeader 
        onSearch={handleSearch} 
        onAdd={handleAddStudent} 
        grades={grades} 
      />
      
      <StatsBox count={Array.isArray(filteredStudents) ? filteredStudents.length : 0} />
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="mt-4 bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UPI Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Certificate No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!Array.isArray(filteredStudents) || filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{student.fullName}</td>
                    <td className="px-6 py-4">{student.gender}</td>
                    <td className="px-6 py-4">{student.grade}</td>
                    <td className="px-6 py-4">{student.admissionNumber}</td>
                    <td className="px-6 py-4">{student.upiNumber}</td>
                    <td className="px-6 py-4">{student.birthCertificateNumber}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {showForm && (
        <StudentForm
          student={selectedStudent}
          grades={grades}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default StudentsTable;
