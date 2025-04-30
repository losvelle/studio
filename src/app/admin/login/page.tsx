
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
import { Settings } from 'lucide-react'; // Use an appropriate icon

export default function AdminLoginPage() {
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement actual admin login logic (verify credentials, set session/token)
    console.log('Admin Login submitted');

    // For now, redirect to admin dashboard on successful login (simulation)
    window.location.href = '/admin/dashboard'; // Simple redirect for demo
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-lg border-primary">
        <CardHeader className="text-center">
           <div className="mx-auto p-3 bg-primary rounded-full w-fit mb-4">
             <Settings className="h-8 w-8 text-primary-foreground" />
           </div>
          <CardTitle className="text-2xl">Admin Panel Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="admin_user" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
             <Button className="w-full" type="submit">Sign in</Button>
             <div className="text-center text-sm">
               {/* Add Forgot Password link if needed for admin */}
                <Link href="#" // Placeholder link, implement if needed
                  className="underline text-muted-foreground hover:text-primary">
                  Forgot your password?
                </Link>
             </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
