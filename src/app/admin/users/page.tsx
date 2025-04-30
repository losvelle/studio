
'use client'; // Required for state, effects, and interactions

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Import DialogClose
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Search, Loader2, AlertTriangle, UserPlus } from 'lucide-react'; // Import icons
import { getUsers, type User } from '@/services/users'; // Import user service and type
import { UserEditForm } from '@/components/admin/user-edit-form'; // Import the edit form
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns'; // For formatting dates

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // For form/delete submission state
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [viewingUser, setViewingUser] = useState<User | undefined>(undefined); // For view details dialog
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { toast } = useToast();

  // Fetch users on mount
  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); // Initialize filtered list
      } catch (e) {
        console.error("Failed to fetch users:", e);
        setError("Could not load users. Please try again later.");
        toast({ title: "Error Loading Users", description: "Could not fetch user data.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [toast]); // Added toast dependency

  // Filter users based on search term
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = users.filter(user =>
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);


  const handleUpdateUser = async (data: any) => { // Use 'any' for mock, define type later
    setIsSubmitting(true);
    setError(null);
    try {
      console.log("Updating user data:", data);
      // Simulate API Call for update
      await new Promise(resolve => setTimeout(resolve, 1000));

      // --- Mock Update Logic ---
      setUsers(prev => prev.map(u => u.id === data.id ? { ...u, ...data } : u));
       toast({ title: "User Updated", description: `Details for ${data.name} have been updated.` });
      setIsEditFormOpen(false); // Close dialog
      setEditingUser(undefined);
    } catch (e) {
        console.error("Failed to update user:", e);
        setError("Could not update user details. Please try again.");
         toast({ title: "Error Updating User", description: "Failed to save user changes.", variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
  };

   const handleDeleteUser = async (userId: string) => {
     // No need to set isSubmitting here, AlertDialog handles its own state
     setError(null);
     try {
       console.log("Deleting user with ID:", userId);
       // Simulate API Call for delete
       await new Promise(resolve => setTimeout(resolve, 500));

       // --- Mock Delete Logic ---
       setUsers(prev => prev.filter(u => u.id !== userId));
       toast({ title: "User Deleted", description: `User has been successfully deleted.` });
     } catch (e) {
       console.error("Failed to delete user:", e);
       setError("Could not delete user. Please try again.");
        toast({ title: "Error Deleting User", description: "Failed to delete the user.", variant: "destructive" });
     }
   };


  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setIsEditFormOpen(true);
  };

  const openViewDialog = (user: User) => {
    setViewingUser(user);
    // No need for separate state, use DialogTrigger and DialogContent directly
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading Users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">User Management</h1>
         <div className="flex items-center gap-2 w-full sm:w-auto">
             <div className="relative flex-1 sm:flex-initial">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                 type="search"
                 placeholder="Search users..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-8 w-full sm:w-64"
               />
             </div>
             {/* Add New User Button (Optional - requires another form) */}
             {/* <Button>
                 <UserPlus className="mr-2 h-4 w-4" /> Add User
             </Button> */}
         </div>
      </div>

      {error && !loading && ( // Show error only if not loading
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>View, manage, and edit user accounts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscription Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={
                          user.subscriptionStatus === 'Active' ? 'default' :
                          user.subscriptionStatus === 'Trial' ? 'secondary' :
                          'destructive'
                      } className={user.subscriptionStatus === 'Active' ? 'bg-green-600 text-white' : ''}>
                        {user.subscriptionStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(user.joinedDate), 'PP')}</TableCell> {/* Format date */}
                    <TableCell className="text-right space-x-2">
                        {/* View Details Dialog */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => openViewDialog(user)}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View Details</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                <DialogTitle>User Details: {viewingUser?.name}</DialogTitle>
                                </DialogHeader>
                                {viewingUser && ( // Render content only when viewingUser is set
                                    <div className="space-y-3 py-4 text-sm">
                                        <p><span className="font-medium text-muted-foreground">ID:</span> {viewingUser.id}</p>
                                        <p><span className="font-medium text-muted-foreground">Email:</span> {viewingUser.email}</p>
                                        <p><span className="font-medium text-muted-foreground">Status:</span> {viewingUser.subscriptionStatus}</p>
                                        <p><span className="font-medium text-muted-foreground">Joined:</span> {format(new Date(viewingUser.joinedDate), 'PPP')}</p>
                                        <p><span className="font-medium text-muted-foreground">Admin:</span> {viewingUser.isAdmin ? 'Yes' : 'No'}</p>
                                        {/* Add more details as needed */}
                                    </div>
                                )}
                                 {/* <DialogFooter> // Optional footer actions
                                     <DialogClose asChild>
                                         <Button type="button" variant="secondary">Close</Button>
                                     </DialogClose>
                                 </DialogFooter> */}
                            </DialogContent>
                        </Dialog>

                       {/* Edit User Dialog */}
                        <Dialog open={isEditFormOpen && editingUser?.id === user.id} onOpenChange={(isOpen) => { if (!isOpen) { setIsEditFormOpen(false); setEditingUser(undefined); } else { setIsEditFormOpen(isOpen); }}}>
                           <DialogTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => openEditDialog(user)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit User</span>
                              </Button>
                           </DialogTrigger>
                           <DialogContent className="sm:max-w-lg">
                             <DialogHeader>
                               <DialogTitle>Edit User: {editingUser?.name}</DialogTitle>
                             </DialogHeader>
                              {editingUser && (
                                  <UserEditForm
                                      user={editingUser}
                                      onSubmit={handleUpdateUser}
                                      onCancel={() => { setIsEditFormOpen(false); setEditingUser(undefined); }}
                                      isSubmitting={isSubmitting}
                                  />
                              )}
                           </DialogContent>
                        </Dialog>

                       {/* Delete Confirmation Dialog */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete User</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user account
                                    <span className="font-semibold"> {user.name} ({user.email}) </span>
                                    and remove their data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive hover:bg-destructive/90">
                                    Yes, delete user
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    {searchTerm ? 'No users match your search.' : 'No users found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* TODO: Add Pagination if needed */}
      </Card>
    </div>
  );
}
