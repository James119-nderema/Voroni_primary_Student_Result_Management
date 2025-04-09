const API_BASE_URL = "http://10.21.0.222:9921/classes";

export const fetchSelectedSchedules = async (classId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/schedule/selected/${classId}`);
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
    const response = await fetch(`${API_BASE_URL}/schedule/available/${classId}`);
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
    console.log("Sending schedule data to API:", scheduleData);

    if (!scheduleData.classId || !scheduleData.dayName || !scheduleData.startTime || !scheduleData.endTime) {
      console.error("Missing required schedule data:", scheduleData);
      throw new Error("Missing required schedule data");
    }

    const response = await fetch(`${API_BASE_URL}/schedule/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`Failed to add schedule: ${response.status}`);
    }

    // Handle plain text response
    const responseText = await response.text();
    console.log("Server response:", responseText);
    return { message: responseText }; // Wrap plain text in an object
  } catch (error) {
    console.error("Error adding schedule:", error);
    throw error;
  }
};

export const deleteSchedule = async (schedule) => {
  try {
    console.log("Sending schedule data to API for deletion:", schedule);

    // Ensure the schedule object contains all required fields
    if (!schedule.classId || !schedule.dayName || !schedule.startTime || !schedule.endTime) {
      console.error("Missing required schedule data for deletion:", schedule);
      throw new Error("Missing required schedule data for deletion");
    }

    const response = await fetch(`${API_BASE_URL}/schedule/delete`, {
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
