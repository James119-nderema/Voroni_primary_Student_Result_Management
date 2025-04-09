import axios from "axios";

import API_BASE_URL from './HostConfig';
import { addAuthHeaders } from '../LoginService'; // Import addAuthHeaders
const departmentServiceUrl = `${API_BASE_URL}/departments`;
const headers = addAuthHeaders();

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${departmentServiceUrl}/`, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw "No departments found.";
    }
    console.error("Error fetching departments:", error);
    throw error.response?.data?.message || "Failed to fetch departments.";
  }
};

export const addDepartment = async (departmentData) => {
  try {
    const response = await axios.post(`${departmentServiceUrl}/create`, departmentData, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw "Faculty not found. Please provide a valid Faculty ID.";
    }
    console.error("Error adding department:", error);
    throw error.response?.data?.message || "Failed to add department.";
  }
};

export const updateDepartment = async (departmentId, departmentData) => {
  try {
    const response = await axios.put(`${departmentServiceUrl}/update/${departmentId}`, departmentData, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw "Department or Faculty not found. Please verify the IDs.";
    }
    console.error("Error updating department:", error);
    throw error.response?.data?.message || "Failed to update department.";
  }
};

export const deleteDepartment = async (departmentId) => {
  try {
    const response = await axios.delete(`${departmentServiceUrl}/delete${departmentId}`, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw "Department not found. It may have already been deleted.";
    }
    console.error("Error deleting department:", error);
    throw error.response?.data?.message || "Failed to delete department.";
  }
};
