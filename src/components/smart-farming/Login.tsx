
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { handleLogin, handleSignup } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [loginState, loginAction] = useFormState(handleLogin, { error: null, success: false });
  const [signupState, signupAction] = useFormState(handleSignup, { error: null, success: false });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/dashboard');
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (loginState?.error) {
      toast({ variant: 'destructive', title: 'Login Failed', description: loginState.error });
    }
    if (loginState?.success) {
      toast({ title: 'Success', description: 'Logged in successfully.' });
      router.push('/dashboard');
    }
  }, [loginState, router, toast]);

  useEffect(() => {
    if (signupState?.error) {
      toast({ variant: 'destructive', title: 'Signup Failed', description: signupState.error });
    }
    if (signupState?.success) {
      toast({ title: 'Success', description: 'Account created. Please log in.' });
      setActiveTab('login'); // Switch to login tab after successful signup
    }
  }, [signupState, toast]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6 items-center gap-2">
            <Bot className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary font-headline">AgriAssist</h1>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <form action={loginAction}>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Password</Label>
                    <Input id="password-login" name="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton>Login</SubmitButton>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <form action={signupAction}>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>Enter your email and password to get started.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" name="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton>Sign Up</SubmitButton>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
