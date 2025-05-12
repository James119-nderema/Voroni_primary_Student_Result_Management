import React from 'react';
import StudentCard from '../StudentCard';

const StudentCardsView = ({ 
  students, 
  currentPage, 
  pageSize, 
  onEdit, 
  onDelete 
}) => {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students match your search criteria
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      {students.map((student, index) => (
        <StudentCard
          key={student.id || index}
          student={student}
          index={index}
          currentPage={currentPage}
          pageSize={pageSize}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StudentCardsView;
