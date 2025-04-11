import axios from 'axios';
import { addAuthHeaders } from '../LoginService';
const headers = addAuthHeaders();

const BASE_URL = 'http://localhost:9921';

export const getScheduleTracker = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/timetable/scheduletracker`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching dchedule trackers:', error);
    throw error;
  }
};
