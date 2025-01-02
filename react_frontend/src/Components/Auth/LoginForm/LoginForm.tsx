import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormGroup from '../FormGroup/FormGroup';
import ToggleText from '../ToggleText/ToggleText';
import ForeignLoginButtons from './ForeignLoginButtons/ForeignLoginButtons';
import { handleLoginUser } from '../../../services/authHandlers';
import './LoginForm.css';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, setEmail, password, setPassword, toggleForm}) => {

  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent) => {
    handleLoginUser(event, email, password, navigate);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
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
      <ForeignLoginButtons />
      <ToggleText toggleForm={toggleForm} text="Don't have an account? Register" />
    </div>
  );
};

export default LoginForm;