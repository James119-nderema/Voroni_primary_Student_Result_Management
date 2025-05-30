import { useState, useEffect, useMemo } from 'react';
import GradeFilter from './Filters/GradeFilter';
import StudentSearch from './Filters/StudentSearch';
import MonthFilter from './Filters/MonthFilter';
import TermFilter from './Filters/TermFilter';
import ExamTypeFilter from './Filters/ExamTypeFilter';
import PerformanceStats from './Stats/PerformanceStats';
import StudentMarksMobileView from './StudentMarksMobileView';
import MarksTable from './MarksTable';
import ReportDownloadButtonWithDropdown from '../../Common/ReportDownloadButtonWithDropdown';
import useMarksData from './hooks/useMarksData';
import useResponsiveView from './hooks/useResponsiveView';
import { processTableData, extractUniqueGrades, filterStudentRows } from './utils/dataProcessing';
import { getAverageColor } from './utils/formatters';

export default function StudentMarksTable() {
  // Custom hooks
  const { allMarks, subjects, students, loading, error } = useMarksData();
  const { isMobileView, setIsMobileView } = useResponsiveView();
  
  // Local state
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [showStats, setShowStats] = useState(false);
  
  // Data structure to hold processed marks for display
  const [processedData, setProcessedData] = useState({
    tableSubjects: [],
    studentRows: []
  });

  useEffect(() => {
    // Process the data when data is loaded
    const processed = processTableData(allMarks, subjects, students);
    setProcessedData(processed);
  }, [allMarks, subjects, students]);
  
  // Extract unique grades from students
  const uniqueGrades = useMemo(() => 
    extractUniqueGrades(students),
  [students]);
  
  // Filter the rows based on all filters
  const filteredRows = useMemo(() => 
    filterStudentRows(
      processedData.studentRows, 
      selectedGrade, 
      searchTerm, 
      selectedMonth,
      selectedTerm,
      selectedExamType
    ),
  [processedData.studentRows, selectedGrade, searchTerm, selectedMonth, selectedTerm, selectedExamType]);

  // Generate filename based on selected grade
  const generateFilename = useMemo(() => {
    return selectedGrade ? `Results_Grade_${selectedGrade}` : 'AllResults';
  }, [selectedGrade]);

  // Error handling at component level
  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Marks Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        <GradeFilter 
          grades={uniqueGrades}
          selectedGrade={selectedGrade}
          onGradeChange={setSelectedGrade}
        />
        <StudentSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <MonthFilter
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
        <TermFilter
          selectedTerm={selectedTerm}
          onTermChange={setSelectedTerm}
        />
        <ExamTypeFilter
          selectedExamType={selectedExamType}
          onExamTypeChange={setSelectedExamType}
        />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-sm font-semibold">Performance Statistics</h2>
          <button 
            onClick={() => setShowStats(!showStats)} 
            className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-md shadow-sm flex items-center"
          >
            {showStats ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Hide Stats
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Show Stats
              </>
            )}
          </button>
        </div>
        
        <div className="flex-shrink-0">
          <ReportDownloadButtonWithDropdown 
            buttonText="Download Report"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm font-medium rounded"
          />
        </div>
      </div>
      
      {showStats && (
        <PerformanceStats 
          studentRows={processedData.studentRows} 
          selectedGrade={selectedGrade}
          useAverages={true}
        />
      )}
      
      {/* View toggle button for table/cards */}
      <div className="flex justify-end mb-4 md:hidden">
        <button 
          onClick={() => setIsMobileView(!isMobileView)} 
          className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-md shadow-sm flex items-center"
        >
          {isMobileView ? 'Switch to Table View' : 'Switch to Card View'}
        </button>
      </div>
      
      {/* Mobile view (cards) - only show loading state here */}
      {isMobileView && (
        loading ? (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading student marks data...</p>
          </div>
        ) : processedData.tableSubjects.length ? (
          <StudentMarksMobileView 
            students={filteredRows} 
            subjects={processedData.tableSubjects}
            getAverageColor={getAverageColor}
          />
        ) : (
          <div className="text-center p-8">No marks data available.</div>
        )
      )}
      
      {/* Desktop view (table) - show loading state here */}
      {!isMobileView && (
        loading ? (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading student marks data...</p>
          </div>
        ) : processedData.tableSubjects.length ? (
          <MarksTable filteredRows={filteredRows} processedData={processedData} />
        ) : (
          <div className="text-center p-8">No marks data available.</div>
        )
      )}
      
      {filteredRows.length === 0 && !loading && processedData.tableSubjects.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          No students match your current filters.
        </div>
      )}
    </div>
  );
}
