
import React from 'react';
import { Link } from 'react-router-dom';

const LoginButtons: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/login" className="glass-button-accent w-full py-2 justify-center">
        <span>Login</span>
      </Link>
      <Link to="/signup" className="glass-button w-full py-2 justify-center">
        <span>Signup</span>
      </Link>
    </div>
  );
};

export default LoginButtons;
