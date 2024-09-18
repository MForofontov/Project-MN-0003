import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import SideBar from '../SideBar/SideBar';
import FileUpload from './FileUpload/FileUpload';
import './DashBoard.css';

interface DashBoardProps {
    isSidebarVisible: boolean;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  phone_number: string | null;
  address: string;
}

const Dashboard: React.FC<DashBoardProps> = ({isSidebarVisible}) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<string>('home');

  useEffect(() => {

    const fetchUserProfile = async (): Promise<User> => {
      try {
        const response = await api.get('/profile/');
        setUser(response.data);
        return response.data; // Ensure the function returns the fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Return a default user object or handle the error appropriately
        return {
          email: "",
          first_name: "",
          last_name: "",
          date_of_birth: null,
          phone_number: null,
          address: ""
        };
      }
    };

    const fetchDataSequentially = async () => {
      await fetchUserProfile();
    };
  
    fetchDataSequentially();
  
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'Upload File':
        return <FileUpload />;
      case 'View Files':
        return <div>View Files</div>;
      case 'Analysis':
        return <div>Music Analysis Results</div>;
      default: return <FileUpload />
    }
  };

  return (
    <div className={`dashboard-container ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
    {<SideBar isSidebarVisible={isSidebarVisible} setActiveView={setActiveView}/>}
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h1>Welcome, {user ? user.email : ""}</h1>
      </header>
      {renderActiveView()}
    </div>
  </div>
  );
};

export default Dashboard;