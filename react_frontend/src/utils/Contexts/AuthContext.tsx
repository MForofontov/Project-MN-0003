import { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { isAuthenticatedAPI } from '../../services/auth'; // API to check authentication status
import LogOutAPI from '../../services/logOutAPI'; // API to log out
import LoginUserToken from '../../services/loginUserToken'; // API to log in

// Define the shape of the context's value
interface AuthContextProps {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create a context object with a default value of undefined
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Authentication status
  const [isLoading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await isAuthenticatedAPI(); // Call API to check auth status
        console.log('loading component authStatus:', authStatus);
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false); // Default to not authenticated on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    checkAuth(); // Perform the auth check on mount
  }, []);

  // Function to log in the user
  const login = async (email: string, password: string) => {
    try {
      await LoginUserToken(email, password); // Perform login
      setIsAuthenticated(true); // Update status on success
      console.log('logged in authstatus:', true);
    } catch (error) {
      console.error('Error logging in:', error);
      setIsAuthenticated(false); // Update status on failure
      throw error; // Propagate error for UI handling
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      await LogOutAPI(); // Perform logout
      setIsAuthenticated(false); // Update status
      console.log('logged out authstatus:', false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  // Memoize the context value
  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      setIsAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
