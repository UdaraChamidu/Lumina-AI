import React from 'react';
import Button from '../UI/Button';
import LimitIndicator from '../UI/LimitIndicator';

export default function Header({ session, isPremium, promptCount, maxLimit, onLogout, onLogin }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#0F1016]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="text-xl">✨</span>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Lumina
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Limit Ring */}
        <LimitIndicator count={promptCount} max={maxLimit} />

        {/* User Profile */}
        <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block"></div>
        
        {session ? (
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border-2 border-white/10 overflow-hidden shadow-inner">
                     {session.user?.user_metadata?.avatar_url ? (
                         <img src={session.user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                     ) : (
                         <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs text-white">User</div>
                     )}
                  </div>
                  <div>
                      <div className="text-sm font-medium text-white">{session.user.email?.split('@')[0]}</div>
                      <div className="text-[10px] text-indigo-400 font-bold tracking-wide uppercase">{isPremium ? 'PRO Account' : 'Free Plan'}</div>
                  </div>
               </div>
               <Button variant="ghost" className="!px-3 !py-1.5 text-xs border border-white/5" onClick={onLogout}>Sign Out</Button>
            </div>
        ) : (
            <Button variant="primary" onClick={onLogin} className="!py-2 !px-5 text-sm">
                Sign In
            </Button>
        )}
      </div>
    </header>
  );
}
