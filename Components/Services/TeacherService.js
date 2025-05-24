import API_BASE_URL from './HostConfig';

const API_URL = `${API_BASE_URL}/api`;

// Helper function to handle HTTP errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Network response was not ok');
  }
  return response.json();
};

export const teacherService = {
  // Get teachers with pagination
  getTeachers: async () => {
    const response = await fetch(`${API_URL}/teachers/`);
    return handleResponse(response);
  },
  
  // Get a specific teacher by ID
  getTeacher: async (id) => {
    const response = await fetch(`${API_URL}/teachers/${id}/`);
    return handleResponse(response);
  },
  
  // Create a new teacher
  createTeacher: async (teacherData) => {
    const response = await fetch(`${API_URL}/teachers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherData),
    });
    return handleResponse(response);
  },
  
  // Update an existing teacher
  updateTeacher: async (id, teacherData) => {
    const response = await fetch(`${API_URL}/teachers/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherData),
    });
    return handleResponse(response);
  },
  
  // Delete a teacher
  deleteTeacher: async (id) => {
    const response = await fetch(`${API_URL}/teachers/${id}/`, {
      method: 'DELETE',
    });
    
    // If the response is 204 No Content, return true
    if (response.status === 204) {
      return true;
    }
    
    return handleResponse(response);
  },
};