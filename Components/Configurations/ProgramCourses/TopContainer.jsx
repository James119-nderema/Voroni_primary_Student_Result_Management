import React from 'react';
import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Paper, 
  Typography, 
  Box,
  InputAdornment,
  Divider,
  Chip
} from '@mui/material';
import { Search, School, CalendarMonth } from '@mui/icons-material';

const TopContainer = ({
  programSearch,
  setProgramSearch,
  selectedProgram,
  handleProgramChange,
  filteredPrograms,
  selectedPeriod,
  handlePeriodChange,
  periods,
}) => {
  // Filter programs based on the search input
  const displayedPrograms = filteredPrograms.filter((program) =>
    program.programName.toLowerCase().includes(programSearch.toLowerCase()) ||
    program.programCode.toLowerCase().includes(programSearch.toLowerCase())
  );

  return (
    <Paper 
      sx={{ 
        p: 3, 
        mb: 4, 
        border: '1px solid #e0e0e0',
        borderRadius: 0,
        background: '#ffffff',
        boxShadow: 'none'
      }}
    >
      <Typography 
        variant="h6" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          color: '#333',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.1rem'
        }}
      >
        <School sx={{ mr: 1, color: '#555' }} /> Program Selection
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#555' }}>
            Search & Select Program
          </Typography>
          <TextField
            fullWidth
            placeholder="Search programs by name or code"
            variant="outlined"
            size="medium"
            value={programSearch}
            onChange={(e) => setProgramSearch(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 0,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth>
            <Select
              value={selectedProgram}
              onChange={handleProgramChange}
              displayEmpty
              sx={{
                borderRadius: 0,
                '& .MuiSelect-select': {
                  padding: '12px 14px',
                }
              }}
            >
              <MenuItem value="">
                <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.9rem' }}>
                  Select a program
                </Typography>
              </MenuItem>
              {displayedPrograms.map((program) => (
                <MenuItem 
                  key={program.programId} 
                  value={program.programId}
                  sx={{ 
                    '&.Mui-selected': { 
                      backgroundColor: 'rgba(25, 118, 210, 0.08)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {program.programName}
                    </Typography>
                    <Chip 
                      label={program.programCode} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.08)', 
                        fontSize: '0.75rem',
                        height: '20px'
                      }}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#555' }}>
            Select Period
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              displayEmpty
              disabled={!selectedProgram}
              sx={{
                borderRadius: 0,
                '& .MuiSelect-select': {
                  padding: '12px 14px',
                }
              }}
            >
              <MenuItem value="">
                <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.9rem' }}>
                  Select a period
                </Typography>
              </MenuItem>
              {periods.map((period) => (
                <MenuItem 
                  key={period.periodId} 
                  value={period.periodId}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarMonth fontSize="small" sx={{ mr: 1, color: '#666' }} />
                    <Typography variant="body2">{period.periodName}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      {selectedProgram && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mr: 1, color: '#555' }}>
              Selected:
            </Typography>
            <Chip 
              icon={<School sx={{ fontSize: '16px !important' }} />}
              label={filteredPrograms.find(p => p.programId === selectedProgram)?.programName || ''}
              size="small"
              sx={{ mr: 1, bgcolor: 'rgba(25, 118, 210, 0.08)' }}
            />
            {selectedPeriod && (
              <Chip 
                icon={<CalendarMonth sx={{ fontSize: '16px !important' }} />}
                label={periods.find(p => p.periodId === selectedPeriod)?.periodName || ''}
                size="small"
                sx={{ bgcolor: 'rgba(25, 118, 210, 0.08)' }}
              />
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default TopContainer;