import API_BASE_URL from "./HostConfig";

const roomScheduleUrl = `${API_BASE_URL}/rooms`;
import { addAuthHeaders } from '../LoginService';
import roomsService from "./rooms";
const headers = addAuthHeaders();

// Fetch rooms data from API


// Fetch days data from API
const fetchDays = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/days`, {headers});
    if (!response.ok) {
      throw new Error(`Error fetching days: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch timeslots data from API
const fetchTimeslots = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/timeslots`, {headers});
    if (!response.ok) {
      throw new Error(`Error fetching timeslots: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) { 
    console.error(error);
    return [];
  }
};

export const fetchAvailableRoomSchedules = async (facultyId) => {
  const response = await fetch(`${roomScheduleUrl}/schedule/available/${facultyId}`, {headers});
  if (!response.ok) {
    throw new Error("Failed to fetch available room schedules");
  }
  const data = await response.json();
  console.log("Raw available schedules:", data);

  // Fetch rooms, days, and timeslots for mapping
  const [rooms, days, timeslots] = await Promise.all([
    roomsService.getAllRooms(),
    fetchDays(),
    fetchTimeslots(),
  ]);

  // Log fetched data before mapping
  console.log("Fetched Rooms:", rooms);
  console.log("Fetched Days:", days);
  console.log("Fetched Timeslots:", timeslots);

  // Map IDs to names but preserve original IDs for adding
  return data.map((schedule) => {
    const room = rooms.find((r) => r.roomId === schedule.roomId);
    const day = days.find((d) => d.dayId === schedule.dayId);
    const timeslot = timeslots.find((t) => t.id === schedule.timeslotId);

    return {
      // Display names for UI
      roomName: room ? room.roomName : "Unknown Room",
      roomType: room ? room.roomType : "Unknown Type",
      dayName: day ? day.dayName : "Unknown Day",
      startTime: timeslot ? timeslot.startTime : "Unknown Start Time",
      endTime: timeslot ? timeslot.endTime : "Unknown End Time",
      
      // Preserve original IDs for adding
      roomId: schedule.roomId,
      dayId: schedule.dayId,
      timeslotId: schedule.timeslotId,
      facultyId: schedule.facultyId,
      isOccupied: schedule.isOccupied,
      isChosen: schedule.isChosen
    };
  });
};

export const fetchSelectedRoomSchedules = async (facultyId) => {
  const response = await fetch(`${roomScheduleUrl}/schedule/selected/${facultyId}`, {headers});
  if (!response.ok) {
    throw new Error("Failed to fetch selected room schedules");
  }
  const data = await response.json();
  console.log("Raw selected schedules:", data);

  // Fetch rooms, days, and timeslots for mapping
  const [rooms, days, timeslots] = await Promise.all([
    roomsService.getAllRooms(),
    fetchDays(),
    fetchTimeslots(),
  ]);

  // Log fetched data before mapping
  console.log("Fetched Rooms:", rooms);
  console.log("Fetched Days:", days);
  console.log("Fetched Timeslots:", timeslots);

  // Map IDs to names but preserve original IDs for adding
  return data.map((schedule) => {
    const room = rooms.find((r) => r.roomId === schedule.roomId);
    const day = days.find((d) => d.dayId === schedule.dayId);
    const timeslot = timeslots.find((t) => t.id === schedule.timeslotId);

    return {
      // Display names for UI
      roomName: room ? room.roomName : "Unknown Room",
      roomType: room ? room.roomType : "Unknown Type",
      dayName: day ? day.dayName : "Unknown Day",
      startTime: timeslot ? timeslot.startTime : "Unknown Start Time",
      endTime: timeslot ? timeslot.endTime : "Unknown End Time",
      
      // Preserve original IDs for adding or deleting
      roomId: schedule.roomId,
      dayId: schedule.dayId,
      timeslotId: schedule.timeslotId,
      facultyId: schedule.facultyId,
      isOccupied: schedule.isOccupied,
      isChosen: schedule.isChosen
    };
  });
};

export const addRoomSchedule = async (schedule) => {
  const response = await fetch(`${roomScheduleUrl}/schedule/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schedule), // Sends IDs
  }, {headers});

  if (!response.ok) {
    throw new Error("Failed to add room schedule");
  }
};

export const removeRoomSchedule = async (schedule) => {
  const response = await fetch(`${roomScheduleUrl}/schedule/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schedule), // Sends the schedule object as the body
  }, {headers});

  if (!response.ok) {
    throw new Error("Failed to remove room schedule");
  }
};

export const regenerateSchedules = async (facultyId) => {
  if (!facultyId) {
    throw new Error('faculty ID is required to regenerate schedules.');
  }

  // Handle the special case for 'all' to regenerate all schedules
  const endpoint = facultyId === 'all' 
    ? `${roomScheduleUrl}/schedule/create/all` 
    : `${roomScheduleUrl}/schedule/create/${facultyId}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
  });

  if (!response.ok) {
    throw new Error('Failed to regenerate schedules');
  }
};
