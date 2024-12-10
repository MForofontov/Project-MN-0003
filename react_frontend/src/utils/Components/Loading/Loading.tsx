// FILE: utils/Components/Loading.tsx

import React from 'react';
import './Loading.css'; // Import the CSS file for styling

const Loading: React.FC = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

export default Loading;
