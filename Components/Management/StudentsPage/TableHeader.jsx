import React, { useState, useEffect } from 'react';

const TableHeader = ({ onSearch, onAdd, grades }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  
  // Use debounce to reduce rapid state updates when typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm, selectedGrade);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedGrade, onSearch]);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="md:flex md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Grade filter */}
          <select
            className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="">All Grades</option>
            {Array.isArray(grades) && grades.map(grade => (
              <option 
                key={grade.id || grade} 
                value={grade.name || grade}
              >
                {grade.name || grade}
              </option>
            ))}
          </select>
        </div>
        
        {/* Add button */}
        <button
          onClick={onAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center justify-center w-full md:w-auto"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
