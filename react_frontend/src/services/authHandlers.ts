// Import React and necessary hooks
import { NavigateFunction } from 'react-router-dom';

// Import API functions
import loginUserToken from './loginUserToken';
import createUserAPI from './createUserAPI';

/**
 * Function to handle user login.
 * 
 * @param {React.FormEvent} event - The form submission event.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {NavigateFunction} navigate - The navigate function from react-router-dom.
 * @param {Function} setIsAuthenticated - Function to set the authentication state.
 * @returns {Promise<void>} - A promise that resolves when the login is successful.
 * @throws {Error} - Throws an error if the login fails.
 */
export const handleLoginUser = async (
  event: React.FormEvent,
  email: string,
  password: string,
  navigate: NavigateFunction,
  setIsAuthenticated: (value: boolean) => void
): Promise<void> => {
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

/**
 * Function to handle user registration.
 * 
 * @param {React.FormEvent} event - The form submission event.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @param {NavigateFunction} navigate - The navigate function from react-router-dom.
 * @param {Function} setIsAuthenticated - Function to set the authentication state.
 * @returns {Promise<void>} - A promise that resolves when the registration is successful.
 * @throws {Error} - Throws an error if the registration fails.
 */
export const handleRegisterUser = async (
  event: React.FormEvent,
  email: string,
  password: string,
  navigate: NavigateFunction,
  setIsAuthenticated: (value: boolean) => void
): Promise<void> => {
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
