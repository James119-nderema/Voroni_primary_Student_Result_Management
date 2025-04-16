'use client';
import React, { useState, useEffect } from "react";
import { ProgramService } from '../../Services/ProgramService';
import { fetchDepartments } from "../../Services/departmentService";
import ProgramPopup from "./ProgramPopup";
import ConfirmationDialog from '../../Common/ConfirmationDialog';

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [programToEdit, setProgramToEdit] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState(""); // "success" or "error"
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);

  useEffect(() => {
    const getProgramsAndDepartments = async () => {
      try {
        const [programsData, departmentsData] = await Promise.all([
          ProgramService.getPrograms(),
          fetchDepartments()
        ]);
        setPrograms(programsData);
        setFilteredPrograms(programsData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFeedbackMessage("Failed to load programs. Please try again later.");
        setFeedbackType("error");
      } finally {
        setLoading(false);
      }
    };

    getProgramsAndDepartments();
  }, []);

  useEffect(() => {
    const filtered = programs.filter((program) =>
      Object.values(program).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPrograms(filtered);
  }, [searchTerm, programs]);

  const handleDeleteProgram = async () => {
    try {
      await ProgramService.deleteProgram(programToDelete.programId);
      const updatedPrograms = programs.filter(
        (program) => program.programId !== programToDelete.programId
      );
      setPrograms(updatedPrograms);
      setFilteredPrograms(updatedPrograms);
      setFeedbackMessage("Program deleted successfully!");
      setFeedbackType("success");
    } catch (error) {
      console.error("Error deleting program:", error);
      setFeedbackMessage("Failed to delete program.");
      setFeedbackType("error");
    } finally {
      setIsConfirmationOpen(false);
      setProgramToDelete(null);
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  const openConfirmDialog = (program) => {
    setProgramToDelete(program);
    setIsConfirmationOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsConfirmationOpen(false);
    setProgramToDelete(null);
  };

  const handleAddProgram = () => {
    setProgramToEdit(null); // Reset programToEdit to ensure "Add New Program" is displayed
    setIsAddPopupOpen(true);
  };

  const handleEditProgram = (program) => {
    setProgramToEdit(program);
    setIsAddPopupOpen(true); // Ensure the popup opens
  };

  const handleSaveProgram = async (programData) => {
    try {
      if (programToEdit) {
        // Update program
        await ProgramService.updateProgram({ ...programToEdit, ...programData });
        const updatedPrograms = programs.map((prog) =>
          prog.programId === programToEdit.programId ? { ...prog, ...programData } : prog
        );
        setPrograms(updatedPrograms);
        setFilteredPrograms(updatedPrograms);
        setFeedbackMessage("Program updated successfully!");
        setFeedbackType("success");
      } else {
        // Create new program
        const newProgram = await ProgramService.createProgram(programData);
        setPrograms([...programs, newProgram]);
        setFilteredPrograms([...filteredPrograms, newProgram]);
        setFeedbackMessage("Program added successfully!");
        setFeedbackType("success");
      }
    } catch (error) {
      console.error("Error saving program:", error);
      setFeedbackMessage("Failed to save program. Please try again.");
      setFeedbackType("error");
    } finally {
      setTimeout(() => setFeedbackMessage(""), 3000);
      setIsAddPopupOpen(false);
      setProgramToEdit(null);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h3 className="text-lg text-green-900 font-semibold">Programs Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available programs</p>
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

      {feedbackMessage && (
        <div
          className={`mb-4 p-4 ${
            feedbackType === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          } rounded-md text-sm`}
        >
          {feedbackMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-2 sm:gap-4">
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              "All Programs" === "All Programs"
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Programs
          </button>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading programs...</div>
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
                {filteredPrograms.map((program) => (
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
                          onClick={() => openConfirmDialog(program)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isAddPopupOpen && (
        <ProgramPopup
          mode={programToEdit ? "edit" : "add"}
          program={programToEdit}
          departments={departments}
          onClose={() => setIsAddPopupOpen(false)}
          onSave={handleSaveProgram}
        />
      )}

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the program "${programToDelete?.programName}"?`}
        onConfirm={handleDeleteProgram}
        onCancel={closeConfirmDialog}
      />
    </div>
  );
};

export default ProgramsPage;