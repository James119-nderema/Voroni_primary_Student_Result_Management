'use client';
import React, { useState, useEffect } from "react";
import { addFaculty, editFaculty } from '../../Services/facultyService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEditFacultyPopup = ({ mode, faculty, onClose, onFacultyUpdated }) => {
  const [facultyData, setFacultyData] = useState({
    facultyId: "",
    facultyName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (mode === "edit" && faculty) {
      setFacultyData({
        facultyId: faculty.facultyId,
        facultyName: faculty.facultyName,
      });
    }
  }, [mode, faculty]);

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
    setSuccess("");

    try {
      // Basic validation
      if (!facultyData.facultyName.trim()) {
        setError("Faculty name is required");
        toast.error("Faculty name is required");
        setLoading(false);
        return;
      }

      if (mode === "add") {
        const result = await addFaculty(facultyData);
        if (result.success) {
          toast.success("Faculty added successfully!");
          setSuccess("Faculty added successfully!");
          onFacultyUpdated(result.data);
          setTimeout(() => onClose(), 2000);
        } else {
          toast.error(result.message || "Failed to add faculty");
          setError(result.message || "Failed to add faculty");
        }
      } else if (mode === "edit") {
        const result = await editFaculty(facultyData.facultyId, facultyData);
        if (result.success) {
          toast.success("Faculty updated successfully!");
          setSuccess("Faculty updated successfully!");
          onFacultyUpdated();
          setTimeout(() => onClose(), 2000);
        } else {
          toast.error(result.message || "Failed to update faculty");
          setError(result.message || "Failed to update faculty");
        }
      }
    } catch (error) {
      console.error("Error processing faculty:", error);
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg mt-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {mode === "add" ? "Add New Faculty" : "Edit Faculty"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "edit" && (
            <div className="mb-6">
              <label
                htmlFor="facultyId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Faculty ID
              </label>
              <input
                type="text"
                id="facultyId"
                name="facultyId"
                value={facultyData.facultyId}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-black shadow-sm bg-gray-50 text-gray-500"
              />
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="facultyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Faculty Name
            </label>
            <input
              type="text"
              id="facultyName"
              name="facultyName"
              value={facultyData.facultyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-black shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter faculty name"
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-300"
              disabled={loading}
            >
              {loading ? (mode === "add" ? "Adding..." : "Updating...") : (mode === "add" ? "Add Faculty" : "Update Faculty")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditFacultyPopup;
