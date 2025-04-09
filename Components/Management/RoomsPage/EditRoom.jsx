'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditRoom = () => {
  const router = useRouter();
  const { roomId } = useParams();
  const path = "http://localhost:9921/rooms";

  const [roomData, setRoomData] = useState({
    roomName: "",
    roomType: "Lecture Hall",
    roomCapacity: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch room details when the component loads
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`${path}/${roomId}`);
        setRoomData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to fetch room details.");
        setLoading(false);
      }
    };

    if (roomId) fetchRoomDetails();
  }, [roomId]);

  // Handle form input changes
  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9921/rooms/${roomId}`, roomData);
      setSuccess(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      console.error("Error updating room:", error);
      setError("Failed to update room.");
    }
  };

  if (loading) return <p className="text-center text-gray-500 font-semibold py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold py-8">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Room</h1>
            <p className="mt-1 text-sm text-gray-500" aria-label="Edit room details">
              Update the details for the room
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            aria-label="Cancel editing room"
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
                <p className="text-sm font-medium text-green-800">Room updated successfully! Redirecting...</p>
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
              <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
                Room Name <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="roomName"
                  name="roomName"
                  value={roomData.roomName}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && !roomData.roomName.trim()
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="E.g., Room 101, Auditorium A"
                  required
                  aria-invalid={error && !roomData.roomName.trim() ? 'true' : 'false'}
                  aria-describedby={error && !roomData.roomName.trim() ? "roomName-error" : ""}
                />
              </div>
              {error && !roomData.roomName.trim() && (
                <p className="mt-2 text-sm text-red-600" id="roomName-error">
                  Room name is required
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter a unique, descriptive name for the room
              </p>
            </div>

            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
                Room Type <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <select
                  id="roomType"
                  name="roomType"
                  value={roomData.roomType}
                  onChange={handleChange}
                  className="block w-full rounded-md py-2 pl-3 pr-10 border border-gray-300 
    text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 
    focus:border-indigo-500 shadow-sm sm:text-sm"
                >
                  <option value="Lecture Hall" className="text-gray-900 bg-white">Lecture Hall</option>
                  <option value="Lab" className="text-gray-900 bg-white">Lab</option>
                  <option value="Meeting Room" className="text-gray-900 bg-white">Meeting Room</option>
                  <option value="Classroom" className="text-gray-900 bg-white">Classroom</option>
                  <option value="Auditorium" className="text-gray-900 bg-white">Auditorium</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Select the category that best describes this room
              </p>
            </div>

            <div>
              <label htmlFor="roomCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacity <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="roomCapacity"
                  name="roomCapacity"
                  value={roomData.roomCapacity}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-2 px-3 border ${error && (!roomData.roomCapacity || parseInt(roomData.roomCapacity) <= 0)
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } shadow-sm sm:text-sm placeholder-gray-500`}
                  placeholder="Number of people"
                  min="1"
                  required
                  aria-invalid={error && (!roomData.roomCapacity || parseInt(roomData.roomCapacity) <= 0) ? 'true' : 'false'}
                  aria-describedby={error && (!roomData.roomCapacity || parseInt(roomData.roomCapacity) <= 0) ? "capacity-error" : ""}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {error && (!roomData.roomCapacity || parseInt(roomData.roomCapacity) <= 0) && (
                <p className="mt-2 text-sm text-red-600" id="capacity-error">
                  Room capacity must be greater than 0
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Maximum number of people the room can accommodate
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
                    Updating Room...
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

export default EditRoom;