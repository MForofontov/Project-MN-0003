import React from 'react';
import FormGroup from '../FormGroup/FormGroup';
import ToggleText from '../ToggleText/ToggleText';
import './RegisterForm.css';

interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleRegisterUser: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ email, setEmail, password, setPassword, handleRegisterUser, toggleForm }) => (
  <div className="register-form">
    <h2>Register</h2>
    <form onSubmit={handleRegisterUser}>
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
    <ToggleText toggleForm={toggleForm} text="Already have an account? Login" />
  </div>
);

export default RegisterForm;