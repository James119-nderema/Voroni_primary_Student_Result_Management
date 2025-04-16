'use client';
import React, { useState, useEffect } from "react";
import { fetchLecturers } from "../../Services/LecturerService";
import { fetchCourses } from "@/Components/Services/courses";
import { 
  fetchAvailableCourses, 
  fetchSelectedCourses, 
  addLecturerCourse, 
  removeLecturerCourse,
  generateLecturerCourses 
} from "../../Services/LecturerCoursesService";
import { toast } from "react-toastify";

const LecturerCoursesPage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingCombinations, setGeneratingCombinations] = useState(false);

  // Load all lecturers and courses on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [lecturersData, coursesData] = await Promise.all([
          fetchLecturers(),
          fetchCourses()
        ]);
        
        setLecturers(lecturersData);
        setCourses(coursesData);
        
        // Select first lecturer by default if available
        if (lecturersData.length > 0) {
          const firstLecturerId = lecturersData[0].lecturerId;
          setSelectedLecturerId(firstLecturerId);
          await loadLecturerCourses(firstLecturerId);
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
        toast.error("Failed to load initial data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load lecturer courses when lecturer selection changes
  const loadLecturerCourses = async (lecturerId) => {
    setLoading(true);
    try {
      const [availableData, selectedData] = await Promise.all([
        fetchAvailableCourses(lecturerId),
        fetchSelectedCourses(lecturerId)
      ]);
      
      // Map course IDs to full course objects for better display
      const mappedAvailableCourses = availableData.map(course => ({
        courseId: course.courseId || course, // Ensure courseId exists
        name: course.courseName || `Unknown Course (${course.courseId || course})`, // Use courseName or fallback
        listType: 'available',
      }));
      
      const mappedSelectedCourses = selectedData.map(course => ({
        courseId: course.courseId || course, // Ensure courseId exists
        name: course.courseName || `Unknown Course (${course.courseId || course})`, // Use courseName or fallback
        listType: 'selected',
      }));
      
      setAvailableCourses(mappedAvailableCourses);
      setSelectedCourses(mappedSelectedCourses);
    } catch (error) {
      console.error("Failed to load lecturer courses:", error);
      toast.error("Failed to load lecturer courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle lecturer selection change
  const handleLecturerChange = (e) => {
    const lecturerId = e.target.value;
    setSelectedLecturerId(lecturerId);
    if (lecturerId) {
      loadLecturerCourses(lecturerId);
    } else {
      setAvailableCourses([]);
      setSelectedCourses([]);
    }
  };

  // Handle adding a course to a lecturer
  const handleAddCourse = async (courseId) => {
    try {
      const result = await addLecturerCourse(selectedLecturerId, courseId);
      if (result.success) {
        // Refresh the course lists
        await loadLecturerCourses(selectedLecturerId);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course. Please try again.");
    }
  };

  // Handle removing a course from a lecturer
  const handleRemoveCourse = async (courseId) => {
    try {
      const result = await removeLecturerCourse(selectedLecturerId, courseId);
      if (result.success) {
        // Refresh the course lists
        await loadLecturerCourses(selectedLecturerId);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error removing course:", error);
      toast.error("Failed to remove course. Please try again.");
    }
  };

  // Handle generating lecturer course combinations
  const handleGenerateCombinations = async () => {
    setGeneratingCombinations(true);
    try {
      const result = await generateLecturerCourses();
      if (result.success) {
        toast.success(result.message);
        // Reload current lecturer's courses to reflect changes
        await loadLecturerCourses(selectedLecturerId);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error generating combinations:", error);
      toast.error("Failed to generate combinations. Please try again.");
    } finally {
      setGeneratingCombinations(false);
    }
  };

  // Get lecturer name from ID
  const getLecturerName = (id) => {
    const lecturer = lecturers.find(l => l.lecturerId.toString() === id.toString());
    return lecturer ? `${lecturer.firstName} ${lecturer.lastName}` : "Unknown Lecturer";
  };

  return (
    <div className="p-4 md:p-6 w-full mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl text-green-900 font-bold">Lecturer Courses Management</h3>
          <p className="text-sm text-gray-600 mt-1">Assign and manage courses for lecturers</p>
        </div>
        <button
          onClick={handleGenerateCombinations}
          disabled={generatingCombinations}
          className={`px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md
            ${generatingCombinations ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
        >
          {generatingCombinations ? 'Generating...' : 'Generate All Combinations'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Lecturer
              </label>
              <select
                value={selectedLecturerId}
                onChange={handleLecturerChange}
                disabled={loading}
                className="px-4 py-2 w-full text-sm rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">-- Select Lecturer --</option>
                {lecturers.map((lecturer) => (
                  <option key={lecturer.lecturerId} value={lecturer.lecturerId}>
                    {lecturer.firstName} {lecturer.lastName}
                  </option>
                ))}
              </select>
            </div>
            {selectedLecturerId && (
              <div className="text-sm text-gray-600">
                <p><strong>Selected Lecturer:</strong> {getLecturerName(selectedLecturerId)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <span className="text-gray-500">Loading courses...</span>
        </div>
      ) : selectedLecturerId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Courses */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-4 bg-gray-50 border-b">
              <h4 className="text-lg font-medium text-gray-800">Available Courses</h4>
              <p className="text-xs text-gray-500">Courses that can be assigned to this lecturer</p>
            </div>
            <div className="p-4 min-h-[300px]">
              {availableCourses.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {availableCourses.map((course, index) => (
                    <li key={`available-${course.courseId}-${index}`} className="py-3 flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{course.name}</p>
                        <p className="text-xs text-gray-500">ID: {course.courseId}</p>
                      </div>
                      <button
                        onClick={() => handleAddCourse(course.courseId)}
                        className="ml-4 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                      >
                        Add
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  No available courses
                </div>
              )}
            </div>
          </div>

          {/* Selected Courses */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-4 bg-gray-50 border-b">
              <h4 className="text-lg font-medium text-gray-800">Selected Courses</h4>
              <p className="text-xs text-gray-500">Courses assigned to this lecturer</p>
            </div>
            <div className="p-4 min-h-[300px]">
              {selectedCourses.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {selectedCourses.map((course, index) => (
                    <li key={`selected-${course.courseId}-${index}`} className="py-3 flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{course.name}</p>
                        <p className="text-xs text-gray-500">ID: {course.courseId}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveCourse(course.courseId)}
                        className="ml-4 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  No courses assigned
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
          Please select a lecturer to manage their courses
        </div>
      )}
    </div>
  );
};

export default LecturerCoursesPage;
