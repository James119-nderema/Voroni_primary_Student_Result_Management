import React, { useMemo } from 'react';

const performanceRanges = [
  { name: 'EE1', min: 90, max: 100, color: 'bg-green-100 text-green-800' },
  { name: 'EE2', min: 75, max: 89, color: 'bg-green-50 text-green-700' },
  { name: 'ME1', min: 58, max: 74, color: 'bg-blue-100 text-blue-800' },
  { name: 'ME2', min: 41, max: 57, color: 'bg-blue-50 text-blue-700' },
  { name: 'AE1', min: 31, max: 40, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'AE2', min: 21, max: 30, color: 'bg-yellow-50 text-yellow-700' },
  { name: 'BE1', min: 11, max: 20, color: 'bg-red-100 text-red-800' },
  { name: 'BE2', min: 1, max: 10, color: 'bg-red-50 text-red-700' },
];

const PerformanceStats = ({ studentRows, selectedGrade, useAverages = false }) => {
  const stats = useMemo(() => {
    const filteredRows = selectedGrade 
      ? studentRows.filter(row => 
          row.student.class_name === selectedGrade || 
          row.student.grade === selectedGrade
        )
      : studentRows;
    
    // Initialize statistics counters
    const gradeCounts = performanceRanges.reduce((acc, range) => {
      acc[range.name] = 0;
      return acc;
    }, {});
    
    let totalItems = 0;
    
    if (useAverages) {
      // Use student averages for statistics
      filteredRows.forEach(row => {
        if (row.average === '-') return;
        
        totalItems++;
        const avgValue = parseFloat(row.average);
        
        for (const range of performanceRanges) {
          if (avgValue >= range.min && avgValue <= range.max) {
            gradeCounts[range.name]++;
            break;
          }
        }
      });
    } else {
      // Use individual marks for statistics
      filteredRows.forEach(row => {
        row.marks.forEach(mark => {
          if (!mark || mark.calculated_mark === undefined) return;
          
          totalItems++;
          const markValue = parseFloat(mark.calculated_mark);
          
          for (const range of performanceRanges) {
            if (markValue >= range.min && markValue <= range.max) {
              gradeCounts[range.name]++;
              break;
            }
          }
        });
      });
    }
    
    // Calculate percentages
    const result = performanceRanges.map(range => ({
      ...range,
      count: gradeCounts[range.name],
      percentage: totalItems > 0 
        ? ((gradeCounts[range.name] / totalItems) * 100).toFixed(1) 
        : 0
    }));
    
    return { 
      ranges: result, 
      total: totalItems,
      dataType: useAverages ? 'student averages' : 'individual marks'
    };
  }, [studentRows, selectedGrade, useAverages]);

  return (
    <div className="bg-white shadow rounded-lg p-3 mb-4">
      <h2 className="text-base font-semibold text-gray-700 mb-2">Performance Statistics</h2>
      
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-2">
        {stats.ranges.map(range => (
          <div key={range.name} className={`rounded p-2 ${range.color}`}>
            <div className="flex justify-between items-center">
              <span className="font-medium text-xs">{range.name}</span>
              <span className="text-xs font-semibold">{range.count}</span>
            </div>
            <div className="mt-0.5 text-xs">
              {range.min}-{range.max}%
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500">
        Based on {stats.total} {stats.dataType} {selectedGrade ? `in ${selectedGrade}` : ''}
      </div>
    </div>
  );
};

export default PerformanceStats;
