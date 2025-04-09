import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

const TimetableResourceAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9921/timetable/performance');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch performance data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const chartData = data.map(item => ({
    ...item,
    formattedTimestamp: formatDate(item.timestamp)
  })).reverse();

  const summaryStats = data.length ? {
    avgRoomsUsed: (data.reduce((sum, item) => sum + item.roomsUsed, 0) / data.length).toFixed(2),
    avgLecturersAssigned: (data.reduce((sum, item) => sum + item.lecturersAssigned, 0) / data.length).toFixed(2),
    avgTimeTaken: (data.reduce((sum, item) => sum + item.timeTaken, 0) / data.length).toFixed(2),
    totalGenerations: data.length
  } : {};

  const getPerformanceTrend = () => {
    if (chartData.length < 2) return { rooms: 0, lecturers: 0, time: 0 };
    
    const current = chartData[0];
    const previous = chartData[1];
    
    return {
      rooms: current.roomsUsed - previous.roomsUsed,
      lecturers: current.lecturersAssigned - previous.lecturersAssigned,
      time: current.timeTaken - previous.timeTaken,
    };
  };

  const trend = data.length >= 2 ? getPerformanceTrend() : { rooms: 0, lecturers: 0, time: 0 };

  const resourceDistribution = [
    { name: 'Rooms', value: data.length ? data[0].roomsUsed : 0 },
    { name: 'Lecturers', value: data.length ? data[0].lecturersAssigned : 0 },
  ];

  const COLORS = ['#4f46e5', '#059669', '#ea580c', '#8b5cf6'];
  
  const formatDateForChart = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const simplifiedChartData = data.map(item => ({
    id: item.id,
    date: formatDateForChart(item.timestamp),
    roomsUsed: item.roomsUsed,
    lecturersAssigned: item.lecturersAssigned,
    timeTaken: item.timeTaken / 1000, // Convert to seconds
    totalResources: item.roomsUsed + item.lecturersAssigned,
  })).reverse();

  // Custom tooltip component for the combined chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded  text-xs">
          <p className="font-medium">{`Generation at ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(entry.dataKey === 'timeTaken' ? 2 : 0)}${entry.dataKey === 'timeTaken' ? 's' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Performance trend explanation
  const trendExplanation = "Performance trend shows the change between the last two generations. Negative values represent improvements (less resources or time taken).";

  // Calculate correlations and best/worst metrics
  const calculateInsights = () => {
    if (data.length < 2) return { correlations: null, best: null, worst: null, efficient: null };
    
    // Find best (minimum) and worst (maximum) time generations
    const sortedByTime = [...data].sort((a, b) => a.timeTaken - b.timeTaken);
    const best = sortedByTime[0];
    const worst = sortedByTime[sortedByTime.length - 1];
    
    // Calculate correlation between resources and time
    // Using simplified correlation calculation
    const resourceTimeCorrelation = calculateCorrelation(
      data.map(item => item.roomsUsed + item.lecturersAssigned),
      data.map(item => item.timeTaken)
    );
    
    // Find most efficient generation (most timetable entries with least resources and time)
    // Assuming that lower id = more entries for simplicity
    // In a real scenario, you might need a proper 'entriesCount' field
    const efficiency = data.map(item => ({
      ...item,
      // Lower is better for this score (normalized resources and time)
      efficiencyScore: (item.roomsUsed + item.lecturersAssigned) * item.timeTaken
    }));
    
    const mostEfficient = efficiency.reduce((best, current) => 
      current.efficiencyScore < best.efficiencyScore ? current : best, efficiency[0]);
    
    return {
      correlations: {
        resourceTime: resourceTimeCorrelation,
        trend: resourceTimeCorrelation > 0.5 ? 'More resources leads to longer generation time' :
              resourceTimeCorrelation < -0.5 ? 'More resources leads to shorter generation time' :
              'No clear correlation between resources and time'
      },
      best,
      worst,
      efficient: mostEfficient
    };
  };
  
  // Simple correlation calculation
  const calculateCorrelation = (x, y) => {
    const n = x.length;
    if (n < 2) return 0;
    
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
  };

  const insights = data.length ? calculateInsights() : null;

  if (loading) return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="w-full p-4 bg-red-50 text-red-600 rounded-lg">
      {error}
    </div>
  );

  if (!data.length) return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[95%] mx-auto">
        <div className="bg-white rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Timetable Generation Analytics</h2>
          <div className="py-12">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No data available</h3>
            <p className="mt-2 text-sm text-gray-600">No timetable generation data has been recorded yet. After generating timetables, performance metrics will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[95%] mx-auto space-y-6">
        <div className="bg-white  rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Timetable Generation Analytics</h2>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Combined Line Chart */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <h3 className="text-base font-semibold text-gray-700 mb-4">Performance Metrics Over Time</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={simplifiedChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 10 }}
                    domain={['dataMin - 5', 'dataMax + 5']}
                    label={{ value: 'Resources', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 10 } }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10 }}
                    domain={['dataMin - 0.5', 'dataMax + 0.5']}
                    tickFormatter={(value) => `${value}s`}
                    label={{ value: 'Time (s)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 10 } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="roomsUsed" 
                    stroke="#4f46e5" 
                    strokeWidth={2}
                    dot={{ fill: '#4f46e5', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Rooms"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="lecturersAssigned" 
                    stroke="#059669" 
                    strokeWidth={2}
                    dot={{ fill: '#059669', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Lecturers"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="timeTaken" 
                    stroke="#ea580c" 
                    strokeWidth={2}
                    dot={{ fill: '#ea580c', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Time (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {insights && insights.correlations && (
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-700 mb-4">Resource vs Time Insight</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="bg-indigo-50 p-3 rounded-lg mb-3">
                      <span className="block text-sm font-medium text-indigo-800">Resource-Time Correlation</span>
                      <span className="text-lg font-bold text-indigo-700">{insights.correlations.resourceTime.toFixed(2)}</span>
                      <p className="mt-1 text-xs text-indigo-600">{insights.correlations.trend}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Correlation ranges from -1 to 1. Values close to 1 indicate that using more resources increases generation time,
                      while values close to -1 suggest that more resources lead to faster generation. Values near 0 show no clear pattern.
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="block text-sm font-medium text-gray-800">Performance Trend Explanation</span>
                      <p className="mt-1 text-xs text-gray-600">{trendExplanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {data.length >= 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Best Performance Card */}
              {insights && insights.best && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <h3 className="text-base font-semibold text-green-800 mb-3">Best Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-green-700">Generation ID:</span>
                      <span className="text-sm font-semibold text-green-800">{insights.best.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-green-700">Time Taken:</span>
                      <span className="text-sm font-semibold text-green-800">{(insights.best.timeTaken / 1000).toFixed(2)}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-green-700">Resources Used:</span>
                      <span className="text-sm font-semibold text-green-800">
                        {insights.best.roomsUsed + insights.best.lecturersAssigned} (R: {insights.best.roomsUsed}, L: {insights.best.lecturersAssigned})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-green-700">Date:</span>
                      <span className="text-sm font-semibold text-green-800">{new Date(insights.best.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Worst Performance Card */}
              {insights && insights.worst && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <h3 className="text-base font-semibold text-red-800 mb-3">Slowest Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-red-700">Generation ID:</span>
                      <span className="text-sm font-semibold text-red-800">{insights.worst.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-red-700">Time Taken:</span>
                      <span className="text-sm font-semibold text-red-800">{(insights.worst.timeTaken / 1000).toFixed(2)}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-red-700">Resources Used:</span>
                      <span className="text-sm font-semibold text-red-800">
                        {insights.worst.roomsUsed + insights.worst.lecturersAssigned} (R: {insights.worst.roomsUsed}, L: {insights.worst.lecturersAssigned})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-red-700">Date:</span>
                      <span className="text-sm font-semibold text-red-800">{new Date(insights.worst.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Most Efficient Generation */}
              {insights && insights.efficient && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h3 className="text-base font-semibold text-blue-800 mb-3">Most Efficient Generation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-700">Generation ID:</span>
                      <span className="text-sm font-semibold text-blue-800">{insights.efficient.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-700">Time Taken:</span>
                      <span className="text-sm font-semibold text-blue-800">{(insights.efficient.timeTaken / 1000).toFixed(2)}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-700">Resources Used:</span>
                      <span className="text-sm font-semibold text-blue-800">
                        {insights.efficient.roomsUsed + insights.efficient.lecturersAssigned} (R: {insights.efficient.roomsUsed}, L: {insights.efficient.lecturersAssigned})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-700">Efficiency Score:</span>
                      <span className="text-sm font-semibold text-blue-800">
                        {(insights.efficient.efficiencyScore / 1000).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {data.length >= 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                <h3 className="text-base font-semibold text-gray-700 mb-4">Latest Performance</h3>
                {data.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rooms:</span>
                      <span className="text-xl font-bold text-indigo-600">{data[0].roomsUsed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Lecturers:</span>
                      <span className="text-xl font-bold text-emerald-600">{data[0].lecturersAssigned}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time:</span>
                      <span className="text-xl font-bold text-orange-600">{(data[0].timeTaken / 1000).toFixed(2)}s</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                <h3 className="text-base font-semibold text-gray-700 mb-4">Performance Trend</h3>
                <p className="text-xs text-gray-600 mb-2">{trendExplanation}</p>
                {data.length >= 2 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rooms:</span>
                      <span className={`text-xl font-bold ${trend.rooms > 0 ? 'text-red-500' : trend.rooms < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                        {trend.rooms > 0 ? `+${trend.rooms}` : trend.rooms}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Lecturers:</span>
                      <span className={`text-xl font-bold ${trend.lecturers > 0 ? 'text-red-500' : trend.lecturers < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                        {trend.lecturers > 0 ? `+${trend.lecturers}` : trend.lecturers}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time:</span>
                      <span className={`text-xl font-bold ${trend.time > 0 ? 'text-red-500' : trend.time < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                        {trend.time > 0 ? `+${(trend.time / 1000).toFixed(2)}s` : `${(trend.time / 1000).toFixed(2)}s`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-indigo-50 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-indigo-800">Avg Rooms Used</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">{summaryStats.avgRoomsUsed}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-emerald-800">Avg Lecturers</h3>
            <p className="text-2xl font-bold text-emerald-600 mt-2">{summaryStats.avgLecturersAssigned}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-orange-800">Avg Time (ms)</h3>
            <p className="text-2xl font-bold text-orange-600 mt-2">{summaryStats.avgTimeTaken}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-purple-800">Total Generations</h3>
            <p className="text-2xl font-bold text-purple-600 mt-2">{summaryStats.totalGenerations}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-gray-800">Generation History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-sm text-gray-600 font-semibold">ID</th>
                  <th className="p-3 text-left text-sm text-gray-600 font-semibold">Timestamp</th>
                  <th className="p-3 text-left text-sm text-gray-600 font-semibold">Rooms</th>
                  <th className="p-3 text-left text-sm text-gray-600 font-semibold">Lecturers</th>
                  <th className="p-3 text-left text-sm text-gray-600 font-semibold">Time (ms)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-sm text-gray-800">{item.id}</td>
                    <td className="p-3 text-sm text-gray-800">{formatDate(item.timestamp)}</td>
                    <td className="p-3 text-sm text-gray-800">{item.roomsUsed}</td>
                    <td className="p-3 text-sm text-gray-800">{item.lecturersAssigned}</td>
                    <td className="p-3 text-sm text-gray-800">{item.timeTaken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableResourceAnalysis;