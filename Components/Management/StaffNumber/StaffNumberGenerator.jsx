import { useState, useEffect } from 'react';
import StaffNumberService from './staffNumberService';

export default function StaffNumberGenerator() {
  // State for table data
  const [staffNumbers, setStaffNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');

  // State for delete functionality
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [staffNumberToDelete, setStaffNumberToDelete] = useState(null);
  const [staffIdToDelete, setStaffIdToDelete] = useState(null);

  // Fetch all staff numbers when component mounts
  useEffect(() => {
    fetchStaffNumbers();
  }, []);

  // Function to fetch all staff numbers
  const fetchStaffNumbers = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const data = await StaffNumberService.getAllStaffNumbers();
      setStaffNumbers(data);
    } catch (error) {
      console.error('Error fetching staff numbers:', error);
      setError('Failed to load staff numbers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate a new staff number
  const generateStaffNumber = async () => {
    try {
      setIsGenerating(true);
      setGenerationError('');
      
      const data = await StaffNumberService.generateStaffNumber();
      setGeneratedNumber(data.staff_number || data.staffNumber || data.number || '');
      
      // Refresh the table data after generating a new number
      await fetchStaffNumbers();
    } catch (error) {
      console.error('Error generating staff number:', error);
      setGenerationError(error.message || 'Failed to generate staff number. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to handle closing the popup and resetting state
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setGeneratedNumber('');
    setGenerationError('');
  };

  // Function to delete a staff number
  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      setDeleteError('');
      await StaffNumberService.deleteStaffNumber(id);
      await fetchStaffNumbers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting staff number:', error);
      setDeleteError('Failed to delete staff number. Please try again.');
    } finally {
      setIsDeleting(false);
      setStaffNumberToDelete(null);
      setStaffIdToDelete(null);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Staff Number Management</h1>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate New Number
          </button>
        </div>

        {/* Staff Numbers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b">Staff Number</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b">Date Created</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                    Loading staff numbers...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3" className="py-4 px-6 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : staffNumbers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                    No staff numbers found. Generate your first one!
                  </td>
                </tr>
              ) : (
                staffNumbers.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{item.staff_number || item.staffNumber || item.number}</td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(item.created_at || item.createdAt || item.date)}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setStaffNumberToDelete(item.staff_number || item.staffNumber || item.number);
                          setStaffIdToDelete(item.id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Staff Number Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Generate Staff Number</h2>
                <button 
                  onClick={handleClosePopup}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Generated Number Display */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Generated Staff Number:</p>
                <div className="h-12 flex items-center justify-center border border-gray-300 rounded-md bg-gray-50 px-4">
                  {generatedNumber ? (
                    <span className="text-xl font-medium text-gray-900">{generatedNumber}</span>
                  ) : (
                    <span className="text-gray-400 italic">No staff number generated yet</span>
                  )}
                </div>
                {generationError && (
                  <p className="mt-2 text-red-600 text-sm">{generationError}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClosePopup}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={generateStaffNumber}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {staffNumberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete staff number {staffNumberToDelete}?
              </p>
              {deleteError && (
                <p className="text-red-600 text-sm mb-4">{deleteError}</p>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setStaffNumberToDelete(null);
                    setStaffIdToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(staffIdToDelete)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}