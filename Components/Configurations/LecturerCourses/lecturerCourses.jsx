'use client';
import React, { useState, useEffect, useRef } from "react";
import { fetchLecturers } from "../../Services/LecturerService";
import { fetchCourses } from "@/Components/Services/courses";
import { 
  fetchAvailableCourses, 
  fetchSelectedCourses, 
  addLecturerCourse, 
  removeLecturerCourse,
  generateLecturerCourses 
} from "../../Services/LecturerCoursesService";
import { toast } from "react-toastify";

const LecturerCoursesPage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingCombinations, setGeneratingCombinations] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedAvailableCourses, setSelectedAvailableCourses] = useState([]);
  const [selectedRemoveCourses, setSelectedRemoveCourses] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [lecturersData, coursesData] = await Promise.all([
          fetchLecturers(),
          fetchCourses()
        ]);
        
        setLecturers(lecturersData);
        setCourses(coursesData);
        
        if (lecturersData.length > 0) {
          const firstLecturerId = lecturersData[0].lecturerId;
          setSelectedLecturerId(firstLecturerId);
          await loadLecturerCourses(firstLecturerId);
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
        toast.error("Failed to load initial data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const loadLecturerCourses = async (lecturerId) => {
    setLoading(true);
    try {
      const [availableData, selectedData] = await Promise.all([
        fetchAvailableCourses(lecturerId),
        fetchSelectedCourses(lecturerId)
      ]);
      
      const mappedAvailableCourses = availableData.map(course => ({
        courseId: course.courseId || course,
        name: course.courseName || `Unknown Course (${course.courseId || course})`,
        courseCode: course.courseCode || `Unknown Code (${course.courseId || course})`,
        listType: 'available',
      }));
      
      const mappedSelectedCourses = selectedData.map(course => ({
        courseId: course.courseId || course,
        name: course.courseName || `Unknown Course (${course.courseId || course})`,
        courseCode: course.courseCode || `Unknown Code (${course.courseId || course})`,
        listType: 'selected',
      }));
      
      setAvailableCourses(mappedAvailableCourses);
      setSelectedCourses(mappedSelectedCourses);
    } catch (error) {
      console.error("Failed to load lecturer courses:", error);
      toast.error("Failed to load lecturer courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLecturerChange = (e) => {
    const lecturerId = e.target.value;
    setSelectedLecturerId(lecturerId);
    setIsDropdownOpen(false);
    if (lecturerId) {
      loadLecturerCourses(lecturerId);
    } else {
      setAvailableCourses([]);
      setSelectedCourses([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleAddCourse = async (courseId) => {
    try {
      setLoading(true);
      const result = await addLecturerCourse(selectedLecturerId, courseId);
      if (result.success) {
        await loadLecturerCourses(selectedLecturerId);
        toast.success(result.message || "Course added successfully");
      } else {
        toast.error(result.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      setLoading(true);
      const result = await removeLecturerCourse(selectedLecturerId, courseId);
      if (result.success) {
        await loadLecturerCourses(selectedLecturerId);
        toast.success(result.message || "Course removed successfully");
      } else {
        toast.error(result.message || "Failed to remove course");
      }
    } catch (error) {
      console.error("Error removing course:", error);
      toast.error("Failed to remove course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSelectedCourses = async () => {
    if (selectedAvailableCourses.length === 0) {
      toast.warning("No courses selected to add");
      return;
    }
    
    setLoading(true);
    try {
      let successCount = 0;
      for (const courseId of selectedAvailableCourses) {
        try {
          const result = await addLecturerCourse(selectedLecturerId, courseId);
          if (result.success) successCount++;
        } catch (error) {
          console.error(`Error adding course ${courseId}:`, error);
        }
      }
      
      await loadLecturerCourses(selectedLecturerId);
      setSelectedAvailableCourses([]);
      
      if (successCount > 0) {
        toast.success(`Successfully added ${successCount} course(s)`);
      } else {
        toast.error("Failed to add selected courses");
      }
    } catch (error) {
      console.error("Error in bulk add operation:", error);
      toast.error("An error occurred during the operation");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSelectedCourses = async () => {
    if (selectedRemoveCourses.length === 0) {
      toast.warning("No courses selected to remove");
      return;
    }
    
    setLoading(true);
    try {
      let successCount = 0;
      for (const courseId of selectedRemoveCourses) {
        try {
          const result = await removeLecturerCourse(selectedLecturerId, courseId);
          if (result.success) successCount++;
        } catch (error) {
          console.error(`Error removing course ${courseId}:`, error);
        }
      }
      
      await loadLecturerCourses(selectedLecturerId);
      setSelectedRemoveCourses([]);
      
      if (successCount > 0) {
        toast.success(`Successfully removed ${successCount} course(s)`);
      } else {
        toast.error("Failed to remove selected courses");
      }
    } catch (error) {
      console.error("Error in bulk remove operation:", error);
      toast.error("An error occurred during the operation");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAllCourses = async () => {
    if (availableCourses.length === 0) {
      toast.warning("No available courses to add");
      return;
    }
    
    setLoading(true);
    try {
      let successCount = 0;
      for (const course of availableCourses) {
        try {
          const result = await addLecturerCourse(selectedLecturerId, course.courseId);
          if (result.success) successCount++;
        } catch (error) {
          console.error(`Error adding course ${course.courseId}:`, error);
        }
      }
      
      await loadLecturerCourses(selectedLecturerId);
      
      if (successCount > 0) {
        toast.success(`Successfully added all ${successCount} course(s)`);
      } else {
        toast.error("Failed to add all courses");
      }
    } catch (error) {
      console.error("Error in add all operation:", error);
      toast.error("An error occurred during the operation");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAllCourses = async () => {
    if (selectedCourses.length === 0) {
      toast.warning("No assigned courses to remove");
      return;
    }
    
    setLoading(true);
    try {
      let successCount = 0;
      for (const course of selectedCourses) {
        try {
          const result = await removeLecturerCourse(selectedLecturerId, course.courseId);
          if (result.success) successCount++;
        } catch (error) {
          console.error(`Error removing course ${course.courseId}:`, error);
        }
      }
      
      await loadLecturerCourses(selectedLecturerId);
      
      if (successCount > 0) {
        toast.success(`Successfully removed all ${successCount} course(s)`);
      } else {
        toast.error("Failed to remove all courses");
      }
    } catch (error) {
      console.error("Error in remove all operation:", error);
      toast.error("An error occurred during the operation");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailableCourseSelection = (courseId) => {
    setSelectedAvailableCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const toggleRemoveCourseSelection = (courseId) => {
    setSelectedRemoveCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const handleGenerateCombinations = async () => {
    setGeneratingCombinations(true);
    try {
      const result = await generateLecturerCourses();
      if (result.success) {
        toast.success(result.message);
        await loadLecturerCourses(selectedLecturerId);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error generating combinations:", error);
      toast.error("Failed to generate combinations. Please try again.");
    } finally {
      setGeneratingCombinations(false);
    }
  };

  const getLecturerName = (id) => {
    const lecturer = lecturers.find(l => l.lecturerId.toString() === id.toString());
    return lecturer ? `${lecturer.firstName} ${lecturer.lastName}` : "Unknown Lecturer";
  };

  const filteredLecturers = lecturers.filter((lecturer) =>
    `${lecturer.firstName} ${lecturer.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 w-full mx-auto bg-gray-50" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl text-green-900 font-bold">Lecturer Courses Management</h3>
        <p className="text-sm text-gray-600 mt-1">Assign and manage courses for lecturers</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full md:w-2/5 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search and Select Lecturer
          </label>
          <div className="relative">
            <div className="flex items-center relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Type to search lecturers..."
                className="w-full px-4 py-2.5 text-sm text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {selectedLecturerId && (
                <button
                  onClick={() => {
                    setSelectedLecturerId("");
                    setSearchTerm("");
                    setAvailableCourses([]);
                    setSelectedCourses([]);
                  }}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                  aria-label="Clear selection"
                >
                  ×
                </button>
              )}
            </div>
            
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredLecturers.length > 0 ? (
                  filteredLecturers.map((lecturer) => (
                    <button
                      key={lecturer.lecturerId}
                      onClick={() => {
                        handleLecturerChange({ target: { value: lecturer.lecturerId } });
                        setSearchTerm(`${lecturer.firstName} ${lecturer.lastName}`);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm text-black  hover:bg-gray-100 focus:bg-gray-100 ${
                        selectedLecturerId === lecturer.lecturerId ? 'bg-green-50 text-black font-medium' : ''
                      }`}
                    >
                      {lecturer.firstName} {lecturer.lastName}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No lecturers found</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          {selectedLecturerId && (
            <div className="text-sm bg-green-50 text-black px-4 py-2 rounded-md border border-green-100">
              <p><strong>Selected Lecturer:</strong> {getLecturerName(selectedLecturerId)}</p>
            </div>
          )}
          <button
            onClick={handleGenerateCombinations}
            disabled={generatingCombinations || loading}
            className={`px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md
              ${(generatingCombinations || loading) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
          >
            {generatingCombinations ? 'Generating...' : 'Generate All Combinations'}
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
            <div className="bg-white p-5 rounded-lg shadow-lg flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-700">Processing...</span>
            </div>
          </div>
        )}
        
        {!selectedLecturerId ? (
          <div className="flex-grow bg-white rounded-xl shadow-lg p-8 text-center text-gray-500 flex items-center justify-center">
            <div>
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <p className="text-lg">Please select a lecturer to manage their courses</p>
              <p className="text-sm mt-2">Use the search box above to find and select a lecturer</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Available Courses</h4>
                  <p className="text-xs text-gray-500">Courses that can be assigned to this lecturer</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddSelectedCourses}
                    disabled={selectedAvailableCourses.length === 0 || loading}
                    className={`px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium
                      ${selectedAvailableCourses.length === 0 || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  >
                    Add Selected ({selectedAvailableCourses.length})
                  </button>
                  <button
                    onClick={handleAddAllCourses}
                    disabled={availableCourses.length === 0 || loading}
                    className={`px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium
                      ${availableCourses.length === 0 || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                  >
                    Add All ({availableCourses.length})
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto flex-grow">
                {availableCourses.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {availableCourses.map((course) => (
                      <li key={`available-${course.courseId}`} className="py-3 flex justify-between items-center">
                        <div className="flex items-center flex-1">
                          <input
                            type="checkbox"
                            id={`select-available-${course.courseId}`}
                            checked={selectedAvailableCourses.includes(course.courseId)}
                            onChange={() => toggleAvailableCourseSelection(course.courseId)}
                            className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{course.name}</p>
                            <p className="text-xs text-gray-500">Course Code: {course.courseCode}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddCourse(course.courseId)}
                          disabled={loading}
                          className="ml-4 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col justify-center items-center h-full text-gray-500 py-12">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p>No available courses</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Selected Courses</h4>
                  <p className="text-xs text-gray-500">Courses assigned to this lecturer</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleRemoveSelectedCourses}
                    disabled={selectedRemoveCourses.length === 0 || loading}
                    className={`px-3 py-1.5 bg-orange-600 text-white rounded text-xs font-medium
                      ${selectedRemoveCourses.length === 0 || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700'}`}
                  >
                    Remove Selected ({selectedRemoveCourses.length})
                  </button>
                  <button
                    onClick={handleRemoveAllCourses}
                    disabled={selectedCourses.length === 0 || loading}
                    className={`px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium
                      ${selectedCourses.length === 0 || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                  >
                    Remove All ({selectedCourses.length})
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto flex-grow">
                {selectedCourses.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {selectedCourses.map((course) => (
                      <li key={`selected-${course.courseId}`} className="py-3 flex justify-between items-center">
                        <div className="flex items-center flex-1">
                          <input
                            type="checkbox"
                            id={`select-remove-${course.courseId}`}
                            checked={selectedRemoveCourses.includes(course.courseId)}
                            onChange={() => toggleRemoveCourseSelection(course.courseId)}
                            className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500 mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{course.name}</p>
                            <p className="text-xs text-gray-500">Course Code: {course.courseCode}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveCourse(course.courseId)}
                          disabled={loading}
                          className="ml-4 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col justify-center items-center h-full text-gray-500 py-12">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p>No courses assigned</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerCoursesPage;
