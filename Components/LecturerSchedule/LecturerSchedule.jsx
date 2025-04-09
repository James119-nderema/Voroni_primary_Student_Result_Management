import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Button, CircularProgress, Divider, Snackbar, Alert,
  TextField, InputAdornment, Chip, Avatar, Autocomplete, Tabs, Tab, 
  Fade, Grow, useMediaQuery, useTheme as useMuiTheme
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, School as SchoolIcon, 
  AccessTime as TimeIcon, Person as PersonIcon, Refresh as RefreshIcon, 
  Search as SearchIcon, Schedule as ScheduleIcon
} from '@mui/icons-material';
import LecturerScheduleService from '../Services/LecturerScheduleService';
import LecturerCoursesSection from './LecturerCoursesSection';
import LecturerScheduleSection from './LecturerScheduleSection';
import LecturerAvailabilitySection from './LecturerAvailabilitySection';

// Custom theme with updated colors for a more modern look
const customTheme = {
  primary: '#2563eb', // More vibrant blue
  secondary: '#4f46e5', // Purple for accent
  background: '#f8fafc',
  paper: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  cardHighlight: '#f1f5f9',
  tableHeader: '#dbeafe',
  tableRowOdd: '#f8fafc',
  border: '#e2e8f0',
  disabledButton: '#cbd5e1',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#3b82f6',
  primaryHover: '#1d4ed8',
  cardShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)'
};

const LecturerSchedulePage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  // Use the custom theme defined above
  const theme = customTheme;

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
      
      // Reset to first tab whenever new lecturer is selected
      setActiveTab(0);
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
      
      // Switch to schedule tab to show the new schedule
      setActiveTab(1);
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleInfoSection = () => {
    setIsInfoExpanded((prev) => !prev);
  };

  // Check if there are selected courses or schedules
  const hasSelectedData = courses.length > 0 || schedules.length > 0;

  // Define tab content
  const tabContent = [
    { 
      label: 'Courses', 
      icon: <SchoolIcon />, 
      component: <LecturerCoursesSection courses={courses} theme={theme} /> 
    },
    { 
      label: 'Schedule', 
      icon: <CalendarIcon />, 
      component: <LecturerScheduleSection schedules={schedules} theme={theme} /> 
    },
    { 
      label: 'Availability', 
      icon: <TimeIcon />, 
      component: <LecturerAvailabilitySection availability={availability} theme={theme} /> 
    },
  ];

  return (
    <Box sx={{ 
      backgroundColor: theme.background, 
      minHeight: '100vh',
      pb: 6,
      px: { xs: 2, sm: 3, md: 4 },
      position: 'relative' // Added for overlay positioning
    }}>
      {/* Loading Overlay */}
      {isLoading && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            zIndex: 10, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            backdropFilter: 'blur(4px)' // Blur effect
          }}
        >
          <CircularProgress size={60} sx={{ color: theme.primary, mb: 2 }} />
          <Typography variant="body2" sx={{ color: theme.textSecondary }}>
            Regenerating schedule...
          </Typography>
        </Box>
      )}

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          elevation={6}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Box 
        sx={{ 
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 3
        }}
      >
        {/* Lecturer Info Section */}
        {lecturer && (
          <Box 
            sx={{ 
              p: { xs: 2.5, sm: 3 }, 
              backgroundColor: theme.paper,
              borderRadius: 2,
              border: `1px solid ${theme.border}`
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
                  width: 65, 
                  height: 65,
                  mr: 2.5
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {`${lecturer.firstName.charAt(0)}${lecturer.lastName.charAt(0)}`}
                  </Typography>
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
                        backgroundColor: 'rgba(79,70,229,0.1)',
                        color: theme.secondary,
                        height: 26
                      }}
                    />
                    <Chip 
                      icon={<TimeIcon fontSize="small" />}
                      label={`${lecturer.sessionsAssigned} Session(s) assigned`} 
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(16,185,129,0.1)',
                        color: theme.success,
                        height: 26
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Button 
                variant="contained" 
                onClick={handleRegenerateSchedule}
                startIcon={<RefreshIcon />}
                disabled={!hasSelectedData}
                sx={{ 
                  borderRadius: 2,
                  backgroundColor: hasSelectedData ? theme.primary : theme.disabledButton,
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  alignSelf: { xs: 'flex-end', md: 'center' },
                  boxShadow: hasSelectedData ? '0 4px 6px rgba(37, 99, 235, 0.2)' : 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: hasSelectedData ? theme.primaryHover : theme.disabledButton,
                    transform: hasSelectedData ? 'translateY(-2px)' : 'none',
                    boxShadow: hasSelectedData ? '0 6px 8px rgba(37, 99, 235, 0.25)' : 'none'
                  }
                }}
              >
                Regenerate Schedule
              </Button>
            </Box>
          </Box>
        )}

        {/* Search Lecturer Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
                    width: { xs: '100%', sm: '320px' },
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }
                }}
              />
            )}
            onChange={handleLecturerChange}
            sx={{ width: { xs: '100%', sm: '320px' } }}
          />
        </Box>
      </Box>

      {/* Collapsible Informational Section */}
      <Box 
        sx={{ 
          mb: 3, 
          border: `1px solid ${theme.border}`,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: theme.cardHighlight
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            p: 2.5, 
            cursor: 'pointer',
            backgroundColor: theme.cardHighlight,
            borderBottom: isInfoExpanded ? `1px solid ${theme.border}` : 'none'
          }}
          onClick={toggleInfoSection}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.text }}>
            Schedule Management System
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.primary, 
              fontWeight: 500, 
              textTransform: 'uppercase' 
            }}
          >
            {isInfoExpanded ? 'Collapse' : 'Expand'}
          </Typography>
        </Box>
        {isInfoExpanded && (
          <Fade in={isInfoExpanded}>
            <Box sx={{ p: 2.5 }}>
              <Typography variant="body2" sx={{ color: theme.textSecondary, mb: 1 }}>
                This system helps you manage lecturer schedules efficiently:
              </Typography>
              <ul style={{ 
                paddingLeft: '1.5rem', 
                margin: 0, 
                color: theme.textSecondary, 
                fontSize: '0.875rem', 
                listStyleType: 'disc' 
              }}>
                <li>View the courses, schedules, and availability of lecturers.</li>
                <li>Generate a combination of courses and availability to create a schedule.</li>
                <li>Schedules are limited to 15, and the algorithm will try to create the best schedule possible.</li>
                <li>You can regenerate schedules until you find the best one.</li>
              </ul>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Tabbed Interface */}
      {lecturer && (
        <Box
          sx={{ 
            borderRadius: 2,
            border: `1px solid ${theme.border}`,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant={isMobile ? "fullWidth" : "standard"}
              textColor="inherit"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  py: 2,
                  color: theme.textSecondary,
                  minHeight: 48,
                  '&.Mui-selected': {
                    color: theme.primary,
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.primary,
                  height: 3,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }
              }}
            >
              {tabContent.map((tab, index) => (
                <Tab 
                  key={index} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {React.cloneElement(tab.icon, { 
                        fontSize: "small",
                        sx: { fontSize: 18 }
                      })}
                      <span>{tab.label}</span>
                    </Box>
                  } 
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: { xs: 0, sm: 0 }, minHeight: '400px', backgroundColor: theme.paper }}>
            {tabContent.map((tab, index) => (
              <Box 
                key={index} 
                role="tabpanel" 
                hidden={activeTab !== index}
                id={`lecturer-tabpanel-${index}`}
                aria-labelledby={`lecturer-tab-${index}`}
                sx={{ height: '100%' }}
              >
                {activeTab === index && (
                  <Box sx={{ height: '100%' }}>
                    {tab.component}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
      
      {/* Empty state when no lecturer is selected */}
      {!lecturer && (
        <Box 
          sx={{ 
            p: 5, 
            textAlign: 'center',
            backgroundColor: theme.paper,
            borderRadius: 2,
            border: `1px solid ${theme.border}`
          }}
        >
          <Avatar sx={{ 
            bgcolor: 'rgba(37, 99, 235, 0.1)',
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 3
          }}>
            <PersonIcon sx={{ fontSize: 40, color: theme.primary }} />
          </Avatar>
          <Typography variant="h6" sx={{ color: theme.text, mb: 1, fontWeight: 500 }}>
            No Lecturer Selected
          </Typography>
          <Typography variant="body2" sx={{ color: theme.textSecondary, maxWidth: 450, mx: 'auto' }}>
            Search and select a lecturer from the dropdown above to view and manage their schedule information
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Missing import for InfoIcon
const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 20, height: 20}}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

export default LecturerSchedulePage;