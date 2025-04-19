import React from 'react';

export default function StudentPopup({ isEditMode, currentStudent, setCurrentStudent, setIsModalOpen, handleSubmit }) {
  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {isEditMode ? 'Edit Student' : 'Add New Student'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              value={currentStudent.first_name}
              onChange={(e) => setCurrentStudent({ ...currentStudent, first_name: e.target.value })}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              value={currentStudent.last_name}
              onChange={(e) => setCurrentStudent({ ...currentStudent, last_name: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="student_id">
              Student ID
            </label>
            <input
              id="student_id"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              value={currentStudent.student_id}
              onChange={(e) => setCurrentStudent({ ...currentStudent, student_id: e.target.value })}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="class_name">
              Class
            </label>
            <select
              id="class_name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              value={currentStudent.class_name || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, class_name: e.target.value })}
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
          
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-700 w-full sm:w-auto"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 w-full sm:w-auto"
            >
              {isEditMode ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
