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

const ScheduleTrackerTable = () => {
  const [scheduleTrackers, setScheduleTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScheduleTrackers = async () => {
      try {
        setLoading(true);
        const data = await getScheduleTracker();
        setScheduleTrackers(data);
      } catch (err) {
        setError('Failed to load schedule tracker data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleTrackers();
  }, []);

  // Status indicator component
  const StatusIndicator = ({ isFound, label }) => (
    <Chip
      icon={isFound ? <CheckCircleIcon /> : <CancelIcon />}
      label={label}
      color={isFound ? "success" : "error"}
      size="small"
      sx={{ m: 0.5 }}
    />
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
        Schedule Tracker Overview
      </Typography>

      {scheduleTrackers.map((tracker, index) => (
        <Accordion key={index} sx={{ mb: 2, boxShadow: 2 }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              backgroundColor: tracker.isSuccessful ? '#e8f5e9' : '#ffebee',
              '&:hover': { backgroundColor: tracker.isSuccessful ? '#c8e6c9' : '#ffcdd2' }
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
          
          <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
            <Grid container spacing={3}>
              {/* Department & Program Section */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SchoolIcon sx={{ mr: 1, color: '#0d47a1' }} />
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
                      <ClassIcon sx={{ mr: 1, color: '#0d47a1' }} />
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
                      <AccessTimeIcon sx={{ mr: 1, color: '#0d47a1' }} />
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
                        <Typography variant="body1">{tracker.dayId}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="text.secondary">Timeslot ID</Typography>
                        <Typography variant="body1">{tracker.timeslotId}</Typography>
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
                      <InfoIcon sx={{ mr: 1, color: '#0d47a1' }} />
                      <Typography variant="h6" color="text.primary">Resources & Results</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PersonIcon sx={{ mr: 1, color: tracker.lecturerFound ? 'green' : 'red' }} />
                          <Typography variant="body1">
                            {tracker.lecturerFound ? "Lecturer Available" : "No Lecturer Available"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <RoomIcon sx={{ mr: 1, color: tracker.roomFound ? 'green' : 'red' }} />
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
      ))}
    </Box>
  );
};

export default ScheduleTrackerTable;