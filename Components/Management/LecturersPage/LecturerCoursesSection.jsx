import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, InputAdornment, TableContainer,
  Table, TableBody, TableCell, TableRow
} from '@mui/material';
import { 
  School as SchoolIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const LecturerCoursesSection = ({ courses, theme }) => {
  const [courseSearch, setCourseSearch] = useState('');
  
  // Filter courses based on search
  const filteredCourses = courses.filter(course => 
    course.courseName.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        height: '100%', 
        borderRadius: 2,
        backgroundColor: theme.paper,
        border: `1px solid ${theme.border}`,
        overflow: 'hidden'
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          backgroundColor: theme.cardHighlight,
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <SchoolIcon sx={{ color: theme.primary, mr: 1, fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.text }}>
          Selected Courses
        </Typography>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search courses..."
          value={courseSearch}
          onChange={(e) => setCourseSearch(e.target.value)}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: theme.cardHighlight,
              '& fieldset': {
                borderColor: theme.border
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.textSecondary }} />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ maxHeight: '500px', overflow: 'auto', pr: 1 }}>
          {filteredCourses.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {filteredCourses.map((course, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:nth-of-type(odd)': { backgroundColor: theme.tableRowOdd },
                        '&:hover': { backgroundColor: 'rgba(25,118,210,0.04)' }
                      }}
                    >
                      <TableCell 
                        sx={{ 
                          borderBottom: `1px solid ${theme.border}`,
                          py: 1.5
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ fontWeight: 'medium', color: theme.text }}
                        >
                          {course.courseName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.textSecondary }}>
                          Course ID: {course.courseId || 'N/A'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box 
              sx={{ 
                py: 6, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                color: theme.textSecondary
              }}
            >
              <SchoolIcon sx={{ fontSize: 40, mb: 2, opacity: 0.6 }} />
              <Typography>No courses found</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default LecturerCoursesSection;
