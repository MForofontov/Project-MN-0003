// src/components/Profile/SidebarList.tsx
import React from 'react';
import SideBarButton from '../SideBarButton/SideBarButton';
import './SidebarList.css'; // Import the CSS file

interface SidebarListProps {
  setActiveView: (view: string) => void;
}

const SidebarList: React.FC<SidebarListProps> = ({ setActiveView }) => (
  <ul className='sidebar-list'>
    <SideBarButton label="Upload File" onClick={() => setActiveView('Upload File')} />
    <SideBarButton label="View Files" onClick={() => setActiveView('View Files')} />
    <SideBarButton label="Music Analysis Results" onClick={() => setActiveView('Analysis')} />
  </ul>
);

export default SidebarList;