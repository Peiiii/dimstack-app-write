import React from 'react';

export const AIAssistantIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
        fill="url(#ai-grad)"
      />
    </svg>
  );
};

export const ExcalidrawAIIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path
        d="M3 3L8 3C8 3 9 8 12 8C15 8 16 3 16 3L21 3"
        stroke="url(#ex-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M3 12C3 12 5 9 8 9C11 9 13 12 16 12C19 12 21 9 21 9"
        stroke="url(#ex-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="6" cy="18" r="2" fill="url(#ex-grad)" opacity="0.8" />
      <circle cx="12" cy="20" r="1.5" fill="url(#ex-grad)" opacity="0.6" />
      <circle cx="18" cy="17" r="2.5" fill="url(#ex-grad)" opacity="0.7" />
    </svg>
  );
};
