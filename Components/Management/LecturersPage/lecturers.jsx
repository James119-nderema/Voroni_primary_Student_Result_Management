'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { fetchLecturers, deleteLecturer } from "../../Services/LecturerService";
import AddLecturerPage from "./AddLecturer"; // Import the AddLecturerPage component

const LecturersPage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Lecturers");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showAddModal, setShowAddModal] = useState(false); // State for Add Lecturer modal
  const [modalMode, setModalMode] = useState("add"); // Track whether the modal is for adding or editing
  const [selectedLecturer, setSelectedLecturer] = useState(null); // Track the lecturer being edited
  const router = useRouter();
  // Add feedback message states
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState(""); // "success" or "error"

  useEffect(() => {
    const getLecturers = async () => {
      const data = await fetchLecturers();
      setLecturers(data);
      setFilteredLecturers(data);
      setLoading(false);
    };
    getLecturers();
  }, []);

  useEffect(() => {
    // Filter lecturers based on active category and search query
    let result = lecturers;
    
    // Apply category filter
    if (activeCategory !== "All Lecturers") {
      result = result.filter(lecturer => lecturer.lecturerType === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(lecturer => 
        lecturer.firstName.toLowerCase().includes(query) || 
        lecturer.lastName.toLowerCase().includes(query) ||
        lecturer.lecturerId.toString().includes(query)
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredLecturers(result);
  }, [lecturers, activeCategory, searchQuery, sortConfig]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Corrected delete handler that properly handles Axios errors
  const handleDeleteLecturer = async (lecturerId) => {
    try {
      await deleteLecturer(lecturerId);
      
      // If we reach this point without an error being thrown,
      // or if the error was caught but we determined the deletion was successful,
      // update the UI
      const updatedLecturers = lecturers.filter((lecturer) => lecturer.lecturerId !== lecturerId);
      setLecturers(updatedLecturers);
      setFilteredLecturers(updatedLecturers);
      
      // Show success feedback
      setFeedbackMessage("Lecturer deleted successfully!");
      setFeedbackType("success");
    } catch (error) {
      console.error("Error deleting lecturer:", error);
      
      // Check if this is a 404 error but the item was actually deleted
      // This is a workaround for the API returning 404 even when deletion is successful
      if (error?.response?.status === 404) {
        // Even though we got a 404, let's assume the deletion was successful
        // and update the UI accordingly
        const updatedLecturers = lecturers.filter((lecturer) => lecturer.lecturerId !== lecturerId);
        setLecturers(updatedLecturers);
        setFilteredLecturers(updatedLecturers);
        
        // Show success feedback
        setFeedbackMessage("Lecturer deleted successfully!");
        setFeedbackType("success");
      } else {
        // For other errors, show error feedback
        setFeedbackMessage("Failed to delete lecturer. Please try again.");
        setFeedbackType("error");
      }
    } finally {
      // Clear feedback message after 3 seconds
      setTimeout(() => {
        setFeedbackMessage("");
        setFeedbackType("");
      }, 3000);
    }
  };

  const handleEditLecturer = (lecturer) => {
    setModalMode("edit");
    setSelectedLecturer(lecturer);
    setShowAddModal(true);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const lecturerCategories = ["All Lecturers", "Full Time", "Part Time", "Visiting"];

  const handleAddLecturerSuccess = (newLecturer) => {
    setLecturers([...lecturers, newLecturer]);
    setFilteredLecturers([...filteredLecturers, newLecturer]);
    setShowAddModal(false);
    
    // Show success feedback
    setFeedbackMessage("Lecturer added successfully!");
    setFeedbackType("success");
    
    // Clear feedback message after 3 seconds
    setTimeout(() => {
      setFeedbackMessage("");
      setFeedbackType("");
    }, 3000);
  };

  const handleAddLecturer = () => {
    setModalMode("add");
    setSelectedLecturer(null);
    setShowAddModal(true);
  };

  const handleSortByName = (direction) => {
    const sortedLecturers = [...filteredLecturers].sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return direction === 'ascending' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setFilteredLecturers(sortedLecturers);
  };

  const handleSortById = (direction) => {
    const sortedLecturers = [...filteredLecturers].sort((a, b) => {
      return direction === 'ascending' ? a.lecturerId - b.lecturerId : b.lecturerId - a.lecturerId;
    });
    setFilteredLecturers(sortedLecturers);
  };

  const handleSort = (option) => {
    switch (option) {
      case 'name-asc':
        handleSortByName('ascending');
        break;
      case 'name-desc':
        handleSortByName('descending');
        break;
      case 'id-asc':
        handleSortById('ascending');
        break;
      case 'id-desc':
        handleSortById('descending');
        break;
      default:
        break;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6 w-full mx-auto bg-gray-50 min-h-screen"
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl sm:text-2xl text-green-900 font-bold">Lecturers Management</h3>
          <p className="text-sm text-gray-600 mt-1">Manage and monitor all available Lecturers</p>
        </motion.div>
        <motion.button
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddLecturer} // Open Add Lecturer modal
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 
                   transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Lecturer
        </motion.button>
      </div>

      {/* Feedback Message */}
      {feedbackMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-4 ${
            feedbackType === "success" 
              ? "bg-green-50 border border-green-200 text-green-800" 
              : "bg-red-50 border border-red-200 text-red-800"
          } rounded-md text-sm`}
        >
          {feedbackMessage}
        </motion.div>
      )}

      {/* Add Lecturer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative w-full p-4 max-w-lg">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl mx-auto"
            >
              <AddLecturerPage
                mode={modalMode} // Pass mode ("add" or "edit")
                initialData={selectedLecturer} // Pass selected lecturer for editing
                onSuccess={(updatedLecturer) => {
                  if (modalMode === "add") {
                    setLecturers([...lecturers, updatedLecturer]);
                    setFilteredLecturers([...filteredLecturers, updatedLecturer]);
                    setFeedbackMessage("Lecturer added successfully!");
                  } else {
                    const updatedList = lecturers.map((lecturer) =>
                      lecturer.lecturerId === updatedLecturer.lecturerId ? updatedLecturer : lecturer
                    );
                    setLecturers(updatedList);
                    setFilteredLecturers(updatedList);
                    setFeedbackMessage("Lecturer updated successfully!");
                  }
                  setFeedbackType("success");
                  setShowAddModal(false);
                  
                  // Clear feedback message after 3 seconds
                  setTimeout(() => {
                    setFeedbackMessage("");
                    setFeedbackType("");
                  }, 3000);
                }}
                onCancel={() => setShowAddModal(false)}
              />
            </motion.div>
          </div>
        </div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <select
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue="" // Use defaultValue instead of selected
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="name-asc">Name Ascending</option>
                <option value="name-desc">Name Descending</option>
                <option value="id-asc">ID Ascending</option>
                <option value="id-desc">ID Descending</option>
              </select>
            </div>
            <div className="relative w-full md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search lecturers..."
                className="pl-10 pr-4 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-lg text-sm text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center p-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              <span className="ml-3 text-gray-500">Loading lecturers...</span>
            </motion.div>
          ) : (
            <table className="w-full min-w-max divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('lecturerId')}
                  >
                    <div className="flex items-center gap-1">
                      Lecturer ID {getSortDirection('lecturerId')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('firstName')}
                  >
                    <div className="flex items-center gap-1">
                      First Name {getSortDirection('firstName')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('lastName')}
                  >
                    <div className="flex items-center gap-1">
                      Last Name {getSortDirection('lastName')}
                    </div>
                  </th>
                  
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLecturers.length > 0 ? (
                  filteredLecturers.map((lecturer, index) => (
                    <motion.tr 
                      key={lecturer.lecturerId || index} 
                      className="hover:bg-indigo-50 transition-colors duration-150"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lecturer.lecturerId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lecturer.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lecturer.lastName}</td>
              
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-indigo-600 hover:text-indigo-900 transition font-medium flex items-center gap-1"
                            onClick={() => handleEditLecturer(lecturer)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-600 hover:text-red-900 transition font-medium flex items-center gap-1"
                            onClick={() => handleDeleteLecturer(lecturer.lecturerId)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5V15m-6 4h12a2 2 0 002-2v-12a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-lg font-medium">No Lecturers Found</span>
                        <span className="text-sm mt-1">Try adjusting your search or filter criteria</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LecturersPage;