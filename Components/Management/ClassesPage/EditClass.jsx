'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchClassById, updateClass } from "../../Services/classService";

const EditClass = () => {
  const router = useRouter();
  const { classId } = useParams();

  const [classData, setClassData] = useState({
    classCode: '',
    size: '',
    yearId: '',
    semesterId: '',
    programId: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch class details when the component loads
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const data = await fetchClassById(classId);
        setClassData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class details:", error);
        setError("Failed to fetch class details.");
        setLoading(false);
      }
    };

    if (classId) fetchClassDetails();
  }, [classId]);

  // Handle form input changes
  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClass(classId, classData);
      setSuccess(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      console.error("Error updating class:", error);
      setError("Failed to update class.");
    }
  };

  if (loading) return <p className="text-center text-gray-500 font-semibold py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold py-8">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Class</h1>
            <p className="mt-1 text-sm text-gray-500" aria-label="Edit class details">
              Update the details for the class
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            aria-label="Cancel editing class"
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
                <p className="text-sm font-medium text-green-800">Class updated successfully! Redirecting...</p>
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
                  name="classCode"
                  value={classData.classCode}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && !classData.classCode.trim()
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="E.g., Class 101, Auditorium A"
                  required
                  aria-invalid={error && !classData.classCode.trim() ? 'true' : 'false'}
                  aria-describedby={error && !classData.classCode.trim() ? "classCode-error" : ""}
                />
              </div>
              {error && !classData.classCode.trim() && (
                <p className="mt-2 text-sm text-red-600" id="classCode-error">
                  Class Code is required
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter class code
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
                  name="size"
                  value={classData.size}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!classData.size || parseInt(classData.size) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Capacity of the class"
                  min="1"
                  required
                  aria-invalid={error && (!classData.size || parseInt(classData.size) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!classData.size || parseInt(classData.size) <= 0) ? "capacity-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!classData.size || parseInt(classData.size) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Class capacity must be greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
               Capacity of a class
              </p>
            </div>

            <div>
              <label htmlFor="yearId" className="block text-sm font-medium text-gray-700 mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="yearId"
                  name="yearId"
                  value={classData.yearId}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!classData.yearId || parseInt(classData.yearId) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Number of people"
                  min="1"
                  required
                  aria-invalid={error && (!classData.yearId || parseInt(classData.yearId) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!classData.yearId || parseInt(classData.yearId) <= 0) ? "capacity-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!classData.yearId || parseInt(classData.yearId) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Yeadr Id must be greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Year of the class
              </p>
            </div>

            <div>
              <label htmlFor="semesterId" className="block text-sm font-medium text-gray-700 mb-1">
                Semester <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="semesterId"
                  name="semesterId"
                  value={classData.semesterId}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!classData.semesterId || parseInt(classData.semesterId) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Number of people"
                  min="1"
                  required
                  aria-invalid={error && (!classData.semesterId || parseInt(classData.semesterId) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!classData.semesterId || parseInt(classData.semesterId) <= 0) ? "capacity-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!classData.semesterId || parseInt(classData.semesterId) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Semester must be greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Semester of the class
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
                  name="programId"
                  value={classData.programId}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!classData.programId || parseInt(classData.programId) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Number of people"
                  min="1"
                  required
                  aria-invalid={error && (!classData.programId || parseInt(classData.programId) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!classData.programId || parseInt(classData.programId) <= 0) ? "capacity-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!classData.programId || parseInt(classData.programId) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Program ID must be greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Program ID of the class
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
                    Updating Class...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClass;