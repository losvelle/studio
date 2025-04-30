
'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/navigation'; // Import useRouter
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Import Input
import { Switch } from "@/components/ui/switch";
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Import Description
  DialogFooter,
  DialogTrigger,
  DialogClose // Import Close
} from "@/components/ui/dialog"; // Import Dialog components
import { LogOut, CreditCard, Bell, ShieldCheck, Mail, ArrowUpCircle, Edit } from 'lucide-react'; // Added Edit icon
import { useToast } from '@/hooks/use-toast'; // Import useToast
import { format } from 'date-fns'; // Import format for consistent date formatting

// Mock user data - replace with actual data fetching
const initialUser = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatarUrl: "https://picsum.photos/100/100", // Placeholder image
  subscription: {
    plan: "Professional", // Updated plan
    expiryDate: "2024-12-31", // ISO string or consistent format
  },
  notificationPreferences: {
    email: true,
    push: false,
  },
};

// Define the subscription tiers (ordered)
const subscriptionTiers = ["Trial", "Starter", "Professional", "Ultimate"];

export default function AccountPage() {
  const { toast } = useToast(); // Initialize toast
  const router = useRouter(); // Initialize router
  const [user, setUser] = useState(initialUser); // Use state for user data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [formattedExpiryDate, setFormattedExpiryDate] = useState<string | null>(null); // State for formatted date


  // Format expiry date client-side to avoid hydration errors
  useEffect(() => {
    try {
      const date = new Date(user.subscription.expiryDate);
      if (!isNaN(date.getTime())) {
        // Use a consistent format like 'PP' (e.g., Dec 31, 2024)
        setFormattedExpiryDate(format(date, 'PP'));
      } else {
        setFormattedExpiryDate('Invalid date');
      }
    } catch (error) {
      console.error("Error formatting expiry date:", error);
      setFormattedExpiryDate('Error');
    }
  }, [user.subscription.expiryDate]); // Re-run if expiryDate changes


  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log('Logout clicked');
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  const handleManageBilling = () => {
    // TODO: Implement actual billing management logic (e.g., redirect to Stripe portal)
    console.log('Manage Billing clicked');
    toast({
      title: "Billing Management",
      description: "Redirecting to billing portal... (Simulation)",
    });
    // Example: window.location.href = 'https://billing.example.com';
  };

  const handleUpgradePlan = () => {
    // Navigate to the upgrade page
    router.push('/upgrade');
    console.log('Upgrade Plan clicked - navigating');
    // The toast is no longer needed here as we navigate away
    // toast({
    //     title: "Upgrade Your Plan",
    //     description: "Redirecting to view upgrade options...",
    // });
  };


  const handleNotificationChange = (type: 'email' | 'push', checked: boolean) => {
    setUser(currentUser => ({
      ...currentUser,
      notificationPreferences: {
        ...currentUser.notificationPreferences,
        [type]: checked,
      },
    }));
    console.log(`Notification preference changed: ${type} = ${checked}`);
    toast({
      title: "Preferences Updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${checked ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleProfileUpdate = (event: React.FormEvent) => {
      event.preventDefault(); // Prevent default form submission
      setUser(currentUser => ({
          ...currentUser,
          name: editedName,
          email: editedEmail,
      }));
      setIsEditModalOpen(false); // Close the modal
      toast({
          title: "Profile Updated",
          description: "Your name and email have been successfully updated.",
      });
      console.log('Profile updated:', { name: editedName, email: editedEmail });
  };

  // Function to reset edit form fields when dialog opens
  const handleOpenEditModal = () => {
      setEditedName(user.name);
      setEditedEmail(user.email);
      setIsEditModalOpen(true);
  }

  const currentPlanIndex = subscriptionTiers.indexOf(user.subscription.plan);
  const isHighestTier = currentPlanIndex === subscriptionTiers.length - 1; // Check if current plan is the last in the ordered list


  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">Account Settings</h1>

      {/* User Information */}
      <Card className="mb-8 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between gap-4"> {/* Added justify-between */}
           <div className="flex items-center gap-4"> {/* Wrapper for avatar and text */}
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-4 w-4"/> {user.email}
                </CardDescription>
              </div>
           </div>
            {/* Edit Profile Button/Dialog Trigger */}
             <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleOpenEditModal}>
                        <Edit className="h-5 w-5" />
                        <span className="sr-only">Edit Profile</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                             <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                             </DialogClose>
                             <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </CardHeader>
      </Card>

      {/* Subscription Details */}
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary"/> Subscription</CardTitle>
          <CardDescription>Manage your current plan and billing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Plan:</span>
            <span className="font-semibold">{user.subscription.plan}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Renews On:</span>
            {/* Render the formatted date from state */}
            <span className="font-semibold">{formattedExpiryDate || 'Loading date...'}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleManageBilling}>
            <CreditCard className="mr-2 h-4 w-4"/> Manage Billing
          </Button>
          {!isHighestTier && ( // Show upgrade only if not on the highest tier
            <Button size="sm" onClick={handleUpgradePlan}>
               <ArrowUpCircle className="mr-2 h-4 w-4" /> Upgrade Plan
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Settings */}
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary"/> Notification Preferences</CardTitle>
          <CardDescription>Choose how you receive signal alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive new signal alerts via email.
              </span>
            </Label>
            <Switch
              id="email-notifications"
              checked={user.notificationPreferences.email}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)} // Add handler
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get real-time alerts on your mobile device (requires app install).
              </span>
            </Label>
            <Switch
              id="push-notifications"
              checked={user.notificationPreferences.push}
              onCheckedChange={(checked) => handleNotificationChange('push', checked)} // Add handler
              disabled // Keep disabled if mobile app integration isn't ready
            />
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <div className="mt-12 flex justify-center">
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}
