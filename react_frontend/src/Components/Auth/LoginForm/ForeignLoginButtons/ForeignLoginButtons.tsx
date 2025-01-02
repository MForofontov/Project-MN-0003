import React from 'react';
import { handleGoogleLogin, handleFacebookLogin } from '../../../../services/thirdPartyLoginHandlers';
import ForeignLoginButton from './ForeignLoginButton/ForeignLoginButton';
import googleLogo from '../../../../assets/google-logo.png'; // Adjust the path as needed
import facebookLogo from '../../../../assets/facebook-logo.png'; // Adjust the path as needed

const ForeignLoginButtons: React.FC = () => {
  return (
    <div>
      <ForeignLoginButton onClick={handleGoogleLogin} imgSrc={googleLogo} altText="Login with Google" />
      <ForeignLoginButton onClick={handleFacebookLogin} imgSrc={facebookLogo} altText="Login with Facebook" />
    </div>
  );
};

export default ForeignLoginButtons;