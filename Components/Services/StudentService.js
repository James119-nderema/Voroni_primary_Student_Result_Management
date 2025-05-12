import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class StudentService {
  // Fetch all students
  async getAllStudents() {
    try {
      const response = await axios.get(`${API_URL}/students/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }

  // Add a single student
  async addStudent(studentData) {
    try {
      const response = await axios.post(`${API_URL}/students/`, studentData);
      return response.data;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  }

  // Add multiple students at once
  async addMultipleStudents(studentsArray) {
    try {
      const response = await axios.post(`${API_URL}/students/bulk/`, { students: studentsArray });
      return response.data;
    } catch (error) {
      console.error("Error adding multiple students:", error);
      throw error;
    }
  }

  // Update a student
  async updateStudent(id, updatedData) {
    try {
      const response = await axios.put(`${API_URL}/students/${id}/`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating student with id ${id}:`, error);
      throw error;
    }
  }

  // Delete a student
  async deleteStudent(id) {
    try {
      const response = await axios.delete(`${API_URL}/students/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting student with id ${id}:`, error);
      throw error;
    }
  }
}

export default new StudentService();