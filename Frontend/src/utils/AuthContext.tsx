import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { isAuthenticatedAPI } from '../services/auth';
import LogOutAPI from '../services/LogOutAPI';
import LoginUserToken from '../services/LoginUserToken';

interface AuthContextProps {
    isAuthenticated: boolean | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
// Create a context object with a default value
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
// Create a provider that wraps your app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    // Simulate an async authentication check
    const checkAuth = async () => {
      const authStatus = await isAuthenticatedAPI();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await LoginUserToken(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await LogOutAPI();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Use the AuthContext in your components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};