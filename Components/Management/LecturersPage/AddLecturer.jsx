'use client';
import React, { useState, useEffect } from 'react';
import { AddLecturer, updateLecturer } from "../../Services/LecturerService"; // Ensure correct imports

const AddLecturerPage = ({ onSuccess, onCancel, initialData = {}, mode = "add" }) => { // Accept initialData and mode
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ...initialData, // Pre-fill form with initial data if provided
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormData({ ...formData, ...initialData }); // Update form data when initialData changes
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Form validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (mode === "add") {
        result = await AddLecturer(formData); // Use AddLecturer from LecturerService
      } else {
        result = await updateLecturer(formData); // Use updateLecturer from LecturerService
      }

      if (result.success) {
        setSuccess(true);
        setError(null);

        // Delay closing the modal to allow feedback to be visible
        setTimeout(() => {
          onSuccess({ firstName: formData.firstName, lastName: formData.lastName }); // Notify parent of success without lecturerId
        }, 2000); // 2-second delay
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error during submission:", error); // Log error for debugging
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {mode === "add" ? "Add New Lecturer" : "Edit Lecturer"}
          </h1>
          <p className="mt-1 text-sm text-gray-500" aria-label="Enter lecturer details">
            {mode === "add" ? "Enter the details for the new lecturer" : "Update the details for the lecturer"}
          </p>
        </div>
      </div>

      {/* Notification Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {mode === "add" ? "Lecturer added successfully!" : "Lecturer updated successfully!"}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`block w-full rounded-md py-2 px-3 border ${error && !formData.firstName.trim()
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
              } shadow-sm sm:text-sm`}
            placeholder="John"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`block w-full rounded-md py-2 px-3 border ${error && !formData.lastName.trim()
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
              } shadow-sm sm:text-sm`}
            placeholder="Doe"
            required
          />
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={onCancel} // Call onCancel when cancel is clicked
            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (mode === "add" ? "Adding..." : "Updating...") : (mode === "add" ? "Add Lecturer" : "Update Lecturer")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLecturerPage;