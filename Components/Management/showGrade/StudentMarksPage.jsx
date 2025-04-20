import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

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
        </div>
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

      <div className="overflow-x-auto shadow-md rounded-lg">
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
              <th className="px-4 py-3 text-center">Submission Date</th>
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
                    <td className="px-4 py-3 text-center text-gray-600">
                      {mark.submission_date
                        ? format(new Date(mark.submission_date), "yyyy-MM-dd")
                        : "No Date"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {filteredData.length > 0 && (
        <div className="mt-4 text-right text-sm text-gray-600">
          Showing {filteredData.length} {filteredData.length === 1 ? 'record' : 'records'}
        </div>
      )}
    </div>
  );
};

export default StudentMarksPage;