// src/services/ApiService.js
import AuthService from './AuthService';
import axios from 'axios';

// Create API instance with authentication interceptors
const API = axios.create({
  baseURL: 'http://localhost:8000'
});

// Request interceptor for API calls
API.interceptors.request.use(
  config => {
    const token = AuthService.getToken();
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Logout on auth error
      AuthService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export the AuthService for login functionality
export default AuthService;