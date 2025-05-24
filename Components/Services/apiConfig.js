// This file contains the API base URL configuration

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Simple function to check if the API is accessible
const checkApiConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health-check`, { 
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000 // 5 second timeout
    });
    return response.ok;
  } catch (error) {
    console.error('API connection check failed:', error);
    return false;
  }
};

export { API_BASE_URL, checkApiConnection };
