import { useState, useEffect } from 'react';
import studentGradingService from '../../Services/studentGradingService';

export default function MarksEntryForm() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [totalMarks, setTotalMarks] = useState(100);
  const [studentMarks, setStudentMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [warningPopup, setWarningPopup] = useState({ visible: false, message: '' });

  const classes = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];
  const examTypes = ['Exam 1', 'Exam 2', 'Exam 3'];

  const getStudentDisplayName = (student) => {
    if (!student) return 'Unknown Student';

    if (student.student_name) return student.student_name;
    if (student.fullName) return student.fullName;
    if (student.full_name) return student.full_name;
    if (student.name) return student.name;

    if (student.first_name && student.last_name) 
      return `${student.first_name} ${student.last_name}`;
    if (student.firstName && student.lastName) 
      return `${student.firstName} ${student.LastName}`;

    if (student.user) {
      if (student.user.name) return student.user.name;
      if (student.user.username) return student.user.username;
      if (student.user.first_name && student.user.last_name) 
        return `${student.user.first_name} ${student.user.last_name}`;
    }

    if (student.id) return `Student ID: ${student.id}`;
    if (student.registration_no) return `Student #${student.registration_no}`;
    if (student.admission_no) return `Student #${student.admission_no}`;
    if (student.roll_no) return `Roll #${student.roll_no}`;

    return 'Unknown Student';
  };

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchStudents = async () => {
    try {
      const response = await studentGradingService.getStudents();
      const data = response.data;

      if (Array.isArray(data)) {
        setStudents(data);
      } else if (data?.results) {
        setStudents(data.results);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Error fetching students');
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await studentGradingService.getSubjects();
      const data = response.data;
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError('Error fetching subjects');
    }
  };

  useEffect(() => {
    if (students.length > 0) {
      const initialMarks = students.map(student => ({
        studentId: student.id,
        mark: ''
      }));
      setStudentMarks(initialMarks);
    }
  }, [students]);

  useEffect(() => {
    if (selectedClass && students.length > 0) {
      const gradeNumber = selectedClass.replace('Grade ', '').trim();

      const filteredStudents = students.filter(student => 
        student.class_name === selectedClass || 
        student.grade === selectedClass ||
        student.class === selectedClass ||
        student.grade_name === selectedClass ||
        String(student.grade) === gradeNumber || 
        String(student.class) === gradeNumber ||
        String(student.class_name).toLowerCase() === selectedClass.toLowerCase() ||
        String(student.grade).toLowerCase() === selectedClass.toLowerCase() ||
        String(student.class_name).includes(gradeNumber) ||
        String(student.grade).includes(gradeNumber)
      );

      if (filteredStudents.length > 0) {
        const initialMarks = filteredStudents.map(student => ({
          studentId: student.id,
          mark: ''
        }));
        setStudentMarks(initialMarks);
      }
    }
  }, [selectedClass, students]);

  const handleMarkChange = (studentId, value) => {
    if (value !== '' && value !== '-' && isNaN(value)) return;

    setStudentMarks(prev =>
      prev.map(mark =>
        mark.studentId === studentId ? { ...mark, mark: value } : mark
      )
    );
  };

  const validateMarks = () => {
    for (const mark of studentMarks) {
      if (mark.mark !== '' && mark.mark !== '-') {
        const num = parseFloat(mark.mark);
        if (num > totalMarks) {
          setError(`Marks cannot exceed ${totalMarks}`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setWarningPopup({ visible: false, message: '' });

    if (!selectedSubject) {
      setError('Please select a subject');
      return;
    }

    if (!selectedTerm) {
      setError('Please select a term');
      return;
    }

    if (!selectedExamType) {
      setError('Please select an exam type');
      return;
    }

    if (!validateMarks()) return;

    const marksData = studentMarks
      .filter(mark => mark.mark !== '')
      .map(mark => ({
        student_id: mark.studentId,
        subject_id: parseInt(selectedSubject),
        raw_mark: mark.mark,
        total_marks: totalMarks,
        term: selectedTerm,
        exam_type: selectedExamType
      }));

    if (marksData.length === 0) {
      setError('Please enter at least one mark');
      return;
    }

    setLoading(true);

    try {
      if (marksData.length > 1) {
        const response = await studentGradingService.enterBulkMarks(marksData);
        setSuccess('All marks submitted successfully');
      } else {
        const response = await studentGradingService.createMark(marksData[0]);
        setSuccess('Mark submitted successfully');
      }

      const resetMarks = students.map(student => ({
        studentId: student.id,
        mark: ''
      }));
      setStudentMarks(resetMarks);
    } catch (err) {
      console.error('Submission error:', err);

      if (err.response) {
        const responseData = err.response.data;

        if (responseData?.warning_message) {
          setWarningPopup({
            visible: true,
            message: responseData.warning_message
          });
          return;
        }

        if (err.response.data?.non_field_errors) {
          setError(err.response.data.non_field_errors.join(', '));
        } else if (typeof err.response.data === 'object') {
          const errorMessages = [];
          for (const [key, value] of Object.entries(err.response.data)) {
            const valueStr = Array.isArray(value) ? value.join(', ') : value;
            errorMessages.push(`${key}: ${valueStr}`);
          }
          setError(errorMessages.join('; ') || 'Validation error');
        } else if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else {
          setError(`Server error (${err.response.status})`);
        }
      } else if (err.request) {
        setError('No response from server. Check your network connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeWarningPopup = () => {
    setWarningPopup({ visible: false, message: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Student Marks Entry</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

      {warningPopup.visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Message</h2>
            <p className="mb-6">{warningPopup.message}</p>
            <div className="flex justify-end">
              <button
                onClick={closeWarningPopup}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Class</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Subject</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Total Marks</label>
            <input
              type="number"
              min="1"
              max="100"
              className="w-full border px-3 py-2 rounded"
              value={totalMarks}
              onChange={(e) => setTotalMarks(parseInt(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Term</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              required
            >
              <option value="">Select Term</option>
              {terms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Exam Type</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              required
            >
              <option value="">Select Exam Type</option>
              {examTypes.map(examType => (
                <option key={examType} value={examType}>{examType}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Student Marks</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Student Name</th>
                <th className="py-2 px-4 border-b text-left">Marks (out of {totalMarks})</th>
              </tr>
            </thead>
            <tbody>
              {selectedClass ? (
                (() => {
                  const gradeNumber = selectedClass.replace('Grade ', '').trim();

                  const filteredStudents = students.filter(student => 
                    student.class_name === selectedClass || 
                    student.grade === selectedClass ||
                    student.class === selectedClass ||
                    student.grade_name === selectedClass ||
                    String(student.grade) === gradeNumber || 
                    String(student.class) === gradeNumber ||
                    String(student.class_name).toLowerCase() === selectedClass.toLowerCase() ||
                    String(student.grade).toLowerCase() === selectedClass.toLowerCase() ||
                    String(student.class_name).includes(gradeNumber) ||
                    String(student.grade).includes(gradeNumber)
                  );

                  if (filteredStudents.length === 0) {
                    return (
                      <tr>
                        <td colSpan="2" className="text-center py-4">
                          <p>No students found for {selectedClass}.</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Please check the student data or class name matching.
                          </p>
                        </td>
                      </tr>
                    );
                  }

                  return filteredStudents.map((student, index) => (
                    <tr key={student.id || index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b">
                        {getStudentDisplayName(student)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          placeholder="Enter marks or -"
                          className="w-full border px-2 py-1 rounded"
                          value={studentMarks.find(m => m.studentId === student.id)?.mark || ''}
                          onChange={(e) => handleMarkChange(student.id, e.target.value)}
                        />
                      </td>
                    </tr>
                  ));
                })()
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    Please select a class to view students.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Marks'}
          </button>
        </div>
      </form>
    </div>
  );
}
