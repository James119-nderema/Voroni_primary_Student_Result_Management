'use client';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const ProgramCourses = () => {
  // State variables
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [periods, setPeriods] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [availableCoursesSearch, setAvailableCoursesSearch] = useState('');
  const [periodCoursesSearch, setPeriodCoursesSearch] = useState('');
  const [periodCourses, setPeriodCourses] = useState({});
  const [existingPeriodCourses, setExistingPeriodCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsResponse = await axios.get('http://localhost:9921/programs');
        const safePrograms = programsResponse.data.map((program, index) => ({
          ...program,
          uniqueId: program.id ? `program-${program.id}` : `program-${index}`,
          name: program.name || `Unnamed Program ${index + 1}`,
          numericId: program.id || index + 1,
        }));
        setPrograms(safePrograms);

        if (safePrograms.length > 0) {
          setSelectedProgram(safePrograms[0].uniqueId);
        }
      } catch (err) {
        console.error('Programs Fetch Error:', err);
        setError(`Failed to load programs: ${err.message}`);
      }
    };

    fetchPrograms();
  }, []);

  // Fetch periods and courses when program is selected
  useEffect(() => {
    const fetchPeriodsAndCourses = async () => {
      if (!selectedProgram) return;

      setLoading(true);
      setError(null);
      try {
        const selectedProgramObj = programs.find((p) => p.uniqueId === selectedProgram);
        const programId = selectedProgramObj.numericId;

        const periodsResponse = await axios.get('http://localhost:9921/periods');
        const safePeriods = periodsResponse.data.map((period, index) => ({
          ...period,
          uniqueId: period.id ? `period-${period.id}` : `period-${index}`,
          name: period.name || `Y${Math.floor(index / 2) + 1}S${(index % 2) + 1}`,
          numericId: period.id || index + 1,
        }));
        setPeriods(safePeriods);

        if (safePeriods.length > 0) {
          setSelectedPeriod(safePeriods[0].uniqueId);
        }

        const coursesResponse = await axios.get('http://localhost:9921/timeslots');
        const safeCourses = coursesResponse.data.map((course, index) => ({
          ...course,
          uniqueId: course.id ? `course-${course.id}` : `course-${index}`,
          courseCode: course.courseCode || course.code || `COURSE-${index + 1}`,
          name: course.name || `Unnamed Course ${index + 1}`,
          department: course.department || 'Unknown Department',
        }));
        setCourses(safeCourses);
      } catch (err) {
        console.error('Periods and Courses Fetch Error:', err);
        setError(`Failed to load periods and courses: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPeriodsAndCourses();
  }, [selectedProgram, programs]);

  // Fetch existing courses for the selected program and period
  useEffect(() => {
    const fetchExistingCourses = async () => {
      if (!selectedProgram || !selectedPeriod) return;

      setLoading(true);
      setError(null);
      try {
        const selectedProgramObj = programs.find((p) => p.uniqueId === selectedProgram);
        const programId = selectedProgramObj.numericId;

        const selectedPeriodObj = periods.find((p) => p.uniqueId === selectedPeriod);
        const periodId = selectedPeriodObj.numericId;

        const existingCoursesResponse = await axios.get(
          `http://localhost:9921/programCourses/${programId}/${periodId}`
        );

        // Check if response is an array before mapping
        const existingCourses = Array.isArray(existingCoursesResponse.data)
          ? existingCoursesResponse.data.map((item) => {
              const courseDetails = courses.find((course) => course.id === item.courseId);
              return courseDetails
                ? {
                    ...courseDetails,
                    uniqueId: `course-${courseDetails.id}`,
                  }
                : { id: item.courseId, name: 'Unknown Course' };
            })
          : [];

        setExistingPeriodCourses((prev) => ({
          ...prev,
          [selectedPeriod]: existingCourses,
        }));
      } catch (err) {
        console.error('Existing Courses Fetch Error:', err);
        
        // Set empty array for existing courses instead of throwing an error
        setExistingPeriodCourses((prev) => ({
          ...prev,
          [selectedPeriod]: [],
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchExistingCourses();
  }, [selectedProgram, selectedPeriod, programs, periods, courses]);

  // Filtering logic (restored from previous implementation)
  const filteredExistingPeriodCourses = useMemo(() => {
    return (existingPeriodCourses[selectedPeriod] || []).filter((course) =>
      course.name.toLowerCase().includes(periodCoursesSearch.toLowerCase())
    );
  }, [periodCoursesSearch, selectedPeriod, existingPeriodCourses]);

  const filteredAvailableCourses = useMemo(() => {
    const currentPeriodCourses = periodCourses[selectedPeriod] || [];
    const currentExistingCourses = existingPeriodCourses[selectedPeriod] || [];

    return courses.filter(
      (course) =>
        course.uniqueId &&
        !currentPeriodCourses.some((c) => c.uniqueId === course.uniqueId) &&
        !currentExistingCourses.some((c) => c.uniqueId === course.uniqueId) &&
        course.courseCode.toLowerCase().includes(availableCoursesSearch.toLowerCase())
    );
  }, [availableCoursesSearch, selectedPeriod, periodCourses, existingPeriodCourses, courses]);

  const filteredSelectedCourses = useMemo(() => {
    return (periodCourses[selectedPeriod] || []).filter((course) =>
      course.courseCode.toLowerCase().includes(periodCoursesSearch.toLowerCase())
    );
  }, [periodCoursesSearch, selectedPeriod, periodCourses]);

  // Render course list function
  const renderCourseList = (courses, type = 'available') => {
    return courses.map((course, index) => {
      // Ensure a truly unique key by combining uniqueId with index
      const uniqueKey = `${course.uniqueId || 'course'}-${index}-${type}`;
      
      return (
        <div
          key={uniqueKey}
          className="flex justify-between items-center p-2 border-b hover:bg-blue-100"
        >
          <div>
            <p className="font-medium text-blue-800">{course.courseCode}</p>
            <p className="text-sm text-blue-600">{course.name}</p>
          </div>
          {type === 'available' ? (
            <button
              onClick={() => addCourseToPeriod(course)}
              className="text-green-600 hover:text-green-800"
            >
              Add
            </button>
          ) : type === 'selected' ? (
            <button
              onClick={() => removeCourseFromPeriod(course)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          ) : (
            <span className="text-blue-500 text-sm">Existing</span>
          )}
        </div>
      );
    });
  };

  // Add and remove course logic
  const addCourseToPeriod = (course) => {
    setPeriodCourses((prev) => ({
      ...prev,
      [selectedPeriod]: [...(prev[selectedPeriod] || []), course],
    }));
  };

  const removeCourseFromPeriod = (courseToRemove) => {
    setPeriodCourses((prev) => ({
      ...prev,
      [selectedPeriod]: prev[selectedPeriod]?.filter(
        (course) => course.uniqueId !== courseToRemove.uniqueId
      ) || [],
    }));
  };

  // Submit logic
  const submitSelectedCourses = async () => {
    try {
      const selectedProgramObj = programs.find((p) => p.uniqueId === selectedProgram);
      const selectedPeriodObj = periods.find((p) => p.uniqueId === selectedPeriod);

      if (!selectedProgramObj) {
        throw new Error('No program selected');
      }

      if (!selectedPeriodObj) {
        throw new Error('No period selected');
      }

      const programId = selectedProgramObj.numericId;
      const periodId = selectedPeriodObj.numericId;

      const courseIds = (periodCourses[selectedPeriod] || []).map((course) => {
        const courseId = course.id || course.uniqueId.replace('course-', '');
        if (!courseId || isNaN(courseId) || courseId === '0') {
          throw new Error(`Invalid course ID for course: ${course.name}`);
        }
        return courseId;
      });

      for (const courseId of courseIds) {
        await axios.post('http://localhost:9921/programCourse', {
          programId,
          periodId,
          courseId,
        });
      }

      setPeriodCourses((prev) => ({
        ...prev,
        [selectedPeriod]: [],
      }));

      alert('Courses submitted successfully!');
    } catch (err) {
      console.error('Submission Error:', err);
      alert(`Failed to submit courses: ${err.message}`);
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500">
        <p className="text-xl">Error: {error}</p>
        <p>Please check your backend server and API endpoints.</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="container mx-auto p-6 bg-blue-50">
      {/* Program and Period Selection */}
      <div className="mb-4">
        <label htmlFor="program-select" className="block text-sm font-medium text-blue-700">
          Select Program
        </label>
        <select
          id="program-select"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="mt-1 block w-full p-2 border border-blue-300 rounded-md shadow-sm bg-blue-50 text-blue-900"
        >
          {programs.map((program) => (
            <option key={program.uniqueId} value={program.uniqueId}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="period-select" className="block text-sm font-medium text-blue-700">
          Select Period
        </label>
        <select
          id="period-select"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="mt-1 block w-full p-2 border border-blue-300 rounded-md shadow-sm bg-blue-50 text-blue-900"
        >
          {periods.map((period) => (
            <option key={period.uniqueId} value={period.uniqueId}>
              {period.name}
            </option>
          ))}
        </select>
      </div>

      {/* Existing Courses Section */}
      <div className="border rounded-lg shadow-md mb-6 bg-white">
        <div className="p-4 border-b bg-blue-500 text-white">
          <h2 className="text-lg font-semibold">Existing Courses for Selected Period</h2>
          <input
            type="text"
            placeholder="Search existing courses"
            value={periodCoursesSearch}
            onChange={(e) => setPeriodCoursesSearch(e.target.value)}
            className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm bg-blue-50 text-blue-900"
          />
        </div>
        <div className="h-48 overflow-y-auto p-4">
          {filteredExistingPeriodCourses.length > 0 
            ? renderCourseList(filteredExistingPeriodCourses, 'existing')
            : <p className="text-center text-blue-500">No existing courses</p>
          }
        </div>
      </div>

      {/* Courses Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Available Courses */}
        <div className="border rounded-lg shadow-md bg-white">
          <div className="p-4 border-b bg-blue-500 text-white">
            <h2 className="text-lg font-semibold">Available Courses</h2>
            <input
              type="text"
              placeholder="Search available courses"
              value={availableCoursesSearch}
              onChange={(e) => setAvailableCoursesSearch(e.target.value)}
              className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm bg-blue-50 text-blue-900"
            />
          </div>
          <div className="h-96 overflow-y-auto p-4">
            {filteredAvailableCourses.length > 0 
              ? renderCourseList(filteredAvailableCourses, 'available')
              : <p className="text-center text-blue-500">No courses found</p>
            }
          </div>
        </div>

        {/* Selected Courses */}
        <div className="border rounded-lg shadow-md bg-white">
          <div className="p-4 border-b bg-blue-500 text-white">
            <h2 className="text-lg font-semibold">Selected Courses</h2>
            <input
              type="text"
              placeholder="Search selected courses"
              value={periodCoursesSearch}
              onChange={(e) => setPeriodCoursesSearch(e.target.value)}
              className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm bg-blue-50 text-blue-900"
            />
          </div>
          <div className="h-96 overflow-y-auto p-4">
            {filteredSelectedCourses.length > 0
              ? renderCourseList(filteredSelectedCourses, 'selected')
              : <p className="text-center text-blue-500">No courses selected</p>
            }
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={submitSelectedCourses}
          disabled={!(periodCourses[selectedPeriod] && periodCourses[selectedPeriod].length > 0)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit Selected Courses
        </button>
      </div>
    </div>
  );
};

export default ProgramCourses;