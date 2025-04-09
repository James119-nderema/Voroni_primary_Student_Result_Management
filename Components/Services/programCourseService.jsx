import axios from 'axios';

import API_BASE_URL from './HostConfig';

// Function to fetch all programs
export const fetchPrograms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/programs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};

// Function to fetch all periods
export const fetchPeriods = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/periods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching periods:', error);
    throw error;
  }
};

// Function to fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Function to fetch courses for a specific program and period
export const fetchProgramCourses = async (programId, periodId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/program/${programId}/${periodId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching program courses:', error);
    throw error;
  }
};

// Function to add a course to a program
export const addCourseToProgram = async (programId, periodId, courseId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/courses/program/create`, {
      programId,
      periodId,
      courseId
    });
    return response.data;
  } catch (error) {
    console.error('Error adding course to program:', error);
    throw error;
  }
};

// Function to remove a course from a program
export const removeCourseFromProgram = async (programCourseId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/courses/program/${programCourseId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing course from program:', error);
    throw error;
  }
};
