// src/Components/Services/TeacherClassesService.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

class TeacherClassesService {
  // Get all teachers
  getAllTeachers() {
    return axios.get(`${API_URL}/teachers/`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching teachers:', error);
        throw error;
      });
  }

  // Get all classes
  getAllClasses() {
    return axios.get(`${API_URL}/classnames/`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching classes:', error);
        throw error;
      });
  }

  // Get all teacher-class assignments
  getAllTeacherClasses() {
    return axios.get(`${API_URL}/teacher-classes/`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching teacher classes:', error);
        throw error;
      });
  }

  // Get teacher-class assignments by teacher ID
  getClassesByTeacher(teacherId) {
    return axios.get(`${API_URL}/teacher-classes/?teacher=${teacherId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching classes for teacher:', error);
        throw error;
      });
  }

  // Create a single teacher-class assignment
  createTeacherClass(teacherId, classId) {
    return axios.post(`${API_URL}/teacher-classes/`, {
      teacher: parseInt(teacherId),
      class_name: parseInt(classId)
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating teacher-class assignment:', error);
        throw error;
      });
  }

  // Create multiple teacher-class assignments
  createBulkTeacherClasses(assignments) {
    return axios.post(`${API_URL}/teacher-classes/bulk_create/`, {
      teacher_classes: assignments
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating bulk teacher-class assignments:', error);
        throw error;
      });
  }

  // Delete a teacher-class assignment
  deleteTeacherClass(assignmentId) {
    return axios.delete(`${API_URL}/teacher-classes/${assignmentId}/`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error deleting teacher-class assignment:', error);
        throw error;
      });
  }
}

export default new TeacherClassesService();