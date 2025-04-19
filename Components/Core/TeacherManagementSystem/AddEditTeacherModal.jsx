// AddEditTeacherModal.js
import { useState, useEffect } from 'react';

export default function AddEditTeacherModal({ teacher, onClose, onSave, apiUrl }) {
  const [formData, setFormData] = useState({
    class_teacher: '',
    class_name: ''
  });
  const [error, setError] = useState('');
  
  // Initialize form data if editing
  useEffect(() => {
    if (teacher) {
      setFormData({
        class_teacher: teacher.class_teacher || '',
        class_name: teacher.class_name || ''
      });
    }
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const isEditing = !!teacher;
      const url = isEditing ? `${apiUrl}${teacher.id}/` : `${apiUrl}`;
      const method = isEditing ? 'PUT' : 'POST';
      
      console.log('Sending request to:', url);
      console.log('Request payload:', formData);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(JSON.stringify(errorData) || `HTTP error! Status: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }
      }
      
      onSave();
    } catch (err) {
      console.error('Error saving teacher:', err);
      setError(err.message || 'Failed to save teacher data. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {teacher ? 'Edit Teacher' : 'Add New Teacher'}
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="class_teacher">
              Full Name
            </label>
            <input
              id="class_teacher"
              name="class_teacher"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              value={formData.class_teacher}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="class_name">
              Class Name
            </label>
            <select
              id="class_name"
              name="class_name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              value={formData.class_name}
              onChange={handleChange}
              required
            >
              <option value="">Select a class</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-3 sm:px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-700 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 sm:px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 text-sm"
            >
              {teacher ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}