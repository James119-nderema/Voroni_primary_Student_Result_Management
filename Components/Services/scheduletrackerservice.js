import axios from 'axios';
import { addAuthHeaders } from '../LoginService';

const BASE_URL = 'http://localhost:9921';

export const getScheduleTracker = async () => {
  try {
    const headers = addAuthHeaders();
    const response = await axios.get(`${BASE_URL}/timetable/scheduletracker`, {headers});
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching schedule trackers:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch schedule data');
  }
};
