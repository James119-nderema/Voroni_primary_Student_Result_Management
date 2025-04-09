import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchDaySummary } from '../Services/dashboardService'; // Import the fetchDaySummary function

const DailyUtilizationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const summaryData = await fetchDaySummary(); // Fetch data from the API
      setData(summaryData); // Update the state with the fetched data
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Resource Usage</h3>
        <p className="text-sm text-gray-500">
          This chart shows the daily distribution of lecturers, classes, and room utilization across the week.
          Higher bars indicate higher resource usage for that particular day.
        </p>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 10, fill: '#000000' }} // Ensure day labels are black
              tickLine={false} 
              axisLine={{ stroke: '#d1d5db' }} 
              interval={0} // Force all days to display
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#000000' }} 
              tickLine={false} 
              axisLine={{ stroke: '#d1d5db' }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px' }} 
              itemStyle={{ fontSize: 10, color: '#000000' }} 
              labelStyle={{ fontSize: 12, color: '#000000', fontWeight: 'bold' }} 
            />
            <Legend 
              wrapperStyle={{ fontSize: 10, color: '#6b7280' }} 
              iconType="circle" 
            />
            <Bar dataKey="lecturers" name="Lecturers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="classes" name="Classes" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rooms" name="Rooms" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyUtilizationChart;