// Import React
import React from 'react';

// Import CSS for styling
import './Loading.css';

// Define the Loading component
const Loading: React.FC = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// Export the Loading component as the default export
export default Loading;