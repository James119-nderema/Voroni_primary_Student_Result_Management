import axios from "axios";
import API_BASE_URL from './HostConfig';
import { addAuthHeaders } from '../LoginService'; // Import addAuthHeaders
const header = addAuthHeaders(); // Add authorization headers

const timetableServiceUrl = `${API_BASE_URL}`;

const TimetableService = {
  getTimetable: async () => {
    try {
      const response = await axios.get(`${timetableServiceUrl}/timetable/`, { headers: header });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      return [];
    }
  },

  generateTimetable: async () => {
    try {
      const response = await axios.get(`${timetableServiceUrl}/timetable/generate`, { headers: header });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  downloadTimetable: async (activeDay, daysWithDates) => {
    const dayIndex = daysWithDates.findIndex(day => day.name === activeDay) + 1; // 1-based index
    const response = await fetch(`${timetableServiceUrl}/timetable/pdf/days/${dayIndex}`);
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
      const response = await axios.get(`${timetableServiceUrl}/lecturers/`, { headers: header });
      return response.data;
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      return [];
    }
  },

  getClasses: async () => {
    try {
      const response = await axios.get(`${timetableServiceUrl}/classes/all`, { headers: header });
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      return [];
    }
  },

  getRooms: async () => {
    try {
      const response = await axios.get(`${timetableServiceUrl}/rooms/`, { headers: header });
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  },

  downloadEntityTimetable: async (entityType, entityId, dayIndex, entityName) => {
    try {
      let endpoint;
      switch (entityType) {
        case 'lecturer':
          endpoint = `${timetableServiceUrl}/timetable/pdf/lecturers/${entityId}`;
          break;
        case 'class':
          endpoint = `${timetableServiceUrl}/timetable/pdf/classes/${entityId}`;
          break;
        case 'room':
          endpoint = `${timetableServiceUrl}/timetable/pdf/rooms/${entityId}`;
          break;
        case 'day':
          endpoint = `${timetableServiceUrl}/timetable/pdf/days/${dayIndex}`;
          break;
        default:
          throw new Error('Invalid entity type');
      }
      
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Failed to download ${entityType} timetable`);
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${entityName}-Timetable.zip`;
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
