import axios from 'axios';

const BASE_URL = 'http://localhost:9921';

export const fetchFailedSchedules = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/timetable/failedSchedules`);
    return response.data;
  } catch (error) {
    console.error('Error fetching failed schedules:', error);
    throw error;
  }
};
