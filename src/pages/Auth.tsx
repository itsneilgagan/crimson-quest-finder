import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit3, User } from 'lucide-react';
import heroImage from '@/assets/sarvam-hero.jpg';
import { AddServiceModal } from '@/components/AddServiceModal';

const Auth = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
        });
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background/50 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/90 backdrop-blur border-burgundy/20">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isLogin ? 'Welcome back to Sarvam' : 'Join the Sarvam community'}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </Button>
            </form>
            <div className="mt-4 text-center space-y-2">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowForm(false)}
                className="text-sm text-muted-foreground"
              >
                ← Back to profiles
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Sarvam Community" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
        
        {/* App Title Overlay */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">sarvam</h1>
          <p className="text-white/80 text-lg mb-4">connecting services...</p>
          <Badge className="bg-primary text-white text-sm px-3 py-1">
            <span className="font-bold mr-2">TOP</span>
            #1 in Services Today
          </Badge>
        </div>
      </div>

      {/* Profile Selection */}
      <div className="px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold text-foreground mb-12">Choose your profile</h2>
        
        {/* Profile Grid */}
        <div className="max-w-md mx-auto">
          {/* Profile Avatars Row */}
          <div className="flex justify-center gap-8 mb-12">
            <div 
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                setIsLogin(true);
                setShowForm(true);
              }}
            >
              <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                <div className="text-white text-4xl">😊</div>
              </div>
              <span className="text-foreground font-medium text-lg">Customer</span>
            </div>
            
            <div 
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => {
                setIsLogin(true);
                setShowForm(true);
              }}
            >
              <div className="w-24 h-24 bg-orange-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                <div className="text-white text-4xl">😊</div>
              </div>
              <span className="text-foreground font-medium text-lg">Provider</span>
            </div>
          </div>
          
          {/* Action Buttons Row */}
          <div className="flex justify-center gap-8">
            <div 
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowAddModal(true)}
            >
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-3 shadow-lg border border-border">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground font-medium">Add Service</span>
            </div>
            
            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-3 shadow-lg border border-border">
                <Edit3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground font-medium">Edit</span>
            </div>
          </div>
        </div>
      </div>

      <AddServiceModal 
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onServiceAdded={() => {
          toast({
            title: "Success!",
            description: "Your service has been added successfully.",
          });
        }}
      />
    </div>
  );
};

export default Auth;