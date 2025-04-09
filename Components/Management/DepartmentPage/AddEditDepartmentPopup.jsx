import React, { useState, useEffect } from "react";
import { addDepartment, updateDepartment } from "../../Services/departmentService";

const AddEditDepartmentPopup = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    departmentName: "",
    facultyId: "",
  });

  useEffect(() => {
    if (data && data.departmentId) {
      setFormData(data); // Populate form with existing data for editing
    } else {
      setFormData({
        departmentName: "",
        facultyId: "",
      }); // Reset form for adding
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.departmentId) {
        const updatedDepartment = await updateDepartment(data.departmentId, formData);
        onSave(updatedDepartment);
      } else {
        const newDepartment = await addDepartment(formData);
        onSave(newDepartment);
      }
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div> {/* Blur background */}
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-10">
        <h3 className="text-lg font-semibold mb-4">
          {data.departmentId ? "Edit Department" : "Add New Department"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Department Name</label>
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Faculty ID</label>
            <input
              type="number"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditDepartmentPopup;
