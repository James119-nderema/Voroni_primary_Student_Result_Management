import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaysManager = () => {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentDay, setCurrentDay] = useState({ id: null, name: '' });
  
  // Bulk add states
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [newDays, setNewDays] = useState([{ name: '' }]);

  // API base URL
  const API_URL = 'http://127.0.0.1:8001/days/';

  // Fetch all days
  const fetchDays = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setDays(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch days');
      console.error('Error fetching days:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load days on component mount
  useEffect(() => {
    fetchDays();
  }, []);

  // Handle input change for edit mode
  const handleInputChange = (e) => {
    setCurrentDay({ ...currentDay, name: e.target.value });
  };

  // Handle input change for bulk add mode
  const handleBulkInputChange = (index, value) => {
    const updatedDays = [...newDays];
    updatedDays[index].name = value;
    setNewDays(updatedDays);
  };

  // Add another day input field in bulk mode
  const addAnotherDay = () => {
    setNewDays([...newDays, { name: '' }]);
  };

  // Remove a day input field in bulk mode
  const removeDay = (index) => {
    const updatedDays = [...newDays];
    updatedDays.splice(index, 1);
    setNewDays(updatedDays);
  };

  // Open modal for adding a new day
  const openAddModal = () => {
    setModalMode('add');
    setCurrentDay({ id: null, name: '' });
    setIsBulkMode(false);
    setNewDays([{ name: '' }]);
    setIsModalOpen(true);
  };

  // Open modal for editing a day
  const openEditModal = (day) => {
    setModalMode('edit');
    setCurrentDay(day);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Create a new day
  const createDay = async () => {
    try {
      if (isBulkMode) {
        // Filter out empty entries
        const validDays = newDays.filter(day => day.name.trim() !== '');
        
        if (validDays.length === 0) {
          setError('Please enter at least one day name');
          return;
        }
        
        // Use bulk create endpoint
        await axios.post(`${API_URL}bulk_create/`, validDays);
      } else {
        // Single day creation
        if (currentDay.name.trim() === '') {
          setError('Day name cannot be empty');
          return;
        }
        await axios.post(API_URL, currentDay);
      }
      
      fetchDays();
      closeModal();
      setError(null);
    } catch (err) {
      setError('Failed to create day(s)');
      console.error('Error creating day(s):', err);
    }
  };

  // Update a day
  const updateDay = async () => {
    try {
      if (currentDay.name.trim() === '') {
        setError('Day name cannot be empty');
        return;
      }
      
      await axios.put(`${API_URL}${currentDay.id}/`, currentDay);
      fetchDays();
      closeModal();
      setError(null);
    } catch (err) {
      setError('Failed to update day');
      console.error('Error updating day:', err);
    }
  };

  // Delete a day
  const deleteDay = async (id) => {
    if (window.confirm('Are you sure you want to delete this day?')) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        fetchDays();
        setError(null);
      } catch (err) {
        setError('Failed to delete day');
        console.error('Error deleting day:', err);
      }
    }
  };

  // Submit handler for the modal form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      createDay();
    } else {
      updateDay();
    }
  };

  // Toggle bulk mode
  const toggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    if (!isBulkMode) {
      setNewDays([{ name: '' }]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Days Manager</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Day
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day Name
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {days.length > 0 ? (
                days.map((day) => (
                  <tr key={day.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {day.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {day.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(day)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDay(day.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-sm text-gray-500 text-center">
                    No days found. Add a new day to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {modalMode === 'add' ? 'Add New Day' : 'Edit Day'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4">
                {modalMode === 'add' && (
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="bulkMode"
                      checked={isBulkMode}
                      onChange={toggleBulkMode}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="bulkMode" className="text-sm font-medium text-gray-700">
                      Bulk Add
                    </label>
                  </div>
                )}

                {modalMode === 'add' && isBulkMode ? (
                  <div className="space-y-3">
                    {newDays.map((day, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-grow">
                          <label className="sr-only">Day Name</label>
                          <input
                            type="text"
                            value={day.name}
                            onChange={(e) => handleBulkInputChange(index, e.target.value)}
                            placeholder={`Day ${index + 1}`}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                        {newDays.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDay(index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAnotherDay}
                      className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Another
                    </button>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="dayName" className="block text-sm font-medium text-gray-700">
                      Day Name
                    </label>
                    <input
                      type="text"
                      id="dayName"
                      value={currentDay.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g. Monday"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {modalMode === 'add' ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaysManager;