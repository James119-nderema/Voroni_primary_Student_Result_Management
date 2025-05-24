// frontend/src/Services/subjectPriorityService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/api';

// Fetch all subjects
export const getSubjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

// Fetch all timeslots
export const getTimeslots = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/timeslots/`);
    // Format the timeslot display for the dropdown
    const formattedTimeslots = response.data.map(timeslot => ({
      ...timeslot,
      formatted_time: `${timeslot.start_time} - ${timeslot.end_time}`
    }));
    return formattedTimeslots;
  } catch (error) {
    console.error('Error fetching timeslots:', error);
    throw error;
  }
};

// Fetch all subject priorities
export const getPriorities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subject-priorities/`);
    // Transform the response data to match the component's expected format
    const formattedPriorities = response.data.map(priority => ({
      id: priority.id,
      subject_id: priority.subject,
      timeslot_id: priority.timeslot,
      priority_level: priority.priority,
      subject_name: priority.subject_name,
      timeslot_formatted: priority.timeslot_display
    }));
    return formattedPriorities;
  } catch (error) {
    console.error('Error fetching priorities:', error);
    throw error;
  }
};

// Create a new priority
export const createPriority = async (priorityData) => {
  try {
    const payload = {
      subject: parseInt(priorityData.subject_id),
      timeslot: parseInt(priorityData.timeslot_id),
      priority: parseInt(priorityData.priority_level)
    };
    
    const response = await axios.post(`${API_BASE_URL}/subject-priorities/`, payload);
    
    // Return formatted data to match the component's expected format
    return {
      id: response.data.id,
      subject_id: response.data.subject,
      timeslot_id: response.data.timeslot,
      priority_level: response.data.priority,
      subject_name: response.data.subject_name,
      timeslot_formatted: response.data.timeslot_display
    };
  } catch (error) {
    console.error('Error creating priority:', error);
    throw error;
  }
};

// Update an existing priority
export const updatePriority = async (id, priorityData) => {
  try {
    const payload = {
      subject: parseInt(priorityData.subject_id),
      timeslot: parseInt(priorityData.timeslot_id),
      priority: parseInt(priorityData.priority_level)
    };
    
    const response = await axios.put(`${API_BASE_URL}/subject-priorities/${id}/`, payload);
    
    // Return formatted data to match the component's expected format
    return {
      id: response.data.id,
      subject_id: response.data.subject,
      timeslot_id: response.data.timeslot,
      priority_level: response.data.priority,
      subject_name: response.data.subject_name,
      timeslot_formatted: response.data.timeslot_display
    };
  } catch (error) {
    console.error('Error updating priority:', error);
    throw error;
  }
};

// Delete a priority
export const deletePriority = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/subject-priorities/${id}/`);
    return true;
  } catch (error) {
    console.error('Error deleting priority:', error);
    throw error;
  }
};

// Create priorities in bulk
export const createBulkPriorities = async (priorities) => {
  try {
    // Format the data for bulk creation
    const payload = {
      priorities: priorities.map(p => ({
        subject: parseInt(p.subject_id),
        timeslot: parseInt(p.timeslot_id),
        priority: parseInt(p.priority_level)
      }))
    };
    
    const response = await axios.post(`${API_BASE_URL}/subject-priorities/bulk_create/`, payload);
    
    // Return formatted data to match the component's expected format
    return response.data.map(priority => ({
      id: priority.id,
      subject_id: priority.subject,
      timeslot_id: priority.timeslot,
      priority_level: priority.priority,
      subject_name: priority.subject_name,
      timeslot_formatted: priority.timeslot_display
    }));
  } catch (error) {
    console.error('Error creating bulk priorities:', error);
    throw error;
  }
};