import axios from "axios";

import API_BASE_URL from "./HostConfig";
const lecturerUrl = `${API_BASE_URL}/lecturers`;
import { addAuthHeaders } from "../LoginService"; // Import addAuthHeaders
const headers = addAuthHeaders();


export const fetchLecturers = async () => {
  try {
    const response = await axios.get(`${lecturerUrl}/`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching lecturers:", error);
    return [];
  }
};

export const AddLecturer = async (lecturer) => {
  try {
    const response = await axios.post(`${lecturerUrl}/create`, lecturer, { headers });
    return { success: true, message: response.data.message || "Lecturer added successfully!" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to add lecturer" };
  }
};

export const updateLecturer = async (lecturer) => {
  try {
    const response = await axios.put(`${lecturerUrl}/update`, lecturer, { headers });
    return { success: true, message: response.data.message || "Lecturer updated successfully!" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to update lecturer" };
  }
};

export const deleteLecturer = async (lecturerId) => {
  try {
    await axios.delete(`${lecturerUrl}/delete/${lecturerId}`, { headers });
  } catch (error) {
    console.error("Error deleting lecturer:", error);
    throw error;
  }
};