import React from 'react';

const GradeLegend = () => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm flex flex-wrap gap-4">
      <div className="flex items-center">
        <span className="w-3 h-3 bg-green-600 rounded-full mr-1"></span>
        <span>E.E: Exceeding Expectations (&gt;70)</span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 bg-blue-600 rounded-full mr-1"></span>
        <span>M.E: Meeting Expectations (61-70)</span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 bg-yellow-600 rounded-full mr-1"></span>
        <span>A.E: Approaching Expectations (41-60)</span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 bg-red-600 rounded-full mr-1"></span>
        <span>B.E: Below Expectations (≤40)</span>
      </div>
    </div>
  );
};

export default GradeLegend;
