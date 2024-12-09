// src/components/CustomSpinner/CustomSpinner.tsx
import React from 'react';
import './CustomSpinner.css'; // Import custom CSS for the spinner

const CustomSpinner: React.FC = () => {
  return (
    <div className="custom-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default CustomSpinner;