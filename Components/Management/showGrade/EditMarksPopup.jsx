// EditMarksPopup.js
import React, { useState, useEffect } from 'react';

const EditMarksPopup = ({ studentId, initialMarks, onClose, onSubmit }) => {
  const [marks, setMarks] = useState({
    math_marks: '',
    english_marks: '',
    kiswahili_marks: '',
    science_marks: '',
    sst_marks: '',
  });

  useEffect(() => {
    if (initialMarks) {
      setMarks({
        math_marks: initialMarks.math_marks || '',
        english_marks: initialMarks.english_marks || '',
        kiswahili_marks: initialMarks.kiswahili_marks || '',
        science_marks: initialMarks.science_marks || '',
        sst_marks: initialMarks.sst_marks || '',
      });
    }
  }, [initialMarks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      student: studentId,
      ...marks,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Edit Marks</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {Object.entries(marks).map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-2 items-center">
              <label className="text-sm font-medium text-gray-700 col-span-1">
                {key.split('_')[0].charAt(0).toUpperCase() + key.split('_')[0].slice(1)}:
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setMarks(prev => ({ ...prev, [key]: e.target.value }))}
                className="col-span-2 p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="100"
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMarksPopup;