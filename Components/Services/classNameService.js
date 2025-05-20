// ClassNameService.js - Handles all API interactions for class names

const API_URL = 'http://127.0.0.1:8001/classnames';

export const ClassNameService = {
  // Fetch all class names
  getAllClassNames: async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch class names:', error);
      throw error;
    }
  },

  // Get a specific class name by ID
  getClassNameById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch class name with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new class name
  createClassName: async (className) => {
    try {
      const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(className),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to create class name:', error);
      throw error;
    }
  },

  // Update an existing class name
  updateClassName: async (id, className) => {
    try {
      const response = await fetch(`${API_URL}/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(className),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to update class name with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a class name
  deleteClassName: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error(`Failed to delete class name with id ${id}:`, error);
      throw error;
    }
  },

  // Bulk create multiple class names
  bulkCreateClassNames: async (classNames) => {
    try {
      const response = await fetch(`${API_URL}/bulk_create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classNames),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to bulk create class names:', error);
      throw error;
    }
  },

  // Bulk update multiple class names
  bulkUpdateClassNames: async (classNames) => {
    try {
      const response = await fetch(`${API_URL}/bulk_update/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classNames),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to bulk update class names:', error);
      throw error;
    }
  },

  // Bulk delete multiple class names
  bulkDeleteClassNames: async (ids) => {
    try {
      const response = await fetch(`${API_URL}/bulk_delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error('Failed to bulk delete class names:', error);
      throw error;
    }
  }
};