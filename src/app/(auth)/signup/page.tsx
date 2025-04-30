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

export default function SignUpPage() {
   const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement actual sign-up logic
    console.log('Sign-up submitted');
    // For now, redirect to login on successful sign-up (simulation)
    window.location.href = '/login'; // Simple redirect for demo
  };

  return (
    <div className="flex min-h-[calc(100vh-56px-56px)] items-center justify-center p-4"> {/* Adjust height for header/footer */}
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="grid gap-4">
            {/* Add Name field if needed */}
            {/* <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" required />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
             {/* Add Confirm Password field if needed */}
             {/* <div className="grid gap-2">
               <Label htmlFor="confirm-password">Confirm Password</Label>
               <Input id="confirm-password" type="password" required />
             </div> */}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">Create account</Button>
            <div className="mt-2 text-center text-sm">
              Already have an account?{' '}
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
