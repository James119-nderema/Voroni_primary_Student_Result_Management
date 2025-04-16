import axios from 'axios';
import API_BASE_URL from './HostConfig';

const programServiceUrl = `${API_BASE_URL}/programs`;

export const ProgramService = {
  // Fetch all programs
  getPrograms: async () => {
    try {
      const response = await axios.get(`${programServiceUrl}/`);

      if (Array.isArray(response.data)) {
        return response.data.map((program, index) => ({
          ...program,
          uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
          programId: program.programId,
          programName: program.programName,
          departmentId: program.departmentId,
          departmentName: program.departmentName,
          name: program.programName || `Unnamed Program ${index + 1}`,
          numericId: program.programId || index + 1,
        }));
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map((program, index) => ({
          ...program,
          uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
          programId: program.programId,
          programName: program.programName,
          departmentId: program.departmentId,
          departmentName: program.departmentName,
          name: program.programName || `Unnamed Program ${index + 1}`,
          numericId: program.programId || index + 1,
        }));
      } else if (response.data && Array.isArray(response.data.programs)) {
        return response.data.programs.map((program, index) => ({
          ...program,
          uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
          programId: program.programId,
          programName: program.programName,
          departmentId: program.departmentId,
          departmentName: program.departmentName,
          name: program.programName || `Unnamed Program ${index + 1}`,
          numericId: program.programId || index + 1,
        }));
      } else if (response.data && typeof response.data === 'object') {
        console.warn('Unexpected response format:', response.data);
        const programsArray = Object.values(response.data);
        if (programsArray.length > 0) {
          return programsArray.map((program, index) => ({
            ...program,
            uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
            programId: program.programId,
            programName: program.programName,
            departmentId: program.departmentId,
            departmentName: program.departmentName,
            name: program.programName || `Unnamed Program ${index + 1}`,
            numericId: program.programId || index + 1,
          }));
        }
        return [];
      }
      return [];
    } catch (error) {
      console.error('Programs Fetch Error:', error);
      return [];
    }
  },

  // Create a new program
  createProgram: async (programData) => {
    try {
      console.log('Sending program data:', programData);
      const response = await axios.post(`${programServiceUrl}/create`, programData);
      if (!response.status || (response.status !== 200 && response.status !== 201)) {
        throw new Error('Failed to create program');
      }
      return response.data;
    } catch (error) {
      console.error('Create Program Error:', error?.response?.data || error.message);
      throw new Error(`Failed to create program: ${error.message}`);
    }
  },

  // Delete a program
  deleteProgram: async (programId) => {
    try {
      const response = await axios.delete(`${programServiceUrl}/delete/${programId}`);
      return response.data;
    } catch (error) {
      console.error('Delete Program Error:', error);
      throw new Error(`Failed to delete program: ${error.message}`);
    }
  },

  // Fetch all periods
  getPeriods: async () => {
    try {
      const response = await axios.get(`${programServiceUrl}/periods`);
      return response.data.map((period, index) => ({
        ...period,
        uniqueId: period.id ? `period-${period.id}` : `period-${index}`,
        name: period.name || `Y${Math.floor(index / 2) + 1}S${(index % 2) + 1}`,
        numericId: period.id || index + 1,
      }));
    } catch (error) {
      console.error('Periods Fetch Error:', error);
      throw new Error(`Failed to load periods: ${error.message}`);
    }
  },

  // Fetch all courses
  getCourses: async () => {
    try {
      const response = await axios.get(`${programServiceUrl}/courses`);
      return response.data.map((course, index) => ({
        ...course,
        uniqueId: course.id ? `course-${course.id}` : `course-${index}`,
        courseCode: course.courseCode || course.code || `COURSE-${index + 1}`,
        name: course.courseName || `Unnamed Course ${index + 1}`,
        department: course.departmentName || 'Unknown Department',
      }));
    } catch (error) {
      console.error('Courses Fetch Error:', error);
      throw new Error(`Failed to load courses: ${error.message}`);
    }
  },

  // Fetch courses for a specific program and period
  getProgramCourses: async (programId, periodId) => {
    try {
      const response = await axios.get(
        `${programServiceUrl}/programCourses/${programId}/${periodId}`
      );
      return response.data;
    } catch (error) {
      console.error('Program Courses Fetch Error:', error);
      return [];
    }
  },

  // Add a course to a program period
  addProgramCourse: async (programId, periodId, courseId) => {
    try {
      return await axios.post(`${programServiceUrl}/programCourse`, {
        programId,
        periodId,
        courseId,
      });
    } catch (error) {
      console.error('Add Program Course Error:', error);
      throw new Error(`Failed to add course: ${error.message}`);
    }
  },

  // Remove a course from a program period
  deleteProgramCourse: async (programCourseId) => {
    try {
      return await axios.delete(`${programServiceUrl}/programCourse/${programCourseId}`);
    } catch (error) {
      console.error('Delete Program Course Error:', error);
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  },

  // Update a program
  updateProgram: async (programData) => {
    try {
      const response = await axios.put(`${programServiceUrl}/update/${programData.programId}`, programData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error in updateProgram:', error?.response?.data || error.message);
      throw new Error(`Failed to update program: ${error.message}`);
    }
  },
};

export default ProgramService;
