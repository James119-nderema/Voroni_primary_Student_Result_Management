'use client';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { addAuthHeaders } from "../../LoginService";
const headers = addAuthHeaders();


// Define a helper function to fetch course data
const fetchCourses = async () => {
  try {
    const response = await axios.get("http://localhost:9921/courses/",{headers});
    console.log("Fetched courses:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const router = useRouter();

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    };
    getCourses();
  }, []);

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
    try {
      await axios.delete(`http://localhost:9921/course/${courseId}`);
      const updatedCourses = courses.filter((course) => course.courseId !== courseId);
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = (courseId) => {
    router.push(`/courses/edit/${courseId}`);
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl sm:text-2xl text-green-900 font-semibold">Courses Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available courses</p>
        </div>
        <button
          onClick={() => router.push('/courses/add')}
          className="mt-4 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition"
        >
          Add New Course
        </button>
      </div>

      {/* Category Filters */}
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
                            onClick={() => handleEditCourse(course.courseId)}
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
