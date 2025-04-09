import axios from "axios";
import { addAuthHeaders } from '../LoginService';
import API_BASE_URL from './HostConfig';

const facultyServiceUrl = `${API_BASE_URL}/faculties`;

export const fetchFaculties = async () => {
  try {
    const authHeader = addAuthHeaders();
    const response = await axios.get(`${facultyServiceUrl}/`, authHeader);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching faculties:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch faculties.");
  }
};

export const addFaculty = async (facultyData) => {
  try {
    const authHeader = addAuthHeaders();
    const response = await axios.post(`${facultyServiceUrl}/create`, facultyData, authHeader);

    if (response && response.status >= 200 && response.status < 300) {
      return {
        success: true,
        message: response.data?.message || "Faculty added successfully!",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Unexpected response from server.",
      };
    }
  } catch (error) {
    console.error("Error adding faculty:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add faculty.",
    };
  }
};

export const editFaculty = async (facultyId, facultyData) => {
  try {
    const authHeader = addAuthHeaders();
    const response = await axios.put(`${facultyServiceUrl}/update/${facultyId}`, facultyData, authHeader);
    return {
      success: true,
      message: response.data.message || "Faculty updated successfully!",
    };
  } catch (error) {
    console.error("Error editing faculty:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to edit faculty.",
    };
  }
};

export const deleteFaculty = async (facultyId) => {
  try {
    const authHeader = addAuthHeaders();
    const response = await axios.delete(`${facultyServiceUrl}/delete/${facultyId}`, authHeader);
    return {
      success: true,
      message: response.data.message || "Faculty deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting faculty:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete faculty.",
    };
  }
};
