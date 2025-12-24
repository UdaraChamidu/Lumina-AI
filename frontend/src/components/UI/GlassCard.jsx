import React from 'react';

export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`backdrop-blur-xl bg-[#1a1b26]/80 border border-white/5 shadow-2xl rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
