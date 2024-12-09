import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext'; // Import the AuthProvider
import Header from './Components/Header/Header'; // Import the Header component
import Footer from './Components/Footer/Footer'; // Import the Footer component
import HomePage from './Components/HomePage/HomePage'; // Import the HomePage component
import Auth from './Components/Auth/Auth'; // Import the Auth component
import PrivateRoute from './utils/PrivateRoute'; // Import the PrivateRoute component
import DashBoard from './Components/DashBoard/DashBoard'; // Import the DashBoard component

const App: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false); // State to manage sidebar visibility

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle the sidebar visibility state
  };

  return (
    <AuthProvider> {/* Provide authentication context to the entire app */}
      <Router> {/* Set up the router for navigation */}
        <Header toggleSidebar={toggleSidebar} /> {/* Render the Header component and pass the toggleSidebar function */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Add a home route */}
          <Route path="/login" element={<Auth />} /> {/* Add a login route */}
          <Route path="/dashboard" element={<PrivateRoute component={DashBoard} isSidebarVisible={isSidebarVisible} />} /> {/* Add a dashboard route with a private route wrapper */}
          {/* Add more routes as needed */}
        </Routes>
        <Footer /> {/* Render the Footer component */}
      </Router>
    </AuthProvider>
  );
};

export default App;