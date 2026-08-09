import React, { useState, useEffect } from 'react';
import { AuthLayout } from './components/layout/AuthLayout';
import { LoginForm } from './components/pages/LoginForm';
import { RegisterForm } from './components/pages/RegisterForm';
import { ForgotPasswordForm } from './components/pages/ForgotPasswordForm';
import { AuthenticatedDashboard } from './components/pages/AuthenticatedDashboard';
import { Logo } from './components/layout/Logo';
import { AuthService } from './functions/authService';
import type { AuthView, UserRecord } from './types/auth';
import './styles/globals.css';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [authenticatedUser, setAuthenticatedUser] = useState<Omit<
    UserRecord,
    'password_hash'
  > | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Initialize and check authentication on application startup
  useEffect(() => {
    let isMounted = true;

    AuthService.checkAuth()
      .then(user => {
        if (isMounted) {
          if (user) {
            setAuthenticatedUser(user);
            setCurrentView('dashboard');
          } else {
            setAuthenticatedUser(null);
            setCurrentView('login');
          }
        }
      })
      .finally(() => {
        if (isMounted) setIsCheckingAuth(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginSuccess = (user: Omit<UserRecord, 'password_hash'>) => {
    setAuthenticatedUser(user);
    setCurrentView('dashboard');
  };

  const handleSignOut = async () => {
    await AuthService.logout();
    setAuthenticatedUser(null);
    setCurrentView('login');
  };

  // 1. Loading state while checking authentication (Prevents login UI flicker)
  if (isCheckingAuth) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-loading-box">
          <Logo size={36} showWordmark={true} />
          <div className="loading-spinner-bar"></div>
          <span className="loading-text">Verifying secure session...</span>
        </div>
      </div>
    );
  }

  // 2. Protected Route Enforcement: If logged in, redirect away from auth forms to dashboard
  const isPublicRoute = currentView === 'login' || currentView === 'register' || currentView === 'forgot-password';
  if (authenticatedUser && isPublicRoute) {
    return <AuthenticatedDashboard user={authenticatedUser} onSignOut={handleSignOut} />;
  }

  // 3. Protected Route Enforcement: If NOT logged in and on dashboard, redirect to login
  if (!authenticatedUser && currentView === 'dashboard') {
    return (
      <AuthLayout>
        <LoginForm onNavigate={setCurrentView} onSuccess={handleLoginSuccess} />
      </AuthLayout>
    );
  }

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
