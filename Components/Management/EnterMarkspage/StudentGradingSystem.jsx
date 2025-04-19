import { useState, useEffect } from 'react';
import GradingService from '../../Services/GradingService';

export default function StudentGradingSystem() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState('Grade 1');
  const [marksData, setMarksData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch students data on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await GradingService.fetchStudents();
        setStudents(data);
        
        // Initialize marks data object
        const initialMarksData = {};
        data.forEach(student => {
          initialMarksData[student.id] = '';
        });
        setMarksData(initialMarksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);
  
  // Filter students by class whenever students list or selected class changes
  useEffect(() => {
    if (students.length > 0) {
      const filtered = students.filter(student => student.class_name === selectedClass);
      setFilteredStudents(filtered);
    }
  }, [students, selectedClass]);
  
  // Handle marks input change
  const handleMarksChange = (studentId, value) => {
    setMarksData(prev => ({
      ...prev,
      [studentId]: value
    }));
  };
  
  // Check if all marks are filled for submit button enablement
  const isFormComplete = () => {
    return filteredStudents.every(student => 
      marksData[student.id] !== '' && marksData[student.id] !== null
    );
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    try {
      const submissionData = filteredStudents.map(student => ({
        student_id: student.id,
        marks: parseFloat(marksData[student.id])
      }));
      
      await GradingService.submitGrades(submissionData);
      setIsSubmitted(true);
    } catch (err) {
      setError('Error submitting grades: ' + err.message);
      console.error(err);
    } finally {
      setShowConfirmation(false);
    }
  };

  // Generate grade options from 1 to 9
  const gradeOptions = Array.from({ length: 9 }, (_, i) => `Grade ${i + 1}`);
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading student data...</div>;
  
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Results Submitted Successfully!</p>
          <p>Refresh the page to enter new grades.</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh Page
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Grading System</h1>
      
      {/* Class Filter */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class-filter">
          Filter by Class:
        </label>
        <select
          id="class-filter"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {gradeOptions.map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>
      
      {/* Student Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Marks</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center">
                  No students found in {selectedClass}
                </td>
              </tr>
            ) : (
              filteredStudents.map(student => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{student.first_name}</td>
                  <td className="py-3 px-6 text-left">{student.last_name}</td>
                  <td className="py-3 px-6 text-left">{student.class_name}</td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marksData[student.id]}
                      onChange={(e) => handleMarksChange(student.id, e.target.value)}
                      className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
            <p className="mb-4">Are you sure you want to submit grades for {selectedClass}?</p>
            <p className="mb-4">Number of students: {filteredStudents.length}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isFormComplete() || filteredStudents.length === 0}
          className={`py-2 px-4 rounded font-bold ${
            isFormComplete() && filteredStudents.length > 0
              ? 'bg-blue-500 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Grades
        </button>
      </div>
    </div>
  );
}