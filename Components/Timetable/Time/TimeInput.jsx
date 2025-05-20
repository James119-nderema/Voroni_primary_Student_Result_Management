// components/TimeInput.js
import React from 'react';

const TimeInput = ({ name, value, onChange, placeholder, required = false }) => {
  const handleChange = (e) => {
    let newValue = e.target.value;
    
    // Remove non-numeric and non-colon characters
    newValue = newValue.replace(/[^0-9:]/g, '');
    
    // If there's a colon already and the user is trying to add another one, ignore it
    if (newValue.split(':').length > 2) {
      newValue = newValue.slice(0, newValue.lastIndexOf(':'));
    }
    
    // Auto-format when user types 4 digits without a colon (e.g., 0800 -> 08:00)
    if (newValue.length === 4 && !newValue.includes(':')) {
      newValue = `${newValue.slice(0, 2)}:${newValue.slice(2)}`;
    }
    
    // Auto-add colon after 2 digits if the user hasn't added one
    if (newValue.length === 2 && !newValue.includes(':')) {
      newValue = `${newValue}:`;
    }
    
    // Limit to 5 characters (XX:XX)
    if (newValue.length > 5) {
      newValue = newValue.slice(0, 5);
    }
    
    // Create a synthetic event to pass to the parent's onChange handler
    const syntheticEvent = {
      target: {
        name: e.target.name,
        value: newValue
      }
    };
    
    onChange(syntheticEvent);
  };
  
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      placeholder={placeholder || "HH:MM (e.g., 8:00)"}
      required={required}
      maxLength={5}
    />
  );
};

export default TimeInput;