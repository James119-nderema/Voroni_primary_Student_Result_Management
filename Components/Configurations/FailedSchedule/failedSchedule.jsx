import React, { useState, useEffect } from 'react';
import { fetchFailedSchedules } from '../../Services/failedScheduleService';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Alert,
  AlertTitle,
  Grid,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const FailedSchedule = () => {
  const [failedSchedules, setFailedSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFailedSchedules = async () => {
      try {
        setLoading(true);
        const data = await fetchFailedSchedules();
        const sortedData = data.sort((a, b) => a.courseId - b.courseId);
        setFailedSchedules(sortedData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getFailedSchedules();
  }, []);

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
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
        Failed Schedules
      </Typography>
      
      <Card sx={{ mb: 4, bgcolor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: 'black' }}>Information</Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'black' }}>
            These are the failed schedules during the last timetable generation process. 
            Each entry represents a class that could not be scheduled due to various constraints or conflicts.
          </Typography>
        </CardContent>
      </Card>

      {failedSchedules.length === 0 ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          No failed schedules found. All classes were successfully scheduled.
        </Alert>
      ) : (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'black' }}>
            Total Failed Scheduled: <Chip label={failedSchedules.length} color="error" size="small" />
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                <TableRow>
                  <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>#</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Course ID</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Class ID</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Period ID</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Reason</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {failedSchedules.map((schedule, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ 
                      bgcolor: index % 2 === 0 ? '#f1f8e9' : '#ffffff',
                      '&:hover': { bgcolor: '#c8e6c9' }
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{schedule.courseId}</TableCell>
                    <TableCell>{schedule.classId}</TableCell>
                    <TableCell>{schedule.periodId}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <ErrorOutlineIcon color="error" sx={{ mr: 1, mt: 0.3, fontSize: '1rem' }} />
                        <Typography>
                          {schedule.reason.split('.')[0] + '.'}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
                  Common Failure Reasons
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" sx={{ color: 'black' }}>
                  • <b>Time conflicts</b>: The class overlaps with other scheduled classes
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  • <b>Resource constraints</b>: Required resources (rooms, equipment) are unavailable
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  • <b>Faculty constraints</b>: Instructor availability issues
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  • <b>No available lecture spots</b>: All possible time slots are already occupied
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default FailedSchedule;
