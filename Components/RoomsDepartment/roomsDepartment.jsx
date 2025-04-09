'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchDepartments } from "../Services/departmentService";
import { fetchSelectedRoomDepartments, addRoomToDepartment, fetchAvailableRoomDepartments } from "../Services/RoomDepartmentService";

const RoomsDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [roomDepartments, setRoomDepartments] = useState([]);
  const [availableRoomDepartments, setAvailableRoomDepartments] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionStatus, setActionStatus] = useState({ type: null, message: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setLoading(true);
        const allDepartments = await fetchDepartments();
        setDepartments(allDepartments || []);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  const fetchRoomDepartmentData = async (departmentId) => {
    if (!departmentId) {
      console.error("Invalid departmentId:", departmentId);
      return; // Prevent API calls with undefined departmentId
    }

    try {
      setLoading(true);
      setError(null);

      const [departmentRooms, allAvailableRooms] = await Promise.all([
        fetchSelectedRoomDepartments(departmentId),
        fetchAvailableRoomDepartments(departmentId)
      ]);

      setRoomDepartments(departmentRooms || []);
      setAvailableRoomDepartments(allAvailableRooms || []);
    } catch (err) {
      console.error("Error fetching room departments:", err);
      setError("Failed to load room departments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDepartmentId) {
      fetchRoomDepartmentData(selectedDepartmentId);
    }
  }, [selectedDepartmentId]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartmentId(e.target.value);
    setSelectedRoomId("");
  };

  const handleAddRoom = async () => {
    if (!selectedRoomId) {
      setActionStatus({ type: 'error', message: 'Please select a room first' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
      return;
    }

    try {
      setActionStatus({ type: 'loading', message: 'Adding room...' });

      await addRoomToDepartment(selectedDepartmentId, selectedRoomId);
      await fetchRoomDepartmentData(selectedDepartmentId);
      setSelectedRoomId("");
      setActionStatus({ type: 'success', message: 'Room added successfully' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error adding room:", err);
      setActionStatus({ type: 'error', message: 'Failed to add room. Please try again.' });
    }
  };

  // Filter departments based on search term
  const filteredDepartments = departments.filter(dept => 
    dept.departmentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter rooms based on search term
  const filteredRooms = roomDepartments.filter(room => 
    room.roomName?.toLowerCase().includes(roomSearchTerm.toLowerCase()) ||
    room.roomCapacity?.toString().includes(roomSearchTerm)
  );

  return (
    <div className="p-4 sm:p-6 mx-auto bg-white min-h-screen w-full">
      <div className="mb-6 border-b pb-4">
        <h3 className="text-xl text-gray-900 font-bold">Room Department Management</h3>
        <p className="text-sm text-gray-600">Manage room assignments for departments</p>
      </div>

      <div className="bg-gray-50 border rounded-md p-6 mb-6">
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Select a Department</h4>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {loading && !selectedDepartmentId ? (
              <div className="flex items-center justify-center py-2">
                <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-600">Loading departments...</span>
              </div>
            ) : (
              <select
                value={selectedDepartmentId}
                onChange={handleDepartmentChange}
                className="w-full md:w-1/2 px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Select a Department --</option>
                {filteredDepartments.map((dept) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {actionStatus.message && (
        <div className={`mb-6 p-3 rounded-md text-sm flex items-center ${
          actionStatus.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
          actionStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {actionStatus.type === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {actionStatus.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {actionStatus.type === 'loading' && (
            <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {actionStatus.message}
        </div>
      )}

      {selectedDepartmentId ? (
        loading ? (
          <div className="bg-gray-50 border rounded-md p-8 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-700">Loading rooms...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 border rounded-md p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Add Room to Department</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={availableRoomDepartments.length === 0}
                >
                  <option value="">Select an available room</option>
                  {availableRoomDepartments.map((room) => (
                    <option key={room.roomId} value={room.roomId}>
                      {room.roomName} (Capacity: {room.roomCapacity})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddRoom}
                  disabled={!selectedRoomId}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Room
                </button>
              </div>
              {availableRoomDepartments.length === 0 && (
                <p className="mt-3 text-sm text-gray-600">No available rooms to add.</p>
              )}
            </div>

            <div className="bg-gray-50 border rounded-md p-6">
              <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Rooms in Selected Department</h4>
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={roomSearchTerm}
                    onChange={(e) => setRoomSearchTerm(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {roomDepartments.length > 0 ? (
                <>
                  <div className="overflow-x-auto border border-gray-200 rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Room Name</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Capacity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRooms.length > 0 ? (
                          filteredRooms.map((room, index) => (
                            <tr key={room.roomId} 
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {room.roomName}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                {room.roomCapacity}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-700">
                              No rooms match your search
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Showing {filteredRooms.length} of {roomDepartments.length} rooms
                  </div>
                </>
              ) : (
                <div className="text-center p-8 bg-white rounded-md border border-gray-200">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No rooms</h3>
                  <p className="mt-1 text-sm text-gray-700">No rooms assigned to this department yet.</p>
                </div>
              )}
            </div>
          </>
        )
      ) : (
        <div className="bg-gray-50 border rounded-md">
          <div className="text-center p-12">
            <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Select a department to manage rooms</h3>
            <p className="mt-2 text-base text-gray-700">
              Please select a department from the dropdown above to view and manage its rooms.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsDepartment;

