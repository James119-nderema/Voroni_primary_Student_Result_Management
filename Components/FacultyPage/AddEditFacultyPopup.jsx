import React, { useState, useEffect } from "react";
import { addFaculty, editFaculty } from "../Services/facultyService";

const AddEditFacultyPopup = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    facultyName: "",
  });

  useEffect(() => {
    if (data && data.facultyId) {
      setFormData(data); // Populate form with existing data for editing
    } else {
      setFormData({
        facultyName: "",
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
      if (data.facultyId) {
        const updatedFaculty = await editFaculty(data.facultyId, formData);
        onSave(updatedFaculty);
      } else {
        const newFaculty = await addFaculty(formData);
        onSave(newFaculty);
      }
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-10">
        <h3 className="text-lg text-black font-semibold mb-4">
          {data.facultyId ? "Edit Faculty" : "Add New Faculty"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Faculty Name</label>
            <input
              type="text"
              name="facultyName"
              value={formData.facultyName}
              onChange={handleChange}
              className="mt-1 text-sm text-gray-800 px-4 py-2 border rounded-md w-full"
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

export default AddEditFacultyPopup;
