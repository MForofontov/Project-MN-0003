import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import CustomSpinner from './CustomSpinner/CustomSpinner'; // Import the CustomSpinner component

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  isSidebarVisible: boolean;
  [key: string]: any; // Allow additional props
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isSidebarVisible, ...props }) => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from the AuthContext

  if (isAuthenticated === null) {
    // Return a loading spinner while checking authentication status
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CustomSpinner />
      </div>
    );
  }

  return isAuthenticated ? (
    <Component {...props} isSidebarVisible={isSidebarVisible} /> // Render the component if authenticated
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;