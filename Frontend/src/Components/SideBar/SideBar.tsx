// src/components/Profile/Sidebar.tsx
import React from 'react';
import './SideBar.css'; // Import the CSS file

interface SideBarProps {
    isSidebarVisible: boolean;
  }
  
  const SideBar: React.FC<SideBarProps> = ({ isSidebarVisible }) => {
    return (
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <h2>SideBar</h2>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#clients">Clients</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    );
  };
  
  export default SideBar;