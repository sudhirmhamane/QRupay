import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, Mail, Lock, User, Phone } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Google login handler
  const handleGoogleLogin = async () => {
    const redirectTo =
      window.location.hostname === 'qrupay.vercel.app'
        ? 'https://qrupay.vercel.app/dashboard'
        : window.location.origin + '/dashboard';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });
    if (error) {
      toast({
        title: 'Google Login Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  // Removed manual sign-up/login handler

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <Heart className="w-10 h-10 text-medical-primary animate-pulse mb-2" />
            <h1 className="text-4xl font-extrabold text-medical-dark">
              <span className="text-primary">QR</span>upay
            </h1>
            <span className="text-base text-muted-foreground">Your health, simplified.</span>
          </div>
          <CardTitle className="text-2xl font-bold mt-2">Sign in to continue</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg text-medical-dark font-semibold">Sign in securely with your Google account</span>
              <span className="text-sm text-muted-foreground">We use Google to keep your account safe and verified.</span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-3 text-base font-medium border-medical-primary hover:bg-medical-primary/10"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.22l6.9-6.9C36.16 2.36 30.45 0 24 0 14.64 0 6.4 5.48 2.44 13.44l8.06 6.27C12.6 13.36 17.82 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9.02h12.44c-.54 2.9-2.16 5.36-4.6 7.02l7.18 5.59C43.6 37.36 46.1 31.45 46.1 24.5z"/><path fill="#FBBC05" d="M10.5 28.71c-1.13-3.36-1.13-6.97 0-10.33l-8.06-6.27C.86 16.09 0 20.01 0 24c0 3.99.86 7.91 2.44 11.89l8.06-6.27z"/><path fill="#EA4335" d="M24 48c6.45 0 12.16-2.13 16.68-5.81l-7.18-5.59c-2.01 1.35-4.59 2.16-7.5 2.16-6.18 0-11.4-3.86-13.5-9.21l-8.06 6.27C6.4 42.52 14.64 48 24 48z"/></g></svg>
              {isLoading ? 'Please wait...' : 'Sign in with Google'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
