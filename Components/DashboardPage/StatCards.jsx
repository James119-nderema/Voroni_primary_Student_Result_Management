import React from 'react';
import { BookOpen, Users, Award, Calendar } from 'lucide-react';

const StatCards = ({ dashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 h-[120px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Total Classes</p>
            <h3 className="text-3xl font-extrabold text-gray-800">{dashboardData.totalClasses}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
            <BookOpen size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 h-[120px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Active Lecturers</p>
            <h3 className="text-3xl font-extrabold text-gray-800">{dashboardData.activeLecturers}</h3>
          </div>
          <div className="p-3 rounded-lg bg-green-50 text-green-500">
            <Users size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 h-[120px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Total Rooms</p>
            <h3 className="text-3xl font-extrabold text-gray-800">{dashboardData.totalRooms}</h3>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 text-purple-500">
            <Award size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500 h-[120px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Timetables</p>
            <h3 className="text-3xl font-extrabold text-gray-800">{dashboardData.totalTimetables}</h3>
          </div>
          <div className="p-3 rounded-lg bg-red-50 text-red-500">
            <Calendar size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;