import { useState, useEffect } from 'react';
import TimeService from '../../Services/TimeService';

export default function TimeSlots() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [isBulkAdd, setIsBulkAdd] = useState(false);
  
  // Form states
  const emptySlot = { start_time: '', end_time: '' };
  const [formData, setFormData] = useState([emptySlot]);

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      setLoading(true);
      const response = await TimeService.getAll();
      setTimeSlots(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching time slots:", err);
      setError("Failed to load time slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this time slot?")) {
      try {
        await TimeService.delete(id);
        setTimeSlots(timeSlots.filter(slot => slot.id !== id));
      } catch (err) {
        console.error("Error deleting time slot:", err);
        setError("Failed to delete time slot. Please try again.");
      }
    }
  };

  const handleEdit = (slot) => {
    setCurrentSlot(slot);
    setFormData([{ start_time: slot.start_time, end_time: slot.end_time }]);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedSlot = await TimeService.update(currentSlot.id, formData[0]);
      setTimeSlots(timeSlots.map(slot => 
        slot.id === currentSlot.id ? updatedSlot.data : slot
      ));
      setIsEditModalOpen(false);
      setCurrentSlot(null);
    } catch (err) {
      console.error("Error updating time slot:", err);
      setError("Failed to update time slot. Please try again.");
    }
  };

  const handleAdd = async () => {
    try {
      if (isBulkAdd) {
        const response = await TimeService.bulkCreate(formData);
        setTimeSlots([...timeSlots, ...response.data]);
      } else {
        const response = await TimeService.create(formData[0]);
        setTimeSlots([...timeSlots, response.data]);
      }
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error adding time slot(s):", err);
      setError("Failed to add time slot(s). Please try again.");
    }
  };

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [field]: value };
    setFormData(newFormData);
  };

  const addAnotherSlot = () => {
    setFormData([...formData, emptySlot]);
  };

  const removeSlot = (index) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const resetForm = () => {
    setFormData([emptySlot]);
    setIsBulkAdd(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading time slots...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Time Slots</h1>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Time Slot
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <tr key={slot.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.start_time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.end_time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(slot)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(slot.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No time slots found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Time Slot</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={isBulkAdd} 
                  onChange={() => setIsBulkAdd(!isBulkAdd)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Bulk Add</span>
              </label>
            </div>

            {formData.map((slot, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={slot.start_time}
                    onChange={(e) => handleInputChange(index, 'start_time', e.target.value)}
                    placeholder="e.g. 8:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={slot.end_time}
                    onChange={(e) => handleInputChange(index, 'end_time', e.target.value)}
                    placeholder="e.g. 9:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {isBulkAdd && formData.length > 1 && (
                  <button
                    onClick={() => removeSlot(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {isBulkAdd && (
              <button
                onClick={addAnotherSlot}
                className="mb-6 w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-lg text-blue-600 hover:text-blue-800 hover:border-blue-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Another
              </button>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Time Slot</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Time
              </label>
              <input
                type="text"
                value={formData[0].start_time}
                onChange={(e) => handleInputChange(0, 'start_time', e.target.value)}
                placeholder="e.g. 8:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Time
              </label>
              <input
                type="text"
                value={formData[0].end_time}
                onChange={(e) => handleInputChange(0, 'end_time', e.target.value)}
                placeholder="e.g. 9:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}