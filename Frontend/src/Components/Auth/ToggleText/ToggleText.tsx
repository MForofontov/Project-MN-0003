import React from 'react';
import './ToggleText.css';

interface ToggleTextProps {
  toggleForm: () => void;
  text: string;
}

const ToggleText: React.FC<ToggleTextProps> = ({ toggleForm, text }) => (
  <p className="toggle-text">
    {text} <span onClick={toggleForm}>Click here</span>
  </p>
);

export default ToggleText;