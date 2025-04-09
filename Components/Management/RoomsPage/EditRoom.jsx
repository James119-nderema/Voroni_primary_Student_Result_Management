import React, { useState, useEffect, useRef } from 'react';
import { roomsService } from '../../Services/rooms';

const EditRoom = ({ room, onClose, onRoomUpdated, triggerRef }) => {
  const [formData, setFormData] = useState({
    roomName: '',
    roomType: '',
    capacity: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);

  // Fetch room data by ID when component mounts
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        if (!room || !room.id) {
          throw new Error('No room ID provided');
        }
        const roomData = await roomsService.getRoomById(room.id);
        setFormData({
          roomName: roomData.roomName || '',
          roomType: roomData.roomType || '',
          capacity: roomData.roomCapacity || ''
        });
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError('Failed to fetch room details.');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchRoomDetails();
  }, [room]);

  useEffect(() => {
    // Set position based on the trigger button's location if available
    if (triggerRef && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Position the modal near the edit button
      setPosition({
        top: rect.bottom + scrollTop + 5,
        left: rect.left - 320 + rect.width // Position to the left of the edit button
      });
    } else {
      // Position the modal where the user is currently viewing
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const modalHeight = modalRef.current?.clientHeight || 400;
      const modalWidth = modalRef.current?.clientWidth || 400;
      
      setPosition({
        top: Math.max(window.scrollY + (viewportHeight - modalHeight) / 2, window.scrollY + 50),
        left: Math.max((viewportWidth - modalWidth) / 2, 20)
      });
    }
  }, [triggerRef, modalRef.current]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' ? parseInt(value, 10) || '' : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await roomsService.updateRoom(room.roomId, formData);
      onRoomUpdated();
      onClose();
    } catch (error) {
      setError('Failed to update room. Please try again.');
      console.error('Error updating room:', error);
    } finally {
      setLoading(false);
    }
  };

  // Click outside to close
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50" style={{ backdropFilter: 'blur(2px)' }}>
      <div 
        ref={modalRef}
        className="absolute bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`,
          transform: 'translateY(-10px)',
          animation: 'fadeIn 0.2s ease-out forwards'
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Room</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}
        
        {fetchLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3 text-sm text-gray-500">Loading room data...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Name
              </label>
              <input
                type="text"
                name="roomName"
                value={formData.roomName}
                onChange={handleChange}
                className="block w-full rounded-md py-2 px-3 border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="block w-full rounded-md py-2 px-3 border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
                required
              >
                <option value="">Select a room type</option>
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Classroom">Classroom</option>
                <option value="Lab">Lab</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                className="block w-full rounded-md py-2 px-3 border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Room'}
              </button>
            </div>
          </form>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EditRoom;