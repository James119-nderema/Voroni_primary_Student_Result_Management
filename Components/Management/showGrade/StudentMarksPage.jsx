import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import EditMarksPopup from "./EditMarksPopup"; // Import the popup component

const getGrade = (marks) => {
  if (marks > 70) return "E.E";
  if (marks > 60) return "M.E";
  if (marks > 40) return "A.E";
  return "B.E";
};

const GradeColorMap = {
  "E.E": "text-green-600 font-semibold",
  "M.E": "text-blue-600 font-semibold",
  "A.E": "text-yellow-600 font-semibold",
  "B.E": "text-red-600 font-semibold"
};

const StudentMarksPage = () => {
  const [marksData, setMarksData] = useState([]);
  const [students, setStudents] = useState({});
  const [filteredMonth, setFilteredMonth] = useState("");
  const [filteredClass, setFilteredClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState({
    totalStudents: 0,
    avgScore: 0,
    topGrade: 0,
    passingRate: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5); // Default value
  
  // Reference to the results section
  const resultsRef = useRef(null);

  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadGrade, setDownloadGrade] = useState(""); // Change initial value to empty string

  const handleDownloadResults = async (e) => {
    e.preventDefault();
    if (!downloadGrade) {
      alert('Please select a grade first');
      return;
    }
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/download_results_pdf/?class_name=${downloadGrade}`,
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${downloadGrade}_Results.pdf`);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setShowDownloadModal(false);
    } catch (error) {
      console.error('Error downloading results:', error);
      alert('Failed to download results. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const marksRes = await axios.get("http://127.0.0.1:8000/api/student-marks/");
        const studentsRes = await axios.get("http://127.0.0.1:8000/api/students/");

        const studentsMap = {};
        studentsRes.data.forEach((student) => {
          studentsMap[student.id] = student;
        });

        const sortedMarks = marksRes.data.sort((a, b) => {
          return new Date(b.submission_date || 0) - new Date(a.submission_date || 0);
        });

        setMarksData(sortedMarks);
        setStudents(studentsMap);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate stats based on filtered data
    const filteredData = filterData(marksData);
    calculateStats(filteredData);
    setCurrentPage(1); // Reset pagination when filters change
  }, [marksData, filteredMonth, filteredClass]);

  // Scroll to top of results when page changes
  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const calculateStats = (data) => {
    if (!data.length) {
      setStatsData({
        totalStudents: 0,
        avgScore: 0,
        topGrade: 0,
        passingRate: 0
      });
      return;
    }

    // Total number of students
    const totalStudents = data.length;
    
    // Average total score
    const totalScores = data.reduce((sum, item) => sum + (item.total_marks || 0), 0);
    const avgScore = totalScores / totalStudents;
    
    // Top grade count (E.E - Exceeding Expectations)
    const topGradeCount = data.filter(item => item.total_marks > 350).length;
    const topGradePercentage = (topGradeCount / totalStudents) * 100;
    
    // Passing rate (students with average mark > 40)
    const passingStudents = data.filter(item => {
      const avg = item.total_marks / 5; // 5 subjects
      return avg > 40;
    }).length;
    const passingRate = (passingStudents / totalStudents) * 100;

    setStatsData({
      totalStudents,
      avgScore: avgScore.toFixed(1),
      topGrade: topGradePercentage.toFixed(1),
      passingRate: passingRate.toFixed(1)
    });
  };

  const filterData = (data) => {
    let filtered = data;
    
    // Filter by month
    if (filteredMonth) {
      filtered = filtered.filter((item) => {
        if (!item.submission_date) return false;
        const date = new Date(item.submission_date);
        return format(date, "yyyy-MM") === filteredMonth;
      });
    }
    
    // Filter by class/grade
    if (filteredClass) {
      filtered = filtered.filter((item) => {
        const student = students[item.student];
        return student && student.class_name === filteredClass;
      });
    }
    
    return filtered;
  };

  const renderMarkWithGrade = (mark) => {
    if (mark === null || mark === undefined) return "N/A";
    const grade = getGrade(mark);
    const colorClass = GradeColorMap[grade] || "";
    return (
      <span className={colorClass}>
        {mark} ({grade})
      </span>
    );
  };

  const handleClassChange = (e) => {
    setFilteredClass(e.target.value);
  };

  const handleCardsPerPageChange = (e) => {
    setCardsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleEditClick = async (studentId) => {
    try {
      const studentExists = students[studentId];
      if (!studentExists) {
        console.error("Student not found");
        return;
      }
      // Find the current marks for this student
      const currentMarks = marksData.find(mark => mark.student === studentId);
      if (!currentMarks) {
        console.error("No marks found for student");
        return;
      }
      setSelectedStudentId(studentId);
      setIsEditPopupOpen(true);
    } catch (err) {
      console.error("Error handling edit click:", err);
    }
  };

  const handlePopupClose = () => {
    setIsEditPopupOpen(false);
    setSelectedStudentId(null);
  };

  const handleMarksUpdate = async (updatedMarks) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/student-marks/update_student_marks/", updatedMarks);
      // Refresh data after update
      const marksRes = await axios.get("http://127.0.0.1:8000/api/student-marks/");
      const sortedMarks = marksRes.data.sort((a, b) => {
        return new Date(b.submission_date || 0) - new Date(a.submission_date || 0);
      });
      setMarksData(sortedMarks);
      handlePopupClose();
    } catch (err) {
      console.error("Error updating marks:", err);
    }
  };

  // For card pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = (totalPages) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Create pagination controls component to reuse at top and bottom
  const PaginationControls = ({ totalPages }) => (
    <div className="flex items-center justify-between px-2">
      <button 
        onClick={() => prevPage()}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Previous
      </button>
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <button 
        onClick={() => nextPage(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Next
      </button>
    </div>
  );
      
  // Stats box component
  const StatBox = ({ title, value, icon, color }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${color} flex flex-col`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`text-${color.replace('border-', '')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mx-auto max-w-4xl text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const filteredData = filterData(marksData);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Student Performance Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <label className="mr-2 font-semibold text-gray-700">Class:</label>
            <select
              value={filteredClass}
              onChange={handleClassChange}
              className="border border-gray-300 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            >
              <option value="">All Classes</option>
              {[...Array(9)].map((_, i) => (
                <option key={i + 1} value={`Grade ${i + 1}`}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2 font-semibold text-gray-700">Month:</label>
            <input
              type="month"
              value={filteredMonth}
              onChange={(e) => setFilteredMonth(e.target.value)}
              className="border border-gray-300 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            />
          </div>
          <button
            onClick={() => setShowDownloadModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Results
          </button>
        </div>
      </div>
      {/* Stats Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatBox 
          title="Total Students" 
          value={statsData.totalStudents} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          }
          color="border-blue-500"
        />
        <StatBox 
          title="Average Score"  
          value={`${statsData.avgScore}/500`} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          }
          color="border-purple-500"
        />
        <StatBox 
          title="Top Grade Rate" 
          value={`${statsData.topGrade}%`} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          }
          color="border-green-500"
        />
        <StatBox 
          title="Passing Rate" 
          value={`${statsData.passingRate}%`} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
          color="border-yellow-500"
        />
      </div>
      <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm flex flex-wrap gap-4">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-600 rounded-full mr-1"></span>
          <span>E.E: Exceeding Expectations (&gt;70)</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-600 rounded-full mr-1"></span>
          <span>M.E: Meeting Expectations (61-70)</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-yellow-600 rounded-full mr-1"></span>
          <span>A.E: Approaching Expectations (41-60)</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-600 rounded-full mr-1"></span>
          <span>B.E: Below Expectations (≤40)</span>
        </div>
      </div>
      {/* Desktop Table View - Only visible on large screens */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-center">Math</th>
              <th className="px-4 py-3 text-center">English</th>
              <th className="px-4 py-3 text-center">Kiswahili</th>
              <th className="px-4 py-3 text-center">Science</th>
              <th className="px-4 py-3 text-center">SST</th>
              <th className="px-4 py-3 text-center">Total</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-500 border-b">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 14a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                    <span>No data available for the selected filters.</span>
                    <span className="text-sm mt-1">Try selecting different filters or clearing them.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((mark, index) => {
                const student = students[mark.student];
                const name = student
                  ? `${student.first_name} ${student.last_name}`
                  : "Unknown";
                const className = student ? student.class_name : "Unknown";
                return (
                  <tr 
                    key={mark.id} 
                    className={`border-b hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{name}</td>
                    <td className="px-4 py-3 text-center">{renderMarkWithGrade(mark.math_marks)}</td>
                    <td className="px-4 py-3 text-center">{renderMarkWithGrade(mark.english_marks)}</td>
                    <td className="px-4 py-3 text-center">{renderMarkWithGrade(mark.kiswahili_marks)}</td>
                    <td className="px-4 py-3 text-center">{renderMarkWithGrade(mark.science_marks)}</td>
                    <td className="px-4 py-3 text-center">{renderMarkWithGrade(mark.sst_marks)}</td>
                    <td className="px-4 py-3 text-center font-bold">{mark.total_marks}</td>
                   
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleEditClick(mark.student)} // Ensure this is correctly bound
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Card View - Visible on small and medium screens (replaces table) */}
      <div ref={resultsRef} className="lg:hidden mt-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Student Results</h2>
          {/* Page size selector */}
          <div className="flex items-center">
            <label htmlFor="cardsPerPage" className="mr-2 text-sm text-gray-600">Display:</label>
            <select
              id="cardsPerPage"
              value={cardsPerPage}
              onChange={handleCardsPerPageChange}
              className="border border-gray-300 p-1 text-sm rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="15">15 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
        </div>
        {/* Top Pagination for Mobile/Tablet View */}
        {filteredData.length > cardsPerPage && (
          <div className="mb-4">
            <PaginationControls totalPages={totalPages} />
          </div>
        )}
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 14a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <p>No data available for the selected filters.</p>
            <p className="text-sm mt-1">Try selecting different filters or clearing them.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentCards.map((mark) => {
                const student = students[mark.student];
                const name = student
                  ? `${student.first_name} ${student.last_name}`
                  : "Unknown";
                const className = student ? student.class_name : "Unknown";
                
                // Calculate average score and grade
                const subjectMarks = [
                  mark.math_marks,
                  mark.english_marks,
                  mark.kiswahili_marks,
                  mark.science_marks,
                  mark.sst_marks
                ].filter(m => m !== null && m !== undefined);
                const avgMark = subjectMarks.length > 0 
                  ? subjectMarks.reduce((sum, curr) => sum + curr, 0) / subjectMarks.length 
                  : 0;
                const avgGrade = getGrade(avgMark);
                const gradeColor = {
                  "E.E": "bg-green-100 border-green-500",
                  "M.E": "bg-blue-100 border-blue-500",
                  "A.E": "bg-yellow-100 border-yellow-500",
                  "B.E": "bg-red-100 border-red-500"
                }[avgGrade] || "bg-gray-100 border-gray-500";
                return (
                  <div 
                    key={mark.id} 
                    className={`bg-white rounded-lg shadow-md border-l-4 ${gradeColor} overflow-hidden`}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">{className}</span>
                          <button
                            onClick={() => handleEditClick(mark.student)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="p-2 bg-gray-50 rounded">
                          <span className="text-gray-500 block mb-1">Math:</span>
                          {renderMarkWithGrade(mark.math_marks)}
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <span className="text-gray-500 block mb-1">English:</span>
                          {renderMarkWithGrade(mark.english_marks)}
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <span className="text-gray-500 block mb-1">Kiswahili:</span>
                          {renderMarkWithGrade(mark.kiswahili_marks)}
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <span className="text-gray-500 block mb-1">Science:</span>
                          {renderMarkWithGrade(mark.science_marks)}
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <span className="text-gray-500 block mb-1">SST:</span>
                          {renderMarkWithGrade(mark.sst_marks)}
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <span className="text-gray-500 block mb-1">Total:</span>
                          <span className="font-bold">{mark.total_marks}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <span className={`w-3 h-3 rounded-full mr-1 ${gradeColor.includes('green') ? 'bg-green-600' : gradeColor.includes('blue') ? 'bg-blue-600' : gradeColor.includes('yellow') ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
                          <span>{avgGrade} Average</span>
                        </div>
                        <span className="text-gray-500">
                          {mark.submission_date
                            ? format(new Date(mark.submission_date), "yyyy-MM-dd")
                            : "No Date"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Bottom Pagination for Mobile/Tablet View */}
            {filteredData.length > cardsPerPage && (
              <div className="mt-6">
                <PaginationControls totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </div>
            
      {filteredData.length > 0 && (
        <div className="mt-4 text-right text-sm text-gray-600">
          Showing {Math.min(indexOfFirstCard + 1, filteredData.length)} to {Math.min(indexOfLastCard, filteredData.length)} of {filteredData.length} {filteredData.length === 1 ? 'record' : 'records'}
        </div>
      )}
      {/* Edit Marks Popup */}
      {isEditPopupOpen && (
        <EditMarksPopup
          studentId={selectedStudentId}
          initialMarks={marksData.find(mark => mark.student === selectedStudentId)}
          onClose={handlePopupClose}
          onSubmit={handleMarksUpdate}
        />
      )}
      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Download Results</h3>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleDownloadResults} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Class
                </label>
                <select
                  value={downloadGrade}
                  onChange={(e) => setDownloadGrade(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Grade</option>
                  {[...Array(9)].map((_, i) => (
                    <option key={i + 1} value={`Grade ${i + 1}`}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Download
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMarksPage;