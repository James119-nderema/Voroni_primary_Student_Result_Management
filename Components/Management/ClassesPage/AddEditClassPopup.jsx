import React, { useState, useEffect } from "react";
import { addClass, updateClass } from "../../Services/classService";
import { getPeriods } from "../../Services/periodService";
import ProgramService from "../../Services/ProgramService";

const AddEditClassPopup = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    classCode: "",
    size: "",
    periodId: "",
    programId: "",
  });
  const [periods, setPeriods] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch periods and programs when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch periods with explicit logging
        console.log("Fetching periods...");
        const periodsResponse = await getPeriods();
        console.log("Raw periods response:", periodsResponse);
        
        // Handle periods properly based on response structure
        let periodsData = [];
        if (Array.isArray(periodsResponse)) {
          periodsData = periodsResponse;
        } else if (periodsResponse && typeof periodsResponse === 'object') {
          // Handle case where API might return {data: [...]} or some other structure
          periodsData = periodsResponse.data || periodsResponse.periods || [];
        }
        console.log("Processed periods data:", periodsData);
        setPeriods(periodsData);
        
        // Fetch programs with explicit logging
        console.log("Fetching programs...");
        const programsResponse = await ProgramService.getPrograms();
        console.log("Raw programs response:", programsResponse);
        
        // Handle programs properly based on response structure
        let programsData = [];
        if (Array.isArray(programsResponse)) {
          programsData = programsResponse;
        } else if (programsResponse && typeof programsResponse === 'object') {
          // Handle case where API might return {data: [...]} or some other structure
          programsData = programsResponse.data || programsResponse.programs || [];
        }
        console.log("Processed programs data:", programsData);
        setPrograms(programsData);
        
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        setErrors(prev => ({...prev, fetch: "Failed to load periods and programs"}));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.classId) {
      setFormData({
        classCode: data.classCode || "",
        size: data.size || "",
        periodId: data.periodId || "",
        programId: data.programId || "",
      }); // Populate form with existing data for editing
    } else {
      setFormData({
        classCode: "",
        size: "",
        periodId: "",
        programId: "",
      }); // Reset form for adding
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.classCode.trim()) {
      newErrors.classCode = "Class code is required";
    }
    if (!formData.size) {
      newErrors.size = "Class size is required";
    }
    if (!formData.periodId) {
      newErrors.periodId = "Period is required";
    }
    if (!formData.programId) {
      newErrors.programId = "Program is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Ensure periodId and programId are sent as numbers
        const formPayload = {
          ...formData,
          periodId: Number(formData.periodId),
          programId: Number(formData.programId),
          size: Number(formData.size)
        };

        console.log("Submitting form data:", formPayload);

        if (data && data.classId) {
          const updatedClass = await updateClass(data.classId, formPayload);
          onSave(updatedClass);
        } else {
          const newClass = await addClass(formPayload);
          onSave(newClass);
        }
      } catch (error) {
        console.error("Error saving class:", error);
        setErrors({ submit: "Failed to save class. Please try again." });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
        <div
          className="absolute bg-white rounded-lg p-6 w-full max-w-md z-10"
          style={{
            top: `${window.scrollY + 50}px`,
            left: `${window.scrollX + (window.innerWidth - 400) / 2}px`,
          }}
        >
          <h3 className="text-lg font-semibold mb-4">
            {data && data.classId ? "Edit Class" : "Add New Class"}
          </h3>
          
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Code</label>
                <input
                  type="text"
                  name="classCode"
                  value={formData.classCode}
                  onChange={handleChange}
                  className={`mt-1 px-4 py-2 border rounded-md w-full text-black ${
                    errors.classCode ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.classCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.classCode}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Size</label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={`mt-1 px-4 py-2 border rounded-md w-full text-black ${
                    errors.size ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.size && (
                  <p className="text-red-500 text-sm mt-1">{errors.size}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <select
                  name="periodId"
                  value={formData.periodId}
                  onChange={handleChange}
                  className={`mt-1 px-4 py-2 border rounded-md w-full bg-white text-black ${
                    errors.periodId ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select a Period</option>
                  {periods && periods.length > 0 ? (
                    periods.map((period) => (
                      <option key={period.periodId || period.id} value={period.periodId || period.id}>
                        {period.periodName || period.name || `Period ${period.periodId || period.id}`}
                      </option>
                    ))
                  ) : (
                    <option disabled>No periods available</option>
                  )}
                </select>
                {errors.periodId && (
                  <p className="text-red-500 text-sm mt-1">{errors.periodId}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <select
                  name="programId"
                  value={formData.programId}
                  onChange={handleChange}
                  className={`mt-1 px-4 py-2 border rounded-md w-full bg-white text-black ${
                    errors.programId ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select a Program</option>
                  {programs && programs.length > 0 ? (
                    programs.map((program) => (
                      <option key={program.programId || program.id} value={program.programId || program.id}>
                        {program.programName || program.name || `Program ${program.programId || program.id}`}
                      </option>
                    ))
                  ) : (
                    <option disabled>No programs available</option>
                  )}
                </select>
                {errors.programId && (
                  <p className="text-red-500 text-sm mt-1">{errors.programId}</p>
                )}
              </div>
              
              {errors.fetch && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {errors.fetch}
                </div>
              )}
              
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {errors.submit}
                </div>
              )}
              
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
                  {data && data.classId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEditClassPopup;