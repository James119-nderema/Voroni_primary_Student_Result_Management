import React, { createContext, useContext } from 'react';

// Define the default theme
const defaultTheme = {
  primary: '#1976d2',
  background: '#f8f9fa',
  paper: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  cardHighlight: '#f5f9ff',
  tableHeader: '#e3f2fd',
  tableRowOdd: '#fafafa',
  border: '#e0e0e0'
};

// Create context
const ThemeContext = createContext(defaultTheme);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
