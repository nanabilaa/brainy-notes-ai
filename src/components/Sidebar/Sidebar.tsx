
import React from 'react';
import { FileText, Clock, Settings, Info, LogIn, UserPlus } from 'lucide-react';
import LoginButtons from '../Login/LoginButtons';

const Sidebar: React.FC = () => {
  return (
    <aside className="glass-darker w-64 min-h-screen flex flex-col border-r border-white/10">
      <div className="p-4 flex items-center gap-3 border-b border-white/10">
        <div className="rounded-full bg-brainy-lightPurple/30 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brainy-accent">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            <path d="M14.05 2a9 9 0 0 1 8 7.94"></path>
            <path d="M14.05 6A5 5 0 0 1 18 10"></path>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-brainy-text">BrainyNotes</h1>
      </div>

      <div className="py-6 flex-1">
        <p className="px-4 text-sm text-brainy-text/70 mb-2">Main Menu</p>

        <nav className="space-y-1 px-2">
          <a href="#" className="sidebar-item active">
            <FileText size={20} className="text-brainy-accent" />
            <span>My Documents</span>
          </a>
          <a href="#" className="sidebar-item">
            <Clock size={20} className="text-brainy-accent" />
            <span>History</span>
          </a>
          <a href="#" className="sidebar-item">
            <Settings size={20} className="text-brainy-accent" />
            <span>Settings</span>
          </a>
          <a href="#" className="sidebar-item">
            <Info size={20} className="text-brainy-accent" />
            <span>About</span>
          </a>
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <p className="text-sm text-brainy-text/70 mb-2">Not logged in</p>
        <LoginButtons />
      </div>
    </aside>
  );
};

export default Sidebar;
