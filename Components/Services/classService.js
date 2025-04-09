import axios from 'axios';

import API_BASE_URL from './HostConfig';
const classServiceUrl = `${API_BASE_URL}/classes`;
import { addAuthHeaders } from '../LoginService'; 
const headers = addAuthHeaders();

export const addClass = async (classData) => {
  try {
    const response = await axios.post(`${classServiceUrl}/create`, classData, {headers});
    return response.data;
  } catch (error) {
    console.error("Error adding class:", error);
    throw new Error("Failed to add class.");
  }
};

export const fetchClasses = async () => {
  try {
    const response = await axios.get(`${classServiceUrl}/`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw new Error("Failed to fetch classes.");
  }
};

export const deleteClass = async (classId) => {
  try {
    await axios.delete(`${classServiceUrl}/delete/${classId}`, { headers });
    return { success: true };
  } catch (error) {
    console.error("Error deleting class:", error);
    throw new Error("Failed to delete class.");
  }
};

export const updateClass = async (classId, classData) => {
  try {
    const response = await axios.put(`${classServiceUrl}/update`, classData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw new Error("Failed to update class.");
  }
};

export const fetchClassById = async (classId) => {
  try {
    const response = await axios.get(`${classServiceUrl}/${classId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching class:", error);
    throw new Error("Failed to fetch class details.");
  }
};