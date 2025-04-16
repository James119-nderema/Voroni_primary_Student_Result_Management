'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchClasses, deleteClass } from "../../Services/classService";
import AddEditClassPopup from "./AddEditClassPopup";
import ConfirmationDialog from "@/Components/Common/ConfirmationDialog";

const AddClasses = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Classes");
  const [searchTerm, setSearchTerm] = useState("");
  const [popupData, setPopupData] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Confirmation dialog state
  const [classToDelete, setClassToDelete] = useState(null); // Track class to delete
  const router = useRouter();

  const getClasses = async () => {
    try {
      const data = await fetchClasses();
      setClasses(data);
      setFilteredClasses(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    const filtered = classes.filter((classDetail) =>
      Object.values(classDetail).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredClasses(filtered);
  }, [searchTerm, classes]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All Classes") {
      setFilteredClasses(classes);
    } else {
      const filtered = classes.filter((classDetail) => classDetail.size === category);
      setFilteredClasses(filtered);
    }
  };

  const openConfirmDialog = (classDetail) => {
    setClassToDelete(classDetail);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
    setClassToDelete(null);
  };

  const handleDeleteClass = async () => {
    try {
      await deleteClass(classToDelete.classId);
      await getClasses(); // Refresh data after deletion
    } catch (error) {
      console.error(error.message);
    } finally {
      closeConfirmDialog();
    }
  };

  const handleAddClass = () => {
    setPopupData({});
  };

  const handleEditClass = (classDetail) => {
    setPopupData(classDetail);
  };

  const handleClosePopup = () => {
    setPopupData(null);
  };

  const handleSaveClass = async (updatedClass) => {
    await getClasses(); // Refresh data after saving
    handleClosePopup();
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h3 className="text-lg text-green-900 font-semibold">Class Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available classes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm text-gray-900 bg-white"
          />
          <button
            onClick={handleAddClass}
            className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Add New Class
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-2 sm:gap-4">
          {["All Classes"].map((category) => (
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
          <div className="p-4 text-center text-gray-500">Loading classes...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['ID', 'Code', 'Size', 'Period', 'Program', 'Actions'].map((heading) => (
                    <th key={heading} className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classDetail, index) => (
                    <tr key={`${classDetail.classId}-${index}`}>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {classDetail.classId}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {classDetail.classCode}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {classDetail.classSize}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {classDetail.periodName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {classDetail.programName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEditClass(classDetail)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => openConfirmDialog(classDetail)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 sm:px-6 py-4 text-center text-gray-500">
                      No classes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the class "${classToDelete?.classCode}"?`}
        onConfirm={handleDeleteClass}
        onCancel={closeConfirmDialog}
      />

      {popupData && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50">
          <div className="relative w-full p-4">
            <AddEditClassPopup
              data={popupData}
              onClose={handleClosePopup}
              onSave={handleSaveClass}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClasses;