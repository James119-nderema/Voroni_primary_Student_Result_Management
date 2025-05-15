import { useState } from 'react';
import studentGradingService from '../../Services/studentGradingService';

/**
 * A reusable button component for downloading student reports
 * 
 * @param {Object} props
 * @param {string} props.grade - The selected grade
 * @param {string} props.studentId - Optional student ID for individual reports
 * @param {string} props.subjectId - Optional subject ID to filter by subject
 * @param {string} props.month - Optional month to filter by month
 * @param {string} props.buttonText - Text to display on the button
 * @param {string} props.className - Additional CSS classes for styling
 */
export default function ReportDownloadButton({ 
  grade, 
  studentId, 
  subjectId, 
  month, 
  buttonText = 'Download Report',
  className = ''
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError('');

      // Prepare parameters for the report
      const params = {};
      if (grade) params.grade = grade;
      if (studentId) params.student_id = studentId;
      if (subjectId) params.subject_id = subjectId;
      if (month) params.month = month;

      // Call the API to generate report
      const response = await studentGradingService.generateMarksReport(params);
      
      // Create a blob URL and trigger download
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] 
      });
      const url = window.URL.createObjectURL(blob);
      
      // Determine filename from content-disposition header or use default
      let filename = 'student_marks_report.pdf';
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Error downloading report:', err);
      setError('Failed to download report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleDownload}
        disabled={loading}
        className={`px-4 py-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-sm ${className}`}
      >
        {loading ? 'Downloading...' : buttonText}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
