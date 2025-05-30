import API_BASE_URL from './HostConfig';;

const API_URL = `${API_BASE_URL}/api/grades/`;

/**
 * Fetch all subjects from the API
 * @returns {Promise<Array>} Array of subject objects
 */
export const getAllGrades = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if response has the paginated structure
    if (data && data.results && Array.isArray(data.results)) {
      console.log('Paginated grade response detected with', data.results.length, 'grades');
      return data.results; // Return just the results array
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

/**
 * Fetch a single subject by ID
 * @param {number} id - The subject ID
 * @returns {Promise<Object>} Grade object
 */
export const getGradeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching subject with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Add a new subject
 * @param {Object} subjectData - The subject data
 * @returns {Promise<Object>} Created subject object
 */
export const addGrade = async (subjectData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subjectData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding subject:', error);
    throw error;
  }
};

/**
 * Update an existing subject
 * @param {number} id - The subject ID
 * @param {Object} subjectData - The updated subject data
 * @returns {Promise<Object>} Updated subject object
 */
export const updateGrade = async (id, subjectData) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subjectData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating subject with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a subject
 * @param {number} id - The subject ID
 * @returns {Promise<void>}
 */
export const deleteGrade = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting subject with ID ${id}:`, error);
    throw error;
  }
};