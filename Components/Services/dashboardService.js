import axios from 'axios';
import { addAuthHeaders } from '../LoginService';
const header = addAuthHeaders();

import API_BASE_URL from './HostConfig';


// Existing functions
export const fetchTodaysSchedules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/timetable/today`, { headers: header });
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s schedules:', error);
    return [];
  }
};

export const fetchTotalClasses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes/total`, { headers: header });
    return response.data;
  } catch (error) {
    console.error('Error fetching total classes:', error);
    return 0;
  }
};

export const fetchActiveLecturers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lecturers/active`, { headers: header });
    return response.data;
  } catch (error) {
    console.error('Error fetching active lecturers:', error);
    return 0;
  }
};

export const fetchTotalRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/total`, { headers: header });
    return response.data;
  } catch (error) {
    console.error('Error fetching total rooms:', error);
    return 0;
  }
};

export const fetchTotalTimetables = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/timetable/total`, { headers: header });
    return response.data;
  } catch (error) {
    console.error('Error fetching total timetables:', error);
    return 0;
  }
};

export const fetchDaySummary = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/timetable/summary`, { headers: header });
    return response.data;
  } catch (error) {
    console.error('Error fetching day summary:', error);
    return [];
  }
};



export const fetchResourceUtilization = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/utilization`, { headers: header });

    // Filter and aggregate data for "labs" and "class"
    const aggregatedData = response.data.reduce((acc, item) => {
      const roomType = item.roomType.trim().toLowerCase(); // Normalize room type
      if (roomType === 'lab' || roomType === 'class') {
        const existing = acc.find(entry => entry.name === roomType);
        if (existing) {
          existing.value += parseInt(item.count, 10); // Aggregate count
        } else {
          acc.push({
            name: roomType,
            value: parseInt(item.count, 10)
          });
        }
      }
      return acc;
    }, []);

    return aggregatedData;
  } catch (error) {
    console.error('Error fetching resource utilization:', error);
    // Return sample data if API is not available
    return [
      { name: 'class', value: 61 },
      { name: 'lab', value: 16 }
    ];
  }
};