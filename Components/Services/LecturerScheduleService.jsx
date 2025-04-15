import axios from 'axios';
import API_BASE_URL from './HostConfig';
const lecturerScheduleUrl = `${API_BASE_URL}/lecturers`;
import { addAuthHeaders } from '../LoginService'; // Import addAuthHeaders
const headers = addAuthHeaders();

export const LecturerScheduleService = {
  // Get lecturer details by ID
  getLecturerDetails: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/${lecturerId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer details:', error);
      throw error;
    }
  },

  // Get courses taught by a lecturer
  getLecturerCourses: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/courses/${lecturerId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer courses:', error);
      throw error;
    }
  },

  // Get schedules for a lecturer
  getLecturerSchedules: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/schedules/${lecturerId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer schedules:', error);
      throw error;
    }
  },

  // Get availability for a lecturer
  getLecturerAvailability: async (lecturerId) => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/availabilities/${lecturerId}`, { headers });
      console.log('Lecturer availability:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching lecturer availability:', error);
      throw error;
    }
  },

  // Regenerate schedules for a lecturer
  regenerateLecturerSchedule: async (lecturerId) => {
    try {
      const response = await axios.post(
        `${lecturerScheduleUrl}/availabilities/generate/${lecturerId}`,
        {}, // Empty body for POST request
        { headers } // Pass headers in the config object
      );
      console.log('Regenerated lecturer schedule:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error regenerating lecturer schedule:', error);
      throw error;
    }
  },

  // Get all lecturers
  getAllLecturers: async () => {
    try {
      const response = await axios.get(`${lecturerScheduleUrl}/`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching all lecturers:', error);
      throw error;
    }
  },

  // Regenerate all lecturer schedules
  regenerateAllLecturerSchedules: async () => {
    try {
      const response = await axios.post(`${lecturerScheduleUrl}/availabilities/generate`, {}, { headers });

      if (response.status !== 200) {
        console.error('Failed to regenerate all lecturer schedules:', response.statusText);
        throw new Error('Failed to regenerate all lecturer schedules');
      }

      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error('Error in regenerateAllLecturerSchedules:', error);
      throw error;
    }
  }
};

export default LecturerScheduleService;
