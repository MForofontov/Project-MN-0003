// FILE: utils/Components/SkeletonLoader.tsx

import React from 'react';
import './SkeletonLoader.css'; // Import the CSS file for styling

const SkeletonLoader: React.FC = () => (
  <div className="skeleton-loader">
    <div className="skeleton-button"></div>
    <div className="skeleton-button"></div>
  </div>
);

export default SkeletonLoader;