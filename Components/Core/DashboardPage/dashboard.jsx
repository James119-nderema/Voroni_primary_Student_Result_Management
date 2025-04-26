import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Users, GraduationCap, BookOpen, Award, TrendingUp, 
  Calendar, School, BarChart2, Target, Percent 
} from 'lucide-react';
import StudentService from '../../Services/StudentService';  // Corrected import path

// Mock data - in a real application, this would come from an API
const generateMockData = () => {
  const subjects = ['Math', 'Science', 'English', 'History', 'Art'];
  const grades = ['E.E', 'M.E', 'A.P', 'B.E', 'F'];
  const classes = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5','Grade 6', 'Grade 7', 'Grade 8','Grade 9'];
  
  // Subject performance data
  const subjectPerformance = subjects.map(subject => ({
    name: subject,
    averageScore: Math.floor(Math.random() * 30) + 70,
    passRate: Math.floor(Math.random() * 20) + 80,
  }));
  
  // Grade distribution data
  const gradeDistribution = grades.map(grade => ({
    name: grade,
    count: Math.floor(Math.random() * 100) + 50,
  }));
  
  // Class comparison data
  const classComparison = classes.map(className => ({
    name: className,
    averageScore: Math.floor(Math.random() * 30) + 70,
  }));
  
  // Monthly performance trend
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const performanceTrend = months.map(month => ({
    name: month,
    averageScore: Math.floor(Math.random() * 15) + 75,
  }));
  
  // Attendance vs Performance
  const attendancePerformance = classes.map(className => ({
    name: className,
    attendance: Math.floor(Math.random() * 15) + 85,
    performance: Math.floor(Math.random() * 20) + 75,
  }));
  
  return {
    subjectPerformance,
    gradeDistribution,
    classComparison,
    performanceTrend,
    attendancePerformance
  };
};

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-md rounded border border-gray-200">
        <p className="font-medium text-gray-700">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('term');
  const [studentCount, setStudentCount] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // First get mock data
        const mockData = generateMockData();
        setData(mockData);

        // Then fetch the student count separately
        const count = await StudentService.getStudentCount();
        setStudentCount(count);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setError('Failed to load data');
        setStudentCount(0); // Fallback to 0 instead of 'N/A'
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeframe]);

  const timeframeOptions = ['week', 'month', 'term', 'year'];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-xl text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <School className="text-indigo-600 dark:text-indigo-400" size={32} />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Student Performance Dashboard</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-2">Comprehensive analysis of student performance metrics</p>
        
        {/* Timeframe selector */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Calendar className="text-gray-500 dark:text-gray-400" size={20} />
          <span className="text-gray-700 dark:text-gray-300">Timeframe:</span>
          <div className="flex flex-wrap gap-2">
            {timeframeOptions.map(option => (
              <button
                key={option}
                onClick={() => setTimeframe(option)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full ${
                  timeframe === option 
                    ? "bg-indigo-600 dark:bg-indigo-500 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Key metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow flex items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
            <Users className="text-blue-500 dark:text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Students</p>
            <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
              {studentCount === null ? 'Loading...' : studentCount}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow flex items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
            <Award className="text-green-500 dark:text-green-400" size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Average GPA</p>
            <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">3.6</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow flex items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-3">
            <Percent className="text-yellow-500 dark:text-yellow-400" size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pass Rate</p>
            <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">92%</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow flex items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
            <Target className="text-purple-500 dark:text-purple-400" size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Performance Index</p>
            <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">87.3</p>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Subject Performance Chart */}
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <BookOpen className="text-indigo-500 dark:text-indigo-400 mr-2" size={20} />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">Performance by Subject</h2>
          </div>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.subjectPerformance}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="averageScore" name="Average Score" fill="#4f46e5" />
                <Bar dataKey="passRate" name="Pass Rate %" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Grade Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <GraduationCap className="text-indigo-500 dark:text-indigo-400 mr-2" size={20} />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">Grade Distribution</h2>
          </div>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.gradeDistribution}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Number of Students" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Class Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <BarChart2 className="text-indigo-500 dark:text-indigo-400 mr-2" size={20} />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">Performance by Class</h2>
          </div>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.classComparison}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="averageScore" name="Average Score" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Performance Trend Chart */}
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-indigo-500 dark:text-indigo-400 mr-2" size={20} />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">Performance Trend</h2>
          </div>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.performanceTrend}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="averageScore" name="Average Score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Attendance vs Performance */}
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <Users className="text-indigo-500 dark:text-indigo-400 mr-2" size={20} />
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">Attendance vs Performance</h2>
        </div>
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.attendancePerformance}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="attendance" name="Attendance %" fill="#06b6d4" />
              <Bar dataKey="performance" name="Performance Score" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8">
        <p>© {new Date().getFullYear()} School Analytics Dashboard. All data is simulated for demonstration purposes.</p>
      </div>
    </div>
  );
}