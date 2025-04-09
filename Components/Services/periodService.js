// services/periodService.js
import axios from "axios";
import { addAuthHeaders } from '../LoginService';
const header = addAuthHeaders();

import API_BASE_URL from './HostConfig';

const periodServiceUrl = `${API_BASE_URL}/periods`;

export const getPeriods = async () => {
  try {
    const response = await axios.get(`${periodServiceUrl}`, header);
    console.log("Fetched periods:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching periods:", error);
    return [];
  }
};

export const deletePeriod = async (periodId) => {
  try {
    const response = await axios.delete(`${periodServiceUrl}/${periodId}`, header);
    return response.data;
  } catch (error) {
    console.error("Error deleting period:", error);
    throw error;
  }
};

export const createPeriod = async (periodData) => {
  try {
    const response = await axios.post(`${periodServiceUrl}/create`, periodData, header);
    return response.data;
  } catch (error) {
    console.error("Error creating period:", error);
    throw error;
  }
};

export const updatePeriod = async (periodId, periodData) => {
  try {
    const response = await axios.put(`${periodServiceUrl}/${periodId}`, periodData, header);
    return response.data;
  } catch (error) {
    console.error("Error updating period:", error);
    throw error;
  }
};

export const getPeriodById = async (periodId) => {
  try {
    const response = await axios.get(`${periodServiceUrl}/${periodId}`, header);
    return response.data;
  } catch (error) {
    console.error(`Error fetching period with id ${periodId}:`, error);
    throw error;
  }
};

export default {
  getPeriods,
  deletePeriod,
  createPeriod,
  updatePeriod,
  getPeriodById
};