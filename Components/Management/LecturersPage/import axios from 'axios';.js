import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9921';

export const LecturerScheduleService = {
  // Get lecturer details by ID
  getLecturerDetails: async (lecturerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lecturers/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer details:', error);
      throw error;
    }
  },

  // Get courses taught by a lecturer
  getLecturerCourses: async (lecturerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lecturers/courses/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer courses:', error);
      throw error;
    }
  },

  // Get schedules for a lecturer
  getLecturerSchedules: async (lecturerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lecturers/schedules/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer schedules:', error);
      throw error;
    }
  },

  // Get availability for a lecturer
  getLecturerAvailability: async (lecturerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lecturers/availabilities/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer availability:', error);
      throw error;
    }
  },

  // Regenerate schedules for a lecturer
  regenerateLecturerSchedule: async (lecturerId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/lecturers/availabilities/generate${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error regenerating lecturer schedule:', error);
      throw error;
    }
  },

  // Get all lecturers
  getAllLecturers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lecturers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all lecturers:', error);
      throw error;
    }
  }
};

export default LecturerScheduleService;

