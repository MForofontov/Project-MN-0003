// src/components/Auth/Auth.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateUserAPI from '../../services/CreateUserAPI';
import { useAuth } from '../../utils/AuthContext';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import './Auth.css'; // Import the CSS file

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        await login(email, password);
        // Handle successful user creation (e.g., redirect, show message)
        navigate('/dashboard');
    } catch (error) {
        console.error('Error creating user:', error);
        // Handle error (e.g., show error message)
    }
}

    const handleRegisterUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        await CreateUserAPI(email, password);
        // Handle successful user creation (e.g., redirect, show message)
        navigate('/dashboard');
    } catch (error) {
        console.error('Error creating user:', error);
        // Handle error (e.g., show error message)
    }
};

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLoginUser={handleLoginUser}
          toggleForm={toggleForm}
        />
      ) : (
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleRegisterUser={handleRegisterUser}
          toggleForm={toggleForm}
        />
      )}
    </div>
  );
};

export default Auth;