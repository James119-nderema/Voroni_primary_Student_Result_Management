import React from 'react';

const HeaderControls = ({
  searchTerm,
  setSearchTerm,
  filteredClass,
  setFilteredClass,
  filteredMonth,
  setFilteredMonth,
  showDownloadSection,
  setShowDownloadSection
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Student Performance Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Student
            </label>
            <input
              type="text"
              placeholder="Enter student name..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Class
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filteredClass}
              onChange={(e) => setFilteredClass(e.target.value)}
            >
              <option value="">All Classes</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Month
            </label>
            <input
              type="month"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filteredMonth}
              onChange={(e) => setFilteredMonth(e.target.value)}
            />
          </div>

          <div className="col-span-1 flex items-end">
            <button
              onClick={() => setShowDownloadSection(!showDownloadSection)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {showDownloadSection ? 'Hide Download' : 'Download Results'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderControls;
