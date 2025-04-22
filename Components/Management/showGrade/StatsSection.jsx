import React from 'react';

const StatsSection = ({ statsData }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-gray-500 text-sm">Total Students</h3>
      <p className="text-2xl font-bold">{statsData.totalStudents}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-gray-500 text-sm">Average Score</h3>
      <p className="text-2xl font-bold">{statsData.avgScore}%</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-gray-500 text-sm">Top Grade Rate</h3>
      <p className="text-2xl font-bold">{statsData.topGrade}%</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-gray-500 text-sm">Passing Rate</h3>
      <p className="text-2xl font-bold">{statsData.passingRate}%</p>
    </div>
  </div>
);

export default StatsSection;
