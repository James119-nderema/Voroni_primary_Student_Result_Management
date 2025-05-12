import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  pageSize, 
  totalItems, 
  setCurrentPage, 
  setPageSize 
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  return (
    <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center mb-2 sm:mb-0">
        <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="ml-3 text-sm text-gray-700">
          {`Showing ${totalItems ? (currentPage - 1) * pageSize + 1 : 0} - ${
            Math.min(currentPage * pageSize, totalItems)
          } of ${totalItems}`}
        </span>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`p-1 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="mx-2 flex space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`p-1 rounded-md ${
            currentPage === totalPages || totalPages === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
