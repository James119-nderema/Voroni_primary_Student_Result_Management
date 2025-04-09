import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, Button, CircularProgress, Divider, Snackbar, Alert,
  TextField, InputAdornment, Chip, Avatar, Autocomplete
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, School as SchoolIcon, 
  AccessTime as TimeIcon, Person as PersonIcon, Refresh as RefreshIcon, 
  Search as SearchIcon
} from '@mui/icons-material';
import LecturerScheduleService from '../../Services/LecturerScheduleService';
import LecturerCoursesSection from './LecturerCoursesSection';
import LecturerScheduleSection from './LecturerScheduleSection';
import LecturerAvailabilitySection from './LecturerAvailabilitySection';

const LecturerSchedulePage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Theme colors
  const theme = {
    primary: '#1976d2',
    background: '#f8f9fa',
    paper: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    cardHighlight: '#f5f9ff',
    tableHeader: '#e3f2fd',
    tableRowOdd: '#fafafa',
    border: '#e0e0e0'
  };

  useEffect(() => {
    const fetchAllLecturers = async () => {
      try {
        setIsLoading(true);
        const allLecturers = await LecturerScheduleService.getAllLecturers();
        setLecturers(allLecturers);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
        showNotification('Error loading lecturers', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllLecturers();
  }, []);

  const fetchLecturerData = async (lecturerId) => {
    try {
      setIsLoading(true);
      const id = parseInt(lecturerId);

      // Fetch all lecturer data in parallel
      const [lecturerDetails, lecturerCourses, lecturerSchedules, lecturerAvailability] = await Promise.all([
        LecturerScheduleService.getLecturerDetails(id),
        LecturerScheduleService.getLecturerCourses(id),
        LecturerScheduleService.getLecturerSchedules(id),
        LecturerScheduleService.getLecturerAvailability(id)
      ]);

      setLecturer(lecturerDetails);
      setCourses(lecturerCourses);
      setSchedules(lecturerSchedules);
      setAvailability(lecturerAvailability);
    } catch (error) {
      console.error('Error fetching lecturer data:', error);
      showNotification('Error loading lecturer data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLecturerChange = (event, newValue) => {
    if (newValue) {
      const lecturerId = newValue.lecturerId;
      setSelectedLecturerId(lecturerId);
      fetchLecturerData(lecturerId);
    }
  };

  const handleRegenerateSchedule = async () => {
    try {
      setIsLoading(true);
      await LecturerScheduleService.regenerateLecturerSchedule(parseInt(selectedLecturerId));
      const updatedSchedules = await LecturerScheduleService.getLecturerSchedules(parseInt(selectedLecturerId));
      const updatedAvailability = await LecturerScheduleService.getLecturerAvailability(parseInt(selectedLecturerId));
      setSchedules(updatedSchedules);
      setAvailability(updatedAvailability);
      showNotification('Schedule regenerated successfully', 'success');
    } catch (error) {
      console.error('Error regenerating schedule:', error);
      showNotification('Failed to regenerate schedule', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
        sx={{ backgroundColor: theme.background }}
      >
        <CircularProgress sx={{ color: theme.primary }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: theme.background, 
      minHeight: '100vh',
      pb: 6,
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Rearranged Header Section - Now full width */}
      <Box 
        sx={{ 
          py: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
          <PersonIcon sx={{ color: theme.primary, fontSize: 28, mr: 1.5 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ color: theme.text }}>
            Lecturer Schedules
          </Typography>
        </Box>

        <Autocomplete
          options={lecturers}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search lecturer by name..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.textSecondary }} />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white',
                  width: { xs: '100%', sm: '280px' }
                }
              }}
            />
          )}
          onChange={handleLecturerChange}
          sx={{ width: { xs: '100%', sm: '280px' } }}
        />
      </Box>

      {/* Informational Card */}
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3, 
          backgroundColor: theme.cardHighlight, 
          borderRadius: 2, 
          border: `1px solid ${theme.border}` 
        }}
      >
        <Typography variant="body2" sx={{ color: theme.textSecondary }}>
          It lets you see the courses that the lecturer has chosen, the day-timeslots combination they have chosen, and the possible combination of the courses and the day-timeslots they have chosen.
        </Typography>
      </Paper>

      {/* Lecturer Info Card - Only when lecturer is selected */}
      {lecturer && (
        <Paper 
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: 3, 
            backgroundColor: theme.paper,
            borderRadius: 2,
            border: `1px solid ${theme.border}`,
            boxShadow: 'none'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 2, md: 0 }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: { xs: '100%', md: 'auto' }
            }}>
              <Avatar sx={{ 
                bgcolor: theme.primary, 
                width: 60, 
                height: 60,
                mr: 2.5
              }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.text, mb: 0.5 }}>
                  {`${lecturer.firstName} ${lecturer.lastName}`}
                </Typography>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                  <Typography variant="body2" sx={{ color: theme.textSecondary }}>
                    ID: {lecturer.lecturerId}
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />
                  <Chip 
                    icon={<SchoolIcon fontSize="small" />}
                    label={`${courses.length} Courses`} 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(25,118,210,0.1)',
                      color: theme.primary,
                      height: 24
                    }}
                  />
                  <Chip 
                    icon={<TimeIcon fontSize="small" />}
                    label={`${lecturer.sessionsAssigned} Session(s) assigned`} 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(0,200,83,0.1)',
                      color: '#2e7d32',
                      height: 24
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              onClick={handleRegenerateSchedule}
              startIcon={<RefreshIcon />}
              sx={{ 
                borderRadius: 2,
                backgroundColor: theme.primary,
                px: 2.5,
                py: 1,
                textTransform: 'none',
                alignSelf: { xs: 'flex-end', md: 'center' },
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)'
                }
              }}
            >
              Regenerate Schedule
            </Button>
          </Box>
        </Paper>
      )}

      {lecturer && (
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {/* Courses Section */}
          <Grid item xs={12} md={4} sx={{ flex: '1 1 0' }}>
            <LecturerCoursesSection courses={courses} theme={theme} />
          </Grid>

          {/* Schedules Section */}
          <Grid item xs={12} md={4} sx={{ flex: '1 1 0' }}>
            <LecturerScheduleSection schedules={schedules} theme={theme} />
          </Grid>

          {/* Availability Section */}
          <Grid item xs={12} md={4} sx={{ flex: '1 1 0' }}>
            <LecturerAvailabilitySection availability={availability} theme={theme} />
          </Grid>
        </Grid>
      )}
      
      {!lecturer && (
        <Paper 
          sx={{ 
            p: 5, 
            textAlign: 'center',
            backgroundColor: theme.paper,
            borderRadius: 2,
            border: `1px solid ${theme.border}`,
            boxShadow: 'none'
          }}
        >
          <PersonIcon sx={{ fontSize: 60, color: theme.textSecondary, opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" sx={{ color: theme.textSecondary, mb: 1 }}>
            No Lecturer Selected
          </Typography>
          <Typography variant="body2" sx={{ color: theme.textSecondary }}>
            Search and select a lecturer to view their schedule information
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default LecturerSchedulePage;