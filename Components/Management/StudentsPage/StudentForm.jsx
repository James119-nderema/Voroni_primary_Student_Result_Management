import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, grades, onSubmit, onClose }) => {
  const emptyStudent = {
    fullName: '',
    gender: '',
    grade: '',
    admissionNumber: '',
    upiNumber: '',
    birthCertificateNumber: ''
  };
  
  const [isEditMode] = useState(!!student);
  const [students, setStudents] = useState([emptyStudent]);
  const [singleStudent, setSingleStudent] = useState(emptyStudent);
  const [errors, setErrors] = useState([{}]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (student) {
      setSingleStudent({
        fullName: student.fullName || '',
        gender: student.gender || '',
        grade: student.grade || '',
        admissionNumber: student.admissionNumber || '',
        upiNumber: student.upiNumber || '',
        birthCertificateNumber: student.birthCertificateNumber || ''
      });
    }
  }, [student]);
  
  const handleSingleStudentChange = (e) => {
    const { name, value } = e.target;
    setSingleStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleMultipleStudentChange = (index, e) => {
    const { name, value } = e.target;
    setStudents(prev => {
      const newStudents = [...prev];
      newStudents[index] = {
        ...newStudents[index],
        [name]: value
      };
      return newStudents;
    });
    
    if (errors[index] && errors[index][name]) {
      setErrors(prev => {
        const newErrors = [...prev];
        if (newErrors[index]) {
          newErrors[index] = {
            ...newErrors[index],
            [name]: ''
          };
        }
        return newErrors;
      });
    }
  };
  
  const addAnotherStudent = () => {
    if (validateStudent(students[currentIndex], currentIndex)) {
      setStudents(prev => [...prev, {...emptyStudent}]);
      setErrors(prev => [...prev, {}]);
      setCurrentIndex(students.length);
    }
  };
  
  const removeStudent = (index) => {
    if (students.length > 1) {
      setStudents(prev => prev.filter((_, i) => i !== index));
      setErrors(prev => prev.filter((_, i) => i !== index));
      if (currentIndex >= index && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };
  
  const validateStudent = (studentData, index) => {
    const newErrors = {...errors[index]} || {};
    let isValid = true;
    
    if (!studentData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    
    if (!studentData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    
    if (!studentData.grade) {
      newErrors.grade = 'Grade is required';
      isValid = false;
    }
    
    if (!studentData.admissionNumber.trim()) {
      newErrors.admissionNumber = 'Admission number is required';
      isValid = false;
    }
    
    if (!studentData.upiNumber.trim()) {
      newErrors.upiNumber = 'UPI number is required';
      isValid = false;
    }
    
    if (!studentData.birthCertificateNumber.trim()) {
      newErrors.birthCertificateNumber = 'Birth certificate number is required';
      isValid = false;
    }
    
    setErrors(prev => {
      const newErrorsArray = [...prev];
      newErrorsArray[index] = newErrors;
      return newErrorsArray;
    });
    
    return isValid;
  };
  
  const validateAllStudents = () => {
    let allValid = true;
    
    students.forEach((student, index) => {
      const isStudentValid = validateStudent(student, index);
      if (!isStudentValid) {
        allValid = false;
      }
    });
    
    return allValid;
  };
  
  const validateSingleStudent = () => {
    const newErrors = {};
    let isValid = true;
    
    if (!singleStudent.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    
    if (!singleStudent.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    
    if (!singleStudent.grade) {
      newErrors.grade = 'Grade is required';
      isValid = false;
    }
    
    if (!singleStudent.admissionNumber.trim()) {
      newErrors.admissionNumber = 'Admission number is required';
      isValid = false;
    }
    
    if (!singleStudent.upiNumber.trim()) {
      newErrors.upiNumber = 'UPI number is required';
      isValid = false;
    }
    
    if (!singleStudent.birthCertificateNumber.trim()) {
      newErrors.birthCertificateNumber = 'Birth certificate number is required';
      isValid = false;
    }
    
    setErrors([newErrors]);
    
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      if (validateSingleStudent()) {
        onSubmit(singleStudent);
      }
    } else {
      if (validateAllStudents()) {
        onSubmit(students);
      }
    }
  };
  
  const renderStudentForm = (studentData, index) => {
    const currentErrors = errors[index] || {};
    
    return (
      <div key={index} className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Student {index + 1}
          </h3>
          {students.length > 1 && (
            <button
              type="button"
              onClick={() => removeStudent(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={studentData.fullName}
              onChange={(e) => handleMultipleStudentChange(index, e)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                currentErrors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {currentErrors.fullName && (
              <p className="mt-1 text-sm text-red-500">{currentErrors.fullName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={studentData.gender}
              onChange={(e) => handleMultipleStudentChange(index, e)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                currentErrors.gender ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {currentErrors.gender && (
              <p className="mt-1 text-sm text-red-500">{currentErrors.gender}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grade
            </label>
            <select
              name="grade"
              value={studentData.grade}
              onChange={(e) => handleMultipleStudentChange(index, e)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                currentErrors.grade ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Grade</option>
              {grades.map(grade => (
                <option key={grade.id || grade} value={grade.name || grade}>
                  {grade.name || grade}
                </option>
              ))}
            </select>
            {currentErrors.grade && (
              <p className="mt-1 text-sm text-red-500">{currentErrors.grade}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admission Number
            </label>
            <input
              type="text"
              name="admissionNumber"
              value={studentData.admissionNumber}
              onChange={(e) => handleMultipleStudentChange(index, e)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                currentErrors.admissionNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {currentErrors.admissionNumber && (
              <p className="mt-1 text-sm text-red-500">{currentErrors.admissionNumber}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              UPI Number
            </label>
            <input
              type="text"
              name="upiNumber"
              value={studentData.upiNumber}
              onChange={(e) => handleMultipleStudentChange(index, e)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                currentErrors.upiNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {currentErrors.upiNumber && (
              <p className="mt-1 text-sm text-red-500">{currentErrors.upiNumber}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birth Certificate Number
            </label>
            <input
              type="text"
              name="birthCertificateNumber"
              value={studentData.birthCertificateNumber}
              onChange={(e) => handleMultipleStudentChange(index, e)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                currentErrors.birthCertificateNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {currentErrors.birthCertificateNumber && (
              <p className="mt-1 text-sm text-red-500">{currentErrors.birthCertificateNumber}</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  const renderSingleStudentForm = () => {
    const currentErrors = errors[0] || {};
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={singleStudent.fullName}
            onChange={handleSingleStudentChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              currentErrors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {currentErrors.fullName && (
            <p className="mt-1 text-sm text-red-500">{currentErrors.fullName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={singleStudent.gender}
            onChange={handleSingleStudentChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              currentErrors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {currentErrors.gender && (
            <p className="mt-1 text-sm text-red-500">{currentErrors.gender}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grade
          </label>
          <select
            name="grade"
            value={singleStudent.grade}
            onChange={handleSingleStudentChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              currentErrors.grade ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Grade</option>
            {grades.map(grade => (
              <option key={grade.id || grade} value={grade.name || grade}>
                {grade.name || grade}
              </option>
            ))}
          </select>
          {currentErrors.grade && (
            <p className="mt-1 text-sm text-red-500">{currentErrors.grade}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Admission Number
          </label>
          <input
            type="text"
            name="admissionNumber"
            value={singleStudent.admissionNumber}
            onChange={handleSingleStudentChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              currentErrors.admissionNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {currentErrors.admissionNumber && (
            <p className="mt-1 text-sm text-red-500">{currentErrors.admissionNumber}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            UPI Number
          </label>
          <input
            type="text"
            name="upiNumber"
            value={singleStudent.upiNumber}
            onChange={handleSingleStudentChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              currentErrors.upiNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {currentErrors.upiNumber && (
            <p className="mt-1 text-sm text-red-500">{currentErrors.upiNumber}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birth Certificate Number
          </label>
          <input
            type="text"
            name="birthCertificateNumber"
            value={singleStudent.birthCertificateNumber}
            onChange={handleSingleStudentChange}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              currentErrors.birthCertificateNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {currentErrors.birthCertificateNumber && (
            <p className="mt-1 text-sm text-red-500">{currentErrors.birthCertificateNumber}</p>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditMode ? 'Edit Student' : 'Add New Student(s)'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isEditMode ? (
            renderSingleStudentForm()
          ) : (
            <>
              <div className="space-y-6">
                {students.map((student, index) => renderStudentForm(student, index))}
              </div>
              
              <div className="mt-4">
                <button
                  type="button"
                  onClick={addAnotherStudent}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Student
                </button>
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditMode ? 'Update' : 'Save All'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
