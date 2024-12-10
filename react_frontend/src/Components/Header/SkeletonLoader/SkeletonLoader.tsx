// FILE: utils/Components/SkeletonLoader.tsx

import React from 'react';
import './SkeletonLoader.css'; // Import the CSS file for styling

const SkeletonLoader: React.FC = () => (
  <nav>
    <ul className="skeleton-loader">
      <li className="skeleton-button"></li>
      <li className="skeleton-button"></li>
      <li className="skeleton-button"></li>
      <li className="skeleton-button"></li>
      <li className="skeleton-button"></li>
    </ul>
  </nav>
);

export default SkeletonLoader;