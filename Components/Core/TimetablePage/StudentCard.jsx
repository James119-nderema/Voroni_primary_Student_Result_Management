import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const StudentCard = ({ student, index, currentPage, pageSize, onEdit, onDelete }) => {
  const fullNameProperty = student.fullName || student.full_name || student.name || '';
  const gradeProperty = student.grade || student.class || student.gradeLevel || '';
  const admissionProperty = student.admissionNumber || student.admission_number || student.admissionNo || '';
  const upiProperty = student.upiNumber || student.upi_number || student.upi || '';
  const birthCertProperty = student.birthCertificateNumber || student.birth_certificate || student.birthCertificate || '';
  const genderProperty = student.gender || student.sex || '';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-800 mb-1 text-lg">{fullNameProperty || 'N/A'}</h3>
          <div className="text-sm text-gray-500">#{(currentPage - 1) * pageSize + index + 1}</div>
        </div>
        <div className="flex space-x-2">
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
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-gray-500 block">Gender</span>
          <span className="font-medium">{genderProperty || 'N/A'}</span>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-gray-500 block">Grade</span>
          <span className="font-medium">{gradeProperty || 'N/A'}</span>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-gray-500 block">Admission #</span>
          <span className="font-medium">{admissionProperty || 'N/A'}</span>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-gray-500 block">UPI #</span>
          <span className="font-medium">{upiProperty || 'N/A'}</span>
        </div>
        <div className="bg-gray-50 p-2 rounded col-span-2">
          <span className="text-gray-500 block">Birth Certificate</span>
          <span className="font-medium">{birthCertProperty || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
