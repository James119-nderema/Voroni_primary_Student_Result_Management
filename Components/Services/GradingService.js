import API_BASE_URL from './HostConfig';

const GradingService = {
  fetchStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/api/students/`);
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    return response.json();
  },

  submitGrades: async (submissionData) => {
    const response = await fetch(`${API_BASE_URL}/api/student-marks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    return response.json();
  }
};

export default GradingService;
