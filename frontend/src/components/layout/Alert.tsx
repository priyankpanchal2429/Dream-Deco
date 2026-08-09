import React from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';
import './Alert.css';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`alert-banner alert-${type} ${className}`} role="alert">
      <div className="alert-icon">
        {type === 'error' ? (
          <CircleAlert size={18} strokeWidth={2} />
        ) : (
          <CircleCheck size={18} strokeWidth={2} />
        )}
      </div>
      <div className="alert-message">{message}</div>
    </div>
  );
};
