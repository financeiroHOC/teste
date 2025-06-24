
import React from 'react';

interface IconProps { className?: string; }
export const ClipboardDocumentListIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0cA3.375 3.375 0 017.5 7.5V18c0 .09.008.176.023.262M10.5 3.75c-1.352 0-2.61.229-3.752.652M10.5 3.75a2.25 2.25 0 002.25-2.25h.008a2.25 2.25 0 002.25 2.25h.008a2.25 2.25 0 002.25-2.25h.008a2.25 2.25 0 002.25 2.25H18a2.25 2.25 0 002.25-2.25h-.008c0-1.135-.845-2.098-1.976-2.192A48.424 48.424 0 0010.5 3.75z" />
  </svg>
);
