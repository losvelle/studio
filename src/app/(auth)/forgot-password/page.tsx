'use client'; // Mark as client component for form handling

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast'; // Import useToast

export default function ForgotPasswordPage() {
  const { toast } = useToast(); // Initialize toast

  const handlePasswordReset = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement actual password reset logic (e.g., send email)
    console.log('Password reset requested');

    // Show a success toast message (simulation)
    toast({
      title: "Password Reset Email Sent",
      description: "If an account exists for this email, you will receive reset instructions shortly.",
      variant: "default", // Or "success" if you have that variant
    });

     // Optionally redirect back to login after a delay or immediately
     // setTimeout(() => {
     //   window.location.href = '/login';
     // }, 3000);
  };

  return (
    <div className="flex min-h-[calc(100vh-56px-56px)] items-center justify-center p-4"> {/* Adjust height */}
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordReset}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
             <Button className="w-full" type="submit">Send Reset Instructions</Button>
             <div className="text-center text-sm">
               Remember your password?{' '}
               <Link href="/login" className="underline text-primary hover:text-primary/80">
                 Login
               </Link>
             </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
