'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddFaculty = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    facultyName: '',
    
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Form validation
    if (!formData.facultyName.trim()) {
      setError('Faculty name is required');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:9921/faculty', formData);
      setSuccess(true);
      // Reset form data after successful submission
      setFormData({
        facultyName: '',
        
      });
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add faculty');
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
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add New Faculty</h1>
            <p className="mt-1 text-sm text-gray-500" aria-label="Enter faculty details">
              Enter the details for the new faculty
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            aria-label="Cancel adding faculty"
          >
            Cancel
          </button>
        </div>

        {/* Notification Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 animate-fadeIn">
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
                <p className="text-sm font-medium text-green-800">Faculty added successfully! Redirecting...</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 animate-fadeIn">
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
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setError(null)}
                    className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700 mb-1">
                Faculty Name <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="facultyName"
                  value={formData.facultyName}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && !formData.facultyName.trim()
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="E.g., Faculty 101, Auditorium A"
                  required
                  aria-invalid={error && !formData.facultyName.trim() ? 'true' : 'false'}
                  aria-describedby={error && !formData.facultyName.trim() ? "facultyName-error" : ""}
                />
              </div>
              {error && !formData.facultyName.trim() && (
                <p className="mt-2 text-sm text-red-600" id="facultyName-error">
                  Faculty name is required
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter a unique name for the faculty
              </p>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding Faculty...
                  </span>
                ) : (
                  'Add Faculty'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;