import { useState, useEffect } from 'react';
import GradingService from '../../Services/GradingService';

export default function StudentGradingSystem() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState('Grade 1');
  const [subjectMarks, setSubjectMarks] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationPopup, setValidationPopup] = useState(null);
  
  // Define subjects
  const subjects = ['Math', 'Eng', 'Kis', 'Sci', 'SST'];

  // Fetch students data on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GradingService.fetchStudents();
        console.log("Fetched student IDs:", data.map(student => student.id));
        setStudents(data);
        
        // Initialize marks data object for all subjects
        const initialSubjectMarks = {};
        data.forEach(student => {
          initialSubjectMarks[student.id] = {
            Math: '',
            Eng: '',
            Kis: '',
            Sci: '',
            SST: ''
          };
        });
        setSubjectMarks(initialSubjectMarks);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(`Failed to load students: ${err.message}`);
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
  
  // Handle marks input change for a specific subject
  const handleSubjectMarksChange = (studentId, subject, value) => {
    // Validate input (only allow numbers between 0-100)
    if (value !== '' && (isNaN(value) || value < 0 || value > 100)) {
      return; // Don't update state for invalid values
    }
    
    setSubjectMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: value
      }
    }));
  };
  
  // Calculate total marks for a student
  const calculateTotalMarks = (studentId) => {
    if (!subjectMarks[studentId]) return 0;
    
    return subjects.reduce((total, subject) => {
      const mark = subjectMarks[studentId][subject];
      return total + (mark !== '' ? parseFloat(mark) || 0 : 0);
    }, 0);
  };
  
  // Check if all marks are filled for submit button enablement
  const isFormComplete = () => {
    return filteredStudents.every(student => 
      subjects.every(subject => {
        const mark = subjectMarks[student.id]?.[subject];
        return mark !== '' && mark !== null && !isNaN(mark);
      })
    );
  };
  
  // Close the validation popup
  const closeValidationPopup = () => {
    setValidationPopup(null);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    // Validate all fields before showing confirmation
    if (!isFormComplete()) {
      setError("Please fill in all marks before submitting");
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      setValidationPopup(null);
      
      // Create an array of student grade objects
      const submissionData = filteredStudents.map(student => {
        return {
          id: student.id,
          total_marks: calculateTotalMarks(student.id),
          subject_marks: subjects.reduce((acc, subject) => {
            // Ensure all marks are numbers, not strings
            acc[subject] = Number(subjectMarks[student.id][subject]);
            return acc;
          }, {})
        };
      });
      
      // Submit all student grades in one request
      const result = await GradingService.submitGrades(submissionData);
      
      // Handle validation warnings (7-day rule)
      if (!result.success && result.validationErrors) {
        console.log("Validation errors received:", result.validationErrors);
        
        // Set popup with only the counts of successful and unsuccessful submissions
        setValidationPopup({
          successful: result.submitted ? result.submitted.length : 0,
          unsuccessful: result.validationErrors.length
        });
        
        // If there were no successful submissions, don't set isSubmitted
        if (!result.submitted || result.submitted.length === 0) {
          return;
        }
      }
      
      // Full or partial success
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      if (err.message && err.message.includes("Student with ID")) {
        setError(`${err.message}. The student IDs in the system may have changed. Please refresh the page to load updated student data.`);
      } else {
        setError(`Error submitting grades: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };

  // Generate grade options from 1 to 9
  const gradeOptions = Array.from({ length: 9 }, (_, i) => `Grade ${i + 1}`);
  
  if (loading) return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-white p-6 rounded shadow-md text-center w-full">
        <p className="text-lg">Loading student data...</p>
      </div>
    </div>
  );
  
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center w-full max-w-md">
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
    <div className="container mx-auto px-2 py-4 max-w-full">
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-center">Student Grading System</h1>
      
      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded">
          <p className="font-bold text-sm">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* Validation Popup - Brief Summary */}
      {validationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">Submission Results</h3>
              <button 
                onClick={closeValidationPopup}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="mt-3">
              <p className="text-green-600 font-medium">
                {validationPopup.successful} students: grades submitted successfully
              </p>
              {validationPopup.unsuccessful > 0 && (
                <p className="text-red-600 font-medium">
                  {validationPopup.unsuccessful} students: failed due to 7-day rule
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeValidationPopup}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Class Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="class-filter">
          Filter by Class:
        </label>
        <select
          id="class-filter"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
        >
          {gradeOptions.map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>
      
      {/* Mobile-friendly view when there are no students */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white shadow-md rounded p-4 text-center my-6">
          <p className="text-gray-600">No students found in {selectedClass}</p>
        </div>
      ) : (
        <>
          {/* Mobile view for small screens */}
          <div className="md:hidden">
            {filteredStudents.map((student, index) => (
              <div key={student.id} className="bg-white shadow-md rounded p-4 mb-4">
                <div className="mb-2 pb-2 border-b border-gray-200">
                  <p className="font-bold">{student.first_name} {student.last_name}</p>
                  <p className="text-sm text-gray-600">Student #{index + 1}</p>
                </div>
                
                <div className="space-y-3">
                  {subjects.map(subject => (
                    <div key={`${student.id}-${subject}`} className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium">{subject}:</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectMarks[student.id]?.[subject] || ''}
                        onChange={(e) => handleSubjectMarksChange(student.id, subject, e.target.value)}
                        className={`shadow appearance-none border ${
                          subjectMarks[student.id]?.[subject] === '' ? 'border-red-500' : 'border-gray-300'
                        } rounded w-16 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        required
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-200 text-right">
                  <span className="font-bold">Total: {calculateTotalMarks(student.id)}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop view for larger screens */}
          <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No.</th>
                  <th className="py-3 px-6 text-left">First Name</th>
                  <th className="py-3 px-6 text-left">Last Name</th>
                  {subjects.map(subject => (
                    <th key={subject} className="py-3 px-6 text-center">{subject}</th>
                  ))}
                  <th className="py-3 px-6 text-center">Total Marks</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{student.first_name}</td>
                    <td className="py-3 px-6 text-left">{student.last_name}</td>
                    {subjects.map(subject => (
                      <td key={`${student.id}-${subject}`} className="py-3 px-6 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={subjectMarks[student.id]?.[subject] || ''}
                          onChange={(e) => handleSubjectMarksChange(student.id, subject, e.target.value)}
                          className={`shadow appearance-none border ${
                            subjectMarks[student.id]?.[subject] === '' ? 'border-red-500' : 'border-gray-300'
                          } rounded w-16 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                          required
                        />
                      </td>
                    ))}
                    <td className="py-3 px-6 text-center font-bold">
                      {calculateTotalMarks(student.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
            <p className="mb-4">Are you sure you want to submit grades for {selectedClass}?</p>
            <p className="mb-4">Number of students: {filteredStudents.length}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Button */}
      {filteredStudents.length > 0 && (
        <div className="mt-4 flex justify-center md:justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isFormComplete() || isSubmitting}
            className={`py-2 px-4 rounded font-bold w-full md:w-auto ${
              isFormComplete() && !isSubmitting
                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Grades
          </button>
        </div>
      )}
    </div>
  );
}