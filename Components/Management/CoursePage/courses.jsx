'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchCourses, deleteCourse } from "../../Services/courses";
import AddCoursePage from "./AddCourse"; // Import the AddCoursePage component
import { motion } from "framer-motion"; // Import motion for animations

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [showAddModal, setShowAddModal] = useState(false); // State for Add/Edit Course modal
  const [modalMode, setModalMode] = useState("add"); // Track whether the modal is for adding or editing
  const [selectedCourse, setSelectedCourse] = useState(null); // Track the course being edited
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const router = useRouter();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
        // Optionally add error state handling here
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    // Filter courses based on active category and search query
    let result = courses;

    // Apply category filter
    if (activeCategory !== "All Courses") {
      result = result.filter((course) => course.courseType === activeCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.courseName.toLowerCase().includes(query) ||
          course.courseCode.toLowerCase().includes(query) ||
          course.courseId.toString().includes(query)
      );
    }

    setFilteredCourses(result);
  }, [courses, activeCategory, searchQuery]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All Courses") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.courseType === category);
      setFilteredCourses(filtered);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const result = await deleteCourse(courseId);
        if (result.success) {
          // Update UI after successful deletion
          const updatedCourses = courses.filter((course) => course.courseId !== courseId);
          setCourses(updatedCourses);
          setFilteredCourses(updatedCourses);
          // Optionally add success notification
        } else {
          // Handle error case
          console.error("Failed to delete:", result.message);
          // Optionally display error notification
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const handleAddCourse = () => {
    setModalMode("add");
    setSelectedCourse(null);
    setShowAddModal(true);
  };

  const handleEditCourse = (course) => {
    setModalMode("edit");
    setSelectedCourse(course);
    setShowAddModal(true);
  };

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
        <div>
          <h3 className="text-xl sm:text-2xl text-green-900 font-semibold">Courses Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available courses</p>
        </div>
        <button
          onClick={handleAddCourse} // Open Add Course modal
          className="mt-4 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition"
        >
          Add New Course
        </button>
      </div>

      {/* Search Area */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add/Edit Course Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50"
          style={{ top: `${window.scrollY}px` }} // Adjust position based on scroll
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl"
          >
            <AddCoursePage
              mode={modalMode} // Pass mode ("add" or "edit")
              initialData={selectedCourse} // Pass selected course for editing
              onSuccess={(updatedCourse) => {
                if (modalMode === "add") {
                  setCourses([...courses, updatedCourse]);
                  setFilteredCourses([...filteredCourses, updatedCourse]);
                } else {
                  const updatedList = courses.map((course) =>
                    course.courseId === updatedCourse.courseId ? updatedCourse : course
                  );
                  setCourses(updatedList);
                  setFilteredCourses(updatedList);
                }
                setShowAddModal(false);
              }}
              onCancel={() => setShowAddModal(false)}
            />
          </motion.div>
        </div>
      )}

      {/* Category Filt/e/rs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-2 sm:gap-4">
          {["All Courses"].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 text-sm font-medium rounded-md transition 
                ${activeCategory === category 
                  ? "bg-indigo-100 text-indigo-600" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Table Section (with scroll on small screens) */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading courses...</div>
          ) : (
            <table className="w-full min-w-max divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr key={course.courseId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {course.courseId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.courseCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.courseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 transition"
                            onClick={() => handleEditCourse(course)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 transition"
                            onClick={() => handleDeleteCourse(course.courseId)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;