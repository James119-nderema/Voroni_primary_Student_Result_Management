import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const marksService = {
    // Fetch all student marks
    getStudentMarks: async () => {
        const response = await axios.get(`${BASE_URL}/api/student-marks/`);
        return response.data;
    },

    // Fetch all students
    getStudents: async () => {
        const response = await axios.get(`${BASE_URL}/api/students/`);
        return response.data;
    },

    // Update student marks
    updateStudentMarks: async (marksData) => {
        const response = await axios.post(`${BASE_URL}/api/student-marks/update_student_marks/`, marksData);
        return response.data;
    },

    // Download results based on different criteria
    downloadResults: async (type, id = '') => {
        let url;
        switch (type) {
            case 'all':
                url = `${BASE_URL}/reports/results/all/`;
                break;
            case 'class':
                url = `${BASE_URL}/reports/results/class/${id}`;
                break;
            case 'student':
                url = `${BASE_URL}/reports/results/student/${id}`;
                break;
            default:
                throw new Error('Invalid download type');
        }
        return await axios.get(url, { responseType: 'blob' });
    }
};
