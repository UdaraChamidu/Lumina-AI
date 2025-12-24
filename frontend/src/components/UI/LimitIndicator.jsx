import React from 'react';

export default function LimitIndicator({ count, max }) {
  const percentage = Math.min(100, (count / max) * 100);
  const isNearLimit = percentage >= 80;
  
  // Circle config
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:bg-white/10 transition-colors cursor-help group">
      <div className="relative w-9 h-9 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="18"
            cy="18"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress Circle */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${isNearLimit ? 'text-rose-500' : 'text-emerald-400'}`}
          />
        </svg>
        <div className="absolute text-[10px] font-bold text-slate-300">
          {count}
        </div>
      </div>
      <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold group-hover:text-slate-400 transition-colors">Prompts</span>
          <span className="text-xs font-medium text-slate-300">{count} / {max} Used</span>
      </div>
    </div>
  );
}
