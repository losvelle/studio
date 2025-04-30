'use client';

import type { TradingSignal } from '@/services/trading-signals';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Clock, Tag, Target, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SignalCardProps {
  signal: TradingSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isBuy = signal.direction === 'Buy';
  const directionColor = isBuy ? 'text-green-600' : 'text-red-600';
  const directionBg = isBuy ? 'bg-green-100' : 'bg-red-100';
  const DirectionIcon = isBuy ? ArrowUpRight : ArrowDownLeft;

  // State to hold the formatted timestamp, initialized to null
  const [formattedTimestamp, setFormattedTimestamp] = useState<string | null>(null);

  useEffect(() => {
    // Format the timestamp only on the client side after the component mounts
    // This prevents the hydration mismatch caused by server/client timezone/locale differences
    setFormattedTimestamp(format(new Date(signal.timestamp), 'PPpp'));
  }, [signal.timestamp]); // Dependency array ensures this runs if the timestamp changes

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg mb-1 flex items-center gap-2">
              <span className={cn("p-1 rounded-full", directionBg)}>
                <DirectionIcon className={cn("h-5 w-5", directionColor)} strokeWidth={2.5} />
              </span>
              {signal.asset} - {signal.direction} Signal
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <Tag className="h-3 w-3" /> Strategy: {signal.strategyId}
            </CardDescription>
          </div>
           <Badge variant={isBuy ? "default" : "destructive"} className={cn(isBuy ? "bg-green-600 text-white" : "bg-red-600 text-white")}>
             {signal.direction}
           </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span>Entry Price: <span className="font-semibold">{signal.entryPrice.toFixed(2)}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-destructive" />
            <span>Exit Price/Rule: <span className="font-semibold">{typeof signal.exitPrice === 'number' ? signal.exitPrice.toFixed(2) : signal.exitPrice}</span></span>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-muted-foreground">Indicators:</h4>
          <ul className="list-disc list-inside text-xs space-y-1">
            {Object.entries(signal.indicatorValues).map(([key, value]) => (
              <li key={key}>{key}: <span className="font-mono">{value.toFixed(2)}</span></li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-3 border-t">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {/* Render the formatted timestamp only when the state is updated on the client */}
          <span>{formattedTimestamp}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
