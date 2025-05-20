// staffNumberService.js
// This service handles all API calls related to staff numbers

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Service class for handling staff number related API calls
 */
export class StaffNumberService {
  /**
   * Generate a new staff number
   * @returns {Promise<object>} Promise containing the newly generated staff number data
   */
  static async generateStaffNumber() {
    try {
      const endpoint = `${API_BASE_URL}/api/numbers/generate-number/`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error generating staff number:', error);
      throw error;
    }
  }

  /**
   * Get all previously generated staff numbers
   * @returns {Promise<Array>} Promise containing an array of staff number objects
   */
  static async getAllStaffNumbers() {
    try {
      const endpoint = `${API_BASE_URL}/api/numbers/`;
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching staff numbers:', error);
      throw error;
    }
  }

  /**
   * Delete a staff number by ID
   * @param {string|number} id - The ID of the staff number to delete
   * @returns {Promise<object>} Promise containing the result of the deletion operation
   */
  static async deleteStaffNumber(id) {
    try {
      const endpoint = `${API_BASE_URL}/api/staff/numbers/${id}/`;
      
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error deleting staff number with ID ${id}:`, error);
      throw error;
    }
  }
}

export default StaffNumberService;