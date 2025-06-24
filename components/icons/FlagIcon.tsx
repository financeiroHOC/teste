
import React from 'react';

interface IconProps { className?: string; }
export const FlagIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 4.5V3m0 1.5v12m0 0V3m12.75 6l-3.065-1.532a2.905 2.905 0 01-.84-.447V3m3.905 7.5L18 9.75M12 3v13.5M3 21h18" />
  </svg>
);
