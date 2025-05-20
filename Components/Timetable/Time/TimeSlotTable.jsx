// components/TimeSlotTable.js
import React, { useEffect, useState } from 'react';
import TimeService from '../../Services/TimeService';

const TimeSlotTable = ({ timeSlots, setTimeSlots }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTimeSlots();
  }, []);

  const loadTimeSlots = async () => {
    try {
      setLoading(true);
      const response = await TimeService.getAll();
      setTimeSlots(response.data);
      setError(null);
    } catch (err) {
      console.error('Error loading time slots:', err);
      setError('Failed to load time slots. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      try {
        await TimeService.delete(id);
        setTimeSlots(timeSlots.filter(slot => slot.id !== id));
      } catch (err) {
        console.error('Error deleting time slot:', err);
        alert('Failed to delete time slot');
      }
    }
  };

  if (loading) return <p>Loading time slots...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Time Slots</h2>
      {timeSlots.length === 0 ? (
        <p>No time slots found. Add some using the button above.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Start Time</th>
              <th className="py-2 px-4 border-b">End Time</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{slot.id}</td>
                <td className="py-2 px-4 border-b">{slot.start_time}</td>
                <td className="py-2 px-4 border-b">{slot.end_time}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeSlotTable;