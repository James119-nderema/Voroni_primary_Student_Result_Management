import React, { useEffect, useState } from 'react';
import DailyUtilizationChart from './DailyUtilizationChart';
import StatCards from './StatCards';
import { 
  fetchTodaysSchedules, 
  fetchTotalClasses, 
  fetchActiveLecturers, 
  fetchTotalRooms, 
  fetchTotalTimetables,
  fetchResourceUtilization
} from "../../Services/dashboardService";

import { 
  Calendar, 
  Clock,
  Bell,
  BarChart2,
  PieChart,
  LogOut,
  UserCircle,
  ChevronDown
} from 'lucide-react';

import Schedules from './Schedules';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    schedules: [],
    totalClasses: 0,
    activeLecturers: 0,
    totalRooms: 0,
    totalTimetables: 0,
    resourceUtilization: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Load user data from local storage
    const storedFirstName = localStorage.getItem('firstName') || 'User';
    const storedLastName = localStorage.getItem('lastName') || '';
    console.log('Retrieved from localStorage:', { storedFirstName, storedLastName });
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);

  const handleLogout = () => {
    // Clear local storage and redirect to login page
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    window.location.href = '/login';
  };

  useEffect(() => {
    // Set current date
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));

    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const [
          classes, 
          lecturers, 
          rooms, 
          timetables, 
          schedulesData,
          utilizationData
        ] = await Promise.all([
          fetchTotalClasses(),
          fetchActiveLecturers(),
          fetchTotalRooms(),
          fetchTotalTimetables(),
          fetchTodaysSchedules(),
          fetchResourceUtilization()
        ]);

        setDashboardData({
          schedules: schedulesData,
          totalClasses: classes,
          activeLecturers: lecturers,
          totalRooms: rooms,
          totalTimetables: timetables,
          resourceUtilization: utilizationData
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-medium text-gray-800">{currentDate}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <span className="text-sm font-medium">
                  {firstName.charAt(0)}{lastName.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-700 hidden md:block">
                {firstName} {lastName}
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
              
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)]">
        {/* Stat Cards */}
        <div className="flex-grow">
          <StatCards dashboardData={dashboardData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col flex-grow">
            <Schedules schedules={dashboardData.schedules} />
          </div>

          {/* Daily Utilization */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Daily Utilization</h3>
              <div className="flex space-x-2">
                <button className="p-1 rounded hover:bg-gray-100">
                  <BarChart2 size={18} />
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <PieChart size={18} />
                </button>
              </div>
            </div>
            <DailyUtilizationChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;