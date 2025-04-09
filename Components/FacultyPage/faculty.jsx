'use client';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

// Fetch faculties function
const fetchFaculties = async () => {
  try {
    const response = await axios.get("http://localhost:9921/faculties/");
    console.log("Fetched faculties:", response.data);
    return Array.isArray(response.data) ? response.data : []; // Ensure response is an array
  } catch (error) {
    console.error("Error fetching faculties:", error);
    return [];
  }
};

const FacultiesPage = () => {
  const [faculties, setFaculties] = useState([]); // Ensure it's initialized as an array
  const [filteredFaculties, setFilteredFaculties] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Faculties");
  const router = useRouter();

  useEffect(() => {
    const getFaculties = async () => {
      const data = await fetchFaculties();
      setFaculties(data);
      setFilteredFaculties(data);
      setLoading(false);
    };
    getFaculties();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All Faculties") {
      setFilteredFaculties(faculties);
    } else {
      const filtered = faculties.filter((faculty) => faculty.facultyType === category);
      setFilteredFaculties(filtered);
    }
  };

  const handleDeleteFaculty = async (facultyId) => {
    try {
      await axios.delete(`http://localhost:9921/faculty/${facultyId}`);
      const updatedFaculties = faculties.filter((faculty) => faculty.facultyId !== facultyId);
      setFaculties(updatedFaculties);
      setFilteredFaculties(updatedFaculties);
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleEditFaculty = (facultyId) => {
    router.push(`/faculty/Edit/${facultyId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg text-green-900 font-semibold">Faculties Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available faculties</p>
        </div>
        <button
          onClick={() => router.push('/faculty/add')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
          Add New Faculty
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex gap-4">
          {["All Faculties"].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-md text-sm font-medium ${activeCategory === category
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading faculties...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <tr key={faculty.facultyId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {faculty.facultyId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {faculty.facultyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEditFaculty(faculty.facultyId)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteFaculty(faculty.facultyId)}
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
                    No faculties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FacultiesPage;
