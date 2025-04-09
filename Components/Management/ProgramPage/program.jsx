'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ProgramService } from '../../Services/ProgramService';
import { fetchDepartments } from "../../Services/departmentService";
import AddProgramPopup from "./AddProgramPopup";
import EditProgramPopup from "./EditProgramPopup";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Programs");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [programToEdit, setProgramToEdit] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getProgramsAndDepartments = async () => {
      try {
        // Fetch both programs and departments
        const [programsData, departmentsData] = await Promise.all([
          ProgramService.getPrograms(),
          fetchDepartments()
        ]);

        console.log("Departments data:", departmentsData);
        console.log("Programs data:", programsData);

        setPrograms(programsData);
        setFilteredPrograms(programsData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getProgramsAndDepartments();
  }, []);

  // Filter programs based on search term
  useEffect(() => {
    const filtered = programs.filter((program) =>
      Object.values(program).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPrograms(filtered);
  }, [searchTerm, programs]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All Programs") {
      setFilteredPrograms(programs);
    } else {
      setFilteredPrograms(programs.filter((program) => program.programType === category));
    }
  };

  const handleDeleteProgram = async (programId) => {
    try {
      await ProgramService.deleteProgram(programId);
      const updatedPrograms = programs.filter((program) => program.programId !== programId);
      setPrograms(updatedPrograms);
      setFilteredPrograms(updatedPrograms);
      setFeedbackMessage("Program deleted successfully!");
      setTimeout(() => setFeedbackMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error deleting Program:", error);
    }
  };

  const handleAddProgram = () => {
    setIsAddPopupOpen(true);
  };

  const handleEditProgram = (program) => {
    setProgramToEdit(program);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleCloseEditPopup = () => {
    setProgramToEdit(null);
  };

  const handleSaveNewProgram = (newProgram) => {
    // Add new program to the list
    setPrograms((prev) => [...prev, newProgram]);
    
    // Update filtered programs
    if (activeCategory === "All Programs") {
      setFilteredPrograms((prev) => [...prev, newProgram]);
    } else if (newProgram.programType === activeCategory) {
      setFilteredPrograms((prev) => [...prev, newProgram]);
    }
    
    // Show feedback message
    setFeedbackMessage("Program added successfully!");
    setTimeout(() => setFeedbackMessage(""), 3000);
    
    // Close popup
    handleCloseAddPopup();
  };

  const handleUpdateProgram = (updatedProgram) => {
    // Update existing program in the list
    setPrograms((prev) =>
      prev.map((prog) => (prog.programId === updatedProgram.programId ? updatedProgram : prog))
    );
    
    // Update filtered programs
    setFilteredPrograms((prev) =>
      prev.map((prog) => (prog.programId === updatedProgram.programId ? updatedProgram : prog))
    );
    
    // Show feedback message
    setFeedbackMessage("Program updated successfully!");
    setTimeout(() => setFeedbackMessage(""), 3000);
    
    // Close popup
    handleCloseEditPopup();
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h3 className="text-lg text-green-900 font-semibold">Programs Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available Programs</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm text-gray-900 bg-white"
          />
          <button
            onClick={handleAddProgram}
            className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Add New Program
          </button>
        </div>
      </div>

      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
          {feedbackMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-2 sm:gap-4">
          {["All Programs"].map((category) => (
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
          <div className="p-4 text-center text-gray-500">Loading Programs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((program) => (
                    <tr key={program.programId} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {program.programId}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {program.programName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {program.departmentName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleEditProgram(program)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteProgram(program.programId)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-4 text-center text-gray-500">
                      No Programs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Program Popup */}
      {isAddPopupOpen && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50">
          <div className="relative w-full p-4">
            <AddProgramPopup
              departments={departments}
              onClose={handleCloseAddPopup}
              onSave={handleSaveNewProgram}
            />
          </div>
        </div>
      )}

      {/* Edit Program Popup */}
      {programToEdit && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50">
          <div className="relative w-full p-4">
            <EditProgramPopup
              program={programToEdit}
              departments={departments}
              onClose={handleCloseEditPopup}
              onSave={handleUpdateProgram}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsPage;