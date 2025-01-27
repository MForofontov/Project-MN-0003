import React from 'react';
import { handleGoogleLogin, handleFacebookLogin } from '../../../../services/thirdPartyLoginHandlers';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const ForeignLoginButtons: React.FC = () => {
  return (
    <div>
      <GoogleLoginButton onClick={handleGoogleLogin} />
      <FacebookLoginButton onClick={handleFacebookLogin} />
    </div>
  );
};

export default ForeignLoginButtons;