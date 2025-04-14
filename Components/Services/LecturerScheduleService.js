import axios from 'axios';
import API_BASE_URL from './HostConfig';
const lecturerScheduleUrl = `${API_BASE_URL}/lecturers`;

export const LecturerScheduleService = {
  // Get lecturer details by ID
  getLecturerDetails: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer details:', error);
      throw error;
    }
  },

  // Get courses taught by a lecturer
  getLecturerCourses: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/courses/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer courses:', error);
      throw error;
    }
  },

  // Get schedules for a lecturer
  getLecturerSchedules: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/schedules/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer schedules:', error);
      throw error;
    }
  },

  // Get availability for a lecturer
  getLecturerAvailability: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/availabilities/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer availability:', error);
      throw error;
    }
  },

  // Regenerate schedules for a lecturer
  regenerateLecturerSchedule: async (lecturerId) => {
    try {
      const response = await axios.post(`${lecturerScheduleUrl}/availabilities/generate/${lecturerId}`);
      return response.data;
    } catch (error) {
      console.error('Error regenerating lecturer schedule:', error);
      throw error;
    }
  },

  // Regenerate schedules for all lecturers
  regenerateAllLecturerSchedules: async () => {
    try {
      const response = await axios.post(`${lecturerScheduleUrl}/availabilities/generate`);
      return response.data;
    } catch (error) {
      console.error('Error regenerating all lecturer schedules:', error);
      throw error;
    }
  },

  // Get all lecturers
  getAllLecturers: async () => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all lecturers:', error);
      throw error;
    }
  }
};

export default LecturerScheduleService;
