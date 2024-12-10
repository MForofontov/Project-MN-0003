import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { isAuthenticatedAPI } from '../../services/auth'; // Import the function to check if the user is authenticated
import LogOutAPI from '../../services/logOutAPI'; // Import the function to log out the user
import LoginUserToken from '../../services/loginUserToken'; // Import the function to log in the user

// Define the shape of the context's value
interface AuthContextProps {
  isAuthenticated: boolean | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create a context object with a default value of undefined
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component that wraps your app and makes the auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State to hold the authentication status

  useEffect(() => {
    // Simulate an async authentication check
    const checkAuth = async () => {
      const authStatus = await isAuthenticatedAPI(); // Check if the user is authenticated
      setIsAuthenticated(authStatus); // Update the authentication status
    };

    checkAuth(); // Call the function to check authentication status when the component mounts
  }, []);

  // Function to log in the user
  const login = async (email: string, password: string) => {
    try {
      await LoginUserToken(email, password); // Call the API to log in the user
      setIsAuthenticated(true); // Update the authentication status to true
    } catch (error) {
      console.error('Error logging in:', error);
      setIsAuthenticated(false); // Update the authentication status to false if login fails
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      await LogOutAPI(); // Call the API to log out the user
      setIsAuthenticated(false); // Update the authentication status to false
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children} {/* Render the children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};