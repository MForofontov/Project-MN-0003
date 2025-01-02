// Import necessary modules and components
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import local components
import FormGroup from '../FormGroup/FormGroup';
import ToggleText from '../ToggleText/ToggleText';

// Import services and utilities
import { handleRegisterUser } from '../../../services/authHandlers';
import { useAuth } from '../../../utils/Contexts/AuthContext';

// Import CSS
import './RegisterForm.css';

// Define the props for the RegisterForm component
interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  toggleForm: () => void;
}

// Define the RegisterForm component
const RegisterForm: React.FC<RegisterFormProps> = ({ email, setEmail, password, setPassword, toggleForm }) => {
  // Get the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Get the setIsAuthenticated function from useAuth hook
  const { setIsAuthenticated } = useAuth();

  // Define the onSubmit handler for the form
  const onSubmit = (event: React.FormEvent) => {
    // Call handleRegisterUser with necessary arguments
    handleRegisterUser(event, email, password, navigate, setIsAuthenticated);
  };

  // Render the register form
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
      <ToggleText toggleForm={toggleForm} text="Already have an account? Login" />
    </div>
  );
};

// Export the RegisterForm component as the default export
export default RegisterForm;
