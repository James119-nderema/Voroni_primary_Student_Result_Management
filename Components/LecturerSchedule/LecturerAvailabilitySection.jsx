import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, InputAdornment,
  TableContainer, Table, TableBody, TableCell, TableRow,
  Chip, Fade, Grow
} from '@mui/material';
import { 
  Search as SearchIcon,
  Event as EventIcon,
  Book as BookIcon
} from '@mui/icons-material';

const LecturerAvailabilitySection = ({ availability, theme }) => {
  const [availabilitySearch, setAvailabilitySearch] = useState('');

  // Filter availability based on search
  const filteredAvailability = availability.filter(item => 
    item.courseName.toLowerCase().includes(availabilitySearch.toLowerCase()) ||
    item.dayName.toLowerCase().includes(availabilitySearch.toLowerCase()) ||
    item.startTime.toLowerCase().includes(availabilitySearch.toLowerCase()) ||
    item.endTime.toLowerCase().includes(availabilitySearch.toLowerCase())
  );

  // Group availability by course name
  const groupedAvailability = filteredAvailability.reduce((acc, item) => {
    if (!acc[item.courseName]) {
      acc[item.courseName] = [];
    }
    acc[item.courseName].push(item);
    return acc;
  }, {});

  return (
    <Box sx={{ height: '100%', p: { xs: 0, sm: 3 }, pb: 4 }}>
      <Box sx={{ px: { xs: 2, sm: 0 }, pt: { xs: 2, sm: 0 }, pb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search availability..."
          value={availabilitySearch}
          onChange={(e) => setAvailabilitySearch(e.target.value)}
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
          {Object.keys(groupedAvailability).length > 0 ? (
            <Box>
              <Typography variant="body2" sx={{ color: theme.textSecondary, mb: 1 }}>
                Availability grouped by {Object.keys(groupedAvailability).length} {Object.keys(groupedAvailability).length === 1 ? 'course' : 'courses'}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 3
              }}>
                {Object.entries(groupedAvailability).map(([courseName, courseAvailability]) => (
                  <Grow key={courseName} in={true} timeout={500} style={{ transformOrigin: '0 0 0' }}>
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
                          <BookIcon sx={{ color: theme.primary, mr: 1, fontSize: 18 }} />
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 600, 
                              color: theme.text
                            }}
                          >
                            {courseName}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={`${courseAvailability.length} slots`}
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
                            {courseAvailability.map((item, idx) => (
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
                                    borderBottom: idx === courseAvailability.length - 1 ? 'none' : `1px solid ${theme.border}`
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EventIcon 
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
                                      {`${item.dayName}: ${item.startTime} - ${item.endTime}`}
                                    </Typography>
                                    {item.location && (
                                      <Chip
                                        size="small"
                                        label={item.location}
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
                <BookIcon sx={{ fontSize: 40, mb: 2, opacity: 0.6 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>No availability found</Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 280 }}>
                  {availabilitySearch ? 'Try a different search term' : 'No availability data available for this lecturer'}
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LecturerAvailabilitySection;
