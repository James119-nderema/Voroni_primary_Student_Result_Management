import React from 'react';

const FilterSection = ({
  searchTerm,
  setSearchTerm,
  filteredClass,
  setFilteredClass,
  filteredMonth,
  setFilteredMonth,
  filteredTerm,
  setFilteredTerm,
  filteredExamType,
  setFilteredExamType,
  showDownloadSection,
  setShowDownloadSection
}) => {
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleClassChange = (e) => setFilteredClass(e.target.value);
  const handleMonthChange = (e) => setFilteredMonth(e.target.value);
  const handleTermChange = (e) => setFilteredTerm(e.target.value);
  const handleExamTypeChange = (e) => setFilteredExamType(e.target.value);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Search student name..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex-1 min-w-[150px]">
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filteredClass}
          onChange={handleClassChange}
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
          <option value="Grade 9">Grade 9</option>
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filteredTerm}
          onChange={handleTermChange}
        >
          <option value="">All Terms</option>
          <option value="Term 1">Term 1</option>
          <option value="Term 2">Term 2</option>
          <option value="Term 3">Term 3</option>
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filteredExamType}
          onChange={handleExamTypeChange}
        >
          <option value="">All Exams</option>
          <option value="Exam 1">Exam 1</option>
          <option value="Exam 2">Exam 2</option>
          <option value="Exam 3">Exam 3</option>
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <input
          type="month"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filteredMonth}
          onChange={handleMonthChange}
        />
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setShowDownloadSection(!showDownloadSection)}
      >
        {showDownloadSection ? 'Hide Download' : 'Download Results'}
      </button>
    </div>
  );
};

export default FilterSection;
