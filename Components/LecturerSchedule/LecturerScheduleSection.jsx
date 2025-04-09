import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, InputAdornment,
  TableContainer, Table, TableBody, TableCell, TableRow,
  Chip, Fade, Grow
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon,
  Search as SearchIcon,
  AccessTime as TimeIcon,
  Event as EventIcon
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

  // Get days of the week in correct order
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const orderedDays = Object.keys(groupedSchedules).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  return (
    <Box sx={{ height: '100%', p: { xs: 0, sm: 3 }, pb: 4 }}>
      <Box sx={{ px: { xs: 2, sm: 0 }, pt: { xs: 2, sm: 0 }, pb: 2 }}>
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
          {orderedDays.length > 0 ? (
            <Box>
              <Typography variant="body2" sx={{ color: theme.textSecondary, mb: 1 }}>
                Schedule across {orderedDays.length} {orderedDays.length === 1 ? 'day' : 'days'}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 3
              }}>
                {orderedDays.map((dayName) => (
                  <Grow key={dayName} in={true} timeout={500} style={{ transformOrigin: '0 0 0' }}>
                    <Box 
                      sx={{ 
                        borderRadius: 2,
                        border: `1px solid ${theme.border}`,
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        sx={{ 
                          py: 1.5,
                          px: 2,
                          backgroundColor: theme.cardHighlight,
                          borderBottom: `1px solid ${theme.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventIcon sx={{ color: theme.primary, mr: 1, fontSize: 18 }} />
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 600, 
                              color: theme.text
                            }}
                          >
                            {dayName}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={`${groupedSchedules[dayName].length} sessions`}
                          sx={{
                            height: 22,
                            fontSize: '0.7rem',
                            backgroundColor: 'rgba(37, 99, 235, 0.08)',
                            color: theme.primary
                          }}
                        />
                      </Box>
                      
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            {groupedSchedules[dayName].map((schedule, idx) => (
                              <TableRow 
                                key={idx}
                                sx={{ 
                                  '&:nth-of-type(odd)': { backgroundColor: theme.tableRowOdd },
                                  '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.03)' },
                                  transition: 'background-color 0.2s'
                                }}
                              >
                                <TableCell 
                                  sx={{ 
                                    py: 1.5,
                                    px: 2,
                                    borderBottom: idx === groupedSchedules[dayName].length - 1 ? 'none' : `1px solid ${theme.border}`
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TimeIcon 
                                      sx={{ 
                                        color: theme.secondary, 
                                        mr: 1.5, 
                                        fontSize: 16 
                                      }} 
                                    />
                                    <Typography variant="body2" sx={{ 
                                      color: theme.text,
                                      fontWeight: 500
                                    }}>
                                      {`${schedule.startTime} - ${schedule.endTime}`}
                                    </Typography>
                                    {schedule.location && (
                                      <Chip
                                        size="small"
                                        label={schedule.location}
                                        sx={{
                                          ml: 1.5,
                                          height: 20,
                                          fontSize: '0.65rem',
                                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                          color: theme.success
                                        }}
                                      />
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Grow>
                ))}
              </Box>
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
                <CalendarIcon sx={{ fontSize: 40, mb: 2, opacity: 0.6 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>No schedules available</Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 280 }}>
                  {scheduleSearch ? 'Try a different search term' : 'Use the "Regenerate Schedule" button to create a schedule'}
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LecturerScheduleSection;
