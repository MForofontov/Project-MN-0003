import React from 'react';
import SidebarList from './SidebarList/SidebarList';
import './SideBar.css'; // Import the CSS file

interface SideBarProps {
  isSidebarVisible: boolean;
  setActiveView: (view: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isSidebarVisible, setActiveView }) => (
  <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
    <h2>SideBar</h2>
    <SidebarList setActiveView={setActiveView} />
  </div>
);

export default SideBar;