import React, { useState } from 'react';
import { User, KeyRound } from 'lucide-react';
import { InputField } from '../inputs/InputField';
import { Button } from '../buttons/Button';
import { Alert } from '../layout/Alert';
import { AuthService } from '../../functions/authService';
import type { AuthView } from '../../types/auth';

interface ForgotPasswordFormProps {
  onNavigate: (view: AuthView) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
      const result = await AuthService.resetPassword(
        fullName,
        userId,
        newPassword,
        confirmPassword
      );

      if (result.isValid) {
        setSuccessMsg(result.successMessage || 'Your password has been successfully updated.');
        setNewPassword('');
        setConfirmPassword('');
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
      <h1 className="auth-title">Forgot Password</h1>
      <p className="auth-subtitle">Enter your registered information to create a new password.</p>

      {generalError && <Alert type="error" message={generalError} className="mb-4" />}
      {successMsg && <Alert type="success" message={successMsg} className="mb-4" />}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <InputField
          label="Full Name"
          id="fp-full-name"
          type="text"
          placeholder="Enter registered full name"
          icon={User}
          value={fullName}
          onChange={e => {
            setFullName(e.target.value);
            clearFieldError('fullName');
            if (generalError) setGeneralError('');
          }}
          error={fieldErrors.fullName}
          autoFocus
        />

        <InputField
          label="User ID"
          id="fp-user-id"
          type="text"
          placeholder="Enter registered user ID"
          icon={User}
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            clearFieldError('userId');
            if (generalError) setGeneralError('');
          }}
          error={fieldErrors.userId}
        />

        <InputField
          label="New Password"
          id="fp-new-password"
          type="password"
          placeholder="Minimum 8 characters"
          icon={KeyRound}
          value={newPassword}
          onChange={e => {
            setNewPassword(e.target.value);
            clearFieldError('password');
          }}
          error={fieldErrors.password}
        />

        <InputField
          label="Confirm Password"
          id="fp-confirm-password"
          type="password"
          placeholder="Re-enter new password"
          icon={KeyRound}
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            clearFieldError('confirmPassword');
          }}
          error={fieldErrors.confirmPassword}
        />

        <Button type="submit" variant="primary" icon={KeyRound} isLoading={isLoading}>
          Update Password
        </Button>
      </form>

      <div className="auth-nav-footer">
        <button type="button" onClick={() => onNavigate('login')}>
          Back to Login
        </button>
      </div>
    </div>
  );
};
