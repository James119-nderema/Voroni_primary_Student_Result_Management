import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded">
    {message}
  </div>
);

export default ErrorMessage;
