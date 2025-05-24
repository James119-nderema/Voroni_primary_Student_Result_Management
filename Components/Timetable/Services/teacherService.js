// src/services/teacherService.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/api/teachers/';

const teacherService = {
  // Get all teachers
  getAllTeachers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },

  // Add a single teacher
  addTeacher: async (teacherData) => {
    try {
      const response = await axios.post(API_URL, teacherData);
      return response.data;
    } catch (error) {
      console.error('Error adding teacher:', error);
      throw error;
    }
  },

  // Add multiple teachers
  addBulkTeachers: async (teachersData) => {
    try {
      const response = await axios.post(`${API_URL}bulk_create/`, {
        teachers: teachersData
      });
      return response.data;
    } catch (error) {
      console.error('Error adding teachers in bulk:', error);
      throw error;
    }
  },

  // Update a teacher
  updateTeacher: async (id, teacherData) => {
    try {
      const response = await axios.put(`${API_URL}${id}/`, teacherData);
      return response.data;
    } catch (error) {
      console.error('Error updating teacher:', error);
      throw error;
    }
  },

  // Delete a teacher
  deleteTeacher: async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      return true;
    } catch (error) {
      console.error('Error deleting teacher:', error);
      throw error;
    }
  }
};

export default teacherService;