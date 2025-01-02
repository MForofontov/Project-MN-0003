// Import React and necessary hooks
import { NavigateFunction } from 'react-router-dom';

// Import services and utilities
import loginUserToken from './loginUserToken';
import createUserAPI from './createUserAPI';

// Function to handle user login
export const handleLoginUser = async (
  event: React.FormEvent,
  email: string,
  password: string,
  navigate: NavigateFunction,
  setIsAuthenticated: (value: boolean) => void
) => {
  event.preventDefault(); // Prevent the default form submission behavior
  try {
    await loginUserToken(email, password); // Call the loginUserToken function with email and password
    setIsAuthenticated(true); // Set the authentication state to true
    navigate('/dashboard'); // Navigate to the dashboard
  } catch (error) {
    console.error('Error logging in user:', error); // Log any errors that occur
    // Handle error (e.g., show error message)
  }
};

// Function to handle user registration
export const handleRegisterUser = async (
  event: React.FormEvent,
  email: string,
  password: string,
  navigate: NavigateFunction,
  setIsAuthenticated: (value: boolean) => void
) => {
  event.preventDefault(); // Prevent the default form submission behavior
  try {
    await createUserAPI(email, password); // Call the createUserAPI function with email and password
    setIsAuthenticated(true); // Set the authentication state to true
    navigate('/dashboard'); // Navigate to the dashboard
  } catch (error) {
    console.error('Error creating user:', error); // Log any errors that occur
    // Handle error (e.g., show error message)
  }
};
