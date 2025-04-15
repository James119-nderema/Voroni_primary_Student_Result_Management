import axios from 'axios';
import API_BASE_URL from './HostConfig';
import { addAuthHeaders } from '../LoginService';
const headers = addAuthHeaders();

const roomFacultyUrl = `${API_BASE_URL}/rooms`;

export const fetchSelectedRoomFaculties = async (facultyId) => {
  try {
    const response = await axios.get(`${roomFacultyUrl}/faculty/selected/${facultyId}`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching selected room faculties:', error);
    throw error;
  }
};

export const fetchAvailableRoomFaculties = async (facultyId) => {
  try {
    const response = await axios.get(`${roomFacultyUrl}/faculty/available/${facultyId}`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching available room facultys:', error);
    throw error;
  }
};

export const addRoomToFaculty = async (facultyId, roomId) => {
  try {
    const response = await axios.post(`${roomFacultyUrl}/faculty/create`, { facultyId, roomId }, {headers});
    return response.data;
  } catch (error) {
    console.error('Error adding room to faculty:', error);
    throw error;
  }
};


export const removeRoomFromFaculty = async (facultyId, roomId) => {
  try {
    console.log("Sending room faculty data to API for deletion:");

    // Ensure the schedule object contains all required fields
    if (!roomId || !facultyId) {
      console.error("Missing required  data for deletion:", { roomId, facultyId });
      throw new Error("Missing required data for deletion");
    }

    const response = await axios.delete(`${roomFacultyUrl}/faculty/delete`, { 
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      data: { roomId, facultyId }
    });

    console.log("Schedule deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};
