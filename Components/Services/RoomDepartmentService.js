import axios from 'axios';
import API_BASE_URL from './HostConfig';

const roomDepartmentUrl = `${API_BASE_URL}/rooms`;

export const fetchSelectedRoomDepartments = async (departmentId) => {
  try {
    const response = await axios.get(`${roomDepartmentUrl}/department/selected/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching selected room departments:', error);
    throw error;
  }
};

export const fetchAvailableRoomDepartments = async (departmentId) => {
  try {
    const response = await axios.get(`${roomDepartmentUrl}/department/available/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available room departments:', error);
    throw error;
  }
};

export const addRoomToDepartment = async (departmentId, roomId) => {
  try {
    const response = await axios.post(`${roomDepartmentUrl}/department/create`, { departmentId, roomId });
    return response.data;
  } catch (error) {
    console.error('Error adding room to department:', error);
    throw error;
  }
};

export const removeRoomFromDepartment = async (schedule) => {
  try {
    console.log("Sending schedule data to API for deletion:", schedule);

    // Ensure the schedule object contains all required fields
    if (!schedule.roomId || !schedule.departmentName) {
      console.error("Missing required schedule data for deletion:", schedule);
      throw new Error("Missing required schedule data for deletion");
    }

    const response = await fetch(`${roomDepartmentUrl}/department/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schedule),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`Failed to delete schedule: ${response.status}`);
    }

    console.log("Schedule deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};
