import React from 'react';
import { Logo } from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout-container">
      <main className="auth-card">
        {/* Top Logo */}
        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
          <Logo size={36} showWordmark={true} />
        </div>

        {/* Dynamic Auth View Form */}
        {children}
      </main>

      {/* Footer */}
      <footer className="auth-footer">
        <p>© 2026 Dream Deco Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};
