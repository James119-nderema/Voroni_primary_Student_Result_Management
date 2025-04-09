import axios from "axios";
import { addAuthHeaders } from "../LoginService"; // Import addAuthHeaders

const API_URL = "http://localhost:9921";

const TimetableService = {
  getTimetable: async () => {
    try {
      const headers = addAuthHeaders();
      const response = await axios.get(`${API_URL}/timetable/`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching timetable:", error);
      return [];
    }
  },

  generateTimetable: async () => {
    try {
      const headers = addAuthHeaders();
      const response = await fetch(`${API_URL}/timetable/generate`, {
        method: "GET",
        headers,
      });
      if (!response.ok) throw new Error("Failed to generate timetable");
    } catch (error) {
      console.error(error);
    }
  },

  downloadTimetable: async (activeDay, daysWithDates) => {
    const dayIndex = daysWithDates.findIndex(day => day.name === activeDay) + 1; // 1-based index
    const headers = addAuthHeaders();
    const response = await fetch(`${API_URL}/timetable/pdf/days/${dayIndex}`, { headers });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeDay}-Timetable.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },

  getLecturers: async () => {
    try {
      const headers = addAuthHeaders();
      const response = await axios.get(`${API_URL}/lecturers/`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      return [];
    }
  },

  getClasses: async () => {
    try {
      const headers = addAuthHeaders();
      const response = await axios.get(`${API_URL}/classes/all`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      return [];
    }
  },

  getRooms: async () => {
    try {
      const headers = addAuthHeaders();
      const response = await axios.get(`${API_URL}/rooms/`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  },

  downloadEntityTimetable: async (entityType, entityId, dayIndex, entityName) => {
    try {
      let endpoint;
      let isZip = false;

      switch (entityType) {
        case 'lecturer':
          if (entityId === 'all') {
            endpoint = `${API_URL}/timetable/pdf/lecturers/all`;
            isZip = true;
          } else {
            endpoint = `${API_URL}/timetable/pdf/lecturers/${entityId}`;
          }
          break;
        case 'class':
          if (entityId === 'all') {
            endpoint = `${API_URL}/timetable/pdf/classes/all`;
            isZip = true;
          } else {
            endpoint = `${API_URL}/timetable/pdf/classes/${entityId}`;
          }
          break;
        case 'room':
          endpoint = `${API_URL}/timetable/pdf/rooms/${entityId}`;
          break;
        case 'day':
          endpoint = `${API_URL}/timetable/pdf/days/${dayIndex}`;
          break;
        case "All":
          endpoint = `${API_URL}/timetable/pdf/all`;
          break;  
        default:
          throw new Error('Invalid entity type');
      }

      const headers = addAuthHeaders();
      const response = await fetch(endpoint, { headers });
      if (!response.ok) {
        console.error("Failed to download timetable:", response.statusText);
        return false;
      }
    

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = isZip ? `${entityName}-Timetables.zip` : `${entityName}-Timetable.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error("Error downloading timetable:", error);
      return false;
    }
  }
};

export default TimetableService;
