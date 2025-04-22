import React from 'react';

const PaginationSection = ({
  currentPage,
  totalPages,
  onPageChange,
  totalRecords,
  currentPageRecords
}) => {
  return (
    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
      
      <div className="text-sm text-gray-600">
        Showing {Math.min((currentPage - 1) * 5 + 1, totalRecords)} to{' '}
        {Math.min(currentPage * 5, totalRecords)} of {totalRecords}{' '}
        {totalRecords === 1 ? 'record' : 'records'}
      </div>
    </div>
  );
};

export default PaginationSection;
