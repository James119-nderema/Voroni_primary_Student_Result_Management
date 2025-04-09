import React, { useState, useEffect, useRef } from 'react';
import { roomsService } from '../../Services/rooms';

const AddRoom = ({ onClose, onRoomAdded, triggerRef }) => {
  const [formData, setFormData] = useState({
    roomName: '',
    roomType: '',
    capacity:''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);

  useEffect(() => {
    // Set position based on the trigger button's location
    if (triggerRef && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Position the modal below the add button
      setPosition({
        top: rect.bottom + scrollTop + 10, // 10px padding
        left: rect.right - (modalRef.current?.clientWidth || 400) // Align to the right of the button
      });
    } else {
      // Fallback to position in the current viewport
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
      [name]: name === 'capacity' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await roomsService.createRoom(formData);
      onRoomAdded();
      onClose();
    } catch (error) {
      setError('Failed to add room. Please try again.');
      console.error('Error adding room:', error);
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
        className="absolute bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-sm" // Adjusted font size to match AddLecturerPage
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`,
          transform: 'translateY(-10px)',
          animation: 'fadeIn 0.2s ease-out forwards'
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Room</h2> {/* Adjusted font size */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Room Name
            </label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              required
            >
              <option value="Lecture Hall">Lecture Hall</option>
              <option value="Classroom">Classroom</option>
              <option value="Lab">Lab</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded mr-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-sm"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Room'}
            </button>
          </div>
        </form>
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

export default AddRoom;