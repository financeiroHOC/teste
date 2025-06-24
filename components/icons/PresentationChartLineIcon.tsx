
import React from 'react';

interface IconProps { className?: string; }
export const PresentationChartLineIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M16.5 3.75h.008v.008H16.5V3.75zM9 3.75h.008v.008H9V3.75zm4.5 0h.008v.008H13.5V3.75zm-7.5 7.5h3l3-3 3 3h3" />
  </svg>
);
