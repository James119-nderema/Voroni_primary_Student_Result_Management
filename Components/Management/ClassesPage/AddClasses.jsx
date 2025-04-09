'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addClass } from '../../Services/classService'; // Import the service

const AddClasess = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    classCode: '',
    size: '',
    periodId: '',
    programId: ''
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
    if (!formData.classCode.trim()) {
      setError('Class_detail name is required');
      setLoading(false);
      return;
    }

    if (!formData.size || parseInt(formData.size) <= 0) {
      setError('Class_detail capacity must be greater than 0');
      setLoading(false);
      return;
    }

    if (!formData.periodId || parseInt(formData.periodId) <= 0) {
      setError('Class_detail capacity must be greater than 0');
      setLoading(false);
      return;
    }

    if (!formData.programId || parseInt(formData.programId) <= 0) {
      setError('Class_detail capacity must be greater than 0');
      setLoading(false);
      return;
    }

    try {
      await addClass(formData); // Use the service for API call
      setSuccess(true);
      // Reset form data after successful submission
      setFormData({
        classCode: '',
        size: '',
        periodId: '',
        programId: ''
      });
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add class_detail');
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
            <h1 className="text-2xl font-semibold text-gray-900">Add New Class_detail</h1>
            <p className="mt-1 text-sm text-gray-500" aria-label="Enter class_detail details">
              Enter the details for the new class detail
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            aria-label="Cancel adding class_detail"
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
                <p className="text-sm font-medium text-green-800">Class_detail added successfully! Redirecting...</p>
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
              <label htmlFor="classCode" className="block text-sm font-medium text-gray-700 mb-1">
                Class Code <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="classCode"
                  value={formData.classCode}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && !formData.classCode.trim()
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="E.g., BSCS"
                  required
                  aria-invalid={error && !formData.classCode.trim() ? 'true' : 'false'}
                  aria-describedby={error && !formData.classCode.trim() ? "classCode-error" : ""}
                />
              </div>
              {error && !formData.classCode.trim() && (
                <p className="mt-2 text-sm text-red-600" id="classCode-error">
                  Class_detail name is required
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter a unique, descriptive name for the class_detail
              </p>
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Class Size <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!formData.size || parseInt(formData.size) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Class Size"
                  min="1"
                  required
                  aria-invalid={error && (!formData.size || parseInt(formData.size) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!formData.size || parseInt(formData.size) <= 0) ? "size-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!formData.size || parseInt(formData.size) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Class Size must be greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Size of Class
              </p>
            </div>

            <div>
              <label htmlFor="periodId" className="block text-sm font-medium text-gray-700 mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="periodId"
                  value={formData.periodId}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!formData.periodId || parseInt(formData.periodId) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Year e.g 2022"
                  min="1"
                  required
                  aria-invalid={error && (!formData.periodId || parseInt(formData.periodId) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!formData.periodId || parseInt(formData.periodId) <= 0) ? "capacity-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!formData.periodId || parseInt(formData.periodId) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Year must be  greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Year the Class is in
              </p>
            </div>

            <div>
              <label htmlFor="programId" className="block text-sm font-medium text-gray-700 mb-1">
                Program ID <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="programId"
                  value={formData.programId}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!formData.programId || parseInt(formData.programId) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Semester"
                  min="1"
                  required
                  aria-invalid={error && (!formData.programId || parseInt(formData.programId) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!formData.programId || parseInt(formData.programId) <= 0) ? "rogramId-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!formData.programId || parseInt(formData.programId) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Program ID must be greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Program ID of the Class
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
                    Adding Classes...
                  </span>
                ) : (
                  'Add Classes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClasess;