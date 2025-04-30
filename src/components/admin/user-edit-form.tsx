
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch'; // Import Switch
import type { User } from '@/services/users'; // Assuming you have a user type
import { Save, X } from 'lucide-react'; // Import icons

// Zod schema for user edit validation (adjust based on editable fields)
const userEditSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subscriptionStatus: z.enum(['Active', 'Inactive', 'Trial', 'Expired'], { required_error: "Subscription status is required." }),
  isAdmin: z.boolean().optional(), // Example: Allow setting admin status
  // Add other editable fields as needed (e.g., plan type, expiry date)
});

type UserEditFormData = z.infer<typeof userEditSchema>;

interface UserEditFormProps {
  user: User; // The user object to edit
  onSubmit: (data: UserEditFormData) => Promise<void>; // Function to handle submission
  onCancel: () => void; // Function to handle cancellation/closing the form/dialog
  isSubmitting?: boolean; // Flag to disable form during submission
}

export function UserEditForm({ user, onSubmit, onCancel, isSubmitting }: UserEditFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: { // Pre-fill form with user data
      id: user.id,
      name: user.name,
      email: user.email,
      subscriptionStatus: user.subscriptionStatus,
      isAdmin: user.isAdmin || false, // Default to false if not present
    },
  });

  const handleFormSubmit = (data: UserEditFormData) => {
     onSubmit(data);
  };

  return (
    // Removed Card wrapper, assuming this form is used within a Dialog or similar container
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} disabled={isSubmitting} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register('email')} disabled={isSubmitting} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
        </div>

        {/* Subscription Status */}
        <div className="grid gap-2">
            <Label htmlFor="subscriptionStatus">Subscription Status</Label>
            <Controller
                name="subscriptionStatus"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <SelectTrigger id="subscriptionStatus">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Trial">Trial</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                    </Select>
                )}
            />
            {errors.subscriptionStatus && <p className="text-sm text-destructive">{errors.subscriptionStatus.message}</p>}
        </div>

        {/* Admin Status Toggle (Example) */}
        <div className="flex items-center space-x-2">
             <Controller
                name="isAdmin"
                control={control}
                render={({ field }) => (
                   <Switch
                      id="isAdmin"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                   />
                )}
             />
             <Label htmlFor="isAdmin">Admin Privileges</Label>
             {errors.isAdmin && <p className="text-sm text-destructive">{errors.isAdmin.message}</p>}
        </div>

        {/* Add other editable fields here */}

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
    </form>
  );
}
