// frontend/src/services/subjectPriorityService.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/api/subjectpriority/';

export const getSubjects = async () => {
  try {
    const response = await axios.get(`${API_URL}subjects/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export const getTimeslots = async () => {
  try {
    const response = await axios.get(`${API_URL}timeslots/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching timeslots:', error);
    throw error;
  }
};

export const getPriorities = async () => {
  try {
    const response = await axios.get(`${API_URL}priorities/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching priorities:', error);
    throw error;
  }
};

export const createPriority = async (priorityData) => {
  try {
    const response = await axios.post(`${API_URL}priorities/`, priorityData);
    return response.data;
  } catch (error) {
    console.error('Error creating priority:', error);
    throw error;
  }
};

export const updatePriority = async (id, priorityData) => {
  try {
    const response = await axios.put(`${API_URL}priorities/${id}/`, priorityData);
    return response.data;
  } catch (error) {
    console.error('Error updating priority:', error);
    throw error;
  }
};

export const deletePriority = async (id) => {
  try {
    await axios.delete(`${API_URL}priorities/${id}/`);
    return true;
  } catch (error) {
    console.error('Error deleting priority:', error);
    throw error;
  }
};

export const bulkCreatePriorities = async (prioritiesData) => {
  try {
    const response = await axios.post(`${API_URL}priorities/bulk_create/`, prioritiesData);
    return response.data;
  } catch (error) {
    console.error('Error bulk creating priorities:', error);
    throw error;
  }
};