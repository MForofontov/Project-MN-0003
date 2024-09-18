// src/components/Header/NavItem.tsx
import React from 'react';
import './NavItem.css';

interface NavItemProps {
  path: string;
  label: string;
  onClick: (path: string) => void;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ path, label, onClick, className }) => (
  <li>
    <button className={className} onClick={() => onClick(path)}>{label}</button>
  </li>
);

export default NavItem;