import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, InputAdornment,
  TableContainer, Table, TableBody, TableCell, TableRow 
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon,
  Search as SearchIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';

const LecturerScheduleSection = ({ schedules, theme }) => {
  const [scheduleSearch, setScheduleSearch] = useState('');
  
  // Filter schedules based on search
  const filteredSchedules = schedules.filter(schedule => 
    schedule.dayName.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
    schedule.startTime.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
    schedule.endTime.toLowerCase().includes(scheduleSearch.toLowerCase())
  );

  // Group schedules by day for better organization
  const groupedSchedules = filteredSchedules.reduce((acc, schedule) => {
    if (!acc[schedule.dayName]) {
      acc[schedule.dayName] = [];
    }
    acc[schedule.dayName].push(schedule);
    return acc;
  }, {});

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
        <CalendarIcon sx={{ color: theme.primary, mr: 1, fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.text }}>
          Weekly Schedule
        </Typography>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search schedules..."
          value={scheduleSearch}
          onChange={(e) => setScheduleSearch(e.target.value)}
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
          {Object.keys(groupedSchedules).length > 0 ? (
            Object.entries(groupedSchedules).map(([dayName, daySchedules]) => (
              <Box key={dayName} sx={{ mb: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1.5,
                    pb: 0.5,
                    borderBottom: `1px dashed ${theme.border}`
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: theme.primary
                    }}
                  >
                    {dayName}
                  </Typography>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {daySchedules.map((schedule, idx) => (
                        <TableRow key={idx}>
                          <TableCell 
                            sx={{ 
                              py: 1,
                              borderBottom: idx === daySchedules.length - 1 ? 'none' : `1px solid ${theme.border}`
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TimeIcon 
                                sx={{ 
                                  color: theme.primary, 
                                  mr: 1, 
                                  fontSize: 16 
                                }} 
                              />
                              <Typography variant="body2" sx={{ color: theme.text }}>
                                {`${schedule.startTime} - ${schedule.endTime}`}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
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
              <CalendarIcon sx={{ fontSize: 40, mb: 2, opacity: 0.6 }} />
              <Typography>No schedules available</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default LecturerScheduleSection;
