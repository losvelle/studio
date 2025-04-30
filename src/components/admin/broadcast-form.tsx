
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getStrategies, type TradingStrategy } from '@/services/strategies'; // Import strategy service
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Zod schema for validation
const broadcastSchema = z.object({
  strategyId: z.string().min(1, { message: "Please select a strategy." }),
  asset: z.string().min(1, { message: "Asset symbol is required."}).toUpperCase(), // Added asset field
  direction: z.enum(['Buy', 'Sell'], { required_error: "Signal direction is required." }),
  entryPrice: z.coerce.number().positive({ message: "Entry price must be positive." }),
  stopLoss: z.coerce.number().positive({ message: "Stop loss must be positive." }), // Renamed from exitPrice
  targetPrice: z.coerce.number().positive({ message: "Target price must be positive." }), // Added targetPrice
  additionalNotes: z.string().optional(),
});

type BroadcastFormData = z.infer<typeof broadcastSchema>;

interface BroadcastFormProps {
  onSubmit: (data: BroadcastFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function BroadcastForm({ onSubmit, isSubmitting }: BroadcastFormProps) {
  const [strategies, setStrategies] = useState<TradingStrategy[]>([]);
  const [loadingStrategies, setLoadingStrategies] = useState(true);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<BroadcastFormData>({
    resolver: zodResolver(broadcastSchema),
    defaultValues: {
      direction: 'Buy', // Default direction
      additionalNotes: '',
    },
  });

  useEffect(() => {
    async function loadStrategies() {
      setLoadingStrategies(true);
      try {
        const fetchedStrategies = await getStrategies();
        setStrategies(fetchedStrategies);
      } catch (e) {
        console.error("Failed to fetch strategies for broadcast form:", e);
         toast({
           title: "Error Loading Strategies",
           description: "Could not fetch strategies for the form.",
           variant: "destructive",
         });
      } finally {
        setLoadingStrategies(false);
      }
    }
    loadStrategies();
  }, [toast]); // Added toast dependency

  const handleFormSubmit = async (data: BroadcastFormData) => {
     await onSubmit(data);
     // Reset form after successful submission (optional)
     // reset();
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardHeader>
          <CardTitle>Broadcast New Signal</CardTitle>
          <CardDescription>
            Select a strategy and enter the signal details to broadcast.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Strategy Selection */}
          <div className="grid gap-2">
            <Label htmlFor="strategyId">Strategy</Label>
            <Controller
              name="strategyId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={loadingStrategies || isSubmitting}>
                  <SelectTrigger id="strategyId">
                    <SelectValue placeholder={loadingStrategies ? "Loading strategies..." : "Select a strategy"} />
                  </SelectTrigger>
                  <SelectContent>
                    {strategies.map((strategy) => (
                      <SelectItem key={strategy.id} value={strategy.id}>
                        {strategy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.strategyId && <p className="text-sm text-destructive">{errors.strategyId.message}</p>}
          </div>

          {/* Asset Symbol */}
           <div className="grid gap-2">
             <Label htmlFor="asset">Asset Symbol</Label>
             <Input id="asset" {...register('asset')} placeholder="e.g., AAPL, BTC/USD" disabled={isSubmitting} />
             {errors.asset && <p className="text-sm text-destructive">{errors.asset.message}</p>}
           </div>

          {/* Signal Type (Direction) */}
          <div className="grid gap-2">
            <Label>Signal Type</Label>
            <Controller
              name="direction"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                  disabled={isSubmitting}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Buy" id="buy" />
                    <Label htmlFor="buy">Buy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sell" id="sell" />
                    <Label htmlFor="sell">Sell</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.direction && <p className="text-sm text-destructive">{errors.direction.message}</p>}
          </div>

          {/* Price Levels */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="entryPrice">Entry Price</Label>
                <Input id="entryPrice" type="number" step="any" {...register('entryPrice')} disabled={isSubmitting} />
                {errors.entryPrice && <p className="text-sm text-destructive">{errors.entryPrice.message}</p>}
              </div>
               <div className="grid gap-2">
                 <Label htmlFor="targetPrice">Target Price</Label>
                 <Input id="targetPrice" type="number" step="any" {...register('targetPrice')} disabled={isSubmitting} />
                 {errors.targetPrice && <p className="text-sm text-destructive">{errors.targetPrice.message}</p>}
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="stopLoss">Stop Loss</Label>
                  <Input id="stopLoss" type="number" step="any" {...register('stopLoss')} disabled={isSubmitting} />
                  {errors.stopLoss && <p className="text-sm text-destructive">{errors.stopLoss.message}</p>}
                </div>
           </div>

          {/* Additional Notes */}
          <div className="grid gap-2">
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <Textarea id="additionalNotes" {...register('additionalNotes')} placeholder="Any context or extra details..." disabled={isSubmitting} />
            {errors.additionalNotes && <p className="text-sm text-destructive">{errors.additionalNotes.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting || loadingStrategies}>
            {isSubmitting ? (
               <>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Broadcasting...
               </>
            ) : (
               <>
                  <Send className="mr-2 h-4 w-4" /> Broadcast Signal Now
               </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
