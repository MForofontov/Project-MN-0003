// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
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
    const { isAuthenticated, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true); // State to manage loading status

    useEffect(() => {
      // Simulate an async authentication check
      const checkAuth = async () => {
        // Simulate a delay for the authentication check
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false); // Set loading to false after the check
      };

      checkAuth();
    }, []);
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
        {isAuthenticated && <SidebarToggleButton toggleSidebar={toggleSidebar} />}
        <Logo />
        {isLoading ? (
          <SkeletonLoader />
        ) : (
        <Nav isAuthenticated={isAuthenticated} handleNavigation={handleNavigation} handleLogout={handleLogout} />
        )}
      </header>
    );
  };
  
  export default Header;