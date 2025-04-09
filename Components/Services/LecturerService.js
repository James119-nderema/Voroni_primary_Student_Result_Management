import axios from "axios";

import API_BASE_URL from "./HostConfig";
const lecturerUrl = `${API_BASE_URL}/lecturers`;


export const fetchLecturers = async () => {
  try {
    const response = await axios.get(`${lecturerUrl}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lecturers:", error);
    return [];
  }
};

export const AddLecturer = async (lecturer) => {
  try {
    const response = await axios.post(`${lecturerUrl}/create`, lecturer);
    return { success: true, message: response.data.message || "Lecturer added successfully!" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to add lecturer" };
  }
};

export const updateLecturer = async (lecturer) => {
  try {
    const response = await axios.put(`${lecturerUrl}/update`, lecturer);
    return { success: true, message: response.data.message || "Lecturer updated successfully!" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to update lecturer" };
  }
};

// Inside your LecturerService.js

// Other functions like fetchLecturers would remain the same

export const deleteLecturer = async (lecturerId) => {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`/api/lecturers/${lecturerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: "Lecturer deleted successfully!"
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to delete lecturer."
      };
    }
  } catch (error) {
    console.error("Error deleting lecturer:", error);
    return {
      success: false,
      message: "An unexpected error occurred."
    };
  }
};
