// src/components/Header/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Contexts/AuthContext';
import SidebarToggleButton from './SideBarToggleButton/SideBarToggleButton';
import Logo from './Logo/Logo';
import Nav from './Nav/Nav';
import SkeletonLoader from './SkeletonLoader/SkeletonLoader';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, logout } = useAuth();

    const handleLogout = async () => {
      // Add your logout logic here
      await logout();
      navigate('/authentication/');
    };
  
    const handleNavigation = (path: string) => {
      navigate(path);
    };
  
    return (
      <header className="header">
      {isAuthenticated ? (
        <div className="header-left">
        <SidebarToggleButton toggleSidebar={toggleSidebar} />
        <Logo /> {/* Render the Logo component */}
        </div>
      ) : (
        <Logo />
      )}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
        <Nav isAuthenticated={isAuthenticated} handleNavigation={handleNavigation} handleLogout={handleLogout} />
        )}
      </header>
    );
  };
  
  export default Header;