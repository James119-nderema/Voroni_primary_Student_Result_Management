import axios from 'axios';

const API_BASE = 'http://localhost:8001/api';

/**
 * Service for handling teacher schedule-related API calls
 */
class TeacherScheduleService {
  /**
   * Get the timetable entries, optionally filtered by teacher name
   * @param {string} teacherName - The teacher name to filter by, or 'all' for all entries
   * @returns {Promise<Array>} - Promise resolving to array of timetable entries
   */
  async getTimetable(teacherName = 'all') {
    try {
      const url = `${API_BASE}/timetable/teacher_timetable/`;
      const params = teacherName !== 'all' ? { teacher_name: teacherName } : {};
      
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching timetable data:', error);
      throw error;
    }
  }

  /**
   * Get all teachers for filtering
   * @returns {Promise<Array>} - Promise resolving to array of teacher objects
   */
  async getTeachers() {
    try {
      const response = await axios.get(`${API_BASE}/timetable/teachers_list/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  }

  /**
   * Refresh the backend cache if needed
   * @returns {Promise<Object>} - Promise resolving to the result message
   */
  async refreshCache() {
    try {
      const response = await axios.get(`${API_BASE}/timetable/refresh_cache/`);
      return response.data;
    } catch (error) {
      console.error('Error refreshing cache:', error);
      throw error;
    }
  }
}

export default new TeacherScheduleService();
