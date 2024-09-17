import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './utils/AuthContext';
import Header from "./Components/Header/Header";
import Auth from "./Components/Auth/Auth";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/HomePage/HomePage";
import PrivateRoute from "./utils/PrivateRoute";
import DashBoard from "./Components/DashBoard/DashBoard";

const App: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

{ useState } 
    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };

  return (
    <AuthProvider>
      <Router>
        <Header toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Add a home route */}
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<PrivateRoute component={DashBoard} isSidebarVisible = {isSidebarVisible} />} />
            {/* Add more routes as needed */}
          </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
