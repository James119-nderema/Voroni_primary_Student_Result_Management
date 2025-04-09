import React from "react";

const AddClassPopup = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add a new class
    onClose(); // Close the popup after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div> {/* Blur background */}
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-10">
        <h3 className="text-lg font-semibold mb-4">Add New Class</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Class Code</label>
            <input
              type="text"
              className="mt-1 px-4 py-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Class Size</label>
            <input
              type="number"
              className="mt-1 px-4 py-2 border rounded-md w-full"
              required
            />
          </div>
          {/* Add more fields as needed */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassPopup;
