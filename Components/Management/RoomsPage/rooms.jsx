import React, { useState, useEffect } from 'react';
import { roomsService } from '../../Services/rooms';
import AddRoom from './AddRoom';
import EditRoom from './EditRoom';
import { motion } from 'framer-motion';

const RoomsManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Rooms');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [sortBy, setSortBy] = useState('roomName');

  // Room types for filter buttons
  const roomTypes = ['All Rooms', 'Lecture Hall', 'Classroom', 'Lab'];

  // Fetch rooms data
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await roomsService.getAllRooms();
      setRooms(data);
      setFilteredRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle room filtering
  useEffect(() => {
    let result = [...rooms];
    
    // Apply type filter
    if (activeFilter !== 'All Rooms') {
      result = result.filter(room => room.roomType === activeFilter);
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(room => 
        room.roomName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    
    setFilteredRooms(result);
  }, [rooms, activeFilter, searchTerm, sortBy]);

  // Handle delete room
  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await roomsService.deleteRoom(roomId);
        fetchRooms(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    }
  };

  // Handle edit room
  const handleEditClick = (room) => {
    setCurrentRoom(room);
    setShowEditModal(true);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-green-800">Rooms Management</h1>
            <p className="text-sm text-gray-600">Manage and monitor all available Rooms</p>
          </div>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <span className="mr-2">+</span> Add New Room
          </button>
        </div>

        {/* Filter buttons */}
        <div className="mb-4 flex flex-wrap gap-2">
          {roomTypes.map((type) => (
            <button
              key={`filter-${type}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeFilter === type 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search and Sort Controls */}
        <div className="flex justify-between mb-4">
          <select 
            className="border rounded-lg px-3 py-2 text-sm font-medium"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="roomName">Sort By Room Name</option>
            <option value="roomType">Sort By Room Type</option>
            <option value="capacity">Sort By Capacity</option>
          </select>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search rooms..."
              className="border rounded-lg pl-10 pr-4 py-2 w-64 text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Rooms Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center p-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              <span className="ml-3 text-sm text-gray-500">Loading rooms...</span>
            </motion.div>
          ) : (
            <table className="w-full min-w-max divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Room Name
                  </th>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Room Type
                  </th>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Capacity
                  </th>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room, index) => (
                    <motion.tr 
                      key={room.id || `room-${index}`}
                      className="hover:bg-indigo-50 transition-colors duration-150"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.roomId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.roomName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{room.roomType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{room.roomCapacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-indigo-600 hover:text-indigo-900 transition font-medium flex items-center gap-1 text-sm"
                            onClick={() => handleEditClick(room.roomId)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-600 hover:text-red-900 transition font-medium flex items-center gap-1 text-sm"
                            onClick={() => handleDeleteRoom(room.roomId)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5V15m-6 4h12a2 2 0 002-2v-12a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-lg font-medium">No Rooms Found</span>
                        <span className="text-sm mt-1">Try adjusting your search or filter criteria</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <AddRoom 
          onClose={() => setShowAddModal(false)}
          onRoomAdded={fetchRooms}
        />
      )}

      {/* Edit Room Modal */}
      {showEditModal && (
        <EditRoom
          room={currentRoom}
          onClose={() => setShowEditModal(false)}
          onRoomUpdated={fetchRooms}
        />
      )}
    </div>
  );
};

export default RoomsManagement;