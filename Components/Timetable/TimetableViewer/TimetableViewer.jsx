import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimetableViewer = () => {
  const [timetableData, setTimetableData] = useState({
    classes: [],
    days: [],
    timeslots: [],
    timetable: {}
  });
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const API_BASE = 'http://localhost:8001/api';

  const fetchTimetableData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/timetable/formatted_view/`);
      setTimetableData(response.data);
    } catch (error) {
      console.error('Failed to fetch timetable:', error);
      alert('Error fetching timetable data.');
    } finally {
      setLoading(false);
    }
  };

  const generateTimetable = async () => {
    setGenerating(true);
    try {
      await axios.post(`${API_BASE}/timetable/generate/`);
      setTimetableData({ classes: [], days: [], timeslots: [], timetable: {} });
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Failed to generate timetable:', error);
      alert('Failed to generate timetable. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const downloadPDF = (classId = null) => {
    const url = classId ? 
      `${API_BASE}/timetable/download_pdf/?class_id=${classId}` : 
      `${API_BASE}/timetable/download_pdf/`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchTimetableData();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <svg className="animate-spin h-8 w-8 mr-3 text-blue-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading timetable...</span>
      </div>
    );
  }

  if (timetableData.classes.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">School Timetable</h1>
        <button 
          onClick={generateTimetable} 
          disabled={generating} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center mx-auto"
        >
          {generating && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {generating ? 'Generating...' : 'Generate New Timetable'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">School Timetable</h1>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button
            onClick={generateTimetable}
            disabled={generating}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center transition-colors"
          >
            {generating && (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {generating ? 'Generating...' : 'Generate New Timetable'}
          </button>
          
          <button
            onClick={() => downloadPDF()}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Download All PDFs
          </button>
        </div>
      </div>

      {timetableData.classes.map((cls) => (
        <div key={cls.id} className="border rounded-lg shadow-sm p-4 bg-white mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Class: {cls.name}</h2>
            <button
              onClick={() => downloadPDF(cls.id)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
            >
              Download PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Day / Time</th>
                  {timetableData.timeslots.map((ts) => (
                    <th key={ts.id} className="border p-2 text-sm whitespace-nowrap">
                      {ts.start_time} – {ts.end_time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableData.days.map((day) => (
                  <tr key={day.id}>
                    <td className="border p-2 font-medium whitespace-nowrap">{day.name}</td>
                    {timetableData.timeslots.map((ts) => {
                      const entry = timetableData.timetable[cls.id]?.[day.id]?.[ts.id];
                      const subject = entry?.subject || '—';
                     

                      return (
                        <td key={ts.id} className="border p-2 text-sm text-center">
                          <div>{subject}</div>
                         
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimetableViewer;