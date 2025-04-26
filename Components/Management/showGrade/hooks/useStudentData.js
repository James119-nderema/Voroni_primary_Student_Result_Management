import { useState, useEffect } from 'react';
import marksService from '../../../Services/marksService';

export  const useStudentData = () => {
  const [marksData, setMarksData] = useState([]);
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marksData, studentsData] = await Promise.all([
          marksService.getStudentMarks(),
          marksService.getStudents()
        ]);

        const studentsMap = studentsData.reduce((acc, student) => {
          acc[student.id] = student;
          return acc;
        }, {});

        setMarksData(marksData);
        setStudents(studentsMap);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { marksData, students, loading, error };
};
