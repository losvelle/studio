

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Define plan details
const plans = [
  {
    id: 'trial',
    name: 'Trial',
    price: 'Free',
    priceNumeric: 0,
    description: 'Explore basic features and get a feel for the platform.',
    features: [
      'Limited Signal Access',
      'Basic Strategy Insights',
      'Email Notifications',
    ],
    recommended: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$119',
    priceNumeric: 119,
    description: 'Ideal for beginners starting their trading journey.',
    features: [
      'Access to Core Signals',
      'Standard Strategy Library',
      'Email & Basic Push Notifications',
      'Basic Performance Analytics',
    ],
    recommended: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$175',
    priceNumeric: 175,
    description: 'For active traders needing advanced tools and insights.',
    features: [
      'Full Signal Access (All Strategies)',
      'Advanced Strategy Library & Details',
      'Priority Email & Push Notifications',
      'Detailed Performance Analytics',
      'Early Access to New Features',
    ],
    recommended: true,
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: '$420',
    priceNumeric: 420,
    description: 'Comprehensive access for institutions and power users.',
    features: [
      'Everything in Professional',
      'API Access for Integration',
      'Dedicated Account Manager',
      'Custom Strategy Backtesting (Add-on)',
      'Premium Support',
    ],
    recommended: false,
  },
];

const paidPlans = plans.filter(plan => plan.id !== 'trial');
const trialPlan = plans.find(plan => plan.id === 'trial');

export default function UpgradePage() {
    const { toast } = useToast();

    const handleChoosePlan = (planName: string) => {
        // TODO: Implement actual subscription logic (e.g., redirect to Stripe checkout)
        console.log(`Choose Plan clicked for: ${planName}`);
        toast({
          title: `Plan Selected: ${planName}`,
          description: "Redirecting to checkout... (Simulation)",
        });
        // Example redirect: window.location.href = `/checkout?plan=${planName}`;
    }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
        Upgrade Your Plan
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-10">
        Choose the plan that best fits your trading needs.
      </p>

      {/* Paid Plans Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
        {paidPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              'flex flex-col shadow-lg transition-all duration-300 hover:shadow-xl relative',
              plan.recommended && 'border-2 border-primary shadow-primary/20' // Highlight recommended plan
            )}
          >
             {plan.recommended && (
                <Badge
                  variant="default" // Or a custom variant
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground flex items-center gap-1 px-3 py-1 z-10"
                >
                  <Star className="h-4 w-4" fill="currentColor" /> Recommended
                </Badge>
              )}
            <CardHeader className="pt-8"> {/* Add padding top for the badge */}
              <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
              <div className="text-4xl font-bold">
                {plan.price}
                {plan.priceNumeric > 0 && <span className="text-base font-normal text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.recommended ? 'default' : 'outline'}
                onClick={() => handleChoosePlan(plan.name)}
              >
                {plan.priceNumeric === 0 ? 'Get Started' : 'Choose Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Trial Plan Section */}
      {trialPlan && (
        <div className="mt-12"> {/* Removed flex justify-center, added margin-top */}
          <Card
            key={trialPlan.id}
            className={cn(
              'flex flex-col shadow-md transition-all duration-300 hover:shadow-lg relative w-full max-w-3xl mx-auto', // Centered and wider max-width
              'border-dashed border-muted-foreground/50 bg-muted/30' // Visually differentiate trial
            )}
          >
            {/* Reduced vertical padding for shorter height */}
            <CardHeader className="pt-4 pb-2"> {/* Reduced padding */}
              <CardTitle className="text-xl font-semibold">{trialPlan.name}</CardTitle>
              <CardDescription>{trialPlan.description}</CardDescription>
            </CardHeader>
            {/* Reduced vertical padding and spacing */}
            <CardContent className="flex-grow space-y-3 py-4"> {/* Reduced padding & space */}
              <div className="text-3xl font-bold">
                {trialPlan.price}
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground"> {/* Reduced space-y */}
                {trialPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gray-500" /> {/* Dimmed check */}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            {/* Reduced vertical padding */}
            <CardFooter className="pt-4 pb-4"> {/* Reduced padding */}
              <Button
                className="w-full"
                variant='secondary' // Different variant for trial
                onClick={() => handleChoosePlan(trialPlan.name)}
              >
                {trialPlan.priceNumeric === 0 ? 'Start Trial' : 'Choose Plan'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

