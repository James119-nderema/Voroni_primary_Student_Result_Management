import React from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

const GradeFilter = ({ selectedGrade, setSelectedGrade }) => {
  // Generate grades from 1 to 9
  const grades = Array.from({ length: 9 }, (_, i) => i + 1);
  
  const handleGradeChange = (e) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : Number(value);
    setSelectedGrade(numericValue);
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Filter by Grade</h3>
        </div>
      </div>
      
      <div className="relative">
        <select
          value={selectedGrade === null ? '' : selectedGrade}
          onChange={handleGradeChange}
          className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Grades</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              Grade {grade}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default GradeFilter;
