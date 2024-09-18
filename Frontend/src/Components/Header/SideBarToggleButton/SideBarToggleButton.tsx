import React from 'react';
import './SideBarToggleButton.css';

interface SidebarToggleButtonProps {
  toggleSidebar: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ toggleSidebar }) => (
  <button onClick={toggleSidebar} className="sidebar-toggle-button">☰</button>
);

export default SidebarToggleButton;