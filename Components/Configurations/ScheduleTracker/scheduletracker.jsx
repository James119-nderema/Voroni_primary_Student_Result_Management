import React, { useState, useEffect } from 'react';
import { getScheduleTracker } from '../../Services/scheduletrackerservice';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  Badge,
  Avatar,
  Stack,
  LinearProgress,
  Tab,
  Tabs,
  useTheme,
  alpha,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import DomainIcon from '@mui/icons-material/Domain';
import TimelineIcon from '@mui/icons-material/Timeline';

const ScheduleTrackerTable = () => {
  const [scheduleTrackers, setScheduleTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [selectedView, setSelectedView] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchScheduleTrackers = async () => {
      try {
        setLoading(true);
        const data = await getScheduleTracker();
        setScheduleTrackers(data);
        
        // Group data by faculty and department
        const grouped = groupDataHierarchically(data);
        setGroupedData(grouped);
      } catch (err) {
        setError('Failed to load schedule tracker data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleTrackers();
  }, []);

  // Group data hierarchically by faculty and department
  const groupDataHierarchically = (data) => {
    return data.reduce((result, tracker) => {
      const facultyId = tracker.facultyId || 0;
      const departmentId = tracker.departmentId;
      
      if (!result[facultyId]) {
        result[facultyId] = {
          facultyName: tracker.facultyName || "Unknown Faculty",
          departments: {},
          totalSchedules: 0,
          successfulSchedules: 0
        };
      }
      
      if (!result[facultyId].departments[departmentId]) {
        result[facultyId].departments[departmentId] = {
          departmentName: tracker.departmentName,
          trackers: [],
          totalSchedules: 0,
          successfulSchedules: 0
        };
      }
      
      result[facultyId].departments[departmentId].trackers.push(tracker);
      result[facultyId].departments[departmentId].totalSchedules++;
      result[facultyId].totalSchedules++;
      
      if (tracker.isSuccessful) {
        result[facultyId].departments[departmentId].successfulSchedules++;
        result[facultyId].successfulSchedules++;
      }
      
      return result;
    }, {});
  };

  // Status indicator component
  const StatusIndicator = ({ isFound, label }) => (
    <Chip
      icon={isFound ? <CheckCircleIcon /> : <CancelIcon />}
      label={label}
      color={isFound ? "success" : "error"}
      size="small"
      variant="outlined"
      sx={{ m: 0.5, fontWeight: 500 }}
    />
  );

  // Success rate component
  const SuccessRateIndicator = ({ successful, total }) => {
    const rate = total > 0 ? Math.round((successful / total) * 100) : 0;
    let color = theme.palette.error.main;
    
    if (rate >= 80) color = theme.palette.success.main;
    else if (rate >= 50) color = theme.palette.warning.main;
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', my: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Success Rate</Typography>
          <Typography variant="body2" fontWeight="bold" color={color}>{rate}%</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={rate} 
          sx={{ 
            width: '100%', 
            height: 8, 
            borderRadius: 4,
            backgroundColor: alpha(color, 0.2),
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
            }
          }}
        />
      </Box>
    );
  };

  // Summary Stats Card
  const SummaryCard = ({ icon, title, value, color, bgColor }) => (
    <Card 
      elevation={0} 
      sx={{ 
        p: 2,
        backgroundColor: bgColor,
        borderRadius: 2,
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color }}>{value}</Typography>
        </Box>
        <Avatar sx={{ backgroundColor: alpha(color, 0.1), color: color }}>
          {icon}
        </Avatar>
      </Box>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">Loading schedule tracking data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  // Calculate overall statistics
  const totalSchedules = scheduleTrackers.length;
  const successfulSchedules = scheduleTrackers.filter(tracker => tracker.isSuccessful).length;
  const failedSchedules = totalSchedules - successfulSchedules;
  const successRate = totalSchedules > 0 ? (successfulSchedules / totalSchedules) * 100 : 0;

  return (
    <Box sx={{ p: 3 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2, 
          background: 'linear-gradient(120deg, #1a237e, #283593)',
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Schedule Tracker Dashboard
        </Typography>
        <Typography variant="body1">
          Monitor and analyze class scheduling outcomes across all faculties and departments
        </Typography>
      </Paper>

      {/* Statistics Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            icon={<TimelineIcon />}
            title="Total Schedules" 
            value={totalSchedules} 
            color={theme.palette.primary.main}
            bgColor={alpha(theme.palette.primary.main, 0.1)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            icon={<CheckCircleIcon />}
            title="Successful" 
            value={successfulSchedules} 
            color={theme.palette.success.main}
            bgColor={alpha(theme.palette.success.main, 0.1)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            icon={<CancelIcon />}
            title="Failed" 
            value={failedSchedules} 
            color={theme.palette.error.main}
            bgColor={alpha(theme.palette.error.main, 0.1)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard 
            icon={<InfoIcon />}
            title="Success Rate" 
            value={`${Math.round(successRate)}%`} 
            color={successRate >= 70 ? theme.palette.success.main : successRate >= 40 ? theme.palette.warning.main : theme.palette.error.main}
            bgColor={alpha(successRate >= 70 ? theme.palette.success.main : successRate >= 40 ? theme.palette.warning.main : theme.palette.error.main, 0.1)}
          />
        </Grid>
      </Grid>

      {/* View Toggle */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={selectedView} 
          onChange={(e, newValue) => setSelectedView(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Hierarchical View" />
          <Tab label="Detailed List" />
        </Tabs>
      </Box>

      {/* Hierarchical View */}
      {selectedView === 0 && (
        <Box>
          {Object.keys(groupedData).length === 0 ? (
            <Alert severity="info">No scheduling data available.</Alert>
          ) : (
            Object.entries(groupedData).map(([facultyId, facultyData]) => (
              <Accordion key={`faculty-${facultyId}`} sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) }
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BusinessIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                        <Typography variant="h6">
                          {facultyData.facultyName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, alignItems: 'center', gap: 2 }}>
                        <Chip 
                          label={`${facultyData.successfulSchedules}/${facultyData.totalSchedules} successful`}
                          color="primary"
                          variant="outlined"
                        />
                        <Badge 
                          badgeContent={Object.keys(facultyData.departments).length} 
                          color="primary"
                          sx={{ '& .MuiBadge-badge': { fontSize: '0.8rem', height: '22px', minWidth: '22px' } }}
                        >
                          <Chip 
                            icon={<DomainIcon />} 
                            label="Departments" 
                            size="small"
                            variant="outlined"
                          />
                        </Badge>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                  <SuccessRateIndicator 
                    successful={facultyData.successfulSchedules} 
                    total={facultyData.totalSchedules} 
                  />
                  
                  {Object.entries(facultyData.departments).map(([departmentId, departmentData]) => (
                    <Accordion 
                      key={`department-${departmentId}`} 
                      sx={{ 
                        mb: 1.5,
                        '&:before': { display: 'none' },
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                      }}
                    >
                      <AccordionSummary 
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ 
                          backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                          '&:hover': { backgroundColor: alpha(theme.palette.secondary.main, 0.1) }
                        }}
                      >
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item xs={12} sm={7}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <DomainIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {departmentData.departmentName}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                              <Chip 
                                label={`${departmentData.successfulSchedules}/${departmentData.totalSchedules} successful`}
                                color={departmentData.successfulSchedules === departmentData.totalSchedules ? 
                                  "success" : departmentData.successfulSchedules > 0 ? "warning" : "error"}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <SuccessRateIndicator 
                          successful={departmentData.successfulSchedules} 
                          total={departmentData.totalSchedules} 
                        />
                        
                        {departmentData.trackers.map((tracker, idx) => (
                          <Paper 
                            key={`tracker-${idx}`}
                            elevation={0}
                            sx={{ 
                              p: 2, 
                              mb: 1.5, 
                              border: '1px solid',
                              borderColor: tracker.isSuccessful ? alpha(theme.palette.success.main, 0.3) : alpha(theme.palette.error.main, 0.3),
                              borderRadius: 1,
                              backgroundColor: tracker.isSuccessful ? 
                                alpha(theme.palette.success.main, 0.05) : alpha(theme.palette.error.main, 0.05)
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="subtitle1" fontWeight="medium">
                                {tracker.courseCode}: {tracker.className}
                              </Typography>
                              <Chip 
                                icon={tracker.isSuccessful ? <CheckCircleIcon /> : <CancelIcon />}
                                label={tracker.isSuccessful ? "Scheduled" : "Failed"}
                                color={tracker.isSuccessful ? "success" : "error"}
                                size="small"
                              />
                            </Box>
                            
                            <Divider sx={{ mb: 2 }} />
                            
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined" sx={{ height: '100%' }}>
                                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                      <ClassIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                                      <Typography variant="body2" fontWeight="medium">Course Information</Typography>
                                    </Box>
                                    <Grid container spacing={1}>
                                      <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Program</Typography>
                                        <Typography variant="body2" fontWeight="medium">{tracker.programName || "N/A"}</Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Class</Typography>
                                        <Typography variant="body2">{tracker.className}</Typography>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                </Card>
                              </Grid>
                              
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined" sx={{ height: '100%' }}>
                                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                      <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                                      <Typography variant="body2" fontWeight="medium">Schedule Status</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      <StatusIndicator isFound={tracker.lecturerFound} label="Lecturer" />
                                      <StatusIndicator isFound={tracker.roomFound} label="Room" />
                                      <StatusIndicator isFound={tracker.scheduleFound} label="Timeslot" />
                                    </Box>
                                    
                                    {!tracker.isSuccessful && tracker.failureReason && (
                                      <Typography variant="caption" color="error.main" sx={{ mt: 1, display: 'block' }}>
                                        {tracker.failureReason}
                                      </Typography>
                                    )}
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                          </Paper>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      )}

      {/* Detailed List View - Original design with some enhancements */}
      {selectedView === 1 && (
        <Box>
          {scheduleTrackers.length === 0 ? (
            <Alert severity="info">No scheduling data available.</Alert>
          ) : (
            scheduleTrackers.map((tracker, index) => (
              <Accordion key={index} sx={{ mb: 2, boxShadow: 2, borderRadius: 1, overflow: 'hidden' }}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: tracker.isSuccessful ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                    '&:hover': { backgroundColor: tracker.isSuccessful ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.error.main, 0.2) }
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">
                        {tracker.courseCode}: {tracker.className}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Chip 
                          icon={tracker.isSuccessful ? <CheckCircleIcon /> : <CancelIcon />}
                          label={tracker.isSuccessful ? "Scheduled Successfully" : "Scheduling Failed"}
                          color={tracker.isSuccessful ? "success" : "error"}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                
                <AccordionDetails sx={{ backgroundColor: alpha(theme.palette.background.default, 0.6) }}>
                  <Grid container spacing={3}>
                    {/* Faculty Section */}
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <BusinessIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" color="text.primary">Faculty Information</Typography>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Faculty ID</Typography>
                              <Typography variant="body1">{tracker.facultyId || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Faculty Name</Typography>
                              <Typography variant="body1">{tracker.facultyName || "N/A"}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {/* Department & Program Section */}
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" color="text.primary">Department & Program</Typography>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Department ID</Typography>
                              <Typography variant="body1">{tracker.departmentId}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Department Name</Typography>
                              <Typography variant="body1">{tracker.departmentName}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Program ID</Typography>
                              <Typography variant="body1">{tracker.programId}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Program Name</Typography>
                              <Typography variant="body1">{tracker.programName}</Typography>
                            </Grid>
                          </Grid>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                            <StatusIndicator isFound={tracker.departmentFound} label="Department Found" />
                            <StatusIndicator isFound={tracker.programFound} label="Program Found" />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  
                    {/* Class & Course Section */}
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ClassIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" color="text.primary">Class & Course</Typography>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Class ID</Typography>
                              <Typography variant="body1">{tracker.classId}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Class Name</Typography>
                              <Typography variant="body1">{tracker.className}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Course ID</Typography>
                              <Typography variant="body1">{tracker.courseId}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="text.secondary">Course Code</Typography>
                              <Typography variant="body1">{tracker.courseCode}</Typography>
                            </Grid>
                          </Grid>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                            <StatusIndicator isFound={tracker.classFound} label="Class Found" />
                            <StatusIndicator isFound={tracker.courseFound} label="Course Found" />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {/* Period & Schedule Section */}
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" color="text.primary">Period & Schedule</Typography>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Typography variant="subtitle2" color="text.secondary">Period ID</Typography>
                              <Typography variant="body1">{tracker.periodId}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="subtitle2" color="text.secondary">Day ID</Typography>
                              <Typography variant="body1">{tracker.dayId >= 0 ? tracker.dayId : "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="subtitle2" color="text.secondary">Timeslot ID</Typography>
                              <Typography variant="body1">{tracker.timeslotId >= 0 ? tracker.timeslotId : "N/A"}</Typography>
                            </Grid>
                          </Grid>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                            <StatusIndicator isFound={tracker.periodFound} label="Period Found" />
                            <StatusIndicator isFound={tracker.scheduleFound} label="Schedule Found" />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {/* Resources & Result Section */}
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <InfoIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="h6" color="text.primary">Resources & Results</Typography>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ mr: 1, color: tracker.lecturerFound ? theme.palette.success.main : theme.palette.error.main }} />
                                <Typography variant="body1">
                                  {tracker.lecturerFound ? "Lecturer Available" : "No Lecturer Available"}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <RoomIcon sx={{ mr: 1, color: tracker.roomFound ? theme.palette.success.main : theme.palette.error.main }} />
                                <Typography variant="body1">
                                  {tracker.roomFound ? "Room Available" : "No Room Available"}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" color="text.secondary">Attempt Number</Typography>
                              <Typography variant="body1">{tracker.attemptNumber}</Typography>
                            </Grid>
                            {!tracker.isSuccessful && tracker.failureReason && (
                              <Grid item xs={12}>
                                <Typography variant="subtitle2" color="error">Failure Reason</Typography>
                                <Typography variant="body2" color="error.dark">{tracker.failureReason}</Typography>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default ScheduleTrackerTable;