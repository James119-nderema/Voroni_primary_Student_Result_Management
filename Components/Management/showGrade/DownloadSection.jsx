import React, { useState, useEffect, useRef } from 'react';

const DownloadSection = ({ students, onDownload, isDownloading }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const studentOptions = Object.values(students)
    .map(student => ({
      id: student.id,
      name: `${student.first_name} ${student.last_name}`,
      class_name: student.class_name
    }))
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearStudent = () => {
    setSearchTerm('');
    setSelectedStudent('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="font-semibold text-gray-700">Download Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Class
          </label>
          <select
            className={`w-full px-3 py-2 border rounded-lg ${
              selectedStudent ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500'
            }`}
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedStudent('');
              setSearchTerm('');
            }}
            disabled={!!selectedStudent}
          >
            <option value="">Choose a class...</option>
            <option value="All Classes">All Classes</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
          </select>
        </div>

        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Student
          </label>
          <div className={`relative ${selectedClass ? 'opacity-50 pointer-events-none' : ''}`}>
            <input
              type="text"
              className="w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Search student name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {searchTerm && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={handleClearStudent}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            {isDropdownOpen && studentOptions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {studentOptions.map(student => (
                  <div
                    key={student.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedStudent(student.id);
                      setSearchTerm(student.name);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.class_name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDownload({
          type: selectedStudent ? 'student' : selectedClass === 'All Classes' ? 'all' : 'class',
          value: selectedStudent || selectedClass
        })}
        disabled={(!selectedClass && !selectedStudent) || isDownloading}
        className={`mt-4 px-4 py-2 rounded-lg ${
          isDownloading || (!selectedClass && !selectedStudent)
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-medium w-full md:w-auto`}
      >
        {isDownloading ? 'Downloading...' : 'Download'}
      </button>
    </div>
  );
};

export default DownloadSection;
