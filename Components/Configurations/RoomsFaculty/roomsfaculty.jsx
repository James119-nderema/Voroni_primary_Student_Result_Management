'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchFaculties } from "../../Services/facultyService";
import { 
  fetchSelectedRoomFaculties, 
  addRoomToFaculty, 
  fetchAvailableRoomFaculties,
  removeRoomFromFaculty,
  createAllCombinations // Import the new function
} from "../../Services/RoomFacultyService";

const RoomsFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [selectedFacultyName, setSelectedFacultyName] = useState("");
  const [roomFaculties, setRoomFaculties] = useState([]);
  const [availableRoomFaculties, setAvailableRoomFaculties] = useState([]);
  const [selectedAvailableRoomIds, setSelectedAvailableRoomIds] = useState([]);
  const [selectedAssignedRoomIds, setSelectedAssignedRoomIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionStatus, setActionStatus] = useState({ type: null, message: null });
  const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadFaculties = async () => {
      try {
        setLoading(true);
        const allFaculties = await fetchFaculties();
        setFaculties(allFaculties || []);
      } catch (err) {
        console.error("Error fetching faculties:", err);
        setError("Failed to load faculties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFaculties();
  }, []);

  const fetchRoomFacultyData = async (facultyId) => {
    if (!facultyId) {
      console.error("Invalid facultyId:", facultyId);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSelectedAssignedRoomIds([]);
      setSelectedAvailableRoomIds([]);

      const [facultyRooms, allAvailableRooms] = await Promise.all([
        fetchSelectedRoomFaculties(facultyId),
        fetchAvailableRoomFaculties(facultyId)
      ]);

      setRoomFaculties(facultyRooms || []);
      setAvailableRoomFaculties(allAvailableRooms || []);
    } catch (err) {
      console.error("Error fetching room faculties:", err);
      setError("Failed to load room faculties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFacultyId) {
      const faculty = faculties.find(f => f.facultyId === selectedFacultyId);
      setSelectedFacultyName(faculty?.facultyName || "");
      fetchRoomFacultyData(selectedFacultyId);
    }
  }, [selectedFacultyId, faculties]);

  const handleFacultyChange = (e) => {
    setSelectedFacultyId(e.target.value);
  };

  const handleAvailableRoomSelect = (roomId) => {
    setSelectedAvailableRoomIds(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId);
      } else {
        return [...prev, roomId];
      }
    });
  };

  const handleAssignedRoomSelect = (roomId) => {
    setSelectedAssignedRoomIds(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId);
      } else {
        return [...prev, roomId];
      }
    });
  };

  const selectAllAvailableRooms = () => {
    if (selectedAvailableRoomIds.length === availableRoomFaculties.length) {
      setSelectedAvailableRoomIds([]);
    } else {
      setSelectedAvailableRoomIds(availableRoomFaculties.map(room => room.roomId));
    }
  };

  const selectAllAssignedRooms = () => {
    if (selectedAssignedRoomIds.length === filteredRooms.length) {
      setSelectedAssignedRoomIds([]);
    } else {
      setSelectedAssignedRoomIds(filteredRooms.map(room => room.roomId));
    }
  };

  const handleAddRooms = async () => {
    if (selectedAvailableRoomIds.length === 0) {
      setActionStatus({ type: 'error', message: 'Please select at least one room' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
      return;
    }

    try {
      setActionStatus({ type: 'loading', message: `Adding ${selectedAvailableRoomIds.length} room(s)...` });
      
      for (const roomId of selectedAvailableRoomIds) {
        await addRoomToFaculty(selectedFacultyId, roomId);
      }
      
      await fetchRoomFacultyData(selectedFacultyId);
      setSelectedAvailableRoomIds([]);
      setActionStatus({ 
        type: 'success', 
        message: `${selectedAvailableRoomIds.length} room(s) added successfully` 
      });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error adding rooms:", err);
      setActionStatus({ type: 'error', message: 'Failed to add rooms. Please try again.' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    }
  };

  const openDeleteConfirmation = (room) => {
    setRoomToDelete(room);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteRoom = async (room) => {
    try {
      setActionStatus({ type: 'loading', message: 'Removing room...' });

      // Ensure both roomId and facultyId are passed
      if (!room.roomId || !selectedFacultyId) {
        console.error("Missing required data for deletion:", { roomId: room.roomId, facultyId: selectedFacultyId });
        throw new Error("Missing required data for deletion");
      }

      await removeRoomFromFaculty(selectedFacultyId, room.roomId);
      await fetchRoomFacultyData(selectedFacultyId);
      setActionStatus({ type: 'success', message: 'Room removed successfully' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error removing room:", err);
      setActionStatus({ type: 'error', message: 'Failed to remove room. Please try again.' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } finally {
      setIsDeleteDialogOpen(false);
      setRoomToDelete(null);
    }
  };

  const handleDeleteSelectedRooms = async () => {
    if (selectedAssignedRoomIds.length === 0) {
      setActionStatus({ type: 'error', message: 'Please select at least one room to delete' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
      return;
    }

    try {
      setActionStatus({ 
        type: 'loading', 
        message: `Removing ${selectedAssignedRoomIds.length} room(s)...` 
      });

      for (const roomId of selectedAssignedRoomIds) {
        const room = roomFaculties.find(r => r.roomId === roomId);
        if (room && selectedFacultyId) {
          await removeRoomFromFaculty(selectedFacultyId, room.roomId);
        } else {
          console.error("Missing required data for deletion:", { roomId, facultyId: selectedFacultyId });
          throw new Error("Missing required data for deletion");
        }
      }

      await fetchRoomFacultyData(selectedFacultyId);
      setSelectedAssignedRoomIds([]);
      setActionStatus({ 
        type: 'success', 
        message: `${selectedAssignedRoomIds.length} room(s) removed successfully` 
      });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error removing rooms:", err);
      setActionStatus({ type: 'error', message: 'Failed to remove rooms. Please try again.' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    }
  };

  const handleCreateCombinations = async () => {
    try {
      setActionStatus({ type: 'loading', message: 'Creating combinations...' });
      await createAllCombinations();
      if (selectedFacultyId) {
        await fetchRoomFacultyData(selectedFacultyId); // Refresh the tables
      }
      setActionStatus({ type: 'success', message: 'Combinations created successfully' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error creating combinations:", err);
      setActionStatus({ type: 'error', message: 'Failed to create combinations. Please try again.' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    }
  };

  const filteredRooms = roomFaculties.filter(room => 
    room.roomName?.toLowerCase().includes(roomSearchTerm.toLowerCase()) ||
    room.roomCapacity?.toString().includes(roomSearchTerm)
  );

  return (
    <div className="p-4 sm:p-6 mx-auto bg-white min-h-screen w-full">
      <div className="mb-6 border-b pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-900 font-bold">Room Faculty Management</h3>
          <p className="text-sm text-gray-600">Manage room assignments for faculties</p>
        </div>
        <button
          onClick={handleCreateCombinations}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Create Combinations
        </button>
      </div>

      <div className="bg-white shadow-sm border rounded-lg p-6 mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Select a Faculty</h4>
        <div className="flex items-center gap-4">
          {loading && !selectedFacultyId ? (
            <div className="flex items-center py-2">
              <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading faculties...</span>
            </div>
          ) : (
            <select
              value={selectedFacultyId}
              onChange={handleFacultyChange}
              className="flex-1 max-w-md px-4 py-2.5 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="">-- Select a Faculty --</option>
              {faculties.map((faculty) => (
                <option key={faculty.facultyId} value={faculty.facultyId}>
                  {faculty.facultyName}
                </option>
              ))}
            </select>
          )}
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

      {selectedFacultyId ? (
        loading ? (
          <div className="bg-white shadow-sm border rounded-lg p-8 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-700">Loading rooms...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm border rounded-lg p-6 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Available Rooms</h4>
                <button 
                  onClick={handleAddRooms}
                  disabled={selectedAvailableRoomIds.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Selected ({selectedAvailableRoomIds.length})
                </button>
              </div>
              
              {availableRoomFaculties.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={selectedAvailableRoomIds.length === availableRoomFaculties.length && availableRoomFaculties.length > 0}
                              onChange={selectAllAvailableRooms}
                            />
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Room Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Capacity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {availableRoomFaculties.map((room) => (
                        <tr key={room.roomId} className="hover:bg-gray-50">
                          <td className="px-6 py-3 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={selectedAvailableRoomIds.includes(room.roomId)}
                              onChange={() => handleAvailableRoomSelect(room.roomId)}
                            />
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {room.roomName}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                            {room.roomCapacity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-md text-center">
                  <p className="text-gray-500">No available rooms found.</p>
                </div>
              )}
            </div>

            <div className="bg-white shadow-sm border rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Rooms in {selectedFacultyName}</h4>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
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
                      className="pl-10 w-full px-4 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleDeleteSelectedRooms}
                    disabled={selectedAssignedRoomIds.length === 0}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Remove Selected ({selectedAssignedRoomIds.length})
                  </button>
                </div>
              </div>
              
              {roomFaculties.length > 0 ? (
                <>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                checked={selectedAssignedRoomIds.length === filteredRooms.length && filteredRooms.length > 0}
                                onChange={selectAllAssignedRooms}
                              />
                            </div>
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Room Name
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Capacity
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRooms.length > 0 ? (
                          filteredRooms.map((room) => (
                            <tr key={room.roomId} className="hover:bg-gray-50">
                              <td className="px-6 py-3 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                  checked={selectedAssignedRoomIds.includes(room.roomId)}
                                  onChange={() => handleAssignedRoomSelect(room.roomId)}
                                />
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {room.roomName}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                {room.roomCapacity}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => openDeleteConfirmation(room)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                              No rooms match your search
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 text-sm text-gray-500 flex justify-between items-center">
                    <span>Showing {filteredRooms.length} of {roomFaculties.length} rooms</span>
                    {selectedAssignedRoomIds.length > 0 && (
                      <span className="text-blue-600 font-medium">{selectedAssignedRoomIds.length} room(s) selected</span>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-md border border-gray-200">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No rooms</h3>
                  <p className="mt-1 text-sm text-gray-700">No rooms assigned to this faculty yet.</p>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="bg-white shadow-sm border rounded-lg">
          <div className="text-center p-12">
            <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Select a faculty to manage rooms</h3>
            <p className="mt-2 text-base text-gray-700">
              Please select a faculty from the dropdown above to view and manage its rooms.
            </p>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && roomToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className=" text-sm text-gray-600 mb-6">
              Are you sure you want to remove <span className="font-medium">{roomToDelete.roomName}</span> from {selectedFacultyName}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRoom(roomToDelete)}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsFaculty;

