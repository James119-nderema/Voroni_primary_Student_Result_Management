import axios from 'axios';

const API_URL = 'http://localhost:8001/api/subjects/';

const subjectService = {
  // Get all subjects
  getAllSubjects: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  },

  // Add a single subject
  addSubject: async (subjectData) => {
    try {
      const response = await axios.post(API_URL, subjectData);
      return response.data;
    } catch (error) {
      console.error('Error adding subject:', error);
      throw error;
    }
  },

  // Add multiple subjects
  addBulkSubjects: async (subjectsData) => {
    try {
      // Send the array directly, not wrapped in a "subjects" object
      const response = await axios.post(`${API_URL}bulk_create/`, subjectsData);
      return response.data;
    } catch (error) {
      console.error('Error adding subjects in bulk:', error);
      throw error;
    }
  },

  // Update a subject
  updateSubject: async (id, subjectData) => {
    try {
      const response = await axios.put(`${API_URL}${id}/`, subjectData);
      return response.data;
    } catch (error) {
      console.error('Error updating subject:', error);
      throw error;
    }
  },

  // Delete a subject
  deleteSubject: async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      return true;
    } catch (error) {
      console.error('Error deleting subject:', error);
      throw error;
    }
  }
};

export default subjectService;