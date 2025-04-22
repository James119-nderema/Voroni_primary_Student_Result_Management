import React from 'react';
import { format } from 'date-fns';
import { getGrade, gradeBackgroundColors } from './utils/GradeUtils';

const MobileCardView = ({ 
  currentCards, 
  students, 
  renderMarkWithGrade, 
  handleEditClick, 
  cardsPerPage, 
  handleCardsPerPageChange,
  filteredData,
  PaginationComponent, // Replace PaginationControls prop with PaginationComponent
  totalPages,
  resultsRef 
}) => {
  return (
    <div ref={resultsRef} className="lg:hidden mt-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-700">Student Results</h2>
        <div className="flex items-center">
          <label htmlFor="cardsPerPage" className="mr-2 text-sm text-gray-600">Display:</label>
          <select
            id="cardsPerPage"
            value={cardsPerPage}
            onChange={handleCardsPerPageChange}
            className="border border-gray-300 p-1 text-sm rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </select>
        </div>
      </div>

      {filteredData.length > cardsPerPage && (
        <div className="mb-4">
          {PaginationComponent}
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 14a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
          <p>No data available for the selected filters.</p>
          <p className="text-sm mt-1">Try selecting different filters or clearing them.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentCards.map((mark) => {
              const student = students[mark.student];
              const name = student
                ? `${student.first_name} ${student.last_name}`
                : "Unknown";
              const className = student ? student.class_name : "Unknown";
              
              const subjectMarks = [
                mark.math_marks,
                mark.english_marks,
                mark.kiswahili_marks,
                mark.science_marks,
                mark.sst_marks
              ].filter(m => m !== null && m !== undefined);
              const avgMark = subjectMarks.length > 0 
                ? subjectMarks.reduce((sum, curr) => sum + curr, 0) / subjectMarks.length 
                : 0;
              const avgGrade = getGrade(avgMark);
              const gradeColor = gradeBackgroundColors[avgGrade] || "bg-gray-100 border-gray-500";

              return (
                <div 
                  key={mark.id} 
                  className={`bg-white rounded-lg shadow-md border-l-4 ${gradeColor} overflow-hidden`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">{className}</span>
                        <button
                          onClick={() => handleEditClick(mark.student)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      {[
                        { label: 'Math', value: mark.math_marks },
                        { label: 'English', value: mark.english_marks },
                        { label: 'Kiswahili', value: mark.kiswahili_marks },
                        { label: 'Science', value: mark.science_marks },
                        { label: 'SST', value: mark.sst_marks },
                        { label: 'Total', value: mark.total_marks, isTotal: true }
                      ].map((subject, idx) => (
                        <div key={idx} className="p-2 bg-gray-50 rounded">
                          <span className="text-gray-500 block mb-1">{subject.label}:</span>
                          {subject.isTotal ? (
                            <span className="font-bold">{subject.value}</span>
                          ) : (
                            renderMarkWithGrade(subject.value)
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between items-center text-xs">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-1 ${gradeColor.includes('green') ? 'bg-green-600' : gradeColor.includes('blue') ? 'bg-blue-600' : gradeColor.includes('yellow') ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
                        <span>{avgGrade} Average</span>
                      </div>
                      <span className="text-gray-500">
                        {mark.submission_date
                          ? format(new Date(mark.submission_date), "yyyy-MM-dd")
                          : "No Date"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredData.length > cardsPerPage && (
            <div className="mt-6">
              {PaginationComponent}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileCardView;
