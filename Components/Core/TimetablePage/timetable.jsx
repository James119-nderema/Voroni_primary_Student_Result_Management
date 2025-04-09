import { useEffect, useState } from "react";
import TimetableService from "../../Services/TimetableService";
import DownloadPopup from "./DownloadPopup";

const TimetablePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [generationTime, setGenerationTime] = useState(0);
  const [loadingStartTime, setLoadingStartTime] = useState(null);
  const [elapsedLoadingTime, setElapsedLoadingTime] = useState(0);
  // New state for download popup
  const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);

  // Animation state
  const [animate, setAnimate] = useState(false);
  
  // Get today's day name and set as active day
  const getTodayDayName = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayIndex = new Date().getDay();
    // Adjust index to start from Monday (0 = Monday, 1 = Tuesday, ..., 5 = Saturday)
    const adjustedIndex = (todayIndex === 0 ? 6 : todayIndex - 1);
    return days[adjustedIndex];
  };
  
  // Set today as active day
  const [activeDay, setActiveDay] = useState(getTodayDayName());

  // Get date for each day of the week
  const getDatesForWeek = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Create array of day objects with names and dates
    return days.map((day, index) => {
      const diff = index - currentDay;
      const date = new Date(today);
      date.setDate(today.getDate() + diff);
      
      return {
        name: day,
        date: date,
        dateFormatted: `${date.getDate()}/${date.getMonth() + 1}`
      };
    });
  };
  
  const daysWithDates = getDatesForWeek();

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      const data = await TimetableService.getTimetable();
      setTimetable(data);
      setLoading(false);
      // Trigger animation when data loads
      setTimeout(() => setAnimate(true), 100);
    };
    fetchTimetable();
  }, []);

  useEffect(() => {
    // Reset animation when active day changes
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [activeDay]);

  useEffect(() => {
    let interval = null;
    if (loadingStartTime) {
      interval = setInterval(() => {
        setElapsedLoadingTime(((Date.now() - loadingStartTime) / 1000).toFixed(2));
      }, 100);
    } else {
      setElapsedLoadingTime(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loadingStartTime]);

  const generateTimetable = async () => {
    setLoading(true);
    setLoadingStartTime(Date.now());
    const startTime = Date.now();
    await TimetableService.generateTimetable();
    const data = await TimetableService.getTimetable();
    setTimetable(data);
    setLoading(false);
    setLoadingStartTime(null);
    const endTime = Date.now();
    setGenerationTime(((endTime - startTime) / 1000).toFixed(2));
    setTimeout(() => setAnimate(true), 100);
  };

  const refreshTimetable = async () => {
    setLoading(true);
    const data = await TimetableService.getTimetable();
    setTimetable(data);
    setLoading(false);
    setTimeout(() => setAnimate(true), 100);
  };

  // Improved time mapping with more precise time slots
  const timeSlots = [
    { time24: "07:00", time12: "7:00 AM" },
    { time24: "08:00", time12: "8:00 AM" },
    { time24: "09:00", time12: "9:00 AM" },
    { time24: "10:00", time12: "10:00 AM" },
    { time24: "11:00", time12: "11:00 AM" },
    { time24: "12:00", time12: "12:00 PM" },
    { time24: "13:00", time12: "1:00 PM" },
    { time24: "14:00", time12: "2:00 PM" },
    { time24: "15:00", time12: "3:00 PM" },
    { time24: "16:00", time12: "4:00 PM" },
    { time24: "17:00", time12: "5:00 PM" },
    { time24: "18:00", time12: "6:00 PM" },
    { time24: "19:00", time12: "7:00 PM" },
    { time24: "20:00", time12: "8:00 PM" },
  ];

// Get improved color scheme for entries
const getColorScheme = (courseName) => {
  const colorPalette = [
    { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-800" },
    { bg: "bg-green-50", border: "border-green-500", text: "text-green-800" },
    { bg: "bg-purple-50", border: "border-purple-500", text: "text-purple-800" },
    { bg: "bg-yellow-50", border: "border-yellow-500", text: "text-yellow-800" },
    { bg: "bg-teal-50", border: "border-teal-500", text: "text-teal-800" },
    { bg: "bg-indigo-50", border: "border-indigo-500", text: "text-indigo-800" },
    { bg: "bg-cyan-50", border: "border-cyan-500", text: "text-cyan-800" },
    { bg: "bg-emerald-50", border: "border-emerald-500", text: "text-emerald-800" },
    { bg: "bg-lime-50", border: "border-lime-500", text: "text-lime-800" },
    { bg: "bg-sky-50", border: "border-sky-500", text: "text-sky-800" },
    { bg: "bg-violet-50", border: "border-violet-500", text: "text-violet-800" },
    { bg: "bg-gray-50", border: "border-gray-500", text: "text-gray-800" },
    { bg: "bg-stone-50", border: "border-stone-500", text: "text-stone-800" },
    { bg: "bg-amber-50", border: "border-amber-500", text: "text-amber-800" }, // Yellowish-orange
    { bg: "bg-fuchsia-50", border: "border-fuchsia-500", text: "text-fuchsia-800" },
  ];

  // Create a consistent hash based on the course name
  const hash = courseName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Assign a color based on the hash
  return colorPalette[hash % colorPalette.length];
};



  // Filter timetable entries based on search text
  const filteredTimetable = timetable.filter(entry => {
    if (!filterText) return true;
    
    const searchText = filterText.toLowerCase();
    return (
      entry.courseName?.toLowerCase().includes(searchText) ||
      entry.lecturerName?.toLowerCase().includes(searchText) ||
      entry.roomName?.toLowerCase().includes(searchText) ||
      entry.programName?.toLowerCase().includes(searchText) ||
      entry.className?.toLowerCase().includes(searchText) ||
      entry.periodName?.toLowerCase().includes(searchText)
    );
  });

  // Group entries by start time for the active day
  const groupedByTime = timeSlots.map(slot => {
    const entriesAtTime = filteredTimetable.filter(
      entry => entry.dayName === activeDay && entry.startTime === slot.time24
    );
    
    return {
      ...slot,
      entries: entriesAtTime
    };
  }).filter(group => group.entries.length > 0);

  // Render a single timetable entry card
  const renderTimetableCard = (entry, index) => {
    const colorScheme = getColorScheme(entry.courseName);
    
    // Calculate animation delay based on index
    const animationDelay = `${index * 0.05}s`;
    
    return (
      <div
        key={`${entry.courseName}-${entry.roomName}-${index}`}
        style={{ 
          animationDelay, 
          animationDuration: "0.4s",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(20px)"
        }}
        className={`
          ${colorScheme.bg} ${colorScheme.text}
          rounded-lg p-4 mb-3 border-l-4 ${colorScheme.border}
          transition-all duration-300
          animate-in fade-in slide-in-from-bottom
          shadow-sm hover:shadow-md
        `}
      >
        {/* Header Section with Course and Room */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-base flex-1 truncate">{entry.courseName}</h3>
          <span className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium ml-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {entry.roomName}
          </span>
        </div>
        
        {/* Middle Section with Lecturer */}
        <div className="flex items-center text-sm mb-3 pb-2 border-b border-gray-200/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium">{entry.lecturerName}</span>
        </div>
        
        {/* Bottom Section with Class Details */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{entry.className} - {entry.periodName}</span>
          </div>
          <div className="max-w-[50%] truncate text-right opacity-75">
            {entry.programName}
          </div>
        </div>
      </div>
    );
  };

  // Open the download popup
  const handleOpenDownloadPopup = () => {
    setDownloadPopupOpen((prev) => !prev); // Toggle the state
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Clean, simplified container without nested shadows */}
      <div className="w-full mx-auto bg-white border rounded-lg">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Search bar */}
            <div className="relative w-full lg:w-2/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Filter timetable..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {filterText && (
                <button
                  onClick={() => setFilterText("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 lg:w-1/3 justify-end">
              <button
                onClick={generateTimetable}
                disabled={loading}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium 
                  transition-all
                  ${loading 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                  }
                `}
              >
                {loading ? "Generating..." : "Generate"}
              </button>
              <button
                onClick={refreshTimetable}
                disabled={loading}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium 
                  transition-all
                  ${loading 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }
                `}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* Day Tabs with Dates */}
        <div className="flex overflow-x-auto border-b scrollbar-hide">
          <div className="flex">
            {daysWithDates.map(dayInfo => (
              <button
                key={dayInfo.name}
                onClick={() => setActiveDay(dayInfo.name)}
                className={`
                  px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 
                  flex flex-col items-center border-b-2 shadow-sm 
                  ${activeDay === dayInfo.name 
                    ? "border-indigo-500 text-indigo-600 bg-indigo-100 shadow-md" 
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                `}
              >
                <span>{dayInfo.name}</span>
                <span className="text-xs mt-1 opacity-80">{dayInfo.dateFormatted}</span>
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <button
              type="button"
              onClick={handleOpenDownloadPopup}
              className={`
                p-3 rounded-md shadow-sm text-sm font-medium text-white 
                focus:outline-none  focus:ring-offset-2 focus:ring-indigo-500 flex items-center
                ${downloadPopupOpen ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
              `}
            >
              {downloadPopupOpen ? (
                <>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hide Download
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </>
              )}
            </button>
          </div>
        </div>

        {/* Download Section - Now with animation */}
        <div
          className={`
            transition-all duration-300 ease-in-out overflow-hidden
            ${downloadPopupOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          {downloadPopupOpen && (
            <DownloadPopup 
              isOpen={downloadPopupOpen}
              onClose={() => setDownloadPopupOpen(false)}
              activeDay={activeDay}
              daysWithDates={daysWithDates}
            />
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            {/* Clean loading indicator */}
            <div className="flex flex-col items-center p-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
              {loadingStartTime && (
                <div className="text-gray-600 text-sm mt-4 inline-flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                  <svg className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{elapsedLoadingTime}s</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty States */}
        {!loading && timetable.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No timetable data available. Click Generate or Refresh to load data.
            </p>
          </div>
        )}

        {!loading && timetable.length > 0 && filteredTimetable.filter(entry => entry.dayName === activeDay).length === 0 && (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              {filterText 
                ? "No matching entries for this day. Try adjusting your filter."
                : "No classes scheduled for this day."}
            </p>
          </div>
        )}

        {/* Timetable Content */}
        {!loading && filteredTimetable.filter(entry => entry.dayName === activeDay).length > 0 && (
          <div className="p-4 transition-all duration-300">
            {groupedByTime.map((timeGroup) => (
              <div key={timeGroup.time24} className="mb-6">
                {/* Time Header - Simple and clean */}
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-md font-medium text-gray-800">{timeGroup.time12}</h3>
                </div>
                
                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {timeGroup.entries.map((entry, index) => 
                    renderTimetableCard(entry, index)
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Generation Timer - Clean and minimal */}
        {generationTime > 0 && (
          <div className="border-t py-2 flex justify-center">
            <div className="text-sm text-gray-500 flex items-center">
              <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generated in {generationTime}s
            </div>
          </div>
        )}
      </div>      
    </div>
  );
};

export default TimetablePage;