import React from 'react';
import { getGrade, GradeColorMap } from './utils/GradeUtils';

const ResultsView = ({ filteredData, currentCards, students, onEditClick }) => {
  const renderMarkWithGrade = (mark) => {
    if (mark === null || mark === undefined) return "N/A";
    const grade = getGrade(mark);
    const colorClass = GradeColorMap[grade] || "";
    return (
      <span className={colorClass}>
        {mark} {grade}
      </span>
    );
  };

  const EmptyStateMessage = () => (
    <div className="flex flex-col items-center py-8 text-gray-500">
      <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 14a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
      <span>No data available for the selected filters.</span>
      <span className="text-sm mt-1">Try selecting different filters or clearing them.</span>
    </div>
  );

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white shadow-md rounded-lg transition-all duration-300 mb-4">
        <div className="w-full overflow-x-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-2 text-left w-[18%]">Student Name</th>
                <th className="py-3 px-2 text-center w-[12%]">Math</th>
                <th className="py-3 px-2 text-center w-[12%]">English</th>
                <th className="py-3 px-2 text-center w-[12%]">Kiswahili</th>
                <th className="py-3 px-2 text-center w-[12%]">Science</th>
                <th className="py-3 px-2 text-center w-[12%]">SST</th>
                <th className="py-3 px-2 text-center w-[12%]">Total</th>
                <th className="py-3 px-2 text-center w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="border-b">
                    <EmptyStateMessage />
                  </td>
                </tr>
              ) : (
                filteredData.map((mark, index) => {
                  const student = students[mark.student];
                  const name = student ? `${student.first_name} ${student.last_name}` : "Unknown";
                  return (
                    <tr key={mark.id} className={`border-b hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="py-3 px-2 font-medium text-gray-800">
                        <div className="truncate">{name}</div>
                      </td>
                      <td className="py-3 px-2 text-center">{renderMarkWithGrade(mark.math_marks)}</td>
                      <td className="py-3 px-2 text-center">{renderMarkWithGrade(mark.english_marks)}</td>
                      <td className="py-3 px-2 text-center">{renderMarkWithGrade(mark.kiswahili_marks)}</td>
                      <td className="py-3 px-2 text-center">{renderMarkWithGrade(mark.science_marks)}</td>
                      <td className="py-3 px-2 text-center">{renderMarkWithGrade(mark.sst_marks)}</td>
                      <td className="py-3 px-2 text-center font-bold">{mark.total_marks}</td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => onEditClick(mark.student)}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentCards.length === 0 ? (
          <div className="bg-white shadow-md rounded p-4 text-center">
            <EmptyStateMessage />
          </div>
        ) : (
          currentCards.map((mark) => {
            const student = students[mark.student];
            const name = student ? `${student.first_name} ${student.last_name}` : "Unknown";
            return (
              <div key={mark.id} className="bg-white shadow-md rounded p-4">
                <div className="mb-2 pb-2 border-b border-gray-200">
                  <p className="font-bold truncate">{name}</p>
                  <p className="text-sm text-gray-600">{student?.class_name}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Math:</span>
                    {renderMarkWithGrade(mark.math_marks)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">English:</span>
                    {renderMarkWithGrade(mark.english_marks)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Kiswahili:</span>
                    {renderMarkWithGrade(mark.kiswahili_marks)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Science:</span>
                    {renderMarkWithGrade(mark.science_marks)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">SST:</span>
                    {renderMarkWithGrade(mark.sst_marks)}
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">{mark.total_marks}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => onEditClick(mark.student)}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default ResultsView;
