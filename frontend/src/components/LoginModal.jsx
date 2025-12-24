import React from 'react';
import GlassCard from './UI/GlassCard';
import Button from './UI/Button';

export default function LoginModal({ isOpen, onClose, onLogin, reason }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <GlassCard className="w-full max-w-md p-8 text-center m-4 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="relative text-5xl mb-6 transform hover:scale-110 transition-transform duration-300 cursor-default">
           {reason === 'limit' ? '🛑' : '✨'}
        </div>
        
        <h2 className="relative text-2xl font-bold text-white mb-3">
          {reason === 'limit' ? 'Guest Limit Reached' : 'Sign In Required'}
        </h2>
        
        <p className="relative text-slate-300 mb-8 leading-relaxed">
          {reason === 'limit' 
            ? "You've used all 5 free guest prompts. Create a free account to unlock more prompts and save your history." 
            : "Please sign in to access this feature."
          }
        </p>

        {reason === 'limit' && (
           <div className="relative bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-indigo-300 font-semibold text-sm">
                 <span>🚀</span> Upgrade to 8 Prompts instantly
              </div>
           </div>
        )}

        <Button onClick={onLogin} className="relative w-full justify-center py-3 text-lg font-semibold shadow-indigo-500/20">
           Sign in with Google
        </Button>

        <button 
          onClick={onClose} 
          className="relative mt-6 text-sm text-slate-500 hover:text-white transition-colors underline decoration-slate-700 hover:decoration-white underline-offset-4 cursor-pointer"
        >
          Close (Read Only)
        </button>
      </GlassCard>
    </div>
  );
}
