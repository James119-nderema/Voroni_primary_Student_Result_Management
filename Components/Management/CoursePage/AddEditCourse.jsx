'use client';
import React, { useState, useEffect } from "react";
import { addCourse, editCourse } from "../../Services/courses";
import { motion } from "framer-motion";

const AddEditCourse = ({ mode = "add", initialData = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    courseType: "Standard"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        courseCode: initialData.courseCode || "",
        courseName: initialData.courseName || "",
        courseType: initialData.courseType || "Standard"
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      if (!formData.courseCode.trim() || !formData.courseName.trim()) {
        setError("Course code and name are required");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        courseCode: formData.courseCode,
        courseName: formData.courseName,
        courseType: formData.courseType
      };

      let result;
      if (mode === "add") {
        result = await addCourse(payload);
      } else {
        result = await editCourse(initialData.courseId, payload);
      }

      if (result.success) {
        setSuccessMessage(mode === "add" ? "Course added successfully!" : "Course updated successfully!");
        setTimeout(() => onSuccess(result.data || payload), 1500);
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
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl"
      >
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

        {error && <p className="mb-4 text-sm text-black">{error}</p>}
        {successMessage && <p className="mb-4 text-sm text-black">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseCode" className="block text-sm font-medium text-black mb-1">
              Course Code
            </label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="e.g. CS101"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="courseName" className="block text-sm font-medium text-black mb-1">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
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
              {isSubmitting ? "Saving..." : mode === "add" ? "Add Course" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddEditCourse;
