import React from 'react';
import { Users } from 'lucide-react';

const StudentStatistics = ({ students, filteredStudents, selectedGrade }) => {
  return (
    <div className="bg-white rounded-lg shadow p-3 mb-4">
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
          <Users className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500">Student Statistics</h3>
          <div className="flex space-x-4 mt-0.5">
            <div>
              <span className="text-lg font-bold text-gray-900">{students.length}</span>
              <span className="ml-1 text-xs text-gray-500">Total</span>
            </div>
            
            {filteredStudents.length !== students.length && (
              <div>
                <span className="text-lg font-bold text-blue-600">{filteredStudents.length}</span>
                <span className="ml-1 text-xs text-gray-500">
                  {selectedGrade ? `Grade ${selectedGrade}` : 'Filtered'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatistics;
