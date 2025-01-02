import React from 'react';
import FormGroup from '../FormGroup/FormGroup';
import ToggleText from '../ToggleText/ToggleText';
import './LoginForm.css';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLoginUser: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, setEmail, password, setPassword, handleLoginUser, toggleForm }) => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/google/login/';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:8000/api/facebook/login/';
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLoginUser}>
        <FormGroup
          label="Email:"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="username"
          name="username"
        />
        <FormGroup
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <button onClick={handleGoogleLogin} className="auth-button google-button">
        Login with Google
      </button>
      <button onClick={handleFacebookLogin} className="auth-button facebook-button">
        Login with Facebook
      </button>
      <ToggleText toggleForm={toggleForm} text="Don't have an account? Register" />
    </div>
  );
};

export default LoginForm;