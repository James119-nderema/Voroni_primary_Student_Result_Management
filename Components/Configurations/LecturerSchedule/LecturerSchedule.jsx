import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Button, CircularProgress, Divider, Snackbar, Alert,
  TextField, InputAdornment, Chip, Avatar, Autocomplete, Tabs, Tab, 
  Fade, Grow, useMediaQuery, useTheme as useMuiTheme, Card, CardContent,
  ButtonGroup, Tooltip
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, School as SchoolIcon, 
  AccessTime as TimeIcon, Person as PersonIcon, Refresh as RefreshIcon, 
  Search as SearchIcon, Schedule as ScheduleIcon, AutorenewTwoTone, Info as InfoIcon,
  Groups as GroupsIcon, PersonAdd as PersonAddIcon, Autorenew as AutorenewIcon
} from '@mui/icons-material';
import LecturerScheduleService from '../../Services/LecturerScheduleService';
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
  const [loadingType, setLoadingType] = useState('data'); // 'data', 'single', 'all'
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
        setLoadingType('data');
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
      setLoadingType('data');
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

  const handleRegenerateSingleSchedule = async () => {
    try {
      setIsLoading(true);
      setLoadingType('single');
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

  const handleRegenerateAllSchedules = async () => {
    try {
      setIsLoading(true);
      setLoadingType('all');
      await LecturerScheduleService.regenerateAllLecturerSchedules();
      
      if (selectedLecturerId) {
        // Refresh current lecturer's schedule if one is selected
        const updatedSchedules = await LecturerScheduleService.getLecturerSchedules(parseInt(selectedLecturerId));
        const updatedAvailability = await LecturerScheduleService.getLecturerAvailability(parseInt(selectedLecturerId));
        setSchedules(updatedSchedules);
        setAvailability(updatedAvailability);
      }
      
      showNotification('All lecturer schedules regenerated successfully', 'success');
    } catch (error) {
      console.error('Error regenerating all schedules:', error);
      showNotification('Failed to regenerate all schedules', 'error');
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

  // Loading message based on the type of operation
  const getLoadingMessage = () => {
    switch (loadingType) {
      case 'single':
        return "Regenerating lecturer's schedule...";
      case 'all':
        return "Regenerating all lecturer schedules...";
      default:
        return "Loading data...";
    }
  };

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
            {getLoadingMessage()}
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

      {/* Redesigned Header Section */}
      <Box 
        sx={{ 
          pt: 3,
          pb: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
          mb: 3
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: theme.text, 
            mb: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <ScheduleIcon sx={{ color: theme.primary }} />
            Lecturer Schedule Management
          </Typography>
          <Typography variant="body2" sx={{ color: theme.textSecondary }}>
            View and manage lecturer schedules, courses, and availability
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'flex-end',
          width: { xs: '100%', md: 'auto' }
        }}>
          <Tooltip title="Regenerate schedules for all lecturers">
            <Button
              variant="outlined"
              startIcon={<GroupsIcon />}
              onClick={handleRegenerateAllSchedules}
              sx={{
                borderRadius: 1.5,
                borderColor: theme.info,
                color: theme.info,
                px: 2,
                '&:hover': {
                  borderColor: theme.info,
                  backgroundColor: `${theme.info}10`,
                }
              }}
            >
              All Schedules
            </Button>
          </Tooltip>
          
          <Tooltip title="Regenerate schedule for selected lecturer">
            <Button
              variant="contained"
              startIcon={<AutorenewIcon />}
              onClick={handleRegenerateSingleSchedule}
              disabled={!selectedLecturerId}
              sx={{
                borderRadius: 1.5,
                backgroundColor: selectedLecturerId ? theme.primary : theme.disabledButton,
                px: 2,
                '&:hover': {
                  backgroundColor: selectedLecturerId ? theme.primaryHover : theme.disabledButton,
                }
              }}
            >
              This Lecturer
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Improved Info Card */}
      <Card 
        sx={{ 
          mb: 3, 
          borderRadius: 2,
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
            backgroundColor: `${theme.info}10`,
            borderBottom: isInfoExpanded ? `1px solid ${theme.border}` : 'none',
            cursor: 'pointer'
          }}
          onClick={toggleInfoSection}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <InfoIcon sx={{ color: theme.info }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.text }}>
              Scheduling System Information
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: theme.primary, fontWeight: 500 }}>
            {isInfoExpanded ? 'Hide' : 'Show'}
          </Typography>
        </Box>
        
        {isInfoExpanded && (
          <Fade in={isInfoExpanded}>
            <CardContent sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="body2" sx={{ color: theme.text }}>
                  The scheduler helps you manage lecturer assignments efficiently:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 0.5 }}>
                  <Chip 
                    size="small" 
                    label="Individual" 
                    sx={{ 
                      bgcolor: `${theme.primary}15`, 
                      color: theme.primary,
                      fontSize: '0.75rem'
                    }}
                  />
                  <Typography variant="body2" sx={{ color: theme.textSecondary }}>
                    Use "This Lecturer" to regenerate a schedule for the selected lecturer only
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <Chip 
                    size="small" 
                    label="Bulk" 
                    sx={{ 
                      bgcolor: `${theme.info}15`, 
                      color: theme.info,
                      fontSize: '0.75rem'
                    }}
                  />
                  <Typography variant="body2" sx={{ color: theme.textSecondary }}>
                    Use "All Schedules" to regenerate schedules for all lecturers at once
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Fade>
        )}
      </Card>

      {/* Redesigned Search Lecturer Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        width: '100%',
        mb: 4
      }}>
        <Autocomplete
          options={lecturers}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for a lecturer..."
              variant="outlined"
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
                  borderRadius: 1.5,
                  backgroundColor: 'white',
                  boxShadow: theme.cardShadow,
                }
              }}
            />
          )}
          onChange={handleLecturerChange}
          sx={{ 
            width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: '600px'
          }}
        />
      </Box>

      {/* Lecturer Info Card */}
      {lecturer && (
        <Box 
          sx={{ 
            p: { xs: 2.5, sm: 3 }, 
            backgroundColor: theme.paper,
            borderRadius: 2,
            border: `1px solid ${theme.border}`,
            boxShadow: theme.cardShadow,
            mb: 3
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
          </Box>
        </Box>
      )}

      {/* Tabbed Interface */}
      {lecturer && (
        <Box
          sx={{ 
            borderRadius: 2,
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
            boxShadow: theme.cardShadow
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
            border: `1px solid ${theme.border}`,
            boxShadow: theme.cardShadow
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
            Search and select a lecturer from the search box above to view and manage their schedule information
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LecturerSchedulePage;