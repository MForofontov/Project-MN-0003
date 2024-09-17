// src/components/Profile/Sidebar.tsx
import React from 'react';
import './SideBar.css'; // Import the CSS file

interface SideBarProps {
    isSidebarVisible: boolean;
    setActiveView: (view: string) => void;
  }
  
const SideBar: React.FC<SideBarProps> = ({ isSidebarVisible, setActiveView }) => {

  return (
    <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
      <h2>SideBar</h2>
      <ul>
        <li>
          <button onClick={() => setActiveView('Upload File')}>Upload File</button>
        </li>
        <li>
          <button onClick={() => setActiveView('View Files')}>View Files</button>
        </li>
        <li>
          <button onClick={() => setActiveView('Analysis')}>Music Analysis Results</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;