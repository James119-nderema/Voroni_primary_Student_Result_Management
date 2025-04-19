import API_BASE_URL from './HostConfig';

const StudentService = {
  API_URL: `${API_BASE_URL}/api/students/`,

  fetchStudents: async () => {
    try {
      console.log('Fetching from:', `${API_BASE_URL}/api/students/`); // Debug log
      const response = await fetch(`${API_BASE_URL}/api/students/`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to fetch students. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  addStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/api/students/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error(`Failed to add student. Status: ${response.status}`);
    return response.json();
  },

  updateStudent: async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error(`Failed to update student. Status: ${response.status}`);
    return response.json();
  },

  deleteStudent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete student. Status: ${response.status}`);
  }
};

export default StudentService;
