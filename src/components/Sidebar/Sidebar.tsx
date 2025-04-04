
import React from 'react';
import { FileText, Clock, Settings, Info, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LoginButtons from '../Login/LoginButtons';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, profile, signOut, loading } = useAuth();

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 z-50 md:hidden glass-button p-2"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <aside className={`glass-darker w-64 min-h-screen flex flex-col border-r border-white/10 transition-all duration-300 fixed z-40 md:static ${isOpen ? 'left-0' : '-left-full md:left-0'}`}>
        <Link to="/" className="p-4 flex items-center gap-3 border-b border-white/10">
          <div className="rounded-full bg-brainy-lightPurple/30 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brainy-accent">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.06 16a2.5 2.5 0 0 1-1.98-4.5A2.5 2.5 0 0 1 4.06 8a2.5 2.5 0 0 1 2.98-3.95A2.5 2.5 0 0 1 9.5 2Z"></path>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 19.94 16a2.5 2.5 0 0 0 1.98-4.5A2.5 2.5 0 0 0 19.94 8a2.5 2.5 0 0 0-2.98-3.95A2.5 2.5 0 0 0 14.5 2Z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-brainy-text">BrainyNotes</h1>
        </Link>

        <div className="py-6 flex-1">
          <p className="px-4 text-sm text-brainy-text/70 mb-2">Main Menu</p>

          <nav className="space-y-1 px-2">
            <Link to="/" className={`sidebar-item ${location.pathname === '/' ? 'active' : ''}`}>
              <FileText size={20} className="text-brainy-accent" />
              <span>My Documents</span>
            </Link>
            <Link to="/history" className={`sidebar-item ${location.pathname === '/history' ? 'active' : ''}`}>
              <Clock size={20} className="text-brainy-accent" />
              <span>History</span>
            </Link>
            <Link to="/settings" className={`sidebar-item ${location.pathname === '/settings' ? 'active' : ''}`}>
              <Settings size={20} className="text-brainy-accent" />
              <span>Settings</span>
            </Link>
            <Link to="/about" className={`sidebar-item ${location.pathname === '/about' ? 'active' : ''}`}>
              <Info size={20} className="text-brainy-accent" />
              <span>About</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : user ? (
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="bg-purple-600">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {profile?.username ? profile.username.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-left">{profile?.username || user.email?.split('@')[0]}</p>
                    <p className="text-xs text-brainy-text/70">Free plan</p>
                  </div>
                </div>
                <ChevronDown size={16} className="text-brainy-text/70" />
              </button>
              <button 
                onClick={() => signOut()}
                className="glass-button w-full py-2 justify-center flex items-center gap-2"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-brainy-text/70 mb-2">Not logged in</p>
              <LoginButtons />
            </>
          )}
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
