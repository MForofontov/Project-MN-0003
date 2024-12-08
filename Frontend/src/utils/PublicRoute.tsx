import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import CustomSpinner from './CustomSpinner/CustomSpinner'; // Import the CustomSpinner component

interface PublicRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any; // Allow additional props
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, ...props }) => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from the AuthContext

  if (isAuthenticated === null) {
    // Return a loading spinner while checking authentication status
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CustomSpinner />
      </div>
    );
  }

  return !isAuthenticated ? (
    <Component {...props} /> // Render the component if not authenticated
  ) : (
    <Navigate to="/dashboard" /> // Redirect to dashboard if authenticated
  );
};

export default PublicRoute;