'use client';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import ProgramService from "../../Services/ProgramService";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Programs");
  const router = useRouter();

  useEffect(() => {
    const getPrograms = async () => {
      const data = await ProgramService.fetchAllPrograms();
      setPrograms(data);
      setFilteredPrograms(data);
      setLoading(false);
    };
    getPrograms();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All Programs") {
      setFilteredPrograms(programs);
    } else {
      const filtered = programs.filter((Program) => Program.programType === category);
      setFilteredPrograms(filtered);
    }
  };

  const handleDeletePrograms = async (programId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:9921/programs/${programId}`);
      const updatedPrograms = programs.filter((program) => program.programId !== programId);
      setPrograms(updatedPrograms);
      setFilteredPrograms(updatedPrograms);
    } catch (error) {
      console.error("Error deleting Program:", error);
    }
  };

  const handleEditProgram = (programId, event) => {
    event.stopPropagation();
    router.push(`/program/edit/${programId}`);
  };

  const handleAssignCourse = (programId) => {
    router.push(`/program/programcourses/${programId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg text-green-900 font-semibold">Programs Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor all available Programs</p>
        </div>
        <button
          onClick={() => router.push('/program/add')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
          Add New Program
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex gap-4">
          {["All Programs"].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-md text-sm font-medium ${activeCategory === category
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department Id
                </th>
              
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <tr key={program.programId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {program.programId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {program.programName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {program.departmentId}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e) => handleEditProgram(program.programId, e)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => handleDeletePrograms(program.programId, e)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No Programs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;