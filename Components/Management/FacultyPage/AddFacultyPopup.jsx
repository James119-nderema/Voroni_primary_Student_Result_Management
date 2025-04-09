'use client';
import React, { useState } from "react";
import { addFaculty } from '../../Services/facultyService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFacultyPopup = ({ onClose, onFacultyAdded }) => {
  const [facultyData, setFacultyData] = useState({
    facultyName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Keep for inline message if desired

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(""); // Reset success message

    try {
      // Basic validation
      if (!facultyData.facultyName.trim()) {
        setError("Faculty name is required");
        toast.error("Faculty name is required");
        setLoading(false);
        return;
      }

      const result = await addFaculty(facultyData);
      
      if (result.success) {
        // Show success toast notification
        toast.success("Faculty added successfully!");
        
        // Optional: keep inline success message as well
        setSuccess("Faculty added successfully!");
        
        // Clear form and notify parent
        onFacultyAdded(result.data);
        
        // Optionally close the popup after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        // Show error toast notification
        toast.error(result.message || "Failed to add faculty");
        setError(result.message || "Failed to add faculty");
      }
    } catch (error) {
      console.error("Error adding faculty:", error);
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mt-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Faculty</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="facultyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Faculty Name
            </label>
            <input
              type="text"
              id="facultyName"
              name="facultyName"
              value={facultyData.facultyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter faculty name"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-300"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Faculty"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacultyPopup;