import React from 'react';
import './ForeignLoginButton.css';

interface ForeignLoginButtonProps {
  onClick: () => void;
  imgSrc: string;
  altText: string;
}

const ForeignLoginButton: React.FC<ForeignLoginButtonProps> = ({ onClick, imgSrc, altText }) => {
  return (
    <button className="login-button" onClick={onClick}>
      <img src={imgSrc} alt={altText} />
    </button>
  );
};

export default ForeignLoginButton;