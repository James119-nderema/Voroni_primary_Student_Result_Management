// services/rooms.js
import axios from "axios";
import { addAuthHeaders } from '../LoginService';
const header = addAuthHeaders();

import API_BASE_URL from './HostConfig';

const roomServiceUrl = `${API_BASE_URL}/rooms`;

export const roomsService = {
  getAllRooms: async () => {
    try {
      const response = await axios.get(`${roomServiceUrl}/`);
      console.log("Fetched rooms:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  },
  
  deleteRoom: async (roomId) => {
    try {
      const response = await axios.delete(`${roomServiceUrl}/${roomId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting room:", error);
      throw error;
    }
  },
  
  createRoom: async (roomData) => {
    try {
      const response = await axios.post(`${roomServiceUrl}/create`, roomData);
      return response.data;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  },
  
  updateRoom: async (roomId, roomData) => {
    try {
      const response = await axios.put(`${roomServiceUrl}/${roomId}`, roomData);
      return response.data;
    } catch (error) {
      console.error("Error updating room:", error);
      throw error;
    }
  },
  
  getRoomById: async (roomId) => {
    try {
      const response = await axios.get(`${roomServiceUrl}/rooms/${roomId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching room with id ${roomId}:`, error);
      throw error;
    }
  }
};

export default roomsService;