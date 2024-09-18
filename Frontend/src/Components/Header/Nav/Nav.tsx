import React from 'react';
import NavItem from '../NavItem/NavItem';
import './Nav.css';

interface NavProps {
  isAuthenticated: boolean | null;
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
}

const Nav: React.FC<NavProps> = ({ isAuthenticated, handleNavigation, handleLogout }) => (
  <nav>
    <ul>
      <NavItem path="/" label="Home" onClick={handleNavigation} className="list-button" />
      <NavItem path="/about" label="About" onClick={handleNavigation} className="list-button" />
      <NavItem path="/services" label="Services" onClick={handleNavigation} className="list-button" />
      <NavItem path="/contact" label="Contact" onClick={handleNavigation} className="list-button" />
      {isAuthenticated ? (
        <NavItem path="/" label="Logout" onClick={handleLogout} className="logout-button" />
      ) : (
        <NavItem path="/login" label="Login" onClick={handleNavigation} className="login-button" />
      )}
    </ul>
  </nav>
);

export default Nav;