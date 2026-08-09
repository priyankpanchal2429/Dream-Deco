import React from 'react';
import { LogIn, CircleCheck, KeyRound } from 'lucide-react';
import { Button } from '../buttons/Button';
import type { UserRecord } from '../../types/auth';

interface AuthenticatedDashboardProps {
  user: Omit<UserRecord, 'password_hash'>;
  onSignOut: () => void;
}

export const AuthenticatedDashboard: React.FC<AuthenticatedDashboardProps> = ({
  user,
  onSignOut,
}) => {
  return (
    <div className="auth-form-wrapper" style={{ width: '100%' }}>
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#F3F4F6',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}
      >
        <CircleCheck size={24} strokeWidth={2} color="#111111" />
      </div>

      <h1 className="auth-title">Authentication Successful</h1>
      <p className="auth-subtitle">Welcome to Dream Deco Enterprise Dashboard.</p>

      {/* User Record Details Container */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FAFAFA',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-main)',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
          <strong style={{ color: 'var(--text-primary)' }}>{user.full_name}</strong>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>User ID</span>
          <code
            style={{
              backgroundColor: '#E5E7EB',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#111111',
            }}
          >
            @{user.user_id}
          </code>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Database ID</span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
            {user.id}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Password Security</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11.5px',
              fontWeight: 600,
              color: '#111111',
            }}
          >
            <KeyRound size={12} /> Hashed (Bcrypt)
          </span>
        </div>
      </div>

      <Button variant="primary" icon={LogIn} onClick={onSignOut}>
        Sign Out
      </Button>
    </div>
  );
};
