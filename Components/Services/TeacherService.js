import API_BASE_URL from './HostConfig';

const TeacherService = {
  fetchTeachers: async () => {
    const response = await fetch(`${API_BASE_URL}/api/classes/`);
    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }
    return response.json();
  },

  addTeacher: async (teacherData) => {
    const response = await fetch(`${API_BASE_URL}/api/classes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData),
    });
    if (!response.ok) {
      throw new Error('Failed to add teacher');
    }
    return response.json();
  },

  updateTeacher: async (id, teacherData) => {
    const response = await fetch(`${API_BASE_URL}/api/classes/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData),
    });
    if (!response.ok) {
      throw new Error('Failed to update teacher');
    }
    return response.json();
  },

  deleteTeacher: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/classes/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete teacher');
    }
  },
};

export default TeacherService;
