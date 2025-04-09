import API_BASE_URL from './HostConfig';
import { addAuthHeaders } from '../LoginService'; // Import addAuth

const classScheduleUrl = `${API_BASE_URL}/classes`;

export const fetchSelectedSchedules = async (classId) => {
  try {
    const response = await fetch(`${classScheduleUrl}/schedule/selected/${classId}`, {
      headers});
    if (!response.ok) {
      throw new Error(`Failed to fetch selected schedules: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching selected schedules:", error);
    throw error;
  }
};

export const fetchAvailableSchedules = async (classId) => {
  try {
    const response = await fetch(`${classScheduleUrl}/schedule/available/${classId}`, {

    });
    if (!response.ok) {
      throw new Error(`Failed to fetch available schedules: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching available schedules:", error);
    throw error;
  }
};

export const addSchedule = async (scheduleData) => {
  try {
    if (!scheduleData.classId || !scheduleData.dayName || !scheduleData.startTime || !scheduleData.endTime) {
      console.error("Missing required schedule data:", scheduleData);
      throw new Error("Missing required schedule data");
    }

    const response = await fetch(`${classScheduleUrl}/schedule/create`, {
      method: 'POST',
      headers: addAuthHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(scheduleData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`Failed to add schedule: ${response.status}`);
    }

    const responseText = await response.text();
    return { message: responseText }; // Wrap plain text in an object
  } catch (error) {
    console.error("Error adding schedule:", error);
    throw error;
  }
};

export const deleteSchedule = async (schedule) => {
  try {
    if (!schedule.classId || !schedule.dayName || !schedule.startTime || !schedule.endTime) {
      console.error("Missing required schedule data for deletion:", schedule);
      throw new Error("Missing required schedule data for deletion");
    }

    const response = await fetch(`${classScheduleUrl}/schedule/delete`, {
      method: 'DELETE',
      headers: addAuthHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(schedule),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`Failed to delete schedule: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};
