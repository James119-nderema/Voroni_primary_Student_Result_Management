import React, { useState, useEffect } from 'react';
import ApiService from '../../Services/teacherScheduleService';

const TimetableComponent = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // Fetch teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersData = await ApiService.getTeachers();
        setTeachers(teachersData);
      } catch (err) {
        setError('Failed to fetch teachers');
        console.error(err);
      }
    };

    fetchTeachers();
  }, []);

  // Fetch timetable data when component mounts or teacher filter changes
  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      try {
        const timetableData = await ApiService.getTimetable(selectedTeacher);
        setTimetableData(timetableData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch timetable data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [selectedTeacher]);

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleDownloadPDF = async () => {
    // Don't allow download if no teacher is selected
    if (selectedTeacher === 'all') {
      alert('Please select a specific teacher to download their schedule');
      return;
    }

    setDownloading(true);
    try {
      // Find the teacher ID based on the selected teacher name
      const selectedTeacherObj = teachers.find(teacher => teacher.name === selectedTeacher);
      
      if (!selectedTeacherObj) {
        throw new Error('Teacher not found');
      }
      
      // Get teacher ID and construct URL with the teacher_id parameter
      const teacherId = selectedTeacherObj.id;
      
      // Create URL with specific teacher ID parameter
      const downloadUrl = `http://localhost:8001/api/timetable/download_teacher_pdf/?teacher_id=${teacherId}`;
      
      // Direct download approach using window.open
      window.open(downloadUrl, '_blank');
      
      // Alternative approach using fetch if direct download doesn't work
      // const response = await fetch(downloadUrl, {
      //   method: 'GET',
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to download PDF');
      // }
      // 
      // const blob = await response.blob();
      // const blobUrl = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = blobUrl;
      // link.download = `${selectedTeacher}_timetable.pdf`;
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      // window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setError('Failed to download PDF');
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Class Timetable</h1>
      
      {/* Teacher Filter and Download Button */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="w-full md:w-auto">
          <label htmlFor="teacher-select" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Teacher:
          </label>
          <select
            id="teacher-select"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Teachers</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.name}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleDownloadPDF}
          disabled={selectedTeacher === 'all' || downloading}
          className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 ${
            selectedTeacher === 'all'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {downloading ? (
            <>
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading timetable...</p>
        </div>
      )}

      {/* Timetable Table */}
      {!loading && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Teacher Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Time Slot
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {timetableData.length > 0 ? (
                timetableData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.teacher_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.subject_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.day_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.class_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.timeslot_info}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No timetable data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      {!loading && timetableData.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {timetableData.length} timetable entries
          {selectedTeacher !== 'all' && (
            <span> for {selectedTeacher}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TimetableComponent;
