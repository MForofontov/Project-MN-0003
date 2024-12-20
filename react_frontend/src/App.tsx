import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/Contexts/AuthContext'; // Import the AuthProvider
import Header from './Components/Header/Header'; // Import the Header component
import Footer from './Components/Footer/Footer'; // Import the Footer component
import HomePage from './Components/HomePage/HomePage'; // Import the HomePage component
import Auth from './Components/Auth/Auth'; // Import the Auth component
import PrivateRoute from './utils/Routes/PrivateRoute'; // Import the PrivateRoute component
import PublicRoute from './utils/Routes/PublicRoute'; // Import the PublicRoute component
import NotFound from './utils/Components/NotFound/NotFound'; // Import the NotFound component
import DashBoard from './Components/DashBoard/DashBoard'; // Import the DashBoard component
import { setupResponseInterceptorsRefreshToken } from './utils/ResponseInterceptors/setupResponseInterceptorsRefreshToken'; // Import the setupResponseInterceptorsRefreshToken function
import { useAuth } from './utils/Contexts/AuthContext'; // Import the useAuth hook

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Provide authentication context to the entire app */}
      <Router> {/* Set up the router for navigation */}
        <AppContent /> {/* Render the AppContent component */}
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false); // State to manage sidebar visibility
  const { setIsAuthenticated } = useAuth(); // Get the setIsAuthenticated function from AuthContext
  
  useEffect(() => {
    setupResponseInterceptorsRefreshToken((status: boolean) => {
      setIsAuthenticated(status); // Update authentication status using AuthContext
    });
  }, []);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle the sidebar visibility state
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} /> {/* Render the Header component and pass the toggleSidebar function */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Add a home route */}
        <Route path="/authentication" element={<PublicRoute component={Auth} />} /> {/* Add a login route with a public route wrapper */}
        <Route path="/dashboard" element={<PrivateRoute component={DashBoard} isSidebarVisible={isSidebarVisible} />} /> {/* Add a dashboard route with a private route wrapper */}
        {/* Add more routes as needed */}
        <Route path="/404" element={<NotFound />} /> {/* Route for the NotFound component */}
        <Route path="*" element={<Navigate to="/404" />} /> {/* Redirect to /404 for undefined paths */}
      </Routes>
      <Footer /> {/* Render the Footer component */}
    </>
  );
};

export default App;