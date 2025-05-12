import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const StudentTable = ({ 
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">#</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Full Name</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Gender</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Grade</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Admission Number</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">UPI Number</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Birth Certificate</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student, index) => {
            const fullNameProperty = student.fullName || student.full_name || student.name || '';
            const gradeProperty = student.grade || student.class || student.gradeLevel || '';
            const admissionProperty = student.admissionNumber || student.admission_number || student.admissionNo || '';
            const upiProperty = student.upiNumber || student.upi_number || student.upi || '';
            const birthCertProperty = student.birthCertificateNumber || student.birth_certificate || student.birthCertificate || '';
            const genderProperty = student.gender || student.sex || '';
            
            return (
              <tr 
                key={student.id || index} 
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 text-sm text-gray-700 text-center">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 text-center">{fullNameProperty || 'N/A'}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-center">{genderProperty || 'N/A'}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-center">{gradeProperty || 'N/A'}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-center">{admissionProperty || 'N/A'}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-center">{upiProperty || 'N/A'}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-center">{birthCertProperty || 'N/A'}</td>
                <td className="py-3 px-4 text-sm flex justify-center space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-2 rounded-md transition-colors duration-200"
                    title="Edit Student"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-md transition-colors duration-200"
                    title="Delete Student"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
