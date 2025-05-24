// src/Services/TeacherSubjectService.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/api/'; // Adjust this to match your API base URL

const teacherSubjectService = {
  // Get all teacher-subject mappings
  getAllTeacherSubjects: async () => {
    try {
      const response = await axios.get(`${API_URL}teacher-subjects/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher subjects:', error);
      throw error;
    }
  },

  // Get all teachers
  getAllTeachers: async () => {
    try {
      const response = await axios.get(`${API_URL}teachers/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },

  // Get all subjects
  getAllSubjects: async () => {
    try {
      const response = await axios.get(`${API_URL}subjects/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  },

  // Get a specific teacher-subject mapping
  getTeacherSubject: async (id) => {
    try {
      const response = await axios.get(`${API_URL}teacher-subjects/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching teacher subject with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new teacher-subject mapping
  createTeacherSubject: async (teacherId, subjectId) => {
    try {
      const response = await axios.post(`${API_URL}teacher-subjects/`, {
        teacher: teacherId,
        subject: subjectId
      });
      return response.data;
    } catch (error) {
      console.error('Error creating teacher subject:', error);
      throw error;
    }
  },

  // Bulk create teacher-subject mappings
  createBulkTeacherSubjects: async (teacherSubjects) => {
    try {
      const response = await axios.post(`${API_URL}teacher-subjects/`, teacherSubjects);
      return response.data;
    } catch (error) {
      console.error('Error bulk creating teacher subjects:', error);
      throw error;
    }
  },

  // Update a teacher-subject mapping
  updateTeacherSubject: async (id, teacherSubject) => {
    try {
      const response = await axios.put(`${API_URL}teacher-subjects/${id}/`, teacherSubject);
      return response.data;
    } catch (error) {
      console.error(`Error updating teacher subject with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a teacher-subject mapping
  deleteTeacherSubject: async (id) => {
    try {
      await axios.delete(`${API_URL}teacher-subjects/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting teacher subject with id ${id}:`, error);
      throw error;
    }
  },

  // Delete by teacher and subject IDs
  deleteByTeacherAndSubject: async (teacherId, subjectId) => {
    try {
      // First find the mapping ID
      const allMappings = await teacherSubjectService.getAllTeacherSubjects();
      const mapping = allMappings.find(
        m => m.teacher == teacherId && m.subject == subjectId
      );
      
      if (mapping) {
        await teacherSubjectService.deleteTeacherSubject(mapping.id);
        return true;
      } else {
        throw new Error("Mapping not found");
      }
    } catch (error) {
      console.error(`Error deleting teacher-subject mapping:`, error);
      throw error;
    }
  },

  // Get subjects by teacher ID
  getSubjectsByTeacher: async (teacherId) => {
    try {
      const response = await axios.get(`${API_URL}teacher-subjects/by_teacher/${teacherId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subjects for teacher ${teacherId}:`, error);
      throw error;
    }
  },

  // Get teachers by subject ID
  getTeachersBySubject: async (subjectId) => {
    try {
      const response = await axios.get(`${API_URL}teacher-subjects/by_subject/${subjectId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching teachers for subject ${subjectId}:`, error);
      throw error;
    }
  }
};

export default teacherSubjectService;