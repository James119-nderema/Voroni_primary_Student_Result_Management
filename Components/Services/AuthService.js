// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const AuthService = {
  login: async function(username, password) {
    try {
      const response = await axios.post(API_URL + '/login/', { 
        username, 
        password 
      });
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      throw { 
        error: error.response?.data?.detail || 'Login failed. Please check your credentials.'
      };
    }
  },

  logout: function() {
    localStorage.removeItem('user');
  },

  getUser: function() {
    return JSON.parse(localStorage.getItem('user'));
  },

  getToken: function() {
    const user = this.getUser();
    return user ? user.token : null;
  },

  isAuthenticated: function() {
    return !!this.getToken();
  }
};

export default AuthService;