'use client';
import React, { useState, useEffect } from "react";
import { addCourse, editCourse } from "../../Services/courses";
import { motion } from "framer-motion";

const AddCoursePage = ({ mode = "add", initialData = null, onSuccess, onCancel }) => {
  // Define state for form fields
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    courseType: "Standard" // Adding a default value for courseType
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // If in edit mode, populate form with initial data
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        courseCode: initialData.courseCode || "",
        courseName: initialData.courseName || "",
        courseType: initialData.courseType || "Standard" // Preserve existing courseType
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear messages when user starts typing
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      // Validate form data
      if (!formData.courseCode.trim() || !formData.courseName.trim()) {
        setError("Course code and name are required");
        setIsSubmitting(false);
        return;
      }

      // Create a payload that matches what the API expects
      const payload = {
        courseCode: formData.courseCode,
        courseName: formData.courseName,
        courseType: formData.courseType
      };

      console.log("Submitting course data:", payload);

      let result;
      let updatedCourse;
      
      if (mode === "add") {
        // Add new course
        result = await addCourse(payload);
        console.log("Add course result:", result);
        
        // Check if the API returned the created course
        if (result.success && result.data) {
          // Use the returned course data if available
          updatedCourse = result.data;
        } else {
          // If API doesn't return the created course, create a placeholder
          // This is temporary until the page refreshes
          updatedCourse = { 
            ...payload, 
            courseId: Math.floor(Math.random() * 10000) // Temporary ID for UI updates
          };
        }
      } else {
        // Edit existing course
        result = await editCourse(initialData.courseId, payload);
        console.log("Edit course result:", result);
        
        // For edit, combine with initial data
        updatedCourse = { 
          ...initialData, 
          ...payload 
        };
      }

      if (result.success) {
        // Set success message
        setSuccessMessage(mode === "add" 
          ? "Course added successfully!" 
          : "Course updated successfully!");
        
        console.log("Operation successful, returning course:", updatedCourse);
        
        // Wait a moment to show the success message before closing
        setTimeout(() => {
          onSuccess(updatedCourse);
        }, 1500);
      } else {
        setError(result.message || "Failed to save course");
      }
    } catch (error) {
      console.error("Error in course submission:", error);
      setError("Failed to save course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {mode === "add" ? "Add New Course" : "Edit Course"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}

      {/* Success message */}
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700 mb-1">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. CS101"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. Introduction to Computer Science"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || successMessage !== ""}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              (isSubmitting || successMessage !== "") ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              mode === "add" ? "Add Course" : "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCoursePage;