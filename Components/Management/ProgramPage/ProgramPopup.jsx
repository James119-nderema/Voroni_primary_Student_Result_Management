'use client';
import React, { useState, useEffect } from "react";

const ProgramPopup = ({ mode, program, departments, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    programName: "",
    departmentId: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === "edit" && program) {
      setFormData({
        programName: program.programName,
        departmentId: program.departmentId,
      });
    }
  }, [mode, program]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.programName.trim()) {
      newErrors.programName = "Program name is required";
    }
    if (!formData.departmentId || isNaN(Number(formData.departmentId))) {
      newErrors.departmentId = "Valid department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const payload = {
          ...formData,
          departmentId: parseInt(formData.departmentId, 10),
        };

        onSave(payload);
      } catch (error) {
        console.error("Error saving program:", error);
        setErrors({
          submit: "Failed to save program. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl border border-gray-300 mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {mode === "edit" ? "Edit Program" : "Add New Program"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">
              Program Name
            </label>
            <input
              type="text"
              name="programName"
              value={formData.programName}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-black text-sm border rounded-md ${
                errors.programName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.programName && (
              <p className="text-red-500 text-sm mt-1">{errors.programName}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-sm text-black mb-1">
              Department
            </label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-black text-sm border rounded-md ${
                errors.departmentId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.departmentId} value={department.departmentId}>
                  {department.departmentName}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="text-red-500 text-sm mt-1">{errors.departmentId}</p>
            )}
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramPopup;
