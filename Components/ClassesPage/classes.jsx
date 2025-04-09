'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchClasses, deleteClass } from "../Services/classService";
import AddEditClassPopup from "./AddEditClassPopup"; // Import the refactored popup component

const AddClasses = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Classes");
  const [searchTerm, setSearchTerm] = useState("");
  const [popupData, setPopupData] = useState(null); // State to control popup data
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback message state
  const router = useRouter();

  useEffect(() => {
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

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      const updatedClasses = classes.filter((classDetail) => classDetail.classId !== classId);
      setClasses(updatedClasses);
      setFilteredClasses(updatedClasses);
      setFeedbackMessage("Class deleted successfully!");
      setTimeout(() => setFeedbackMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddClass = () => {
    setPopupData({}); // Open popup with empty data for adding a new class
  };

  const handleEditClass = (classDetail) => {
    setPopupData(classDetail); // Open popup with existing data for editing
  };

  const handleClosePopup = () => {
    setPopupData(null); // Close the popup
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

      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
          {feedbackMessage}
        </div>
      )}

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
                  {['ID', 'Code', 'Size', 'Period', 'Program',  'Actions'].map((heading) => (
                    <th key={heading} className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classDetail) => (
                    <tr key={classDetail.classId}>
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
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEditClass(classDetail)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClass(classDetail.classId)}
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

      {popupData && (
        <AddEditClassPopup
          data={popupData}
          onClose={handleClosePopup}
          onSave={(updatedClass) => {
            if (updatedClass.classId) {
              // Update existing class
              setClasses((prev) =>
                prev.map((cls) => (cls.classId === updatedClass.classId ? updatedClass : cls))
              );
              setFeedbackMessage("Class updated successfully!");
            } else {
              // Add new class
              setClasses((prev) => [...prev, updatedClass]);
              setFeedbackMessage("Class added successfully!");
            }
            setFilteredClasses((prev) =>
              prev.map((cls) => (cls.classId === updatedClass.classId ? updatedClass : cls))
            );
            setTimeout(() => setFeedbackMessage(""), 3000); // Clear message after 3 seconds
            handleClosePopup();
          }}
        />
      )}
    </div>
  );
};

export default AddClasses;