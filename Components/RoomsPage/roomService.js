import axios from 'axios';

const API_BASE_URL = 'http://localhost:9921/rooms';

export const addRoom = async (roomData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, roomData);
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
    throw new Error("Failed to add room.");
  }
};

export const fetchRoom = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Rooms:", error);
    throw new Error("Failed to fetch Rooms.");
  }
};

export const deleteRoom = async (roomId) => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${roomId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting room:", error);
    throw new Error("Failed to delete room.");
  }
};

export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw new Error("Failed to update room.");
  }
};

export const fetchRoomById = async (roomId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room:", error);
    throw new Error("Failed to fetch room details.");
  }
};