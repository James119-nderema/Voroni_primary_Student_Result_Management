// Update the API service to match the backend expectations
// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const ApiService = {
  register: async (userData) => {
    const { firstName, lastName, username, email, password, phoneNumber } = userData;

    try {
      const response = await axios.post(`${API_URL}/profiles/register/`, {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw new Error('Network error');
    }
  }
};

export default ApiService;