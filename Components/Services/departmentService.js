import axios from "axios";
import { addAuthHeaders } from '../LoginService';
const header = addAuthHeaders();

import API_BASE_URL from './HostConfig';
const departmentServiceUrl = `${API_BASE_URL}/departments`;

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${departmentServiceUrl}/`, {header});
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
    const response = await axios.post(`${departmentServiceUrl}/create`, departmentData);
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
    const response = await axios.put(`${departmentServiceUrl}/update/${departmentId}`, departmentData);
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
    const response = await axios.delete(`${departmentServiceUrl}/delete/${departmentId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw "Department not found. It may have already been deleted.";
    }
    console.error("Error deleting department:", error);
    throw error.response?.data?.message || "Failed to delete department.";
  }
};
