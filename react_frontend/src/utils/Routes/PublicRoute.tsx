// Import React and necessary hooks
import React from 'react';
import { Navigate } from 'react-router-dom';

// Import context providers and hooks
import { useAuth } from '../Contexts/AuthContext';

// Import local components
import Loading from '../Components/Loading/Loading';

// Define the props for the PublicRoute component
interface PublicRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any; // Allow additional props
}

// Define the PublicRoute component
const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, ...props }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Get the authentication status from the AuthContext

  if (isLoading) {
    // Return a loading spinner while checking authentication status
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Loading />
      </div>
    );
  }

  return !isAuthenticated ? (
    <Component {...props} /> // Render the component if not authenticated
  ) : (
    <Navigate to="/dashboard" /> // Redirect to dashboard if authenticated
  );
};

// Export the PublicRoute component as the default export
export default PublicRoute;