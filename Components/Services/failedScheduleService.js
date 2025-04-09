import axios from 'axios';
import { addAuthHeaders } from '../LoginService';
const headers = addAuthHeaders();

const BASE_URL = 'http://localhost:9921';

export const fetchFailedSchedules = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/timetable/failedSchedules`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching failed schedules:', error);
    throw error;
  }
};
