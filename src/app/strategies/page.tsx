
'use client'; // Required for state and filtering

import React, { useState, useMemo, useEffect } from 'react'; // Import hooks
import { getStrategies, type TradingStrategy } from '@/services/strategies';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Percent, Gauge, FilterX, Loader2 } from 'lucide-react'; // Added FilterX, Loader2
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Import Alert components
import { AlertTriangle } from 'lucide-react'; // Import AlertTriangle icon
import { cn } from '@/lib/utils'; // Import cn for conditional styling

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<TradingStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [performanceFilter, setPerformanceFilter] = useState<string>('all'); // 'all', 'winRate', 'profitFactor'
  const [categoryFilter, setCategoryFilter] = useState<string>('all'); // 'all' or specific category

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
       } finally {
         setLoading(false);
       }
     }
     loadStrategies();
   }, []); // Empty dependency array ensures this runs only once

   // Extract unique categories for the filter dropdown
   const uniqueCategories = useMemo(() => {
     const categories = new Set(strategies.map(s => s.category).filter(Boolean)); // Filter out undefined/null categories
     return ['all', ...Array.from(categories).sort()]; // Sort alphabetically
   }, [strategies]);


  // Filter strategies based on state
  const filteredStrategies = useMemo(() => {
    let filtered = [...strategies];

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(s => s.category === categoryFilter);
    }

    // Sort by performance metric (optional, if needed)
    if (performanceFilter === 'winRate') {
      filtered.sort((a, b) => b.performance.winRate - a.performance.winRate);
    } else if (performanceFilter === 'profitFactor') {
      filtered.sort((a, b) => b.performance.profitFactor - a.performance.profitFactor);
    } else {
       // Default sort: by name or keep original order (newest first if fetched that way)
       // Assuming original fetch order is desirable or sort by name
       filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [strategies, performanceFilter, categoryFilter]);

  const clearFilters = () => {
    setPerformanceFilter('all');
    setCategoryFilter('all');
  };

   if (loading) {
     return (
       <div className="flex justify-center items-center min-h-[calc(100vh-112px)]">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <span className="ml-2 text-muted-foreground">Loading Strategies...</span>
       </div>
     );
   }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Trading Strategies</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filter Options */}
      <Card className="mb-8 p-4 shadow grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
         <div>
           <Label htmlFor="performance-filter">Sort by Performance</Label>
           <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
             <SelectTrigger id="performance-filter">
               <SelectValue placeholder="Select Performance Metric" />
             </SelectTrigger>
             <SelectContent>
                <SelectItem value="all">Default</SelectItem>
                <SelectItem value="winRate">Win Rate (High to Low)</SelectItem>
                <SelectItem value="profitFactor">Profit Factor (High to Low)</SelectItem>
             </SelectContent>
           </Select>
         </div>
         <div>
           <Label htmlFor="category-filter">Filter by Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                 {uniqueCategories.map(category => (
                     <SelectItem key={category} value={category}>{category === 'all' ? 'All Categories' : category}</SelectItem>
                 ))}
              </SelectContent>
            </Select>
         </div>
         {/* Apply button removed - filtering happens on change */}
         {/* <Button className="w-full md:w-auto" onClick={() => console.log('Applying filters')}>Apply Filters</Button> */}
          <div className="flex justify-end md:col-start-3"> {/* Align clear button to the right */}
              <Button variant="outline" size="sm" onClick={clearFilters}>
                  <FilterX className="mr-2 h-4 w-4" />
                  Clear Filters
              </Button>
          </div>
      </Card>


      {filteredStrategies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrategies.map((strategy) => (
            // Wrap the Card with a Link to the strategy detail page
            <Link key={strategy.id} href={`/strategies/${strategy.id}`} className="block hover:opacity-90 transition-opacity">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col"> {/* Ensure consistent height */}
                <CardHeader>
                  <CardTitle>{strategy.name}</CardTitle>
                  <CardDescription className="line-clamp-3">{strategy.description}</CardDescription> {/* Limit description lines */}
                </CardHeader>
                <CardContent className="space-y-2 flex-grow"> {/* Allow content to grow */}
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-muted-foreground flex items-center gap-1"><Percent className="h-4 w-4"/> Win Rate:</span>
                      <Badge variant={strategy.performance.winRate > 60 ? "default" : strategy.performance.winRate > 40 ? "secondary" : "destructive"}
                             className={cn(strategy.performance.winRate > 60 ? "bg-green-600 text-white hover:bg-green-700" : "", // Custom green color for high win rate
                                            strategy.performance.winRate <= 40 && "bg-red-600 text-white hover:bg-red-700" // Custom red for low win rate
                                        )}>
                        {strategy.performance.winRate.toFixed(1)}%
                      </Badge>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1"><Gauge className="h-4 w-4"/> Profit Factor:</span> {/* Changed icon */}
                      <span className={cn("font-semibold", strategy.performance.profitFactor >= 1.5 ? "text-green-600" : strategy.performance.profitFactor < 1 ? "text-red-600" : "")}>
                        {strategy.performance.profitFactor.toFixed(2)}
                      </span>
                   </div>
                   {/* Optionally display category */}
                   {strategy.category && (
                     <div className="flex items-center justify-between text-sm pt-1">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="outline">{strategy.category}</Badge>
                     </div>
                   )}
                </CardContent>
                 {/* Removed Footer, clicking the card navigates */}
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        !error && <Card className="text-center text-muted-foreground py-10 col-span-full"><p>No strategies match the current filters.</p></Card> // Wrap message in card for consistency
      )}
    </div>
  );
}
