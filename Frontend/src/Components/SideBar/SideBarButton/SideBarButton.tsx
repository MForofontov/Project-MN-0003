import React from 'react';
import './SideBarButton.css'; // Import the CSS file

interface SidebarButtonProps {
  label: string;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, onClick }) => (
  <li>
    <button className='sidebar-button' onClick={onClick}>{label}</button>
  </li>
);

export default SidebarButton;