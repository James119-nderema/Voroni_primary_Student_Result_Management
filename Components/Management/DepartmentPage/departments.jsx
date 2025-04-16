'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchDepartments, deleteDepartment } from "../../Services/departmentService";
import AddEditDepartmentPopup from "./AddEditDepartmentPopup";
import ConfirmationDialog from "@/Components/Common/ConfirmationDialog";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupData, setPopupData] = useState(null); // State to control popup data
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback message state
  const [feedbackError, setFeedbackError] = useState(""); // Feedback error state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [departmentToDelete, setDepartmentToDelete] = useState(null); // State to store department to delete
  const router = useRouter();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const data = await fetchDepartments();
        console.log("Fetched departments data:", data); // Debugging log
        const departmentsArray = Array.isArray(data) ? data : (data?.departments || []); // Ensure data is an array
        if (Array.isArray(departmentsArray)) {
          setDepartments(departmentsArray);
          setFilteredDepartments(departmentsArray);
        } else {
          console.error("Invalid data format received:", data); // Log invalid data
          setDepartments([]); // Fallback to an empty array
          setFilteredDepartments([]);
          throw new Error("Invalid data format: Expected an array.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setFeedbackError("Departments not found.");
        } else {
          setFeedbackError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getDepartments();
  }, []);

  const handleAddDepartment = () => {
    setPopupData({}); // Open popup with empty data for adding a new department
  };

  const handleEditDepartment = (department) => {
    setPopupData(department); // Open popup with existing data for editing
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department); // Set the department to delete
    setIsDialogOpen(true); // Open the confirmation dialog
  };

  const confirmDeleteDepartment = async () => {
    if (!departmentToDelete) return;
    try {
      const response = await deleteDepartment(departmentToDelete.departmentId);
      const updatedDepartments = departments.filter((dept) => dept.departmentId !== departmentToDelete.departmentId);
      setDepartments(updatedDepartments);
      setFilteredDepartments(updatedDepartments);
      setFeedbackMessage(response.message || "Department deleted successfully!");
    } catch (error) {
      setFeedbackError(error);
    } finally {
      setTimeout(() => {
        setFeedbackMessage("");
        setFeedbackError("");
      }, 3000); // Clear message after 3 seconds
      setIsDialogOpen(false); // Close the dialog
      setDepartmentToDelete(null); // Reset the department to delete
    }
  };

  const handleClosePopup = () => {
    setPopupData(null); // Close the popup
  };

  return (
    <div className="min-h-screen p-6"> {/* Make the container occupy the full height */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg text-green-900 font-semibold">Departments Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available Departments</p>
        </div>
        <button
          onClick={handleAddDepartment}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
          Add New Department
        </button>
      </div>

      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
          {feedbackMessage}
        </div>
      )}
      {feedbackError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
          {feedbackError}
        </div>
      )}

      <div className="bg-white rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading Departments...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <tr key={department.departmentId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {department.departmentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {department.departmentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {department.facultyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEditDepartment(department)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteClick(department)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No Departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {popupData && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50">
          <div className="relative w-full p-4">
            <AddEditDepartmentPopup
              data={popupData}
              onClose={handleClosePopup}
              onSave={async () => {
                try {
                  const data = await fetchDepartments(); // Reload the department data
                  setDepartments(data);
                  setFilteredDepartments(data);
                  setFeedbackMessage("Changes saved successfully!");
                } catch (error) {
                  setFeedbackError("Failed to reload departments. Please try again.");
                } finally {
                  setTimeout(() => setFeedbackMessage(""), 3000); // Clear message after 3 seconds
                  handleClosePopup();
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${departmentToDelete?.departmentName}? This action cannot be undone`}
        onConfirm={confirmDeleteDepartment}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default DepartmentsPage;
