
'use client'; // Required for state, effects, and form handling

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Loader2, AlertTriangle } from 'lucide-react'; // Import icons
import { getStrategies, type TradingStrategy } from '@/services/strategies'; // Import service and type
import { StrategyForm } from '@/components/admin/strategy-form'; // Import the form component
import { useToast } from '@/hooks/use-toast'; // Import useToast

export default function AdminStrategiesPage() {
  const [strategies, setStrategies] = useState<TradingStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<TradingStrategy | undefined>(undefined);
  const { toast } = useToast();

  // Fetch strategies on mount
  useEffect(() => {
    async function loadStrategies() {
      setLoading(true);
      setError(null);
      try {
        const fetchedStrategies = await getStrategies();
        setStrategies(fetchedStrategies);
      } catch (e) {
        console.error("Failed to fetch strategies:", e);
        setError("Could not load strategies. Please try again later.");
        toast({
            title: "Error Loading Strategies",
            description: "Could not fetch strategies from the server.",
            variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    loadStrategies();
  }, [toast]); // Added toast to dependency array


  const handleAddOrUpdateStrategy = async (data: any) => { // Use 'any' for mock, define proper type later
    setIsSubmitting(true);
    setError(null);
    try {
      console.log("Submitting strategy data:", data);
      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingStrategy) {
        // --- Mock Update Logic ---
        setStrategies(prev => prev.map(s => s.id === editingStrategy.id ? { ...s, ...data } : s));
        toast({ title: "Strategy Updated", description: `Strategy "${data.name}" has been updated.` });
      } else {
        // --- Mock Add Logic ---
        const newStrategy = { ...data, id: `new_${Date.now()}` }; // Mock ID generation
        setStrategies(prev => [...prev, newStrategy]);
         toast({ title: "Strategy Added", description: `New strategy "${data.name}" has been added.` });
      }
      setIsFormOpen(false); // Close dialog on success
      setEditingStrategy(undefined); // Reset editing state
    } catch (e) {
        console.error("Failed to save strategy:", e);
        const action = editingStrategy ? "update" : "add";
        setError(`Could not ${action} strategy. Please try again.`);
         toast({
           title: `Error ${action === 'update' ? 'Updating' : 'Adding'} Strategy`,
           description: `Could not save the strategy "${data.name}".`,
           variant: "destructive",
         });
    } finally {
        setIsSubmitting(false);
    }
  };

   const handleDeleteStrategy = async (strategyId: string) => {
     setIsSubmitting(true); // Use submitting state to indicate deletion in progress
     setError(null);
     try {
       console.log("Deleting strategy with ID:", strategyId);
       // Simulate API Call
       await new Promise(resolve => setTimeout(resolve, 500));

       // --- Mock Delete Logic ---
       setStrategies(prev => prev.filter(s => s.id !== strategyId));
        toast({ title: "Strategy Deleted", description: `Strategy has been successfully deleted.` });
        setIsFormOpen(false); // Close dialog if open
        setEditingStrategy(undefined);
     } catch (e) {
       console.error("Failed to delete strategy:", e);
       setError("Could not delete strategy. Please try again.");
        toast({
          title: "Error Deleting Strategy",
          description: "Could not delete the strategy.",
          variant: "destructive",
        });
     } finally {
       setIsSubmitting(false);
     }
   };


  const openEditDialog = (strategy: TradingStrategy) => {
    setEditingStrategy(strategy);
    setIsFormOpen(true);
  };

  const openAddDialog = () => {
    setEditingStrategy(undefined); // Ensure no strategy is being edited
    setIsFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading Strategies...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Strategy Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
           <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Strategy
              </Button>
           </DialogTrigger>
           <DialogContent className="sm:max-w-[600px]"> {/* Wider dialog */}
             <DialogHeader>
                {/* Title is set within StrategyForm */}
             </DialogHeader>
              {/* Render form inside the dialog */}
               <StrategyForm
                   key={editingStrategy?.id || 'new'} // Force re-render on edit/add switch
                   strategy={editingStrategy}
                   onSubmit={handleAddOrUpdateStrategy}
                   onDelete={editingStrategy ? handleDeleteStrategy : undefined} // Only pass delete if editing
                   isSubmitting={isSubmitting}
               />
           </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2">
           <AlertTriangle className="h-5 w-5"/>
           {error}
         </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Available Strategies</CardTitle>
          <CardDescription>View, add, edit, or delete trading strategies.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Win Rate</TableHead>
                <TableHead className="text-center">Profit Factor</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {strategies.length > 0 ? (
                strategies.map((strategy) => (
                  <TableRow key={strategy.id}>
                    <TableCell className="font-medium">{strategy.name}</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-xs">{strategy.description}</TableCell>
                    <TableCell className="text-center">
                       <Badge variant={strategy.performance.winRate > 60 ? "default" : strategy.performance.winRate > 40 ? "secondary" : "destructive"} className={strategy.performance.winRate > 60 ? "bg-green-600 text-white" : ""}>
                        {strategy.performance.winRate.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{strategy.performance.profitFactor.toFixed(2)}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="icon" onClick={() => openEditDialog(strategy)}>
                         <Edit className="h-4 w-4" />
                         <span className="sr-only">Edit</span>
                       </Button>
                       {/* Delete button now inside the form dialog */}
                       {/* <Button variant="destructive" size="icon" onClick={() => handleDeleteStrategy(strategy.id)} disabled={isSubmitting}>
                         <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Delete</span>
                       </Button> */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No strategies found. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
