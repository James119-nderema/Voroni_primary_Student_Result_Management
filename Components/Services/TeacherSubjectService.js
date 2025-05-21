import axios from 'axios';

const API_URL = "http://127.0.0.1:8001/teacher-subject"; // Base URL for the API

const teacherSubjectService = {
  // Get all teachers from the main database
  getAllTeachers: async () => {
    try {
      const response = await axios.get(`${API_URL}/teachers/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },
  
  // Get all subjects from the main database
  getAllSubjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/subjects/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  },
  
  // Get subject status for a specific teacher
  getSubjectStatusForTeacher: async (teacherId) => {
    try {
      const response = await axios.get(`${API_URL}/teacher-subjects/${teacherId}/subject_status/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subject status for teacher ${teacherId}:`, error);
      throw error;
    }
  },
  
  // Create teacher-subject assignments
  createAssignments: async (teacherId, subjectIds) => {
    try {
      // Use different endpoints based on the number of subjects
      if (subjectIds.length === 1) {
        const response = await axios.post(`${API_URL}/teacher-subjects/create_single_assignment/`, {
          teacher_id: teacherId,
          subject_ids: subjectIds
        });
        return response.data;
      } else {
        const response = await axios.post(`${API_URL}/teacher-subjects/create_assignments/`, {
          teacher_id: teacherId,
          subject_ids: subjectIds
        });
        return response.data;
      }
    } catch (error) {
      console.error('Error creating assignments:', error);
      throw error;
    }
  },
  
  // Delete a teacher-subject assignment
  deleteAssignment: async (teacherId, subjectId) => {
    try {
      const response = await axios.post(`${API_URL}/teacher-subjects/delete_assignment/`, {
        teacher_id: teacherId,
        subject_id: subjectId
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting assignment:', error);
      throw error;
    }
  }
};

export default teacherSubjectService;