import { useState, useEffect } from 'react';
import StudentService from '../../../Services/StudentService';

const useStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);

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

  const addStudent = async (studentsData) => {
    try {
      setLoading(true);
      if (studentsData.length === 1) {
        await StudentService.addStudent(studentsData[0]);
      } else {
        await StudentService.addMultipleStudents(studentsData);
      }
      await fetchStudents();
      return true;
    } catch (error) {
      console.error("Failed to add students:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (updatedData) => {
    try {
      setLoading(true);
      await StudentService.updateStudent(updatedData.id, updatedData);
      await fetchStudents();
      return true;
    } catch (error) {
      console.error(`Failed to update student:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      setLoading(true);
      await StudentService.deleteStudent(id);
      await fetchStudents();
      return true;
    } catch (error) {
      console.error(`Failed to delete student with id ${id}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    totalStudents,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent
  };
};

export default useStudentManagement;
