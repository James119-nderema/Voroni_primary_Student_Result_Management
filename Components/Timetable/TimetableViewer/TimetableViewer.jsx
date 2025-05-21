import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimetableViewer = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [days, setDays] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchTimetableData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8001/api/timetable/timetable/');
      const data = response.data;
      
      // Process the timetable data
      setTimetableData(data);
      
      // Extract unique classes, days, and timeslots from the timetable data
      const uniqueClasses = [];
      const uniqueDays = [];
      const uniqueTimeslots = [];
      
      // Create maps to track IDs we've already seen
      const classMap = new Map();
      const dayMap = new Map();
      const timeslotMap = new Map();
      
      // Process all timetable entries
      data.forEach(entry => {
        // Extract class info
        if (entry.class_id && !classMap.has(entry.class_id)) {
          classMap.set(entry.class_id, true);
          uniqueClasses.push({ 
            id: entry.class_id, 
            name: entry.class_name 
          });
        }
        
        // Extract day info
        if (entry.day_id && !dayMap.has(entry.day_id)) {
          dayMap.set(entry.day_id, true);
          uniqueDays.push({ 
            id: entry.day_id, 
            name: entry.day_name 
          });
        }
        
        // Extract timeslot info
        if (entry.timeslot_id && !timeslotMap.has(entry.timeslot_id)) {
          timeslotMap.set(entry.timeslot_id, true);
          const [start_time, end_time] = entry.timeslot_info.split(' - ');
          uniqueTimeslots.push({ 
            id: entry.timeslot_id, 
            start_time, 
            end_time 
          });
        }
      });
      
      // Sort days and timeslots by ID to ensure correct order
      uniqueDays.sort((a, b) => a.id - b.id);
      uniqueTimeslots.sort((a, b) => a.id - b.id);
      uniqueClasses.sort((a, b) => a.id - b.id);
      
      setClasses(uniqueClasses);
      setDays(uniqueDays);
      setTimeslots(uniqueTimeslots);
    } catch (error) {
      console.error('Failed to fetch timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTimetable = async () => {
    setGenerating(true);
    try {
      await axios.post('http://localhost:8001/api/timetable/timetable/');
      // Reset data to ensure clean reload
      setTimetableData([]);
      setClasses([]);
      setDays([]);
      setTimeslots([]);
      // Update refresh key to trigger useEffect
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Failed to generate timetable:', error);
      alert('Failed to generate timetable. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, [refreshKey]);

  if (loading) return <div className="text-center p-4">Loading timetable...</div>;

  // Organize timetable data for easy lookup
  const organizedTimetable = {};
  timetableData.forEach(entry => {
    if (!organizedTimetable[entry.class_id]) {
      organizedTimetable[entry.class_id] = {};
    }
    if (!organizedTimetable[entry.class_id][entry.day_id]) {
      organizedTimetable[entry.class_id][entry.day_id] = {};
    }
    organizedTimetable[entry.class_id][entry.day_id][entry.timeslot_id] = entry;
  });

  return (
    <div className="p-4 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">School Timetable</h1>
        <button 
          onClick={generateTimetable}
          disabled={generating || loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center transition-colors"
        >
          {generating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : "Generate New Timetable"}
        </button>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-8">
          <svg className="animate-spin mb-4 h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg">Loading timetable data...</p>
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-gray-50">
          <p className="text-lg mb-4">No timetable data available.</p>
          <p>Click the "Generate New Timetable" button to create a timetable.</p>
        </div>
      ) : (
        classes.map((cls) => (
          <div key={cls.id} className="border rounded-xl shadow-md p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">Class: {cls.name}</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Day / Time</th>
                  {timeslots.map((ts) => (
                    <th key={ts.id} className="border p-2 text-sm">
                      {ts.start_time} - {ts.end_time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day.id}>
                    <td className="border p-2 font-medium">{day.name}</td>
                    {timeslots.map((ts) => {
                      const entry = organizedTimetable[cls.id]?.[day.id]?.[ts.id];
                      return (
                        <td key={ts.id} className="border p-2 text-sm text-center">
                          {entry ? entry.subject_name : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default TimetableViewer;