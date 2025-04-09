import axios from "axios"; 
import API_BASE_URL from './HostConfig';

const courseServiceUrl = `${API_BASE_URL}/courses`;

export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${courseServiceUrl}/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch courses.");
  }
};

export const addCourse = async (courseData) => {
  try {
    console.log("Sending data to API:", courseData);
    const response = await axios.post(`${courseServiceUrl}/create`, courseData);
    console.log("API response:", response);
    
    // Handle different response structures
    if (response.data) {
      if (response.data.success === false) {
        return { 
          success: false, 
          message: response.data.message || "Server indicated failure" 
        };
      }
      
      // Check if we have a direct success response
      if (response.data.success === true) {
        return {
          success: true,
          message: response.data.message || "Course added successfully!",
          data: response.data.data // Include the returned course if available
        };
      }
      
      // If the API returns the created object directly
      return {
        success: true,
        message: "Course added successfully!",
        data: response.data // Assume the response is the created course
      };
    }
    
    return { 
      success: false, 
      message: "Unexpected response format from server" 
    };
  } catch (error) {
    console.error("Error adding course:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to add course." 
    };
  }
};

export const editCourse = async (courseId, courseData) => {
  try {
    console.log(`Updating course ${courseId} with data:`, courseData);
    const response = await axios.put(`${courseServiceUrl}/update/${courseId}`, courseData);
    console.log("Update response:", response);
    
    // Handle successful response
    return { 
      success: true, 
      message: response.data?.message || "Course updated successfully!",
      data: response.data?.data || response.data // Include any returned data
    };
  } catch (error) {
    console.error("Error editing course:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to edit course." 
    };
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${courseServiceUrl}/delete/${courseId}`);
    return { 
      success: true, 
      message: response.data?.message || "Course deleted successfully!" 
    };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to delete course." 
    };
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${courseServiceUrl}/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    throw new Error(error.response?.data?.message || "Failed to fetch course details.");
  }
};