import React from 'react';

const PaginationControls = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div className="flex items-center justify-between px-2">
      <button 
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <button 
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
