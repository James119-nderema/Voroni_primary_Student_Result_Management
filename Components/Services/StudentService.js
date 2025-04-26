import API_BASE_URL from './HostConfig';

const StudentService = {
  API_URL: `${API_BASE_URL}/students/`,

  fetchStudents: async () => {
    try {
      const apiUrl = `${API_BASE_URL}/students/`;
      console.log('Attempting to fetch from:', apiUrl);

      if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not configured');
      }

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch students. Status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the array directly
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  getStudentCount: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/count`);
      if (!response.ok) {
        throw new Error(`Failed to fetch student count. Status: ${response.status}`);
      }
      const data = await response.json();
      return data.total || 0;  // Return total from API or 0 if not found
    } catch (error) {
      console.error('Error fetching student count:', error);
      return 0; // Return 0 as fallback
    }
  },

  addStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error(`Failed to add student. Status: ${response.status}`);
    return response.json();
  },

  updateStudent: async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error(`Failed to update student. Status: ${response.status}`);
    return response.json();
  },

  deleteStudent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete student. Status: ${response.status}`);
  }
};

export default StudentService;
