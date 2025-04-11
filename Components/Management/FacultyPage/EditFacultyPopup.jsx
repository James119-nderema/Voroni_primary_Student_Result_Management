'use client';
import React, { useState, useEffect } from "react";
import { editFaculty } from '../../Services/facultyService';

const EditFacultyPopup = ({ faculty, onClose, onFacultyUpdated }) => {
  const [facultyData, setFacultyData] = useState({
    facultyId: "",
    facultyName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (faculty) {
      setFacultyData({
        facultyId: faculty.facultyId,
        facultyName: faculty.facultyName,
      });
    }
  }, [faculty]);

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

    try {
      // Basic validation
      if (!facultyData.facultyName.trim()) {
        setError("Faculty name is required");
        setLoading(false);
        return;
      }

      const result = await editFaculty(facultyData.facultyId, facultyData);
      
      if (result.success) {
        onFacultyUpdated();
      } else {
        setError(result.message || "Failed to update faculty");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating faculty:", error);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Faculty</h2>
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

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="facultyId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Faculty ID
            </label>
            <input
              type="text"
              id="facultyId"
              name="facultyId"
              value={facultyData.facultyId}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm shadow-sm bg-gray-50 text-gray-500"
            />
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              {loading ? "Updating..." : "Update Faculty"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFacultyPopup;