// src/app/signals/[id]/page.tsx
'use client'; // Needed for useParams and potential client-side interactions

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getTradingSignals, type TradingSignal } from '@/services/trading-signals'; // Assuming this fetches all signals
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Clock, Tag, Target, TrendingDown, Crosshair, Share2, Star, Info } from 'lucide-react'; // Added Icons
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

export default function SignalDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const signalId = params.id; // The ID will likely be the timestamp or a unique identifier

  const [signal, setSignal] = useState<TradingSignal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [formattedTimestamp, setFormattedTimestamp] = useState<string | null>(null);


  useEffect(() => {
    async function fetchSignal() {
      setLoading(true);
      setError(null);
      try {
        // In a real app, you'd likely fetch *one* specific signal by ID.
        // Here, we fetch all and find the matching one based on timestamp.
        // This is inefficient for large datasets.
        const allSignals = await getTradingSignals();
        // Assuming the ID passed in the URL is the ISO timestamp string
        const foundSignal = allSignals.find(s => encodeURIComponent(s.timestamp) === signalId);

        if (foundSignal) {
          setSignal(foundSignal);
          setFormattedTimestamp(format(new Date(foundSignal.timestamp), 'PPpp'));
        } else {
          setError('Signal not found.');
        }
      } catch (e) {
        console.error("Failed to fetch signal details:", e);
        setError('Could not load signal details.');
      } finally {
        setLoading(false);
      }
    }

    if (signalId) {
      fetchSignal();
    } else {
        setError('Invalid signal ID.');
        setLoading(false);
    }
  }, [signalId]);

  if (loading) {
    return <SignalDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-destructive">{error}</p>
        <Button variant="outline" onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  if (!signal) {
    return null; // Should be covered by error state, but good practice
  }

  const isBuy = signal.direction === 'Buy';
  const directionColor = isBuy ? 'text-green-600' : 'text-red-600';
  const directionBg = isBuy ? 'bg-green-100' : 'bg-red-100';
  const DirectionIcon = isBuy ? ArrowUpRight : ArrowDownLeft;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with Back Button */}
       <div className="mb-6 flex items-center justify-between">
         <Button variant="outline" size="sm" onClick={() => router.back()}>
           <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
         </Button>
          {/* Placeholder for potential actions like edit for admins */}
       </div>


      <Card className="shadow-lg w-full">
         <CardHeader className="pb-4 border-b">
           <div className="flex justify-between items-start mb-3">
             <div>
               <CardTitle className="text-xl mb-1 flex items-center gap-2">
                 <span className={cn("p-1.5 rounded-full", directionBg)}>
                   <DirectionIcon className={cn("h-5 w-5", directionColor)} strokeWidth={2.5} />
                 </span>
                 {signal.asset} - {signal.direction} Signal
               </CardTitle>
               <CardDescription className="flex items-center gap-1 text-sm">
                 <Tag className="h-4 w-4" /> Strategy: {signal.strategyId}
               </CardDescription>
             </div>
              <Badge variant={isBuy ? "default" : "destructive"} className={cn("text-sm", isBuy ? "bg-green-600 text-white" : "bg-red-600 text-white")}>
                {signal.direction}
              </Badge>
           </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
               <Clock className="h-4 w-4" />
               <span>{formattedTimestamp || 'Loading time...'}</span>
            </div>
         </CardHeader>

         <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
           {/* Price Information */}
           <div className='space-y-4'>
              <h3 className="font-semibold text-lg mb-2 text-primary">Price Levels</h3>
               <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                 <Target className="h-5 w-5 text-primary flex-shrink-0" />
                 <div>
                    <span className="text-muted-foreground text-sm">Entry Price:</span>
                    <p className="font-semibold text-lg">{signal.entryPrice.toFixed(2)}</p>
                 </div>
               </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                  <Crosshair className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                      <span className="text-muted-foreground text-sm">Target Price:</span>
                      <p className="font-semibold text-lg">{signal.targetPrice.toFixed(2)}</p>
                  </div>
                </div>
               <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                 <TrendingDown className="h-5 w-5 text-destructive flex-shrink-0" />
                 <div>
                    <span className="text-muted-foreground text-sm">Stop Loss:</span>
                    <p className="font-semibold text-lg">{signal.stopLoss.toFixed(2)}</p>
                 </div>
               </div>
           </div>

           {/* Indicator & Additional Info */}
           <div className='space-y-4'>
              <h3 className="font-semibold text-lg mb-2 text-primary">Indicators & Info</h3>
              <div className="p-3 bg-muted/50 rounded-md space-y-2">
                  <p className="text-sm text-muted-foreground">Key Indicator Values:</p>
                  {Object.entries(signal.indicatorValues).length > 0 ? (
                       <ul className="list-disc list-inside text-sm space-y-1">
                           {Object.entries(signal.indicatorValues).map(([key, value]) => (
                               <li key={key}>
                                   <span className="font-medium">{key}:</span> {typeof value === 'number' ? value.toFixed(2) : value}
                               </li>
                           ))}
                       </ul>
                  ) : (
                      <p className="text-sm text-muted-foreground italic">No specific indicator values provided for this signal.</p>
                  )}
              </div>
              {/* Placeholder for Timeframe and Notes */}
               <div className="p-3 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1"><Info className="h-4 w-4"/> Additional Notes:</p>
                  <p className="text-sm italic">No additional notes for this signal.</p> {/* Placeholder */}
               </div>
                <div className="p-3 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1"><Clock className="h-4 w-4"/> Timeframe:</p>
                  <p className="text-sm italic">N/A</p> {/* Placeholder */}
               </div>
           </div>
         </CardContent>

         <Separator className="my-4" />

         <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
           <Button variant="outline" size="sm">
             <Share2 className="mr-2 h-4 w-4" /> Share Signal
           </Button>
           <Button variant="outline" size="sm">
             <Star className="mr-2 h-4 w-4" /> Add to Favorites
           </Button>
         </CardFooter>
      </Card>
    </div>
  );
}


// Skeleton component for loading state
function SignalDetailsSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
        <div className="mb-6 flex items-center justify-between">
             <Skeleton className="h-9 w-32" />
        </div>
        <Card className="shadow-lg w-full">
            <CardHeader className="pb-4 border-b">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-7 w-16 rounded-full" />
                </div>
                 <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className='space-y-4'>
                     <Skeleton className="h-5 w-24 mb-2" />
                     <Skeleton className="h-16 w-full rounded-md" />
                     <Skeleton className="h-16 w-full rounded-md" />
                     <Skeleton className="h-16 w-full rounded-md" />
                 </div>
                  <div className='space-y-4'>
                     <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-24 w-full rounded-md" />
                      <Skeleton className="h-16 w-full rounded-md" />
                      <Skeleton className="h-16 w-full rounded-md" />
                  </div>
            </CardContent>
             <Separator className="my-4" />
             <CardFooter className="flex justify-end gap-3 pt-4">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-36" />
             </CardFooter>
        </Card>
    </div>
  );
}

