// Import React
import React from 'react';

// Import CSS for styling
import './NotFound.css';

// Define the NotFound component
const NotFound: React.FC = () => (
  <div className="not-found-container">
    <h1 className="not-found-title">404 - Not Found</h1>
    <p className="not-found-message">The page you are looking for does not exist.</p>
  </div>
);

// Export the NotFound component as the default export
export default NotFound;