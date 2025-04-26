import axios from 'axios';
import API_BASE_URL from './HostConfig';

// Define the object first, then export it
const marksService = {
    // Fetch all student marks
    getStudentMarks: async () => {
        const response = await axios.get(`${API_BASE_URL}/student-marks/`);
        return response.data;
    },

    // Fetch all students
    getStudents: async () => {
        const response = await axios.get(`${API_BASE_URL}/students/`);
        return response.data;
    },

    // Update student marks
    updateStudentMarks: async (marksData) => {
        const response = await axios.post(`${API_BASE_URL}/student-marks/update_student_marks/`, marksData);
        return response.data;
    },

    // Download results based on different criteria
    downloadResults: async (type, id = '') => {
        let url;
        switch (type) {
            case 'all':
                url = `${API_BASE_URL}/reports/results/all/`;
                break;
            case 'class':
                url = `${API_BASE_URL}/reports/results/class/${id}`;
                break;
            case 'student':
                url = `${API_BASE_URL}/reports/results/student/${id}`;
                break;
            default:
                throw new Error('Invalid download type');
        }
        return await axios.get(url, { responseType: 'blob' });
    }
};

export default marksService;