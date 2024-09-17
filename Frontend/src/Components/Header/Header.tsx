import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Header.css'; // Import the CSS file


interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    console.log(isAuthenticated);

    const handlelogout = async () => {
        // Add your logout logic here
        await logout();
        navigate('/login/');
    };

    const handleNavigation = (path: string) => {
        navigate(path);
      };

    return (
        <header className="header">
            {isAuthenticated ? (<button onClick={toggleSidebar} className="sidebar-toggle-button">☰</button>
            ) : null}

            <div className="logo">My Website</div>
            <nav>
                <ul>
                     <li>
                        <button className='list-button' onClick={() => handleNavigation('/')}>Home</button>
                    </li>
                    <li>
                        <button className='list-button' onClick={() => handleNavigation('/about')}>About</button>
                    </li>
                    <li>
                        <button className='list-button' onClick={() => handleNavigation('/services')}>Services</button>
                    </li>
                    <li>
                        <button className='list-button' onClick={() => handleNavigation('/contact')}>Contact</button>
                    </li>
                    {isAuthenticated ? (
                        <li><button className='logout-button' onClick={handlelogout}>Logout</button></li>
                    ) : (
                        <li><button className='login-button' onClick={() => handleNavigation('/login')}>Login</button></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
