import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';

const StudentForm = ({ isOpen, onClose, onSubmit }) => {
  const [students, setStudents] = useState([
    {
      fullName: '',
      gender: 'Male',
      grade: 'Grade 1',
      admissionNumber: '',
      upiNumber: '',
      birthCertificateNumber: ''
    }
  ]);

  // Create grade options from 1 to 9
  const gradeOptions = Array.from({ length: 9 }, (_, i) => `Grade ${i + 1}`);
  
  // Gender options
  const genderOptions = ['Male', 'Female'];

  const handleInputChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const addStudentForm = () => {
    setStudents([
      ...students,
      {
        fullName: '',
        gender: 'Male',
        grade: 'Grade 1',
        admissionNumber: '',
        upiNumber: '',
        birthCertificateNumber: ''
      }
    ]);
  };

  const removeStudentForm = (index) => {
    if (students.length === 1) return;
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(students);
    setStudents([{
      fullName: '',
      gender: 'Male',
      grade: 'Grade 1',
      admissionNumber: '',
      upiNumber: '',
      birthCertificateNumber: ''
    }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {students.length > 1 ? 'Add Students' : 'Add Student'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {students.map((student, index) => (
            <div 
              key={index} 
              className="mb-6 p-4 bg-gray-50 rounded-lg relative animate-fadeIn"
            >
              {students.length > 1 && (
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => removeStudentForm(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              )}
              
              {students.length > 1 && (
                <div className="mb-4 font-medium text-gray-700">Student {index + 1}</div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={student.fullName}
                    onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={student.gender}
                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {genderOptions.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={student.grade}
                    onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admission Number
                  </label>
                  <input
                    type="text"
                    value={student.admissionNumber}
                    onChange={(e) => handleInputChange(index, 'admissionNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI Number
                  </label>
                  <input
                    type="text"
                    value={student.upiNumber}
                    onChange={(e) => handleInputChange(index, 'upiNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Birth Certificate Number
                  </label>
                  <input
                    type="text"
                    value={student.birthCertificateNumber}
                    onChange={(e) => handleInputChange(index, 'birthCertificateNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={addStudentForm}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Another Student
            </button>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;