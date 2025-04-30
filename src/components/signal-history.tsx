'use client';

import type { TradingSignal } from '@/services/trading-signals';
import React, { useState, useMemo, useEffect } from 'react';
import { SignalCard } from './signal-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { FilterX, Loader2 } from 'lucide-react';
import Link from 'next/link'; // Import Link
import { getTradingSignals } from '@/services/trading-signals'; // Import fetch function
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


// Renamed from SignalHistoryProps to FullSignalHistoryProps
// interface FullSignalHistoryProps {
//   signals: TradingSignal[]; // This will now be fetched client-side
// }

// Renamed from SignalHistory to FullSignalHistory
export function FullSignalHistory() {
   const [signals, setSignals] = useState<TradingSignal[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const [assetFilter, setAssetFilter] = useState<string>('all');
   const [strategyFilter, setStrategyFilter] = useState<string>('all');
   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
   const [endDate, setEndDate] = useState<Date | undefined>(undefined);

   // Fetch signals on component mount
   useEffect(() => {
     async function fetchSignals() {
       setLoading(true);
       setError(null);
       try {
         const fetchedSignals = await getTradingSignals();
         setSignals(fetchedSignals);
       } catch (e) {
         console.error("Failed to fetch trading signals:", e);
         setError("Could not load signal history. Please try again later.");
       } finally {
         setLoading(false);
       }
     }
     fetchSignals();
   }, []); // Empty dependency array ensures this runs only once on mount


  // Extract unique assets and strategies for filter dropdowns
  const uniqueAssets = useMemo(() => {
    const assets = new Set(signals.map(s => s.asset));
    return ['all', ...Array.from(assets).sort()]; // Sort alphabetically
  }, [signals]);

  const uniqueStrategies = useMemo(() => {
    const strategies = new Set(signals.map(s => s.strategyId));
    return ['all', ...Array.from(strategies).sort()]; // Sort alphabetically
  }, [signals]);


  const filteredSignals = useMemo(() => {
    return signals.filter(signal => {
      const signalDate = new Date(signal.timestamp);
      const isAssetMatch = assetFilter === 'all' || signal.asset === assetFilter;
      const isStrategyMatch = strategyFilter === 'all' || signal.strategyId === strategyFilter;
      const isStartDateMatch = !startDate || signalDate >= startDate;
      // Adjust end date to include the whole day
      const isEndDateMatch = !endDate || signalDate < new Date(endDate.getTime() + 24 * 60 * 60 * 1000);


      return isAssetMatch && isStrategyMatch && isStartDateMatch && isEndDateMatch;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Keep sorted by newest first
  }, [signals, assetFilter, strategyFilter, startDate, endDate]);

  const clearFilters = () => {
    setAssetFilter('all');
    setStrategyFilter('all');
    setStartDate(undefined);
    setEndDate(undefined);
  };

   if (loading) {
     return (
       <div className="flex justify-center items-center min-h-[calc(100vh-112px)]">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <span className="ml-2 text-muted-foreground">Loading History...</span>
       </div>
     );
   }

   if (error) {
     return (
       <div className="container mx-auto py-8 px-4">
         <Alert variant="destructive" className="mb-6">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{error}</AlertDescription>
         </Alert>
       </div>
     );
   }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Full Signal History</h1>

      {/* Filtering Controls */}
      <div className="mb-8 p-4 bg-card rounded-lg shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="asset-filter">Filter by Asset</Label>
           <Select value={assetFilter} onValueChange={setAssetFilter}>
             <SelectTrigger id="asset-filter">
               <SelectValue placeholder="Select Asset" />
             </SelectTrigger>
             <SelectContent>
               {uniqueAssets.map(asset => (
                 <SelectItem key={asset} value={asset}>{asset === 'all' ? 'All Assets' : asset}</SelectItem>
               ))}
             </SelectContent>
           </Select>
        </div>
        <div>
          <Label htmlFor="strategy-filter">Filter by Strategy</Label>
           <Select value={strategyFilter} onValueChange={setStrategyFilter}>
             <SelectTrigger id="strategy-filter">
               <SelectValue placeholder="Select Strategy" />
             </SelectTrigger>
             <SelectContent>
               {uniqueStrategies.map(strategy => (
                 <SelectItem key={strategy} value={strategy}>{strategy === 'all' ? 'All Strategies' : strategy}</SelectItem>
               ))}
             </SelectContent>
           </Select>
        </div>
        <div>
           <Label htmlFor="start-date">Start Date</Label>
           <DatePicker id="start-date" date={startDate} onDateChange={setStartDate} />
        </div>
        <div className="flex flex-col">
           <Label htmlFor="end-date">End Date</Label>
           <DatePicker id="end-date" date={endDate} onDateChange={setEndDate} />
        </div>
        <div className="col-span-full flex justify-end mt-2">
           <Button variant="outline" size="sm" onClick={clearFilters}>
             <FilterX className="mr-2 h-4 w-4" />
             Clear Filters
           </Button>
         </div>
      </div>

      {/* Signal List */}
      {filteredSignals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map((signal, index) => (
             // Wrap SignalCard with Link to its detail page
             <Link key={`${signal.timestamp}-${index}`} href={`/signals/${encodeURIComponent(signal.timestamp)}`} className="block hover:opacity-90 transition-opacity">
                 <SignalCard signal={signal} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground bg-card rounded-lg shadow-sm">
          No signals match the current filters.
        </div>
      )}
    </div>
  );
}
