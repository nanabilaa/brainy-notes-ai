import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Brain } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Attempt",
      description: "This is a placeholder. Actual authentication would happen here.",
    });
    navigate('/');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Signup Attempt",
      description: "This is a placeholder. Actual signup logic would happen here.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-foreground p-6" style={{ backgroundImage: 'radial-gradient(circle at center top, #432a99 0%, #1a103e 100%)' }}>
      <div className="glass-card max-w-lg w-full rounded-2xl shadow-lg">
        <div className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/80 flex items-center justify-center shadow-md">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-brainy-text mt-2">BrainyNotes</h1>
          </div>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <div className="text-sm">
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full py-3 bg-primary hover:bg-primary/90 transition-colors rounded-md font-medium">
                  Login
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Not a member?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('signup');
                  }}
                  className="text-primary hover:underline"
                >
                  Signup now
                </a>
              </div>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Button type="submit" className="w-full py-3 bg-primary hover:bg-primary/90 transition-colors rounded-md font-medium">
                  Create Account
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('login');
                  }}
                  className="text-primary hover:underline"
                >
                  Login
                </a>
              </div>
            </TabsContent>
          </Tabs>
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