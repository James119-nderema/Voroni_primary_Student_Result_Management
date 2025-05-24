import axios from 'axios';

const API_URL = 'http://localhost:8001/api/';

const classScheduleService = {
  // Get all classes
  getAllClasses: async () => {
    try {
      const response = await axios.get(`${API_URL}classnames/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },

  // Get all days
  getAllDays: async () => {
    try {
      const response = await axios.get(`${API_URL}days/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching days:', error);
      throw error;
    }
  },

  // Get all timeslots
  getAllTimeSlots: async () => {
    try {
      const response = await axios.get(`${API_URL}timeslots/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching timeslots:', error);
      throw error;
    }
  },

  // Get all class schedules
  getAllClassSchedules: async () => {
    try {
      const response = await axios.get(`${API_URL}class-schedules/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching class schedules:', error);
      throw error;
    }
  },

  // Get schedules for a specific class
  getSchedulesByClass: async (classId) => {
    try {
      const response = await axios.get(`${API_URL}class-schedules/?class_name=${classId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching class schedules:', error);
      throw error;
    }
  },

  // Get schedules for a specific class and day
  getSchedulesByClassAndDay: async (classId, dayId) => {
    try {
      const response = await axios.get(`${API_URL}class-schedules/?class_name=${classId}&day=${dayId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching class schedules for day:', error);
      throw error;
    }
  },

  // Create a single class schedule
  createClassSchedule: async (classId, dayId, timeslotId) => {
    try {
      const response = await axios.post(`${API_URL}class-schedules/`, {
        class_name: classId,
        day: dayId,
        timeslot: timeslotId
      });
      return response.data;
    } catch (error) {
      console.error('Error creating class schedule:', error);
      throw error;
    }
  },

  // Create multiple class schedules at once
  createBulkClassSchedules: async (schedules) => {
    try {
      const response = await axios.post(`${API_URL}class-schedules/bulk_create/`, {
        schedules: schedules
      });
      return response.data;
    } catch (error) {
      console.error('Error creating bulk class schedules:', error);
      throw error;
    }
  },

  // Delete a class schedule by ID
  deleteClassSchedule: async (scheduleId) => {
    try {
      await axios.delete(`${API_URL}class-schedules/${scheduleId}/`);
      return true;
    } catch (error) {
      console.error('Error deleting class schedule:', error);
      throw error;
    }
  }
};

export default classScheduleService;
