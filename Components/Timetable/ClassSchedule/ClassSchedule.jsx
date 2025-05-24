import React, { useState, useEffect, useRef } from 'react';
import classScheduleService from '../Services/ClassScheduleService';

const ClassSchedule = () => {
  const [classes, setClasses] = useState([]);
  const [days, setDays] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTimeslots, setSelectedTimeslots] = useState([]);
  const [existingSchedules, setExistingSchedules] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const messageTimeoutRef = useRef(null);

  // Helper function to set message with auto-clear for success messages
  const setMessageWithTimeout = (messageObj) => {
    // Clear any existing timeout
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    // Set the message
    setMessage(messageObj);
    
    // If it's a success message, set a timeout to clear it
    if (messageObj.type === 'success') {
      messageTimeoutRef.current = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000); // 3 seconds timeout
    }
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [classData, dayData, timeslotData, schedulesData] = await Promise.all([
          classScheduleService.getAllClasses(),
          classScheduleService.getAllDays(),
          classScheduleService.getAllTimeSlots(),
          classScheduleService.getAllClassSchedules()
        ]);

        setClasses(classData);
        setDays(dayData);
        setTimeslots(timeslotData);
        setSelectedTimeslots([]);
        setExistingSchedules({});
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setMessageWithTimeout({ type: 'error', text: 'Failed to load data. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    setSelectedDay('');
    setSelectedTimeslots([]);
    setExistingSchedules({});

    if (classId) {
      setLoading(true);
      try {
        const classSchedules = await classScheduleService.getSchedulesByClass(classId);
        const newExistingSchedules = {};
        classSchedules.forEach(schedule => {
          const timeslotId = schedule.timeslot;
          newExistingSchedules[timeslotId] = schedule.id;
        });
        setExistingSchedules(newExistingSchedules);
      } catch (error) {
        console.error('Error fetching class schedules:', error);
        setMessageWithTimeout({ type: 'error', text: 'Failed to load class schedules.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDayChange = async (e) => {
    const dayId = e.target.value;
    setSelectedDay(dayId);
    setSelectedTimeslots([]);
    setExistingSchedules({});

    if (selectedClass && dayId) {
      setLoading(true);
      try {
        const classSchedules = await classScheduleService.getSchedulesByClassAndDay(selectedClass, dayId);
        const newExistingSchedules = {};
        classSchedules.forEach(schedule => {
          const timeslotId = schedule.timeslot;
          newExistingSchedules[timeslotId] = schedule.id;
        });
        setExistingSchedules(newExistingSchedules);
      } catch (error) {
        console.error('Error fetching class schedules for day:', error);
        setMessageWithTimeout({ type: 'error', text: 'Failed to load class schedules for the selected day.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleTimeslotSelection = (timeslotId) => {
    setSelectedTimeslots(prev => {
      if (prev.includes(timeslotId)) {
        return prev.filter(id => id !== timeslotId);
      } else {
        return [...prev, timeslotId];
      }
    });
  };

  const handleSelectAll = () => {
    if (!selectedDay || !selectedClass) return;

    const availableTimeslots = timeslots
      .filter(timeslot => !existingSchedules[timeslot.id])
      .map(timeslot => timeslot.id);

    const allSelected = availableTimeslots.every(id => selectedTimeslots.includes(id));

    if (allSelected) {
      setSelectedTimeslots([]);
    } else {
      setSelectedTimeslots(availableTimeslots);
    }
  };

  const handleDeleteSchedule = async (timeslotId) => {
    if (!selectedClass) {
      setMessageWithTimeout({ type: 'error', text: 'Please select a class.' });
      return;
    }

    setLoading(true);
    try {
      const scheduleId = existingSchedules[timeslotId];

      if (scheduleId) {
        await classScheduleService.deleteClassSchedule(scheduleId);

        setMessageWithTimeout({ type: 'success', text: 'Schedule removed successfully!' });

        setExistingSchedules(prev => {
          const updated = { ...prev };
          delete updated[timeslotId];
          return updated;
        });
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      setMessageWithTimeout({ type: 'error', text: 'Failed to remove schedule. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedClass) {
      setMessageWithTimeout({ type: 'error', text: 'Please select a class.' });
      return;
    }

    if (!selectedDay) {
      setMessageWithTimeout({ type: 'error', text: 'Please select a day.' });
      return;
    }

    const newSchedules = selectedTimeslots
      .filter(timeslotId => !existingSchedules[timeslotId])
      .map(timeslotId => ({
        class_name: parseInt(selectedClass),
        day: parseInt(selectedDay),
        timeslot: parseInt(timeslotId)
      }));

    if (newSchedules.length === 0) {
      setMessageWithTimeout({ type: 'info', text: 'No new timeslots were selected for scheduling.' });
      return;
    }

    setLoading(true);
    try {
      let response;

      if (newSchedules.length === 1) {
        const schedule = newSchedules[0];
        response = await classScheduleService.createClassSchedule(
          schedule.class_name,
          schedule.day,
          schedule.timeslot
        );

        setExistingSchedules(prev => ({
          ...prev,
          [schedule.timeslot]: response.id
        }));
      } else {
        response = await classScheduleService.createBulkClassSchedules(newSchedules);

        const allSchedules = await classScheduleService.getAllClassSchedules();

        const newExistingSchedules = { ...existingSchedules };
        newSchedules.forEach(schedule => {
          const existingSchedule = allSchedules.find(
            s => s.class_name === schedule.class_name && 
                s.day === schedule.day && 
                s.timeslot === schedule.timeslot
          );
          if (existingSchedule) {
            newExistingSchedules[schedule.timeslot] = existingSchedule.id;
          }
        });
        setExistingSchedules(newExistingSchedules);
      }

      setMessageWithTimeout({
        type: 'success', 
        text: `${newSchedules.length} timeslot${newSchedules.length > 1 ? 's' : ''} scheduled successfully!`
      });

      setSelectedTimeslots([]);
    } catch (error) {
      console.error('Error saving schedules:', error);
      setMessageWithTimeout({ type: 'error', text: 'Failed to save schedules. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const newSelectedCount = selectedTimeslots.filter(id => !existingSchedules[id]).length;

  const formatTime = (timeslot) => {
    if (!timeslot) return '';
    return `${timeslot.start_time} - ${timeslot.end_time}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Class Schedule Management</h1>

      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 
          message.type === 'info' ? 'bg-blue-100 text-blue-700' : 
          'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <select
            id="classSelect"
            value={selectedClass}
            onChange={handleClassChange}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">-- Select a Class --</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="daySelect" className="block text-sm font-medium text-gray-700 mb-2">
            Select Day
          </label>
          <select
            id="daySelect"
            value={selectedDay}
            onChange={handleDayChange}
            disabled={loading || !selectedClass}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">-- Select a Day --</option>
            {days.map((day) => (
              <option key={day.id} value={day.id}>
                {day.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Available Timeslots</h2>
          <button
            onClick={handleSubmit}
            disabled={loading || newSelectedCount === 0 || !selectedDay}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : `Assign ${newSelectedCount} Timeslot${newSelectedCount !== 1 ? 's' : ''}`}
          </button>
        </div>

        {loading && !selectedClass ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading timeslots...</p>
          </div>
        ) : !selectedDay && selectedClass ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Please select a day to view available timeslots</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeslot
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  <div className="flex justify-center items-center">
                    <span className="mr-2">Action</span>
                    {timeslots.length > 0 && selectedDay && (
                      <button
                        onClick={handleSelectAll}
                        disabled={loading || !selectedDay}
                        className="px-2 py-1 text-xs font-medium rounded bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      >
                        {timeslots.filter(t => !existingSchedules[t.id]).every(t => selectedTimeslots.includes(t.id)) 
                          ? 'Unselect All' 
                          : 'Select All'}
                      </button>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeslots.length > 0 ? (
                timeslots.map((timeslot) => (
                  <tr key={timeslot.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(timeslot)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {existingSchedules[timeslot.id] ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Scheduled
                        </span>
                      ) : selectedTimeslots.includes(timeslot.id) ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Selected
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {existingSchedules[timeslot.id] ? (
                        <button
                          onClick={() => handleDeleteSchedule(timeslot.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleTimeslotSelection(timeslot.id)}
                          disabled={loading || !selectedDay}
                          className={`px-3 py-1 text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            selectedTimeslots.includes(timeslot.id)
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
                          }`}
                        >
                          {selectedTimeslots.includes(timeslot.id) ? 'Selected' : 'Select'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No timeslots available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {timeslots.length > 0 && selectedClass && selectedDay && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
            <span className="font-medium">Total Timeslots:</span> {timeslots.length}
          </div>
          <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
            <span className="font-medium">Currently Scheduled:</span> {Object.keys(existingSchedules).length}
          </div>
          <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
            <span className="font-medium">New Selected:</span> {newSelectedCount}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;
