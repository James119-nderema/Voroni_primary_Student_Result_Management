import React from 'react';

const GradeFilter = ({ grades, selectedGrade, onGradeChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Grade
      </label>
      <select
        value={selectedGrade}
        onChange={(e) => onGradeChange(e.target.value)}
        className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        <option value="">All Grades</option>
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeFilter;
