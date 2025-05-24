import { useState, useEffect } from 'react';
import studentGradingService from '../../../Services/studentGradingService';

export default function useMarksData() {
  const [allMarks, setAllMarks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all required data when component mounts
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [marksResponse, subjectsResponse, studentsResponse] = await Promise.all([
          studentGradingService.getAllMarks(),
          studentGradingService.getSubjects(),
          studentGradingService.getStudents()
        ]);
        
        // Extract data, handling both direct arrays and nested response formats
        const marksData = Array.isArray(marksResponse.data) ? marksResponse.data : 
                         (marksResponse.data?.results || []);
        
        const subjectsData = Array.isArray(subjectsResponse.data) ? subjectsResponse.data : 
                            (subjectsResponse.data?.results || []);
        
        const studentsData = Array.isArray(studentsResponse.data) ? studentsResponse.data : 
                            (studentsResponse.data?.results || []);
        
        console.log('Marks data:', marksData);
        console.log('Subjects data:', subjectsData);
        console.log('Students data:', studentsData);
        
        setAllMarks(marksData);
        setSubjects(subjectsData);
        setStudents(studentsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  return { allMarks, subjects, students, loading, error };
}
