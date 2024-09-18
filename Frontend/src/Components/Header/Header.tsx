// src/components/Header/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import SidebarToggleButton from './SideBarToggleButton/SideBarToggleButton';
import Logo from './Logo/Logo';
import Nav from './Nav/Nav';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
  
    const handleLogout = async () => {
      // Add your logout logic here
      await logout();
      navigate('/login/');
    };
  
    const handleNavigation = (path: string) => {
      navigate(path);
    };
  
    return (
      <header className="header">
        {isAuthenticated && <SidebarToggleButton toggleSidebar={toggleSidebar} />}
        <Logo />
        <Nav isAuthenticated={isAuthenticated} handleNavigation={handleNavigation} handleLogout={handleLogout} />
      </header>
    );
  };
  
  export default Header;