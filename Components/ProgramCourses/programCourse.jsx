import React, { useState, useEffect } from 'react';
import { 
  fetchPrograms, 
  fetchPeriods, 
  fetchCourses, 
  fetchProgramCourses, 
  addCourseToProgram, 
  removeCourseFromProgram 
} from '../Services/programCourseService';
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
  Paper,
  Divider,
} from '@mui/material';
import { Search, Delete, Refresh, School } from '@mui/icons-material';
import TopContainer from './TopContainer';
import CourseTable from './CourseTable';
import AddCourseSection from './AddCourseSection';

const ProgramCourse = () => {
  // State variables
  const [programs, setPrograms] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [courses, setCourses] = useState([]);
  const [programCourses, setProgramCourses] = useState([]);
  const [filteredProgramCourses, setFilteredProgramCourses] = useState([]);
  
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  
  const [programSearch, setProgramSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [programsData, periodsData, coursesData] = await Promise.all([
          fetchPrograms(),
          fetchPeriods(),
          fetchCourses()
        ]);
        setPrograms(programsData);
        setPeriods(periodsData);
        setCourses(coursesData);
      } catch (error) {
        showNotification('Failed to fetch initial data. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch program courses when program or period changes
  useEffect(() => {
    const getProgramCourses = async () => {
      if (selectedProgram && selectedPeriod) {
        try {
          setLoading(true);
          const data = await fetchProgramCourses(selectedProgram, selectedPeriod);
          setProgramCourses(data);
          setFilteredProgramCourses(data);
        } catch (error) {
          showNotification('Failed to fetch program courses. Please try again.', 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    getProgramCourses();
  }, [selectedProgram, selectedPeriod]);

  // Filter program courses when courseSearch changes
  useEffect(() => {
    if (courseSearch) {
      const filtered = programCourses.filter(
        course => 
          course.courseCode?.toLowerCase().includes(courseSearch.toLowerCase()) ||
          course.courseName?.toLowerCase().includes(courseSearch.toLowerCase())
      );
      setFilteredProgramCourses(filtered);
    } else {
      setFilteredProgramCourses(programCourses);
    }
  }, [courseSearch, programCourses]);

  // Filter programs when programSearch changes
  const filteredPrograms = programs.filter(
    program => 
      program.programName?.toLowerCase().includes(programSearch.toLowerCase()) ||
      program.programCode?.toLowerCase().includes(programSearch.toLowerCase())
  );

  const showNotification = (message, type = 'success') => {
    setNotification({
      open: true,
      message,
      type
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Handlers
  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
    setCourseSearch('');
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
    setCourseSearch('');
  };

  const handleAddCourse = async (courseId) => {
    if (!selectedProgram || !selectedPeriod || !courseId) {
      showNotification('Please select a program, period, and course.', 'error');
      return;
    }

    try {
      setLoading(true);
      await addCourseToProgram(selectedProgram, selectedPeriod, courseId);
      
      // Refresh program courses after adding
      const updatedCourses = await fetchProgramCourses(selectedProgram, selectedPeriod);
      setProgramCourses(updatedCourses);
      setFilteredProgramCourses(updatedCourses);
      
      showNotification('Course added successfully!');
    } catch (error) {
      showNotification('Failed to add course. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteCourse = (programCourseId) => {
    if (!programCourseId) {
      showNotification('Invalid course selected for deletion.', 'error');
      return;
    }
    setCourseToDelete(programCourseId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete) {
      showNotification('No course selected for deletion.', 'error');
      return;
    }

    try {
      setLoading(true);
      await removeCourseFromProgram(courseToDelete);

      // Refresh program courses after removing
      const updatedCourses = await fetchProgramCourses(selectedProgram, selectedPeriod);
      setProgramCourses(updatedCourses);
      setFilteredProgramCourses(updatedCourses);

      showNotification('Course removed successfully!');
    } catch (error) {
      showNotification('Failed to remove course. Please try again.', 'error');
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const refreshData = async () => {
    if (selectedProgram && selectedPeriod) {
      try {
        setLoading(true);
        const data = await fetchProgramCourses(selectedProgram, selectedPeriod);
        setProgramCourses(data);
        setFilteredProgramCourses(data);
        setCourseSearch('');
        showNotification('Data refreshed successfully!');
      } catch (error) {
        showNotification('Failed to refresh data. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          color: '#333', 
          mb: 3,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <School sx={{ mr: 1.5, color: '#555' }} />
        Program Courses Management
      </Typography>
      
      {/* Program and Period Selection */}
      <TopContainer
        programSearch={programSearch}
        setProgramSearch={setProgramSearch}
        selectedProgram={selectedProgram}
        handleProgramChange={handleProgramChange}
        filteredPrograms={filteredPrograms}
        selectedPeriod={selectedPeriod}
        handlePeriodChange={handlePeriodChange}
        periods={periods}
      />

      {selectedProgram && selectedPeriod && (
        <>
          {/* Course Selection Section (Replacing Dialog) */}
          <AddCourseSection 
            courses={courses}
            onAddCourse={handleAddCourse}
            selectedProgram={selectedProgram}
            selectedPeriod={selectedPeriod}
          />
          
          {/* Course Search and Results */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#333',
                  fontSize: '1rem'
                }}
              >
                Program Courses
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Refresh />}
                onClick={refreshData}
                size="small"
                sx={{ 
                  borderRadius: 0,
                  textTransform: 'none'
                }}
              >
                Refresh
              </Button>
            </Box>
            
            <TextField
              fullWidth
              placeholder="Filter courses by name or code"
              variant="outlined"
              size="small"
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search color="action" sx={{ mr: 1 }} fontSize="small" />,
              }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                }
              }}
            />
            
            <CourseTable 
              loading={loading} 
              filteredProgramCourses={filteredProgramCourses}
              confirmDeleteCourse={confirmDeleteCourse}
            />
          </Box>
        </>
      )}

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 0,
            boxShadow: 'none',
            border: '1px solid #e0e0e0',
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #eee', py: 1.5 }}>
          <Typography component="div" variant="subtitle1" sx={{ fontWeight: 600 }}>
            Confirm Removal
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 2, px: 3, mt: 1 }}>
          <Typography variant="body2">
            Are you sure you want to remove this course from the program?
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', fontSize: '0.85rem' }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #eee' }}>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)} 
            color="inherit"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteCourse} 
            color="error" 
            variant="contained"
            size="small"
            sx={{ textTransform: 'none', borderRadius: 0 }}
          >
            Remove Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProgramCourse;
