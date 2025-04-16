import axios from "axios";
import API_BASE_URL from "./HostConfig";
import { addAuthHeaders } from "../LoginService";

const lecturerCoursesUrl = `${API_BASE_URL}/courses`;
const headers = addAuthHeaders();

// Fetch available courses for a lecturer
export const fetchAvailableCourses = async (lecturerId) => {
  try {
    const response = await axios.get(`${lecturerCoursesUrl}/lecturers/available/${lecturerId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching available courses:", error);
    return [];
  }
};

// Fetch selected courses for a lecturer
export const fetchSelectedCourses = async (lecturerId) => {
  try {
    const response = await axios.get(`${lecturerCoursesUrl}/lecturers/selected/${lecturerId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching selected courses:", error);
    return [];
  }
};

// Add a course to a lecturer
export const addLecturerCourse = async (lecturerId, courseId) => {
  try {
    const lecturerCourse = {
      lecturerId: lecturerId,
      courseId: courseId,
      isSelected: true
    };
    const response = await axios.post(`${lecturerCoursesUrl}/lecturers/create`, lecturerCourse, { headers });
    return { success: true, message: response.data.message || "Course assigned successfully!" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to assign course" };
  }
};

// Remove a course from a lecturer
export const removeLecturerCourse = async (lecturerId, courseId) => {
  try {
    const lecturerCourse = {
      lecturerId: lecturerId,
      courseId: courseId,
      isSelected: false
    };
    const response = await axios.post(`${lecturerCoursesUrl}/lecturers/remove`, lecturerCourse, { headers });
    return { success: true, message: response.data.message || "Course removed successfully!" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to remove course" };
  }
};

// Generate all lecturer course combinations
export const generateLecturerCourses = async () => {
  try {
    const response = await axios.post(`${lecturerCoursesUrl}/lecturers/generate/all`, {}, { headers });
    return { success: true, message: response.data.message || "Lecturer courses generated successfully!" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to generate lecturer courses" };
  }
};
