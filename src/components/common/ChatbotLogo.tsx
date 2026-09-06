import React from 'react';

interface ChatbotLogoProps {
  className?: string;
  size?: number | string;
  onClick?: () => void;
}

export const ChatbotLogo: React.FC<ChatbotLogoProps> = ({
  className = '',
  size = 56,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ width: size, height: size }}
      role="button"
      aria-label="AlgoLearn AI Chatbot"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Vibrant Blue to Purple Diagonal Gradient matching the updated AI logo */}
          <linearGradient id="aiUpdatedLogoGrad" x1="12%" y1="12%" x2="88%" y2="88%">
            <stop offset="0%" stopColor="#2272fc" />
            <stop offset="35%" stopColor="#304ef7" />
            <stop offset="68%" stopColor="#592ff9" />
            <stop offset="100%" stopColor="#8224fa" />
          </linearGradient>
        </defs>

        {/* ── Circular Gradient Backdrop ── */}
        <circle cx="50" cy="50" r="48" fill="url(#aiUpdatedLogoGrad)" />

        {/* ── White Chat Bubble Outline with Rounded Down-Left Tail ── */}
        <path
          d="M 51 24.5
             C 63.4 24.5 73.5 34.6 73.5 47
             C 73.5 59.4 63.4 69.5 51 69.5
             C 46.8 69.5 42.8 68.3 39.5 66.2
             C 35.8 67.2 32.2 67.5 30.2 66.8
             C 28.8 66.3 28.2 65 28.6 63.7
             C 29.3 61.5 30 58.8 29.8 56.2
             C 28.9 53.4 28.5 50.3 28.5 47
             C 28.5 34.6 38.6 24.5 51 24.5 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
