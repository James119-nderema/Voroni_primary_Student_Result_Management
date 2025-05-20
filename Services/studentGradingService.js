import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Service for interacting with the Student Management API endpoints
 */
export const studentGradingService = {
  // Student endpoints
  /**
   * Fetch all students
   * @returns {Promise} Promise with response data
   */
  getStudents: async () => {
    return axios.get(`${API_BASE_URL}/students/`);
  },

  /**
   * Fetch a specific student by ID
   * @param {number|string} id - The student ID
   * @returns {Promise} Promise with response data
   */
  getStudent: async (id) => {
    return axios.get(`${API_BASE_URL}/students/${id}/`);
  },

  // Subject endpoints
  /**
   * Fetch all subjects
   * @returns {Promise} Promise with response data
   */
  getSubjects: async () => {
    return axios.get(`${API_BASE_URL}/subjects/`);
  },

  /**
   * Fetch a specific subject by ID
   * @param {number|string} id - The subject ID
   * @returns {Promise} Promise with response data
   */
  getSubject: async (id) => {
    return axios.get(`${API_BASE_URL}/subjects/${id}/`);
  },

  // Student Marks - Standard CRUD operations
  /**
   * List all student marks
   * @returns {Promise} Promise with response data
   */
  getAllMarks: async () => {
    return axios.get(`${API_BASE_URL}/student-marks/`);
  },
  
  /**
   * Create a new student mark
   * @param {Object} markData - The mark data to create
   * @returns {Promise} Promise with response data
   */
  createMark: async (markData) => {
    return axios.post(`${API_BASE_URL}/student-marks/`, markData);
  },
  
  /**
   * Retrieve a specific mark by ID
   * @param {number|string} id - The mark ID
   * @returns {Promise} Promise with response data
   */
  getMark: async (id) => {
    return axios.get(`${API_BASE_URL}/student-marks/${id}/`);
  },
  
  /**
   * Update a specific mark
   * @param {number|string} id - The mark ID
   * @param {Object} markData - The updated mark data
   * @returns {Promise} Promise with response data
   */
  updateMark: async (id, markData) => {
    return axios.patch(`${API_BASE_URL}/student-marks/${id}/`, markData);
  },
  
  /**
   * Replace a specific mark completely
   * @param {number|string} id - The mark ID
   * @param {Object} markData - The complete new mark data
   * @returns {Promise} Promise with response data
   */
  replaceMark: async (id, markData) => {
    return axios.put(`${API_BASE_URL}/student-marks/${id}/`, markData);
  },
  
  /**
   * Delete a specific mark
   * @param {number|string} id - The mark ID
   * @returns {Promise} Promise with response data
   */
  deleteMark: async (id) => {
    return axios.delete(`${API_BASE_URL}/student-marks/${id}/`);
  },
  
  // Student Marks - Custom actions
  /**
   * Bulk enter marks for multiple students
   * @param {Array} marksData - Array of mark objects to create
   * @returns {Promise} Promise with response data
   */
  enterBulkMarks: async (marksData) => {
    return axios.post(`${API_BASE_URL}/student-marks/enter_marks/`, marksData);
  },
  
  /**
   * Get marks for a specific student
   * @param {number|string} studentId - The student ID
   * @returns {Promise} Promise with response data
   */
  getStudentMarks: async (studentId) => {
    return axios.get(`${API_BASE_URL}/student-marks/student_records/`, {
      params: { student_id: studentId }
    });
  },
  
  /**
   * Delete all marks for a specific student
   * @param {number|string} studentId - The student ID
   * @returns {Promise} Promise with response data
   */
  deleteStudentMarks: async (studentId) => {
    return axios.delete(`${API_BASE_URL}/student-marks/delete_student_records/`, {
      params: { student_id: studentId }
    });
  },

  // Student Reports
  /**
   * Generate a marks report for students
   * @param {Object} params - Parameters for report generation (grade, subject, etc.)
   * @returns {Promise} Promise with response data containing report URL or blob
   */
  generateMarksReport: async (params) => {
    return axios.get(`${API_BASE_URL}/student-reports/generate_marks_report/`, {
      params,
      responseType: 'blob' // Important for handling file downloads
    });
  },
  
  /**
   * Download marks report based on grade
   * @param {string} grade - The grade to download report for (empty for all grades)
   * @param {string} filename - The filename to save as
   * @returns {Promise} Promise that resolves when download is complete
   */
  downloadMarksReport: async (grade, filename) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/student-marks-report/download_report/`, {
        params: { grade },
        responseType: 'blob'
      });
      
      // Create a blob link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename || 'report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return true;
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }
};

export default studentGradingService;
