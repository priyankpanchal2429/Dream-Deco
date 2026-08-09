import React, { useState } from 'react';
import { AuthLayout } from './components/layout/AuthLayout';
import { LoginForm } from './components/pages/LoginForm';
import { RegisterForm } from './components/pages/RegisterForm';
import { ForgotPasswordForm } from './components/pages/ForgotPasswordForm';
import { AuthenticatedDashboard } from './components/pages/AuthenticatedDashboard';
import type { AuthView, UserRecord } from './types/auth';
import './styles/globals.css';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [authenticatedUser, setAuthenticatedUser] = useState<Omit<
    UserRecord,
    'password_hash'
  > | null>(null);

  const handleLoginSuccess = (user: Omit<UserRecord, 'password_hash'>) => {
    setAuthenticatedUser(user);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setAuthenticatedUser(null);
    setCurrentView('login');
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Top Floating View Switcher Bar (Minimalist B&W Pill Toolbar) */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 100,
          display: 'flex',
          gap: '6px',
          backgroundColor: '#FFFFFF',
          padding: '4px',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <button
          onClick={() => setCurrentView('login')}
          style={{
            background: currentView === 'login' ? '#111111' : 'transparent',
            color: currentView === 'login' ? '#FFFFFF' : '#6B7280',
            border: 'none',
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentView('register')}
          style={{
            background: currentView === 'register' ? '#111111' : 'transparent',
            color: currentView === 'register' ? '#FFFFFF' : '#6B7280',
            border: 'none',
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
        >
          Create Account
        </button>
        <button
          onClick={() => setCurrentView('forgot-password')}
          style={{
            background: currentView === 'forgot-password' ? '#111111' : 'transparent',
            color: currentView === 'forgot-password' ? '#FFFFFF' : '#6B7280',
            border: 'none',
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
        >
          Forgot Password
        </button>
      </div>

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
