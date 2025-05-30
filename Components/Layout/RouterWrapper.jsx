import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

function RouterWrapper({ children }) {
  return (
    <Router>
      {children}
    </Router>
  );
}

export default RouterWrapper;
