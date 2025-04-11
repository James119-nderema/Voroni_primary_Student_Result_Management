import React, { useState, useEffect } from 'react';
import { getScheduleTracker } from '../../Services/scheduletrackerservice';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto', mt: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#e3f2fd' }}>
            <TableRow>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Course ID</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Course Code</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Class ID</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Class Name</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Period ID</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Department ID</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Lecturer Found</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Room Found</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Schedule Found</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" sx={{ color: '#0d47a1' }}>Successful</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleTrackers.map((tracker, index) => (
              <TableRow
                key={index}
                sx={{
                  bgcolor: index % 2 === 0 ? '#f1f8e9' : '#ffffff',
                  '&:hover': { bgcolor: '#c8e6c9' },
                }}
              >
                <TableCell>{tracker.courseId}</TableCell>
                <TableCell>{tracker.courseCode}</TableCell>
                <TableCell>{tracker.classId}</TableCell>
                <TableCell>{tracker.className}</TableCell>
                <TableCell>{tracker.periodId}</TableCell>
                <TableCell>{tracker.departmentId}</TableCell>
                <TableCell>
                  {tracker.lecturerFound ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  {tracker.roomFound ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  {tracker.scheduleFound ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  {tracker.isSuccessful ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScheduleTrackerTable;