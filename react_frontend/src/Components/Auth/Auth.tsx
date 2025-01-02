// src/components/Auth/Auth.tsx
import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import './Auth.css'; // Import the CSS file

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
          toggleForm={toggleForm}
        />
      ) : (
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          toggleForm={toggleForm}
        />
      )}
    </div>
  );
};

export default Auth;