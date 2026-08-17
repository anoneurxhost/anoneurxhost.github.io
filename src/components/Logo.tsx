import React from 'react';

interface LogoProps {
  className?: string;
  showRings?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-24 h-24", showRings = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="triGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="20%" stopColor="#c70483ce" />
              <stop offset="30%" stopColor="#D9008E" />
              <stop offset="40%" stopColor="#7e0cafff" />
              <stop offset="80%" stopColor="#2D0091" />
            </linearGradient>
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#959696ff" />
            </linearGradient>
          </defs>
          <text
            x="100"
            y="103"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="185"
            className="font-brand"
            fill="url(#brandGradient)"
            style={{ letterSpacing: '0' }}
          >
            A
          </text>

          {/* Triangle base */}
          <polygon
            points="100,115 138,180 62,180"
            fill="url(#triGradient)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Logo;