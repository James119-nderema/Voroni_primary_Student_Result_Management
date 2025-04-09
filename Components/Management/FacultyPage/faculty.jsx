'use client';
import React, { useState, useEffect } from "react";
import { fetchFaculties, deleteFaculty } from '../../Services/facultyService';
import AddFacultyPopup from './AddFacultyPopup';
import EditFacultyPopup from './EditFacultyPopup';

const FacultiesPage = () => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Faculties");
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState(""); // "success" or "error"
  
  // Popup state
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    const getFaculties = async () => {
      try {
        const data = await fetchFaculties();
        setFaculties(data);
        setFilteredFaculties(data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setFeedbackMessage("Failed to load faculties. Please try again later.");
        setFeedbackType("error");
      } finally {
        setLoading(false);
      }
    };
    
    getFaculties();
  }, []);

  // Filter faculties based on search term
  useEffect(() => {
    const filtered = faculties.filter((faculty) =>
      Object.values(faculty).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredFaculties(filtered);
  }, [searchTerm, faculties]);

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
      const result = await deleteFaculty(facultyId);
      
      if (result.success) {
        const updatedFaculties = faculties.filter((faculty) => faculty.facultyId !== facultyId);
        setFaculties(updatedFaculties);
        setFilteredFaculties(updatedFaculties);
        setFeedbackMessage(result.message || "Faculty deleted successfully!");
        setFeedbackType("success");
      } else {
        setFeedbackMessage(result.message || "Failed to delete faculty.");
        setFeedbackType("error");
      }
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setFeedbackMessage("");
        setFeedbackType("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting faculty:", error);
      setFeedbackMessage("An unexpected error occurred while deleting the faculty.");
      setFeedbackType("error");
    }
  };

  const handleEditFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setIsEditPopupOpen(true);
  };

  const handleAddNew = () => {
    setIsAddPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsAddPopupOpen(false);
    setIsEditPopupOpen(false);
    setSelectedFaculty(null);
  };

  const handleFacultyAdded = (newFaculty) => {
    // Refresh the faculty list after adding
    fetchFaculties()
      .then(data => {
        setFaculties(data);
        setFilteredFaculties(data);
      })
      .catch(error => {
        console.error("Error refreshing faculties:", error);
      });

    setFeedbackMessage("Faculty added successfully!");
    setFeedbackType("success");
    handlePopupClose();
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setFeedbackMessage("");
      setFeedbackType("");
    }, 3000);
  };

  const handleFacultyUpdated = () => {
    // Refresh the faculty list after updating
    fetchFaculties()
      .then(data => {
        setFaculties(data);
        setFilteredFaculties(data);
      })
      .catch(error => {
        console.error("Error refreshing faculties:", error);
      });

    setFeedbackMessage("Faculty updated successfully!");
    setFeedbackType("success");
    handlePopupClose();
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setFeedbackMessage("");
      setFeedbackType("");
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h3 className="text-lg text-green-900 font-semibold">Faculties Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available faculties</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search faculties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm text-gray-900 bg-white"
          />
          <button
            onClick={handleAddNew}
            className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Add New Faculty
          </button>
        </div>
      </div>

      {/* Feedback Message */}
      {feedbackMessage && (
        <div 
          className={`mb-4 p-4 ${
            feedbackType === "success" 
              ? "bg-green-50 border border-green-200 text-green-800" 
              : "bg-red-50 border border-red-200 text-red-800"
          } rounded-md text-sm`}
        >
          {feedbackMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-2 sm:gap-4">
          {["All Faculties"].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                activeCategory === category
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFaculties.length > 0 ? (
                  filteredFaculties.map((faculty) => (
                    <tr key={faculty.facultyId} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {faculty.facultyId}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {faculty.facultyName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEditFaculty(faculty)}
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
                    <td colSpan="3" className="px-4 sm:px-6 py-4 text-center text-gray-500">
                      No faculties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Faculty Popup */}
      {isAddPopupOpen && (
        <AddFacultyPopup
          onClose={handlePopupClose}
          onFacultyAdded={handleFacultyAdded}
        />
      )}

      {/* Edit Faculty Popup */}
      {isEditPopupOpen && selectedFaculty && (
        <EditFacultyPopup
          faculty={selectedFaculty}
          onClose={handlePopupClose}
          onFacultyUpdated={handleFacultyUpdated}
        />
      )}
    </div>
  );
};

export default FacultiesPage;