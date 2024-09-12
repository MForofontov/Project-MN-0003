import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    isSidebarVisible: boolean;
    [key: string]: any; // Allow additional props
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isSidebarVisible, ...props }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        // Optionally, you can return a loading spinner or some placeholder here
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Component {...props} isSidebarVisible={isSidebarVisible}/> : <Navigate to="/login" />;
};

export default PrivateRoute;