import React from 'react';

const TermFilter = ({ selectedTerm, onTermChange }) => {
  const terms = [
    { value: '', label: 'All Terms' },
    { value: 'Term 1', label: 'Term 1' },
    { value: 'Term 2', label: 'Term 2' },
    { value: 'Term 3', label: 'Term 3' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Term
      </label>
      <select
        value={selectedTerm}
        onChange={(e) => onTermChange(e.target.value)}
        className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        {terms.map((term) => (
          <option key={term.value} value={term.value}>
            {term.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TermFilter;
