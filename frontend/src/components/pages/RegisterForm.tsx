import React, { useState } from 'react';
import { User, Lock, UserPlus } from 'lucide-react';
import { InputField } from '../inputs/InputField';
import { Button } from '../buttons/Button';
import { Alert } from '../layout/Alert';
import { AuthService } from '../../functions/authService';
import type { AuthView } from '../../types/auth';

interface RegisterFormProps {
  onNavigate: (view: AuthView) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearFieldError = (key: string) => {
    setFieldErrors(prev => {
      if (!prev[key]) return prev;
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMsg('');
    setFieldErrors({});

    setIsLoading(true);

    try {
      const result = await AuthService.register(fullName, userId, password, confirmPassword);
      if (result.isValid) {
        setSuccessMsg(result.successMessage || 'Account created successfully!');
        setTimeout(() => {
          onNavigate('login');
        }, 1800);
      } else {
        if (result.generalError) setGeneralError(result.generalError);
        setFieldErrors(result.errors);
      }
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper" style={{ width: '100%' }}>
      <h1 className="auth-title">Create Account</h1>
      <p className="auth-subtitle">Create your account to access the system.</p>

      {generalError && <Alert type="error" message={generalError} className="mb-4" />}
      {successMsg && <Alert type="success" message={successMsg} className="mb-4" />}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <InputField
          label="Full Name"
          id="reg-full-name"
          type="text"
          placeholder="e.g. Jane Doe"
          icon={User}
          value={fullName}
          onChange={e => {
            setFullName(e.target.value);
            clearFieldError('fullName');
          }}
          error={fieldErrors.fullName}
          autoFocus
        />

        <InputField
          label="User ID"
          id="reg-user-id"
          type="text"
          placeholder="Choose a unique user ID"
          icon={User}
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            clearFieldError('userId');
          }}
          error={fieldErrors.userId}
        />

        <InputField
          label="Password"
          id="reg-password"
          type="password"
          placeholder="Minimum 8 characters"
          icon={Lock}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            clearFieldError('password');
          }}
          error={fieldErrors.password}
        />

        <InputField
          label="Confirm Password"
          id="reg-confirm-password"
          type="password"
          placeholder="Re-enter your password"
          icon={Lock}
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            clearFieldError('confirmPassword');
          }}
          error={fieldErrors.confirmPassword}
        />

        <Button type="submit" variant="primary" icon={UserPlus} isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <div className="auth-nav-footer">
        Already have an account?{' '}
        <button type="button" onClick={() => onNavigate('login')}>
          Sign In
        </button>
      </div>
    </div>
  );
};
