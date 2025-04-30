
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { TradingStrategy, StrategyPerformance } from '@/services/strategies'; // Import types
import { Trash2, Save } from 'lucide-react'; // Import icons

// Zod schema for validation
const strategySchema = z.object({
  id: z.string().optional(), // Optional for new strategies
  name: z.string().min(3, { message: "Strategy name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().optional(),
  performance: z.object({
    winRate: z.coerce.number().min(0).max(100),
    profitFactor: z.coerce.number().min(0),
    sharpeRatio: z.coerce.number().optional(),
    maxDrawdown: z.coerce.number().optional(),
  }),
  // Assuming indicators are stored as a simple string for now
  indicatorsUsed: z.string().optional().describe("Comma-separated list of key indicators"),
});

type StrategyFormData = z.infer<typeof strategySchema>;

interface StrategyFormProps {
  strategy?: TradingStrategy; // Pass existing strategy for editing
  onSubmit: (data: StrategyFormData) => Promise<void>; // Function to handle submission
  onDelete?: (strategyId: string) => Promise<void>; // Optional delete handler
  isSubmitting?: boolean; // Flag to disable form during submission
}

export function StrategyForm({ strategy, onSubmit, onDelete, isSubmitting }: StrategyFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<StrategyFormData>({
    resolver: zodResolver(strategySchema),
    defaultValues: strategy || { // Pre-fill form if editing
      name: '',
      description: '',
      category: '',
      performance: { winRate: 0, profitFactor: 0 },
      indicatorsUsed: '',
    },
  });

  const handleFormSubmit = (data: StrategyFormData) => {
     onSubmit(data);
  };

  const handleDeleteClick = () => {
    if (strategy?.id && onDelete) {
        if (confirm("Are you sure you want to delete this strategy? This action cannot be undone.")) {
            onDelete(strategy.id);
        }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardHeader>
          <CardTitle>{strategy ? 'Edit Strategy' : 'Add New Strategy'}</CardTitle>
          <CardDescription>
            {strategy ? 'Update the details of the existing strategy.' : 'Enter the details for the new trading strategy.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Basic Details */}
          <div className="grid gap-2">
            <Label htmlFor="name">Strategy Name</Label>
            <Input id="name" {...register('name')} disabled={isSubmitting} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} disabled={isSubmitting} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Input id="category" {...register('category')} placeholder="e.g., Trend Following, Mean Reversion" disabled={isSubmitting} />
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="indicatorsUsed">Indicators Used (Optional)</Label>
            <Input id="indicatorsUsed" {...register('indicatorsUsed')} placeholder="e.g., SMA, EMA, RSI" disabled={isSubmitting} />
             <p className="text-xs text-muted-foreground">Comma-separated list of key indicators.</p>
            {errors.indicatorsUsed && <p className="text-sm text-destructive">{errors.indicatorsUsed.message}</p>}
          </div>

          {/* Performance Metrics */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium px-1">Performance Metrics</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="winRate">Win Rate (%)</Label>
                <Input id="winRate" type="number" step="0.1" {...register('performance.winRate')} disabled={isSubmitting} />
                {errors.performance?.winRate && <p className="text-sm text-destructive">{errors.performance.winRate.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profitFactor">Profit Factor</Label>
                <Input id="profitFactor" type="number" step="0.01" {...register('performance.profitFactor')} disabled={isSubmitting} />
                {errors.performance?.profitFactor && <p className="text-sm text-destructive">{errors.performance.profitFactor.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sharpeRatio">Sharpe Ratio (Optional)</Label>
                <Input id="sharpeRatio" type="number" step="0.01" {...register('performance.sharpeRatio')} disabled={isSubmitting} />
                {errors.performance?.sharpeRatio && <p className="text-sm text-destructive">{errors.performance.sharpeRatio.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxDrawdown">Max Drawdown (%) (Optional)</Label>
                <Input id="maxDrawdown" type="number" step="0.1" {...register('performance.maxDrawdown')} disabled={isSubmitting} />
                {errors.performance?.maxDrawdown && <p className="text-sm text-destructive">{errors.performance.maxDrawdown.message}</p>}
              </div>
            </div>
          </fieldset>
        </CardContent>
        <CardFooter className="flex justify-between">
           {strategy && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteClick}
                disabled={isSubmitting}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Strategy
              </Button>
            )}
           {!strategy && <div />} {/* Placeholder to keep Save button on the right */}

           <Button type="submit" disabled={isSubmitting}>
             <Save className="mr-2 h-4 w-4" />
             {isSubmitting ? 'Saving...' : (strategy ? 'Save Changes' : 'Add Strategy')}
           </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
