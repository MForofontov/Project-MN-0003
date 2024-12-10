import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'; // Import the useAuth hook
import Loading from '../Components/Loading/Loading'; // Import the CustomSpinner component

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  isSidebarVisible: boolean;
  [key: string]: any; // Allow additional props
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isSidebarVisible, ...props }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Get the authentication status from the AuthContext

  if (isLoading) {
    // Return a loading spinner while checking authentication status
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Loading />
      </div>
    );
  }

  return isAuthenticated ? (
    <Component {...props} isSidebarVisible={isSidebarVisible} /> // Render the component if authenticated
  ) : (
    <Navigate to="/authentication" /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;