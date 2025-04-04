
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LoginButtons: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/login" className="w-full">
        <Button variant="default" className="w-full">Login</Button>
      </Link>
      <Link to="/signup" className="w-full">
        <Button variant="default" className="w-full">Signup</Button>
      </Link>
    </div>
  );
};

export default LoginButtons;
