'use client';
import React, { useState, useEffect } from "react";
import { ProgramService } from '../../Services/ProgramService';

const EditProgramPopup = ({ program, departments, onClose, onSave }) => {
  const [programData, setProgramData] = useState({
    programId: "",
    programName: "",
    departmentId: "",
    departmentName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize form with program data
    if (program) {
      setProgramData({
        programId: program.programId,
        programName: program.programName,
        departmentId: program.departmentId,
        departmentName: program.departmentName
      });
    }
  }, [program]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "departmentId") {
      // Find the selected department to get its name
      const selectedDepartment = departments.find(
        (dept) => dept.departmentId.toString() === value
      );
      
      setProgramData({
        ...programData,
        departmentId: value,
        departmentName: selectedDepartment ? selectedDepartment.departmentName : ""
      });
    } else {
      setProgramData({
        ...programData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (!programData.programName || !programData.departmentId) {
        throw new Error("Please fill all required fields");
      }

      // Update the program via service
      const updatedProgram = await ProgramService.updateProgram(programData);
      
      // Pass the updated program back to parent component
      onSave(updatedProgram);
    } catch (error) {
      console.error("Error updating program:", error); // Log full error object
      setError(error.message || "Failed to update program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Edit Program</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            

            <div>
              <label htmlFor="programName" className="block text-sm font-medium text-gray-700">
                Program Name *
              </label>
              <input
                type="text"
                id="programName"
                name="programName"
                value={programData.programName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                Department *
              </label>
              <select
                id="departmentId"
                name="departmentId"
                value={programData.departmentId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option 
                    key={department.departmentId} 
                    value={department.departmentId}
                  >
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-400"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProgramPopup;