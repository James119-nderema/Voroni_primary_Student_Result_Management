import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment, 
  Button, 
  Grid 
} from '@mui/material';
import { Add, Search, CheckCircle, Clear, Cancel } from '@mui/icons-material';

const AddCourseSection = ({ 
  courses, 
  onAddCourse, 
  selectedProgram,
  selectedPeriod 
}) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddCourses = () => {
    if (selectedCourses.length > 0) {
      Promise.all(selectedCourses.map(courseId => onAddCourse(courseId)));
      setSelectedCourses([]);
    }
  };

  const handleCourseSelect = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleClearSelection = () => {
    setSelectedCourses([]);
  };

  const filteredCourses = courses.filter(course => 
    course.courseCode?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!selectedProgram || !selectedPeriod) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="contained"
        color={isExpanded ? "error" : "primary"}
        onClick={() => setIsExpanded(!isExpanded)}
        startIcon={isExpanded ? <Cancel /> : <Add />}
        sx={{ mb: 2, textTransform: 'none', borderRadius: 2, fontSize: '0.875rem' }}
      >
        {isExpanded ? "Cancel" : "Add Courses to Program"}
      </Button>

      {isExpanded && (
        <Paper sx={{ 
          border: '1px solid #eee', 
          borderRadius: 2, 
          boxShadow: 'none', 
          mt: 2, 
          p: 2 
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', fontSize: '0.95rem', mb: 2 }}>
            Add Courses to Program
          </Typography>

          <TextField
            fullWidth
            placeholder="Search courses by name or code"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />

          <Box 
            sx={{ 
              border: '1px solid #eee', 
              borderRadius: 2, 
              maxHeight: '300px', 
              overflowY: 'auto',
              p: 1,
              width: '100%'
            }}
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <Box 
                  key={course.courseId}
                  onClick={() => handleCourseSelect(course.courseId)}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    px: 1.5,
                    cursor: 'pointer',
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor: selectedCourses.includes(course.courseId) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    border: selectedCourses.includes(course.courseId) ? '1px solid rgba(25, 118, 210, 0.2)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: selectedCourses.includes(course.courseId) ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {course.courseCode} - {course.courseName}
                  </Typography>
                  {selectedCourses.includes(course.courseId) && (
                    <CheckCircle color="primary" fontSize="small" />
                  )}
                </Box>
              ))
            ) : (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  No courses found matching your search.
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mt: 2 
          }}>
            <Box>
              {selectedCourses.length > 0 && (
                <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                  {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
                </Typography>
              )}
            </Box>
            <Box>
              {selectedCourses.length > 0 && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={handleClearSelection}
                  startIcon={<Clear fontSize="small" />}
                  sx={{ mr: 1, borderRadius: 2, fontSize: '0.75rem', textTransform: 'none' }}
                >
                  Clear
                </Button>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddCourses}
                disabled={selectedCourses.length === 0}
                startIcon={<Add />}
                size="small"
                sx={{ borderRadius: 2, fontSize: '0.75rem', textTransform: 'none' }}
              >
                Add Selected Courses
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AddCourseSection;
