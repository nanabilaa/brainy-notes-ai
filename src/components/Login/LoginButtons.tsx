
import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

const LoginButtons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <button className="glass-button flex-1">
        <LogIn size={18} />
        <span>Login</span>
      </button>
      <button className="glass-button-accent flex-1">
        <UserPlus size={18} />
        <span>Signup</span>
      </button>
    </div>
  );
};

export default LoginButtons;
