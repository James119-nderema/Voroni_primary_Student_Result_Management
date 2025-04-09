import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, InputAdornment, TableContainer,
  Table, TableBody, TableCell, TableRow, Chip, Fade
} from '@mui/material';
import { 
  School as SchoolIcon,
  Search as SearchIcon,
  Book as BookIcon
} from '@mui/icons-material';

const LecturerCoursesSection = ({ courses, theme }) => {
  const [courseSearch, setCourseSearch] = useState('');
  
  // Filter courses based on search
  const filteredCourses = courses.filter(course => 
    course.courseName.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', p: { xs: 0, sm: 3 }, pb: 4 }}>
      <Box sx={{ px: { xs: 2, sm: 0 }, pt: { xs: 2, sm: 0 }, pb: 2 }}>
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
              },
              '&:hover fieldset': {
                borderColor: theme.primary,
                borderWidth: '1px'
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.primary
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
            <Box>
              <Typography variant="body2" sx={{ color: theme.textSecondary, mb: 1 }}>
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} assigned
              </Typography>
              
              <TableContainer sx={{ 
                borderRadius: 2, 
                border: `1px solid ${theme.border}`,
                overflow: 'hidden'
              }}>
                <Table size="small">
                  <TableBody>
                    {filteredCourses.map((course, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          '&:nth-of-type(odd)': { backgroundColor: theme.tableRowOdd },
                          '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.05)' },
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <TableCell 
                          sx={{ 
                            borderBottom: index === filteredCourses.length - 1 ? 'none' : `1px solid ${theme.border}`,
                            py: 1.75,
                            px: 2
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BookIcon sx={{ 
                              color: theme.secondary,
                              mr: 1.5,
                              fontSize: 18,
                              opacity: 0.9
                            }} />
                            <Box>
                              <Typography 
                                variant="body2" 
                                sx={{ fontWeight: 500, color: theme.text }}
                              >
                                {course.courseName}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <Typography variant="caption" sx={{ color: theme.textSecondary }}>
                                  ID: {course.courseId || 'N/A'}
                                </Typography>
                                {course.department && (
                                  <Chip 
                                    label={course.department} 
                                    size="small"
                                    sx={{ 
                                      height: 20,
                                      fontSize: '0.65rem',
                                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                      color: theme.primary
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Fade in={true} timeout={600}>
              <Box 
                sx={{ 
                  py: 8, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  color: theme.textSecondary,
                  backgroundColor: theme.cardHighlight,
                  borderRadius: 2,
                  border: `1px solid ${theme.border}`
                }}
              >
                <SchoolIcon sx={{ fontSize: 40, mb: 2, opacity: 0.6 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>No courses found</Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 250 }}>
                  {courseSearch ? 'Try a different search term' : 'This lecturer has no assigned courses'}
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LecturerCoursesSection;
