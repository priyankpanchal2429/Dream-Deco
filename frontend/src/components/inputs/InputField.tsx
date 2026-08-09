import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './InputField.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: LucideIcon;
  error?: string;
  rightLabelLink?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  icon: Icon,
  type = 'text',
  error,
  rightLabelLink,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="input-field-group">
      <div className="input-field-header">
        <label htmlFor={id} className="input-field-label">
          {label}
        </label>
        {rightLabelLink && <div className="input-field-right-link">{rightLabelLink}</div>}
      </div>

      <div className={`input-field-container ${error ? 'input-field-has-error' : ''}`}>
        {Icon && (
          <div className="input-field-icon-left">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}

        <input
          id={id}
          type={inputType}
          className={`input-field-element ${Icon ? 'has-left-icon' : ''} ${
            isPasswordType ? 'has-right-icon' : ''
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            className="input-field-toggle-btn"
            onClick={() => setShowPassword(prev => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        )}
      </div>

      {error && (
        <span id={`${id}-error`} className="input-field-error-msg">
          {error}
        </span>
      )}
    </div>
  );
};
