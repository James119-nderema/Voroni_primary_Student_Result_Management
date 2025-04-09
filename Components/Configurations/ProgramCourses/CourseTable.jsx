import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Chip
} from '@mui/material';
import { Delete, School } from '@mui/icons-material';

const CourseTable = ({ loading, filteredProgramCourses, confirmDeleteCourse }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={30} thickness={4} sx={{ color: '#555' }} />
      </Box>
    );
  }

  if (filteredProgramCourses.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#fafafa', border: '1px solid #eee', mt: 2 }}>
        <School sx={{ color: '#bdbdbd', fontSize: 40, mb: 1 }} />
        <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 500 }}>
          No courses found for the selected program and period.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Use the course selection above to add courses to this program.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #eee', borderRadius: 0, boxShadow: 'none', mt: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f8f8f8' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, py: 2, fontSize: '0.875rem', color: '#555' }}>Course Code</TableCell>
            <TableCell sx={{ fontWeight: 600, py: 2, fontSize: '0.875rem', color: '#555' }}>Course Name</TableCell>
            <TableCell sx={{ fontWeight: 600, py: 2, fontSize: '0.875rem', color: '#555' }}>Credits</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, py: 2, fontSize: '0.875rem', color: '#555', width: '80px' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProgramCourses.map((course, index) => (
            <TableRow 
              key={course.programCourseId || `${course.courseCode}-${course.courseName}-${index}`}
              sx={{ '&:hover': { backgroundColor: '#fafafa' } }}
            >
              <TableCell sx={{ py: 2, borderBottom: '1px solid #eee' }}>
                <Chip 
                  label={course.courseCode} 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(0, 0, 0, 0.05)', 
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: '#555'
                  }} 
                />
              </TableCell>
              <TableCell sx={{ py: 2, borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                {course.courseName}
              </TableCell>
              <TableCell sx={{ py: 2, borderBottom: '1px solid #eee' }}>
                <Chip
                  label={`${course.courseCredit} credits`}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.08)', 
                    fontSize: '0.75rem',
                    color: '#1976d2'
                  }}
                />
              </TableCell>
              <TableCell align="right" sx={{ py: 2, borderBottom: '1px solid #eee' }}>
                <IconButton 
                  color="error" 
                  onClick={() => confirmDeleteCourse(course.programCourseId)}
                  size="small"
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'rgba(211, 47, 47, 0.08)'
                    }
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseTable;
