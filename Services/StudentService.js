import axiosInstance from '../utils/axiosConfig';

export const studentService = {
  getAllStudents: async () => {
    try {
      console.log('Fetching students...');
      const response = await axiosInstance.get('/api/students/');
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },

  addStudents: async (students) => {
    try {
      if (Array.isArray(students) && students.length > 1) {
        const response = await axiosInstance.post('/api/students/bulk-create/', { students });
        return response.data;
      }
      const response = await axiosInstance.post('/api/students/', Array.isArray(students) ? students[0] : students);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateStudent: async (student) => {
    try {
      const response = await axiosInstance.put(`/students/${student.id}`, student);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteStudent: async (id) => {
    try {
      await axiosInstance.delete(`/students/${id}`);
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};