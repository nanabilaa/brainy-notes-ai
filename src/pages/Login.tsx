
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual authentication logic
    toast({
      title: "Login Attempt",
      description: "This is a placeholder. Actual authentication would happen here.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brainy-darkPurple bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-4">
      <div className="glass-darker max-w-md w-full rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="rounded-full bg-brainy-lightPurple/30 p-4 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brainy-accent">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                <path d="M14.05 2a9 9 0 0 1 8 7.94"></path>
                <path d="M14.05 6A5 5 0 0 1 18 10"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-brainy-text">BrainyNotes</h1>
          </div>
          
          <h2 className="text-xl font-bold text-center mb-6">Login to your account</h2>
          
          <div className="flex gap-2 mb-6">
            <Link to="/login" className="flex-1 py-3 bg-brainy-darkPurple/80 rounded-md text-center font-medium">
              Login
            </Link>
            <Link to="/signup" className="flex-1 py-3 rounded-md text-center font-medium text-white/70 hover:bg-white/5 transition-colors">
              Signup
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-brainy-darkPurple/50 border-white/10 focus-visible:ring-brainy-accent"
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-brainy-darkPurple/50 border-white/10 focus-visible:ring-brainy-accent"
              />
            </div>
            
            <div className="text-sm">
              <Link to="#" className="text-brainy-lightPurple hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 bg-brainy-lightPurple hover:bg-brainy-lightPurple/90 transition-colors rounded-md font-medium"
            >
              Login
            </button>
          </form>
          
          <div className="text-center mt-6 text-sm">
            Not a member? <Link to="/signup" className="text-brainy-lightPurple hover:underline">Signup now</Link>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-4 left-4">
        <Link to="/" className="glass-button flex items-center gap-2">
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
