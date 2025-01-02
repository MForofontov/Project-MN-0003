import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormGroup from '../FormGroup/FormGroup';
import ToggleText from '../ToggleText/ToggleText';
import {handleRegisterUser } from '../../../services/authHandlers';
import './RegisterForm.css';

interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  toggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ email, setEmail, password, setPassword, toggleForm }) => {
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent) => {
    handleRegisterUser(event, email, password, navigate);
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <FormGroup
          label="Email:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
        />
        <FormGroup
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />
        <button type="submit" className="auth-button">Register</button>
      </form>
      <ToggleText toggleForm={toggleForm} text="Don't have an account? Register" />
    </div>
  );
};

export default RegisterForm;