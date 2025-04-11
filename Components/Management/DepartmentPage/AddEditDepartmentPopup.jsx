import React, { useState, useEffect } from "react";
import { addDepartment, updateDepartment } from "../../Services/departmentService";
import { fetchFaculties } from "@/Components/Services/facultyService";

const AddEditDepartmentPopup = ({ data, onClose, onSave }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [facultyId, setFacultyId] = useState("0"); // Initialize with "0" to match the default option
  const [departmentId, setDepartmentId] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const facultyList = await fetchFaculties();
        console.log("Loaded faculties:", facultyList);
        // Debug each faculty object
        facultyList.forEach(faculty => {
          console.log(`Faculty: id=${faculty.id}, facultyId=${faculty.facultyId}, name=${faculty.facultyName}`);
        });
        setFaculties(facultyList);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setFaculties([]);
      }
    };

    loadFaculties();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Popup data received:", data);
      setDepartmentName(data.departmentName || "");
      
      // Check if facultyId exists in the data and set it
      if (data.facultyId) {
        console.log("Setting facultyId from data:", data.facultyId);
        setFacultyId(String(data.facultyId)); // Convert to string for the select element
      }
      
      setDepartmentId(data.departmentId || null);
    }
  }, [data]);

  const handleSelectChange = (e) => {
    // Get the selected index
    const selectedIndex = e.target.selectedIndex;
    // Subtract 1 to account for the "Select a faculty" option
    const adjustedIndex = selectedIndex - 1;
    
    if (adjustedIndex >= 0 && adjustedIndex < faculties.length) {
      const selectedFaculty = faculties[adjustedIndex];
      const selectedId = selectedFaculty.id || selectedFaculty.facultyId;
      console.log("Selected Faculty:", selectedFaculty);
      console.log("Selected Faculty ID:", selectedId);
      setFacultyId(String(selectedId));
    } else {
      setFacultyId("0");
    }
  };

  const handleSave = async () => {
    console.log("Save button clicked with values:", { 
      departmentName, 
      facultyId, 
      facultyIdType: typeof facultyId 
    });
    
    // Detailed validation
    if (!departmentName.trim()) {
      setError("Department Name is required.");
      return;
    }
    
    if (!facultyId || facultyId === "0") {
      setError("A valid Faculty ID is required.");
      return;
    }
    
    setError(""); // Clear any previous errors

    try {
      const parsedFacultyId = parseInt(facultyId, 10);
      console.log("Parsed facultyId:", parsedFacultyId);
      
      if (isNaN(parsedFacultyId) || parsedFacultyId <= 0) {
        setError("Invalid Faculty ID format.");
        return;
      }

      const departmentData = {
        departmentName,
        facultyId: parsedFacultyId,
      };
      
      console.log("Sending department data:", departmentData);

      if (departmentId) {
        const updatedDepartment = await updateDepartment(departmentId, departmentData);
        onSave(updatedDepartment);
      } else {
        const newDepartment = await addDepartment(departmentData);
        onSave(newDepartment);
      }
    } catch (error) {
      console.error("Error saving department:", error);
      setError(error.message || "Failed to save department.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div> {/* Blur background */}
      <div className="relative bg-white rounded-lg p-8 w-full max-w-2xl z-10"> {/* Increased max width and padding */}
        <h3 className="text-lg text-black font-semibold mb-4">
          {departmentId ? "Edit Department" : "Add New Department"}
        </h3>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Department Name</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="mt-1 px-4 py-2 text-black border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black font-medium text-gray-700">Faculty</label>
          <select
            value={facultyId} // Use value prop instead of selected
            onChange={(e) => setFacultyId(e.target.value)} // Update facultyId directly
            className="mt-1 px-4 py-2 text-black border rounded-md w-full"
            required
          >
            <option value="0" disabled>
              {faculties.length === 0 ? "No faculties available" : "Select a faculty"}
            </option>
            {faculties.map((faculty) => (
              <option key={faculty.id || faculty.facultyId} value={faculty.id || faculty.facultyId}>
                {faculty.facultyName}
              </option>
            ))}
          </select>
          {/* Hidden input to store the selected faculty ID */}
          <input type="hidden" id="facultyIdInput" value={facultyId} />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md text-sm text-gray-900 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white-800 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditDepartmentPopup;
