// src/Services/SubjectAssignmentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

class SubjectAssignmentService {
    // Get all subject assignments
    getAssignments() {
        return axios.get(`${API_URL}/subject-assignments/`);
    }

    // Get all subjects
    getSubjects() {
        return axios.get(`${API_URL}/subjects/`);
    }

    // Create a single subject assignment
    createAssignment(assignmentData) {
        // Transform data to match backend expectations
        const transformedData = {
            subject: assignmentData.subject_id,
            lessons_per_week: assignmentData.assignments_per_week
        };
        return axios.post(`${API_URL}/subject-assignments/`, transformedData);
    }

    // Bulk create subject assignments
    bulkCreateAssignments(assignmentsData) {
        // Transform each item in the array to match backend field names
        const transformedData = assignmentsData.map(item => ({
            subject: item.subject_id,
            lessons_per_week: item.assignments_per_week
        }));
        return axios.post(`${API_URL}/subject-assignments/bulk_create/`, transformedData);
    }

    // Update a subject assignment
    updateAssignment(id, assignmentData) {
        // Transform data to match backend expectations
        const transformedData = {
            subject: assignmentData.subject_id,
            lessons_per_week: assignmentData.assignments_per_week
        };
        return axios.put(`${API_URL}/subject-assignments/${id}/`, transformedData);
    }

    // Delete a subject assignment
    deleteAssignment(id) {
        return axios.delete(`${API_URL}/subject-assignments/${id}/`);
    }
}

export default new SubjectAssignmentService();