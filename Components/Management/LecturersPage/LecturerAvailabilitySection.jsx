import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, InputAdornment,
  TableContainer, Table, TableBody, TableCell, TableHead, TableRow 
} from '@mui/material';
import { 
  AccessTime as TimeIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const LecturerAvailabilitySection = ({ availability, theme }) => {
  const [availabilitySearch, setAvailabilitySearch] = useState('');
  
  // Filter availability based on search
  const filteredAvailability = availability.filter(item => 
    item.courseName.toLowerCase().includes(availabilitySearch.toLowerCase()) ||
    item.dayName.toLowerCase().includes(availabilitySearch.toLowerCase()) ||
    item.startTime.includes(availabilitySearch) ||
    item.endTime.includes(availabilitySearch)
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
        <TimeIcon sx={{ color: theme.primary, mr: 1, fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.text }}>
          Course Schedule combination
        </Typography>
      </Box>
      
      <Box sx={{ p: 2 }}>
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
        
        <TableContainer 
          sx={{ 
            maxHeight: '500px', 
            overflow: 'auto',
            borderRadius: 2,
            border: `1px solid ${theme.border}`,
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.border,
              borderRadius: '4px'
            }
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    backgroundColor: theme.tableHeader,
                    color: theme.text,
                    borderBottom: `1px solid ${theme.border}`,
                    py: 1.5,
                    fontSize: '0.85rem'
                  }}
                >
                  Course
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    backgroundColor: theme.tableHeader,
                    color: theme.text,
                    borderBottom: `1px solid ${theme.border}`,
                    py: 1.5,
                    fontSize: '0.85rem'
                  }}
                >
                  Day
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    backgroundColor: theme.tableHeader,
                    color: theme.text,
                    borderBottom: `1px solid ${theme.border}`,
                    py: 1.5,
                    fontSize: '0.85rem'
                  }}
                >
                  Timeslot
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAvailability.length > 0 ? (
                filteredAvailability.map((item, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ 
                      '&:nth-of-type(odd)': { 
                        backgroundColor: theme.tableRowOdd 
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(25,118,210,0.04)'
                      }
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        color: theme.text,
                        fontWeight: 'medium', 
                        borderBottom: `1px solid ${theme.border}`,
                        py: 1,
                        fontSize: '0.8rem'
                      }}
                    >
                      {item.courseName}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: theme.text,
                        borderBottom: `1px solid ${theme.border}`,
                        py: 1,
                        fontSize: '0.8rem'
                      }}
                    >
                      {item.dayName}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: theme.text,
                        borderBottom: `1px solid ${theme.border}`,
                        py: 1,
                        fontSize: '0.8rem'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimeIcon 
                          sx={{ 
                            color: theme.primary, 
                            mr: 1, 
                            fontSize: 14 
                          }} 
                        />
                        {`${item.startTime} - ${item.endTime}`}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={3} 
                    align="center" 
                    sx={{ 
                      py: 4, 
                      color: theme.textSecondary,
                      borderBottom: `1px solid ${theme.border}`
                    }}
                  >
                    No availability data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default LecturerAvailabilitySection;
