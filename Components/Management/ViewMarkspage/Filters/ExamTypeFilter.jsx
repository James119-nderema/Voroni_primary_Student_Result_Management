import React from 'react';

const ExamTypeFilter = ({ selectedExamType, onExamTypeChange }) => {
  const examTypes = [
    { value: '', label: 'All Exams' },
    { value: 'Exam 1', label: 'Exam 1' },
    { value: 'Exam 2', label: 'Exam 2' },
    { value: 'Exam 3', label: 'Exam 3' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Exam Type
      </label>
      <select
        value={selectedExamType}
        onChange={(e) => onExamTypeChange(e.target.value)}
        className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        {examTypes.map((examType) => (
          <option key={examType.value} value={examType.value}>
            {examType.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExamTypeFilter;
