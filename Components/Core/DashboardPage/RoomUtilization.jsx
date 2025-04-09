import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Resource Utilization Pie Chart
const RoomUtilizationChart = ({ data = [] }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Custom label rendering
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Format tooltip content
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-gray-700">{`Count: ${payload[0].value}`}</p>
          <p className="text-gray-700">{`Percentage: ${((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">Resource Utilization</h3>

      {data.length > 0 ? (
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div
                  className="w-4 h-4 mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-700">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No utilization data available</p>
        </div>
      )}
    </div>
  );
};

export default RoomUtilizationChart;