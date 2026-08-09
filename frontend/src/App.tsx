import React, { useState, useEffect } from 'react';
import { AuthLayout } from './components/layout/AuthLayout';
import { LoginForm } from './components/pages/LoginForm';
import { RegisterForm } from './components/pages/RegisterForm';
import { ForgotPasswordForm } from './components/pages/ForgotPasswordForm';
import { AuthenticatedDashboard } from './components/pages/AuthenticatedDashboard';
import { AuthService } from './functions/authService';
import type { AuthView, UserRecord } from './types/auth';
import './styles/globals.css';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [authenticatedUser, setAuthenticatedUser] = useState<Omit<
    UserRecord,
    'password_hash'
  > | null>(() => AuthService.getCurrentUser());

  useEffect(() => {
    const savedUser = AuthService.getCurrentUser();
    if (savedUser) {
      setAuthenticatedUser(savedUser);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLoginSuccess = (user: Omit<UserRecord, 'password_hash'>) => {
    setAuthenticatedUser(user);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    AuthService.logout();
    setAuthenticatedUser(null);
    setCurrentView('login');
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <AuthLayout>
        {currentView === 'login' && (
          <LoginForm onNavigate={setCurrentView} onSuccess={handleLoginSuccess} />
        )}
        {currentView === 'register' && <RegisterForm onNavigate={setCurrentView} />}
        {currentView === 'forgot-password' && (
          <ForgotPasswordForm onNavigate={setCurrentView} />
        )}
        {currentView === 'dashboard' && authenticatedUser && (
          <AuthenticatedDashboard user={authenticatedUser} onSignOut={handleSignOut} />
        )}
      </AuthLayout>
    </div>
  );
};

export default App;
