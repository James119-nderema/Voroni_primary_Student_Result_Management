// components/AddTimeSlotModal.js
import React, { useState } from 'react';
import TimeService from '../../Services/TimeService';
import TimeInput from './TimeInput';

const AddTimeSlotModal = ({ isOpen, onClose, timeSlots, setTimeSlots }) => {
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkSlots, setBulkSlots] = useState([{ start_time: '', end_time: '' }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBulkInputChange = (index, e) => {
    const { name, value } = e.target;
    const newBulkSlots = [...bulkSlots];
    newBulkSlots[index] = {
      ...newBulkSlots[index],
      [name]: value
    };
    setBulkSlots(newBulkSlots);
  };

  const addBulkSlot = () => {
    setBulkSlots([...bulkSlots, { start_time: '', end_time: '' }]);
  };

  const removeBulkSlot = (index) => {
    const newBulkSlots = bulkSlots.filter((_, i) => i !== index);
    setBulkSlots(newBulkSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isBulkMode) {
        // Validate bulk slots
        const invalidSlot = bulkSlots.find(slot => !slot.start_time || !slot.end_time);
        if (invalidSlot) {
          setError('All time slots must have both start and end times');
          setLoading(false);
          return;
        }

        // Validate time format
        const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        const invalidTimeFormat = bulkSlots.find(
          slot => !timeFormatRegex.test(slot.start_time) || !timeFormatRegex.test(slot.end_time)
        );
        
        if (invalidTimeFormat) {
          setError('Time must be in the format HH:MM (e.g., 8:00, 17:30)');
          setLoading(false);
          return;
        }

        const response = await TimeService.bulkCreate(bulkSlots);
        setTimeSlots([...timeSlots, ...response.data]);
      } else {
        // Validate single slot
        if (!formData.start_time || !formData.end_time) {
          setError('Both start and end times are required');
          setLoading(false);
          return;
        }

        // Validate time format
        const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(formData.start_time) || !timeFormatRegex.test(formData.end_time)) {
          setError('Time must be in the format HH:MM (e.g., 8:00, 17:30)');
          setLoading(false);
          return;
        }

        const response = await TimeService.create(formData);
        setTimeSlots([...timeSlots, response.data]);
      }
      
      onClose();
    } catch (err) {
      console.error('Error creating time slot:', err);
      setError(err.response?.data?.message || 'Failed to create time slot');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isBulkMode ? 'Add Multiple Time Slots' : 'Add Time Slot'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isBulkMode}
              onChange={() => setIsBulkMode(!isBulkMode)}
              className="form-checkbox"
            />
            <span className="ml-2">Bulk Add Mode</span>
          </label>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isBulkMode ? (
            <div className="mb-4">
              {bulkSlots.map((slot, index) => (
                <div key={index} className="mb-4 p-3 border border-gray-200 rounded">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Slot #{index + 1}</h3>
                    {bulkSlots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBulkSlot(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <TimeInput
                      name="start_time"
                      value={slot.start_time}
                      onChange={(e) => handleBulkInputChange(index, e)}
                      placeholder="HH:MM (e.g., 8:00)"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <TimeInput
                      name="end_time"
                      value={slot.end_time}
                      onChange={(e) => handleBulkInputChange(index, e)}
                      placeholder="HH:MM (e.g., 17:30)"
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addBulkSlot}
                className="mb-4 text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Another Slot
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <TimeInput
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  placeholder="HH:MM (e.g., 8:00)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <TimeInput
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  placeholder="HH:MM (e.g., 17:30)"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimeSlotModal;