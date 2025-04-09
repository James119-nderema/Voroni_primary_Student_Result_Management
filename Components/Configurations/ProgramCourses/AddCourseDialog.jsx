import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const AddCourseDialog = ({ isOpen, onClose, courses, selectedCourse, setSelectedCourse, handleAddCourse }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid #e0e0e0', py: 1.5 }}>Add Course to Program</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Select Course</InputLabel>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            label="Select Course"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.courseId} value={course.courseId}>
                {course.courseCode} - {course.courseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleAddCourse} color="primary" variant="contained" disabled={!selectedCourse}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCourseDialog;
