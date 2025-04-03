
import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginButtons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Link to="/login" className="glass-button flex-1">
        <LogIn size={18} />
        <span>Login</span>
      </Link>
      <Link to="/signup" className="glass-button-accent flex-1">
        <UserPlus size={18} />
        <span>Signup</span>
      </Link>
    </div>
  );
};

export default LoginButtons;
