'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchDepartments } from "../../Services/departmentService";
import { fetchDays, fetchTimeslots } from "../../Services/timeslotService";

import {
  fetchAvailableRoomSchedules,
  fetchSelectedRoomSchedules,
  addRoomSchedule,
  removeRoomSchedule,
} from "../../Services/roomScheduleService";

const RoomSchedule = () => {
  const [departments, setDepartments] = useState([]);
  const [days, setDays] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [availableRoomSchedules, setAvailableRoomSchedules] = useState([]);
  const [selectedRoomSchedules, setSelectedRoomSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionStatus, setActionStatus] = useState({ type: null, message: null });
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [allDepartments, allDays, allTimeslots] = await Promise.all([
          fetchDepartments(),
          fetchDays(),
          fetchTimeslots(),
        ]);
        setDepartments(allDepartments || []);
        setDays(allDays || []);
        setTimeslots(allTimeslots || []);
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Failed to load initial data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const fetchRoomScheduleData = async (departmentId) => {
    if (!departmentId) {
      console.error("Invalid departmentId:", departmentId);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [availableSchedules, selectedSchedules] = await Promise.all([
        fetchAvailableRoomSchedules(departmentId),
        fetchSelectedRoomSchedules(departmentId),
      ]);

      console.log("Available Room Schedules:", availableSchedules); // Debugging log
      console.log("Selected Room Schedules:", selectedSchedules); // Debugging log

      setAvailableRoomSchedules(availableSchedules || []);
      setSelectedRoomSchedules(selectedSchedules || []);
    } catch (err) {
      console.error("Error fetching room schedules:", err);
      setError("Failed to load room schedules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDepartmentId) {
      fetchRoomScheduleData(selectedDepartmentId);
    }
  }, [selectedDepartmentId]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartmentId(e.target.value);
  };

  const handleAddSchedule = async (schedule) => {
    try {
      // Use the IDs directly from the mapped schedule
      const payload = {
        roomId: schedule.roomId,
        dayId: schedule.dayId,
        timeslotId: schedule.timeslotId,
        isOccupied: schedule.isOccupied || false,
        departmentId: selectedDepartmentId,
        isChosen: true,
      };

      console.log("Adding schedule with payload:", payload);
      setActionStatus({ type: 'loading', message: 'Adding schedule...' });
      await addRoomSchedule(payload);
      await fetchRoomScheduleData(selectedDepartmentId);
      setActionStatus({ type: 'success', message: 'Schedule added successfully' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error adding schedule:", err);
      setActionStatus({ type: 'error', message: 'Failed to add schedule. Please try again.' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    }
  };

  const handleRemoveSchedule = async (schedule) => {
    try {
      setActionStatus({ type: 'loading', message: 'Removing schedule...' });
      await removeRoomSchedule(schedule); // Pass the full schedule object
      await fetchRoomScheduleData(selectedDepartmentId);
      setActionStatus({ type: 'success', message: 'Schedule removed successfully' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error removing schedule:", err);
      setActionStatus({ type: 'error', message: 'Failed to remove schedule. Please try again.' });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    }
  };

  // Filter departments based on search
  const filteredDepartments = departments.filter(dept =>
    dept.departmentName.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  // Filter available schedules based on search
  const filteredAvailableSchedules = availableRoomSchedules.filter(schedule =>
    (schedule.roomName?.toLowerCase() || "").includes(searchAvailable.toLowerCase()) ||
    (schedule.dayName?.toLowerCase() || "").includes(searchAvailable.toLowerCase()) ||
    (schedule.startTime?.toLowerCase() || "").includes(searchAvailable.toLowerCase())
  );

  // Filter selected schedules based on search
  const filteredSelectedSchedules = selectedRoomSchedules.filter(schedule =>
    (schedule.roomName?.toLowerCase() || "").includes(searchSelected.toLowerCase()) ||
    (schedule.dayName?.toLowerCase() || "").includes(searchSelected.toLowerCase()) ||
    (schedule.startTime?.toLowerCase() || "").includes(searchSelected.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 mx-auto bg-gray-100 min-h-screen w-full">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Room Schedules</h1>

      {/* Informational Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          It lets you view the available rooms and their schedules, and you can select the one that fits a department.
        </p>
      </div>
      {/* Removed the container with the title and back button */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Department Selection</h4>
          {/* Removed the search department field */}
          {loading && !selectedDepartmentId ? (
            <div className="flex items-center justify-center py-4">
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
              className="w-full px-4 py-2 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select a Department --</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {selectedDepartmentId && (
        <>
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-700">Loading room schedules...</span>
            </div>
          ) : (
            <div>
              {/* Feedback Section */}
              {actionStatus.message && (
                <div className={`mb-6 p-4 rounded-lg text-sm flex items-center shadow-lg ${
                  actionStatus.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 
                  actionStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                  'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {actionStatus.type === 'loading' && (
                    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {actionStatus.type === 'success' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {actionStatus.type === 'error' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{actionStatus.message}</span>
                </div>
              )}

              {/* Tables Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Available Room Schedules */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                    <h4 className="text-lg font-semibold text-blue-800 mb-1">Available Room Schedules</h4>
                    <p className="text-sm text-gray-500 mb-4">Click to add a schedule to your department</p>
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={searchAvailable}
                        onChange={(e) => setSearchAvailable(e.target.value)}
                        placeholder="Search available schedules..."
                        className="w-full px-4 py-2 pr-10 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="available-schedules-container h-[60vh] overflow-y-auto">
                      {filteredAvailableSchedules.length > 0 ? (
                        <div className="overflow-x-auto ring-1 ring-gray-200 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {filteredAvailableSchedules.map((schedule, index) => (
                                <tr key={index} className="hover:bg-blue-50 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {schedule.roomName || "N/A"}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {schedule.roomType || "N/A"}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {schedule.dayName || "N/A"}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {schedule.startTime && schedule.endTime
                                      ? `${schedule.startTime} - ${schedule.endTime}`
                                      : "N/A"}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <button
                                      onClick={() => handleAddSchedule(schedule)}
                                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors flex items-center"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                      </svg>
                                      Add
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No available schedules</h3>
                          <p className="mt-1 text-sm text-gray-500">There are no available room schedules for this department.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-right">
                    <span className="text-xs text-gray-500">
                      {filteredAvailableSchedules.length} schedule{filteredAvailableSchedules.length !== 1 ? 's' : ''} available
                    </span>
                  </div>
                </div>

                {/* Selected Room Schedules */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
                    <h4 className="text-lg font-semibold text-green-800 mb-1">Department Room Schedules</h4>
                    <p className="text-sm text-gray-500 mb-4">Currently assigned room schedules for this department</p>
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={searchSelected}
                        onChange={(e) => setSearchSelected(e.target.value)}
                        placeholder="Search selected schedules..."
                        className="w-full px-4 py-2 pr-10 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="selected-schedules-container h-[60vh] overflow-y-auto">
                      {filteredSelectedSchedules.length > 0 ? (
                        <div className="overflow-x-auto ring-1 ring-gray-200 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {filteredSelectedSchedules.map((schedule, index) => (
                                <tr key={index} className="hover:bg-green-50 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {schedule.roomName}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {schedule.roomType}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {schedule.dayName}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {schedule.startTime} - {schedule.endTime}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <button
                                      onClick={() => handleRemoveSchedule(schedule)}
                                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors flex items-center"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                      </svg>
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No schedules</h3>
                          <p className="mt-1 text-sm text-gray-500">No room schedules assigned to this department yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-right">
                    <span className="text-xs text-gray-500">
                      {filteredSelectedSchedules.length} schedule{filteredSelectedSchedules.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {actionStatus.message && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg text-sm flex items-center shadow-lg animate-fadeIn ${
          actionStatus.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 
          actionStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
          'bg-blue-100 text-blue-700 border border-blue-200'
        }`}>
          {actionStatus.type === 'loading' && (
            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {actionStatus.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {actionStatus.type === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <span>{actionStatus.message}</span>
        </div>
      )}
    </div>
  );
};

export default RoomSchedule;
