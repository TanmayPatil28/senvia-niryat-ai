import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLoginMode ? (
          <LoginForm onSwitchToRegister={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;