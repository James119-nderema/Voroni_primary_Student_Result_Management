import React, { useState, useRef, useEffect } from "react";
import { useStudentData } from './hooks/useStudentData';
import Header from './Header';
import StatsSection from './StatsSection';
import GradeLegend from './GradeLegend';
import ResultsView from './ResultsView';
import PaginationSection from './PaginationSection';
import EditMarksPopup from './EditMarksPopup';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import DownloadSection from './DownloadSection';
import { filterData, calculateStats } from './utils/dataUtils';
import { marksService } from '../../Services/marksService';

const StudentMarksPage = () => {
  const { marksData, students, loading, error, updateMarks } = useStudentData();
  const [filteredMonth, setFilteredMonth] = useState("");
  const [filteredClass, setFilteredClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(5);
  const [statsData, setStatsData] = useState({
    totalStudents: 0,
    avgScore: 0,
    topGrade: 0,
    passingRate: 0
  });
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    const filtered = filterData(marksData, { searchTerm, filteredMonth, filteredClass, students });
    const stats = calculateStats(filtered);
    setStatsData(stats);
    setCurrentPage(1);
  }, [marksData, filteredMonth, filteredClass, searchTerm, students]);

  const handleDownload = async ({ type, value }) => {
    try {
      setIsDownloading(true);
      let response;
      let filename;

      if (type === 'all') {
        response = await marksService.downloadResults('all');
        filename = "All_Classes_Results.pdf";
      } else if (type === 'student') {
        response = await marksService.downloadResults('student', value);
        const student = students[value];
        filename = `${student.first_name}_${student.last_name}_Results.pdf`;
      } else {
        response = await marksService.downloadResults('class', value);
        filename = `${value}_Results.pdf`;
      }

      // Create and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setShowDownloadSection(false);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download results. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredData = filterData(marksData, { searchTerm, filteredMonth, filteredClass, students });
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const currentCards = filteredData.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <div className="container mx-auto px-2 py-4 max-w-full overflow-x-hidden">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredClass={filteredClass}
          setFilteredClass={setFilteredClass}
          filteredMonth={filteredMonth}
          setFilteredMonth={setFilteredMonth}
          showDownloadSection={showDownloadSection}
          setShowDownloadSection={setShowDownloadSection}
        />

        {showDownloadSection && (
          <DownloadSection
            students={students}
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        )}

        <StatsSection statsData={statsData} />
        <GradeLegend />
        
        <ResultsView 
          filteredData={filteredData}
          currentCards={currentCards}
          students={students}
          onEditClick={(studentId) => {
            setSelectedStudentId(studentId);
            setIsEditPopupOpen(true);
          }}
        />

        <PaginationSection 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalRecords={filteredData.length}
          currentPageRecords={currentCards.length}
        />

        {isEditPopupOpen && (
          <EditMarksPopup
            studentId={selectedStudentId}
            initialMarks={marksData.find(mark => mark.student === selectedStudentId)}
            onClose={() => setIsEditPopupOpen(false)}
            onSubmit={updateMarks}
          />
        )}
      </div>
    </div>
  );
};

export default StudentMarksPage;