import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyle = "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5",
    outline: "border border-white/20 text-slate-300 hover:border-white/50 hover:text-white hover:bg-white/5",
    ghost: "text-slate-400 hover:text-white hover:bg-white/10",
    danger: "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 hover:text-red-300"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
