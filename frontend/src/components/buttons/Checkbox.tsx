import React from 'react';
import './Checkbox.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className = '', ...props }) => {
  return (
    <label htmlFor={id} className={`custom-checkbox-container ${className}`}>
      <input id={id} type="checkbox" className="custom-checkbox-input" {...props} />
      <span className="custom-checkbox-box">
        <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.5 5L4.5 8L10.5 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="custom-checkbox-label">{label}</span>
    </label>
  );
};
