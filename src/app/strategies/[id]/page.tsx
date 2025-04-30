// src/app/strategies/[id]/page.tsx
'use client'; // Needed for useParams, useRouter, useState, useEffect

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getStrategyById, type TradingStrategy } from '@/services/strategies';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"; // Import Dialog components
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Percent, Gauge, BarChartBig, Tag, Info, Layers, BookOpen, FilePenLine, AlertCircle } from 'lucide-react'; // Added FilePenLine icon
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast'; // Import useToast

export default function StrategyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const strategyId = params.id as string; // Assuming id is always a string
  const { toast } = useToast(); // Initialize toast

  const [strategy, setStrategy] = useState<TradingStrategy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditLogicDialogOpen, setIsEditLogicDialogOpen] = useState(false); // State for dialog

  useEffect(() => {
    async function fetchStrategy() {
      if (!strategyId) {
        setError('Invalid strategy ID.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const foundStrategy = await getStrategyById(strategyId);
        if (foundStrategy) {
          setStrategy(foundStrategy);
        } else {
          setError('Strategy not found.');
        }
      } catch (e) {
        console.error("Failed to fetch strategy details:", e);
        setError('Could not load strategy details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchStrategy();
  }, [strategyId]);

  const handleEditLogicClick = () => {
      // Open the dialog instead of just logging and toasting
      console.log('Edit Strategy Logic clicked for:', strategyId);
      setIsEditLogicDialogOpen(true);
      // Keep the toast for now as extra feedback, can be removed later
      // toast({
      //     title: "Edit Strategy Logic",
      //     description: "Opening strategy editor... (Placeholder)",
      //     variant: "default",
      // });
  };


  if (loading) {
    return <StrategyDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
         <Alert variant="destructive" className="max-w-md mx-auto mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
         </Alert>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  if (!strategy) {
    // This case should ideally be covered by the error state from fetchStrategy
    return (
       <div className="container mx-auto py-8 px-4 text-center">
         <p>Strategy data is unavailable.</p>
           <Button variant="outline" onClick={() => router.back()} className="mt-4">
             <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
           </Button>
       </div>
     );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      {/* Header with Back Button & Edit Logic Button */}
       <div className="mb-6 flex items-center justify-between gap-4">
         <Button variant="outline" size="sm" onClick={() => router.back()}>
           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Strategies
         </Button>

          {/* Edit Strategy Logic Dialog Trigger */}
          <Dialog open={isEditLogicDialogOpen} onOpenChange={setIsEditLogicDialogOpen}>
              <DialogTrigger asChild>
                   <Button variant="secondary" size="sm" onClick={handleEditLogicClick}>
                        <FilePenLine className="mr-2 h-4 w-4" /> Edit Strategy Logic
                    </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Strategy Logic</DialogTitle>
                        <DialogDescription>
                            Modify the parameters and rules for the <span className="font-semibold">{strategy?.name}</span> strategy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                       {/* Placeholder Content */}
                       <Alert variant="default" className="bg-blue-50 border-blue-200">
                           <AlertCircle className="h-4 w-4 text-blue-600" />
                           <AlertTitle className="text-blue-800">Under Development</AlertTitle>
                           <AlertDescription className="text-blue-700">
                               The full strategy logic editor is currently under development.
                               This section will allow modification of parameters and rules.
                           </AlertDescription>
                       </Alert>
                       <p className="text-sm text-muted-foreground">
                           For now, you can imagine fields here to adjust settings like:
                       </p>
                       {/* Moved ul outside of p tag to fix nesting */}
                       <ul className="text-sm text-muted-foreground list-disc list-inside mt-2">
                           <li>Moving Average Periods</li>
                           <li>RSI Thresholds</li>
                           <li>Entry/Exit Conditions</li>
                           <li>Time Filters</li>
                       </ul>
                       {/* Future: <StrategyLogicForm strategy={strategy} onSubmit={handleSaveLogic} /> */}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        {/* Disable save until form is implemented */}
                        <Button type="button" disabled>Save Logic Changes</Button>
                    </DialogFooter>
              </DialogContent>
          </Dialog>
       </div>

      <Card className="shadow-lg w-full">
         <CardHeader className="pb-4 border-b">
           <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
             <div>
               <CardTitle className="text-2xl mb-1 flex items-center gap-2">
                  <BarChartBig className="h-6 w-6 text-primary"/>
                  {strategy.name}
               </CardTitle>
                {strategy.category && (
                  <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Tag className="h-4 w-4" /> Category: {strategy.category}
                  </CardDescription>
                )}
             </div>
              {/* Can add other badges here if needed */}
           </div>
           <p className="text-base text-foreground/90">{strategy.description}</p>
         </CardHeader>

         <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Performance Metrics */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-2 text-primary flex items-center gap-2">
                    <TrendingUp className="h-5 w-5"/> Performance Metrics
                </h3>
                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-md">
                    <span className="text-muted-foreground flex items-center gap-1"><Percent className="h-4 w-4"/> Win Rate:</span>
                     <Badge variant={strategy.performance.winRate > 60 ? "default" : strategy.performance.winRate > 40 ? "secondary" : "destructive"}
                            className={cn("text-sm", strategy.performance.winRate > 60 ? "bg-green-600 text-white hover:bg-green-700" : "",
                                           strategy.performance.winRate <= 40 && "bg-red-600 text-white hover:bg-red-700"
                                       )}>
                        {strategy.performance.winRate.toFixed(1)}%
                     </Badge>
                </div>
                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-md">
                    <span className="text-muted-foreground flex items-center gap-1"><Gauge className="h-4 w-4"/> Profit Factor:</span>
                     <span className={cn("font-semibold text-sm", strategy.performance.profitFactor >= 1.5 ? "text-green-600" : strategy.performance.profitFactor < 1 ? "text-red-600" : "")}>
                        {strategy.performance.profitFactor.toFixed(2)}
                     </span>
                </div>
                 {strategy.performance.sharpeRatio !== undefined && (
                   <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-md">
                      <span className="text-muted-foreground">Sharpe Ratio:</span>
                      <span className="font-semibold">{strategy.performance.sharpeRatio.toFixed(2)}</span>
                   </div>
                 )}
                 {strategy.performance.maxDrawdown !== undefined && (
                    <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-md">
                       <span className="text-muted-foreground">Max Drawdown:</span>
                       <span className={cn("font-semibold", strategy.performance.maxDrawdown > 20 ? "text-orange-600" : "")}>
                           {strategy.performance.maxDrawdown.toFixed(1)}%
                       </span>
                    </div>
                 )}
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
                 <h3 className="font-semibold text-lg mb-2 text-primary flex items-center gap-2">
                    <Info className="h-5 w-5"/> Additional Info
                 </h3>
                  {strategy.indicatorsUsed && (
                      <div className="p-3 bg-muted/50 rounded-md">
                          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Layers className="h-4 w-4"/> Key Indicators:</p>
                          <p className="text-sm font-medium">{strategy.indicatorsUsed}</p>
                      </div>
                  )}
                  {/* Placeholder for Backtest Info */}
                  <div className="p-3 bg-muted/50 rounded-md">
                     <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><BookOpen className="h-4 w-4"/> Backtest Details:</p>
                     <p className="text-sm italic">Detailed backtest results not available.</p> {/* Placeholder */}
                  </div>
            </div>
         </CardContent>

         {/* Optional Footer */}
          <Separator className="my-4" />
         <CardFooter className="pt-4">
            <p className="text-xs text-muted-foreground">Performance metrics based on historical backtesting data.</p>
         </CardFooter>
      </Card>
    </div>
  );
}


// Skeleton component for loading state
function StrategyDetailsSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
             <Skeleton className="h-9 w-40" />
             <Skeleton className="h-9 w-44" /> {/* Skeleton for the edit logic button */}
        </div>
        <Card className="shadow-lg w-full">
            <CardHeader className="pb-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                    <div>
                        <Skeleton className="h-8 w-3/5 mb-2" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                     {/* Optional badge skeleton */}
                     {/* <Skeleton className="h-6 w-16 rounded-full" /> */}
                </div>
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-4/5" />
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 <div className='space-y-4'>
                     <Skeleton className="h-6 w-1/2 mb-2" />
                     <Skeleton className="h-12 w-full rounded-md" />
                     <Skeleton className="h-12 w-full rounded-md" />
                     <Skeleton className="h-12 w-full rounded-md" />
                 </div>
                  <div className='space-y-4'>
                     <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-16 w-full rounded-md" />
                      <Skeleton className="h-16 w-full rounded-md" />
                  </div>
            </CardContent>
             <Separator className="my-4" />
             <CardFooter className="pt-4">
                  <Skeleton className="h-3 w-1/3" />
             </CardFooter>
        </Card>
    </div>
  );
}
