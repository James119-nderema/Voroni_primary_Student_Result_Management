import API_BASE_URL from './HostConfig';

// GradingService.js - For the React frontend to interact with the Django backend

class GradingService {
  // Fetch all students
  static async fetchStudents() {
    try {
      const response = await fetch(`${API_BASE_URL}/students/`);
      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
        } catch (e) {
          throw new Error(`HTTP error! Status: ${response.status}: ${errorText || 'Unknown error'}`);
        }
      }
      const data = await response.json();
      console.log("Raw student data from API:", data);
      return data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }

  // Submit grades for multiple students
  static async submitGrades(submissionData) {
    try {
      // Make sure submissionData is an array, even if it's a single student
      const dataToSend = Array.isArray(submissionData) ? submissionData : [submissionData];
      
      // Validate data before sending
      if (!dataToSend.length) {
        throw new Error('No student data to submit');
      }
      
      // Check for any empty or invalid marks
      for (const student of dataToSend) {
        if (!student.id) {
          throw new Error('Missing student ID for one or more students');
        }
        
        if (!student.subject_marks) {
          throw new Error(`Missing subject marks for student ID: ${student.id}`);
        }
        
        // Validate that all subject marks are numbers
        for (const subject in student.subject_marks) {
          const mark = student.subject_marks[subject];
          if (mark === '' || mark === null || isNaN(Number(mark))) {
            throw new Error(`Invalid mark for ${subject} for student ID: ${student.id}`);
          }
        }
      }
      
      // Wrap the data in a 'marks' property as expected by the backend
      const formattedData = {
        marks: dataToSend
      };
      
      console.log('Final formatted data being sent to API:', JSON.stringify(formattedData, null, 2));
      
      // Check endpoint URL
      const submitEndpoint = `${API_BASE_URL}/student-marks/submit_grades/`;
      console.log('Submitting to endpoint:', submitEndpoint);
      
      const response = await fetch(submitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      // Parse the response JSON
      const responseData = await response.json();
      
      // If response is not ok, process the error properly
      if (!response.ok) {
        console.error("Error response from API:", responseData);
        
        // Check if there are validation errors about 7-day rule
        if (responseData.errors && Array.isArray(responseData.errors)) {
          // Return the errors with a special flag so we can handle them differently
          return { 
            success: false, 
            validationErrors: responseData.errors,
            submitted: responseData.submitted || []
          };
        }
        
        // If it's a standard error
        throw new Error(responseData.detail || JSON.stringify(responseData) || 'Failed to submit grades');
      }
      
      // For successful responses (or partially successful with some submissions)
      return { 
        success: true, 
        data: responseData,
        // Include any partial submissions if they exist
        submitted: responseData.submitted || responseData
      };
    } catch (error) {
      console.error('Error submitting grades:', error);
      throw error;
    }
  }
  
  // Get marks for a specific student
  static async getStudentMarks(studentId) {
    try {
      if (!studentId) {
        throw new Error('Student ID is required');
      }
      
      const response = await fetch(`${API_BASE_URL}/student-marks/get_by_student/?id=${studentId}`);
      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
        } catch (e) {
          throw new Error(`HTTP error! Status: ${response.status}: ${errorText || 'Unknown error'}`);
        }
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching marks for student ${studentId}:`, error);
      throw error;
    }
  }

  // Get marks for all students in a class
  static async getClassMarks(className) {
    try {
      if (!className) {
        throw new Error('Class name is required');
      }
      
      const response = await fetch(`${API_BASE_URL}/student-marks/get_by_class/?class_name=${encodeURIComponent(className)}`);
      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
        } catch (e) {
          throw new Error(`HTTP error! Status: ${response.status}: ${errorText || 'Unknown error'}`);
        }
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching marks for class ${className}:`, error);
      throw error;
    }
  }
}

export default GradingService;