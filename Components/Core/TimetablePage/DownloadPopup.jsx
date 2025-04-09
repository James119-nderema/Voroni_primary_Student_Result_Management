import { useState, useEffect } from 'react';
import TimetableService from '../../Services/TimetableService';

const DownloadPopup = ({ isOpen, onClose, activeDay, daysWithDates }) => {
  const [selectedType, setSelectedType] = useState('day');
  const [selectedEntityId, setSelectedEntityId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const [downloadAll, setDownloadAll] = useState(false);

  // Data for dropdowns
  const [lecturers, setLecturers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Fetch data when component becomes visible
  useEffect(() => {
    if (isOpen) {
      fetchEntities();
    } else {
      // Reset feedback message when component closes
      setDownloadSuccess(null);
    }
  }, [isOpen]);

  const fetchEntities = async () => {
    setIsLoading(true);
    try {
      // Fetch all entity types in parallel
      const [lecturersData, classesData, roomsData] = await Promise.all([
        TimetableService.getLecturers(),
        TimetableService.getClasses(),
        TimetableService.getRooms()
      ]);

      setLecturers(lecturersData);
      setClasses(classesData);
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching entities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setDownloadSuccess(null);

    try {
      const dayIndex = daysWithDates.findIndex(day => day.name === activeDay) + 1;

      let entityName;
      let entityId = selectedEntityId;
      if (selectedType === 'day') {
        entityName = activeDay;
      } else if (selectedType === 'lecturer') {
        if (downloadAll) {
          entityId = 'all';
          entityName = 'All Lecturers';
        } else {
          const lecturer = lecturers.find(l => l.lecturerId === parseInt(selectedEntityId));
          entityName = `${lecturer.firstName} ${lecturer.lastName}`;
        }
      } else if (selectedType === 'class') {
        if (downloadAll) {
          entityId = 'all';
          entityName = 'All Classes';
        } else {
          const cls = classes.find(c => c.classId === parseInt(selectedEntityId));
          entityName = cls.classCode;
        }
      } else if (selectedType === 'room') {
        const room = rooms.find(r => r.roomId === parseInt(selectedEntityId));
        entityName = room.roomName;
      }

      const success = await TimetableService.downloadEntityTimetable(
        selectedType,
        entityId,
        dayIndex,
        entityName
      );

      setDownloadSuccess(success);
      if (success) {
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.error("Error during download:", error);
      setDownloadSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`
        border-t border-b border-gray-200 bg-gray-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
      `}
    >
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Download Timetable
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-500 transition-colors focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Download Options Tabs */}
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              className={`px-3 py-2 text-sm font-medium rounded-t-md ${
                selectedType === 'day' 
                  ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => {
                setSelectedType('day');
                setSelectedEntityId('');
                setDownloadAll(false);
              }}
            >
              Entire Day
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium rounded-t-md ${
                selectedType === 'lecturer' 
                  ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => {
                setSelectedType('lecturer');
                setSelectedEntityId('');
                setDownloadAll(false);
              }}
            >
              Lecturer
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium rounded-t-md ${
                selectedType === 'class' 
                  ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => {
                setSelectedType('class');
                setSelectedEntityId('');
                setDownloadAll(false);
              }}
            >
              Class
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium rounded-t-md ${
                selectedType === 'room' 
                  ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => {
                setSelectedType('room');
                setSelectedEntityId('');
                setDownloadAll(false);
              }}
            >
              Room
            </button>
          </div>

          {/* Selection Context */}
          {selectedType === 'day' && (
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <div className="flex items-center mb-2">
                <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-gray-700">Selected Day: <span className="text-indigo-700">{activeDay}</span></span>
              </div>
              <p className="text-sm text-gray-600">You will download the timetable for the entire day.</p>
            </div>
          )}

          {/* Dropdown */}
          {selectedType === 'lecturer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Lecturer
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="downloadAllLecturers"
                  checked={downloadAll}
                  onChange={(e) => setDownloadAll(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="downloadAllLecturers" className="text-sm text-gray-700">
                  Download for all lecturers
                </label>
              </div>
              {!downloadAll && (
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                >
                  <option value="">-- Select --</option>
                  {lecturers.map(lecturer => (
                    <option key={lecturer.lecturerId} value={lecturer.lecturerId}>
                      {lecturer.firstName} {lecturer.lastName}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {selectedType === 'class' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="downloadAllClasses"
                  checked={downloadAll}
                  onChange={(e) => setDownloadAll(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="downloadAllClasses" className="text-sm text-gray-700">
                  Download for all classes
                </label>
              </div>
              {!downloadAll && (
                <select
                  value={selectedEntityId}
                  onChange={(e) => setSelectedEntityId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                >
                  <option value="">-- Select --</option>
                  {classes.map(cls => (
                    <option key={cls.classId} value={cls.classId}>
                      {cls.classCode}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {selectedType === 'room' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Room
              </label>
              <select
                value={selectedEntityId}
                onChange={(e) => setSelectedEntityId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
              >
                <option value="">-- Select --</option>
                {rooms.map(room => (
                  <option key={room.roomId} value={room.roomId}>
                    {room.roomName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status Messages */}
          {downloadSuccess === false && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Failed to download timetable. Please try again.
            </div>
          )}

          {downloadSuccess === true && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Timetable downloaded successfully!
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isLoading || (selectedType !== 'day' && !selectedEntityId && !downloadAll)}
              className={`
                py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center
                ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                ${(selectedType !== 'day' && !selectedEntityId && !downloadAll) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Downloading...
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
      </div>
    </div>
  );
};

export default DownloadPopup;