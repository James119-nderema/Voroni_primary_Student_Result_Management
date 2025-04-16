'use client';
import React, { useState, useEffect } from "react";
import { fetchLecturers, deleteLecturer } from "../../Services/LecturerService";
import AddLecturerPage from "./AddEditLecturer"; // Combined Add/Edit Lecturer component
import ConfirmationDialog from '../../Common/ConfirmationDialog'; // Custom confirmation dialog

const LecturersPage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Lecturers");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showModal, setShowModal] = useState(false); // State for Add/Edit Lecturer modal
  const [modalMode, setModalMode] = useState("add"); // Track whether the modal is for adding or editing
  const [selectedLecturer, setSelectedLecturer] = useState(null); // Track the lecturer being edited
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // State for confirmation dialog
  const [lecturerToDelete, setLecturerToDelete] = useState(null); // Track lecturer to delete

  const refreshLecturers = async () => {
    setLoading(true); // Ensure loading is true while fetching
    try {
      const data = await fetchLecturers();
      const sortedData = data.sort((a, b) => a.lecturerId - b.lecturerId); // Sort lecturers by ID
      setLecturers(sortedData);
      setFilteredLecturers(sortedData);
    } catch (error) {
      console.error("Error refreshing lecturers:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    refreshLecturers();
  }, []);

  useEffect(() => {
    let result = lecturers;
    if (activeCategory !== "All Lecturers") {
      result = result.filter(lecturer => lecturer.lecturerType === activeCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(lecturer => 
        lecturer.firstName.toLowerCase().includes(query) || 
        lecturer.lastName.toLowerCase().includes(query) ||
        lecturer.lecturerId.toString().includes(query)
      );
    }
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

  const openConfirmDialog = (lecturer) => {
    setLecturerToDelete(lecturer);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
    setLecturerToDelete(null);
  };

  const handleDeleteLecturer = async () => {
    try {
      await deleteLecturer(lecturerToDelete.lecturerId);
      await refreshLecturers(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting lecturer:", error);
    } finally {
      closeConfirmDialog();
    }
  };

  const handleAddLecturer = () => {
    setModalMode("add");
    setSelectedLecturer(null);
    setShowModal(true);
  };

  const handleEditLecturer = (lecturer) => {
    setModalMode("edit");
    setSelectedLecturer(lecturer);
    setShowModal(true);
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

  return (
    <div className="p-4 md:p-6 w-full mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl text-green-900 font-bold">Lecturers Management</h3>
          <p className="text-sm text-gray-600 mt-1">Manage and monitor all available Lecturers</p>
        </div>
        <button
          onClick={handleAddLecturer}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 shadow-md"
        >
          Add New Lecturer
        </button>
      </div>

      {/* Add/Edit Lecturer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-10">
          <div className="relative w-full max-w-lg">
            <div className="bg-white rounded-lg p-6 shadow-2xl mx-auto">
              <AddLecturerPage
                mode={modalMode}
                initialData={selectedLecturer}
                onSuccess={async () => {
                  await refreshLecturers(); // Refresh data after add/edit
                  setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the lecturer "${lecturerToDelete?.firstName} ${lecturerToDelete?.lastName}"?`}
        onConfirm={handleDeleteLecturer}
        onCancel={closeConfirmDialog}
      />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <select
                className="px-4 py-2 text-sm text-black font-medium rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue=""
                onChange={(e) => requestSort(e.target.value)}
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="lecturerId">ID</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
              </select>
            </div>
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="Search lecturers..."
                className="pl-4 pr-4 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-lg text-sm text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <span className="ml-3 text-gray-500">Loading lecturers...</span>
            </div>
          ) : (
            <table className="w-full min-w-max divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('lecturerId')}
                  >
                    Lecturer ID {getSortDirection('lecturerId')}
                  </th>
                  <th
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('firstName')}
                  >
                    First Name {getSortDirection('firstName')}
                  </th>
                  <th
                    className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('lastName')}
                  >
                    Last Name {getSortDirection('lastName')}
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLecturers.length > 0 ? (
                  filteredLecturers.map((lecturer, index) => (
                    <tr key={lecturer.lecturerId || index} className="hover:bg-indigo-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lecturer.lecturerId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lecturer.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lecturer.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-3">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 transition font-medium"
                            onClick={() => handleEditLecturer(lecturer)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 transition font-medium"
                            onClick={() => openConfirmDialog(lecturer)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
                      No Lecturers Found
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

export default LecturersPage;