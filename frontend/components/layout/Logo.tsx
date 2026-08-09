import React from 'react';

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, showWordmark = true }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Dream Deco Logo"
      >
        <rect width="36" height="36" rx="8" fill="#111111" />
        <path
          d="M11 11H25V16C25 19.866 21.866 23 18 23C14.134 23 11 19.866 11 16V11Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="16" r="2.5" fill="#FFFFFF" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#111111',
            textTransform: 'uppercase',
          }}
        >
          Dream Deco
        </span>
      )}
    </div>
  );
};
