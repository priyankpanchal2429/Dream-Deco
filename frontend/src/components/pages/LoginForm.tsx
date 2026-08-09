import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import { InputField } from '../inputs/InputField';
import { Button } from '../buttons/Button';
import { Checkbox } from '../buttons/Checkbox';
import { Alert } from '../layout/Alert';
import { AuthService } from '../../functions/authService';
import type { AuthView, UserRecord } from '../../types/auth';

interface LoginFormProps {
  onNavigate: (view: AuthView) => void;
  onSuccess: (user: Omit<UserRecord, 'password_hash'>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onNavigate, onSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{ userId?: string; password?: string }>({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    const errors: { userId?: string; password?: string } = {};
    if (!userId.trim()) errors.userId = 'User ID is required';
    if (!password.trim()) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await AuthService.login(userId, password, rememberMe);
      if (result.success && result.user) {
        onSuccess(result.user);
      } else {
        setGeneralError(result.error || 'Invalid User ID or Password.');
      }
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper" style={{ width: '100%' }}>
      <h1 className="auth-title">Welcome Back</h1>
      <p className="auth-subtitle">Sign in to your account.</p>

      {generalError && <Alert type="error" message={generalError} className="mb-4" />}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <InputField
          label="User ID"
          id="login-user-id"
          type="text"
          placeholder="Enter your user ID"
          icon={User}
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            if (fieldErrors.userId) setFieldErrors(prev => ({ ...prev, userId: undefined }));
            if (generalError) setGeneralError('');
          }}
          error={fieldErrors.userId}
          autoComplete="username"
          autoFocus
        />

        <InputField
          label="Password"
          id="login-password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
            if (generalError) setGeneralError('');
          }}
          error={fieldErrors.password}
          autoComplete="current-password"
          rightLabelLink={
            <button
              type="button"
              className="auth-link"
              onClick={() => onNavigate('forgot-password')}
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              Forgot Password?
            </button>
          }
        />

        <div className="form-options">
          <Checkbox
            id="remember-me"
            label="Remember Me"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
        </div>

        <Button type="submit" variant="primary" icon={LogIn} isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="auth-nav-footer">
        Don't have an account?{' '}
        <button type="button" onClick={() => onNavigate('register')}>
          Create Account
        </button>
      </div>
    </div>
  );
};
