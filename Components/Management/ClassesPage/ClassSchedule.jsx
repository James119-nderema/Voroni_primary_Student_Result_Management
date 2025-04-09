'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { 
  fetchSelectedSchedules, 
  fetchAvailableSchedules, 
  addSchedule, 
  deleteSchedule 
} from "../../Services/classScheduleService";
import { fetchClasses } from "../../Services/classService"; // Import the API function to fetch all classes

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassSchedulePage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [actionStatus, setActionStatus] = useState({ type: null, message: null });
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    message: "",
    onConfirm: null,
  });
  const router = useRouter();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const allClasses = await fetchClasses();
        setClasses(allClasses || []);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to load classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const fetchScheduleData = async (classId) => {
    if (!classId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [selected, available] = await Promise.all([
        fetchSelectedSchedules(classId),
        fetchAvailableSchedules(classId)
      ]);
      
      setSelectedSchedules(selected || []);
      setAvailableSchedules(available || []);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError("Failed to load schedules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassId) {
      fetchScheduleData(selectedClassId);
    }
  }, [selectedClassId]);

  const handleClassChange = (e) => {
    setSelectedClassId(e.target.value);
    setSelectedScheduleId("");
  };

  const handleAddSchedule = async () => {
    if (!selectedScheduleId) {
      setActionStatus({ 
        type: 'error', 
        message: 'Please select a schedule first' 
      });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
      return;
    }
    
    try {
      setActionStatus({ type: 'loading', message: 'Adding schedule...' });

      // Get selected schedule using the index 
      const selectedIndex = parseInt(selectedScheduleId);
      const selectedSchedule = availableSchedules[selectedIndex];

      if (!selectedSchedule) {
        console.error("Selected schedule not found at index:", selectedIndex);
        setActionStatus({ 
          type: 'error', 
          message: 'Failed to retrieve selected schedule details' 
        });
        return;
      }

      // Create the schedule data with the required fields
      const newSchedule = {
        classId: parseInt(selectedClassId),
        dayName: selectedSchedule.dayName,
        startTime: selectedSchedule.startTime,
        endTime: selectedSchedule.endTime
      };
      
      await addSchedule(newSchedule);
      await fetchScheduleData(selectedClassId);
      setSelectedScheduleId("");
      setActionStatus({ 
        type: 'success', 
        message: 'Schedule added successfully' 
      });
      setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
    } catch (err) {
      console.error("Error adding schedule:", err);
      setActionStatus({ 
        type: 'error', 
        message: 'Failed to add schedule. Please try again.' 
      });
    }
  };

  const handleDeleteSchedule = async (schedule) => {
    setConfirmationDialog({
      isOpen: true,
      message: `Are you sure you want to delete the schedule for ${schedule.dayName} (${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)})?`,
      onConfirm: async () => {
        setConfirmationDialog({ isOpen: false, message: "", onConfirm: null });
        try {
          setActionStatus({ type: 'loading', message: 'Removing schedule...' });

          await deleteSchedule(schedule);
          await fetchScheduleData(selectedClassId);
          setActionStatus({ type: 'success', message: 'Schedule removed successfully' });
          setTimeout(() => setActionStatus({ type: null, message: null }), 3000);
        } catch (err) {
          console.error("Error deleting schedule:", err);
          setActionStatus({ type: 'error', message: 'Failed to delete schedule. Please try again.' });
        }
      },
    });
  };

  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
      return `${formattedHour}:${minutes} ${period}`;
    } catch (e) {
      return timeString;
    }
  };

  return (
    <div className="p-4 sm:p-6 mx-auto bg-gray-50 min-h-screen w-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl text-green-900 font-bold">Class Schedule Management</h3>
          <p className="text-sm text-gray-600">
            Manage time slots for classes
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-3 sm:mt-0 px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Back to Classes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Select a Class</h4>
          {loading && !selectedClassId ? (
            <div className="flex items-center justify-center py-4">
              <svg className="animate-spin h-5 w-5 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Loading classes...</span>
            </div>
          ) : (
            <select
              value={selectedClassId}
              onChange={handleClassChange}
              className="w-full px-4 py-2 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select a Class --</option>
              {classes.map((cls) => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.classCode} (Size: {cls.classSize})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {actionStatus.message && (
        <div className={`mb-6 p-3 rounded-lg text-xs flex items-center ${
          actionStatus.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 
          actionStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
          'bg-blue-100 text-blue-700 border border-blue-200'
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

      {selectedClassId ? (
        loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading schedules...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h4 className="text-md font-semibold text-gray-800 mb-4">Add New Schedule</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={selectedScheduleId}
                    onChange={(e) => setSelectedScheduleId(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={availableSchedules.length === 0}
                  >
                    <option value="">Select an available schedule</option>
                    {availableSchedules.map((schedule, index) => (
                      <option
                        key={`schedule-${index}`}
                        value={index}
                      >
                        {schedule.dayName} ({formatTime(schedule.startTime)} - {formatTime(schedule.endTime)})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddSchedule}
                    disabled={!selectedScheduleId}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Schedule
                  </button>
                </div>
                {availableSchedules.length === 0 && (
                  <p className="mt-3 text-sm text-gray-500">No available schedules to add.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h4 className="text-md font-semibold text-gray-800 mb-4">Current Schedules</h4>
                {selectedSchedules.length > 0 ? (
                  <div className="overflow-x-auto ring-1 ring-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedSchedules.map((schedule) => (
                          <tr key={schedule.id || `${schedule.classId}-${schedule.dayName}-${schedule.startTime}`} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                              {schedule.dayName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {formatTime(schedule.startTime)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {formatTime(schedule.endTime)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => handleDeleteSchedule(schedule)}
                                className="text-red-600 hover:text-red-900 font-medium"
                              >
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
                    <p className="mt-1 text-sm text-gray-500">No schedules assigned to this class yet.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="text-center p-12 bg-gray-50">
            <svg className="mx-auto h-16 w-16 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Select a class to manage schedules</h3>
            <p className="mt-2 text-base text-gray-600">
              Please select a class from the dropdown above to view and manage its schedules.
            </p>
          </div>
        </div>
      )}

      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        message={confirmationDialog.message}
        onConfirm={confirmationDialog.onConfirm}
        onCancel={() => setConfirmationDialog({ isOpen: false, message: "", onConfirm: null })}
      />
    </div>
  );
};

export default ClassSchedulePage;

