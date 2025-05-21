// src/services/SubjectAssignmentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/api/subject-assignments';

class SubjectAssignmentService {
    // Get all subjects from main database
    getSubjects() {
        return axios.get(`${API_URL}/subjects/`);
    }

    // Get all subject assignments with names
    getAssignments() {
        return axios.get(`${API_URL}/assignments/with-names/`);
    }

    // Create new subject assignment
    createAssignment(data) {
        return axios.post(`${API_URL}/assignments/`, data);
    }

    // Bulk create/update subject assignments
    bulkCreateAssignments(data) {
        return axios.post(`${API_URL}/assignments/bulk-create/`, data);
    }

    // Update subject assignment
    updateAssignment(id, data) {
        return axios.put(`${API_URL}/assignments/${id}/`, data);
    }

    // Delete subject assignment
    deleteAssignment(id) {
        return axios.delete(`${API_URL}/assignments/${id}/`);
    }
}

export default new SubjectAssignmentService();