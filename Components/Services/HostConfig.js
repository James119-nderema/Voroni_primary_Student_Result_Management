// Base hostname and protocol extraction
const getBaseHost = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL);
    return `${url.protocol}//${url.hostname}`;
  }
  return 'http://localhost';
};

const BASE_HOST = getBaseHost();

// Define API endpoints with different ports
const API_ENDPOINTS = {
  main: process.env.NEXT_PUBLIC_API_URL || `${BASE_HOST}:8000`,
  secondary: process.env.NEXT_PUBLIC_SECONDARY_API_URL || `${BASE_HOST}:8001/api`,
  auth: process.env.NEXT_PUBLIC_AUTH_API_URL || `${BASE_HOST}:8000/auth`,
  reports: process.env.NEXT_PUBLIC_REPORTS_API_URL || `${BASE_HOST}:8001/reports`,
};

// Debug logs
console.log('API Endpoints:', API_ENDPOINTS);

// Default export for backward compatibility
export default API_ENDPOINTS.main;

// Named exports for specific services
export const { main, secondary, auth, reports } = API_ENDPOINTS;
export const API_BASE_URL = API_ENDPOINTS.main;