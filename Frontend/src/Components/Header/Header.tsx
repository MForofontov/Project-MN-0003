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

    return (
        <header className="header">
            {isAuthenticated ? (<button onClick={toggleSidebar} className="sidebar-toggle-button">☰</button>
            ) : null}

            <div className="logo">My Website</div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                    {isAuthenticated ? (
                        <li><button onClick={handlelogout}>Logout</button></li>
                    ) : (
                        <li><a href="/login">Login</a></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
