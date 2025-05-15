import React from 'react';

const StudentMarksMobileView = ({ 
  students, 
  subjects, 
  getAverageColor 
}) => {
  return (
    <div className="space-y-4">
      {students.map((student, index) => (
        <div key={student.student.id} className="bg-white rounded-lg shadow overflow-hidden">
          {/* Student header */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">#{index + 1}</span>
              <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                {student.student.class_name || student.student.grade || 'No class'}
              </span>
            </div>
            <h3 className="text-lg font-semibold mt-1">
              {student.student.fullName || `Student ${student.student.id}`}
            </h3>
          </div>
          
          {/* Marks */}
          <div className="p-4 space-y-3">
            {/* Average and total */}
            <div className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded">
              <div>
                <span className="text-xs text-gray-500 block">Average</span>
                <span className={`text-lg font-semibold ${getAverageColor(student.average)}`}>
                  {student.average !== '-' ? `${student.average}%` : '-'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Total</span>
                <span className="text-lg font-semibold">
                  {student.total !== '-' ? student.total : '-'}
                </span>
              </div>
            </div>
            
            {/* Individual subject marks */}
            <div className="space-y-2">
              {student.marks.map((mark, idx) => (
                <div key={idx} className="flex justify-between p-2 border-b">
                  <span className="text-sm font-medium">{subjects[idx].name}</span>
                  <span className="text-sm">
                    {mark && mark.calculated_mark !== undefined ? 
                      `${mark.calculated_mark}%` : 
                      '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {students.length === 0 && (
        <div className="text-center py-6 bg-white rounded-lg shadow">
          <p className="text-gray-500">No students match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default StudentMarksMobileView;
