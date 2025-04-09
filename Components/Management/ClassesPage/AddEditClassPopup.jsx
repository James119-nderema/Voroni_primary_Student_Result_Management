import React, { useState, useEffect } from "react";
import { addClass, updateClass } from "../../Services/classService";

const AddEditClassPopup = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    classCode: "",
    size: "",
    periodId: "",
    programId: "",
  });

  useEffect(() => {
    if (data && data.classId) {
      setFormData(data); // Populate form with existing data for editing
    } else {
      setFormData({
        classCode: "",
        size: "",
        periodId: "",
        programId: "",
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
      if (data.classId) {
        const updatedClass = await updateClass(data.classId, formData);
        onSave(updatedClass);
      } else {
        const newClass = await addClass(formData);
        onSave(newClass);
      }
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div> {/* Blur background */}
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-10">
        <h3 className="text-lg font-semibold mb-4">
          {data.classId ? "Edit Class" : "Add New Class"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Class Code</label>
            <input
              type="text"
              name="classCode"
              value={formData.classCode}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Class Size</label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Period ID</label>
            <input
              type="number"
              name="periodId"
              value={formData.periodId}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Program ID</label>
            <input
              type="number"
              name="programId"
              value={formData.programId}
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

export default AddEditClassPopup;
