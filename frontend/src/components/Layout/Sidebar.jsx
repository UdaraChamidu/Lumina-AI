import React from 'react';
import Button from '../UI/Button';

export default function Sidebar({ onNewChat }) {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-[#0F1016] border-r border-white/5 h-screen pt-4 pb-6 px-4">
      <div className="mb-8 px-2">
         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-2 block">Menu</span>
         <Button onClick={onNewChat} variant="primary" className="w-full justify-center shadow-none bg-white/5 hover:bg-white/10 border border-white/5">
            + New Chat
         </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 px-2">
         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-2 block">Recent</span>
         <div className="flex items-center justify-center h-32 text-center">
            <div className="text-sm text-slate-500 italic px-4">
               History is locally stored in this session
            </div>
         </div>
      </div>

      <div className="mt-auto px-2 border-t border-white/5 pt-4">
        <div className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
            <span>⚙️</span>
            <span className="text-sm font-medium">Settings</span>
        </div>
      </div>
    </aside>
  );
}
