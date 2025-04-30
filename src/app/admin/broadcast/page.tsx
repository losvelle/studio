
'use client';

import React, { useState } from 'react';
import { BroadcastForm } from '@/components/admin/broadcast-form';
import { useToast } from '@/hooks/use-toast'; // Import useToast
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';


export default function AdminBroadcastPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBroadcastSubmit = async (data: any) => { // Use 'any' for mock, define proper type later
    setIsSubmitting(true);
    setError(null);
    try {
      console.log("Broadcasting signal data:", data);
      // TODO: Implement actual API call to broadcast the signal
      // This would typically involve sending the 'data' object to your backend service
      // which then handles pushing the signal to subscribed users (e.g., via push notifications, WebSockets).

      // Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check for simulated error (for testing)
      // if (Math.random() > 0.8) {
      //     throw new Error("Simulated network error during broadcast.");
      // }

       toast({
         title: "Signal Broadcast Successful",
         description: `Signal for ${data.asset} (${data.direction}) has been sent.`,
       });

       // Optionally clear the form or redirect after successful broadcast
       // reset(); // Assuming BroadcastForm exposes a reset method or handles it internally

    } catch (e) {
      console.error("Failed to broadcast signal:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to broadcast signal: ${errorMessage}`);
       toast({
         title: "Broadcast Failed",
         description: "Could not send the signal. Please check the details and try again.",
         variant: "destructive",
       });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary text-center">Broadcast Trading Signal</h1>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Broadcast Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

       {/* The BroadcastForm component handles the UI and form logic */}
       <BroadcastForm onSubmit={handleBroadcastSubmit} isSubmitting={isSubmitting} />

    </div>
  );
}
