import { getTradingSignals, type TradingSignal } from '@/services/trading-signals';
import { SignalCard } from '@/components/signal-card';
import { SignalHistory } from '@/components/signal-history';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Separator } from '@/components/ui/separator';

// Mock function to add asset names, replace with actual data source logic
// No longer needed as asset is part of the core signal data now
// function addAssetNames(signals: TradingSignal[]): TradingSignal[] {
//   const assets = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'BTC/USD', 'ETH/USD'];
//   return signals.map((signal, index) => ({
//     ...signal,
//     asset: assets[index % assets.length], // Cycle through assets for variety
//   }));
// }


export default async function Home() {
  // Fetch initial signals - In a real app, this would likely use client-side fetching
  // or websockets for real-time updates. For now, we fetch once on load.
  let signals: TradingSignal[] = [];
  let error: string | null = null;

  try {
    signals = await getTradingSignals();
    // signals = addAssetNames(fetchedSignals); // Asset names now come from getTradingSignals
  } catch (e) {
    console.error("Failed to fetch trading signals:", e);
    error = "Could not load trading signals. Please try again later.";
  }

  // Separate "real-time" (latest) signals from history
  // For this example, let's consider the latest 3 signals as "real-time"
  const realTimeSignals = signals.slice(0, 3);
  const historicalSignals = signals; // Pass all signals to history component

  return (
    <div className="container mx-auto py-8 px-4">
      {error && (
         <Alert variant="destructive" className="mb-6">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}

      {/* Real-time Signals Section */}
       <section className="mb-12">
         <h2 className="text-2xl font-semibold mb-6 text-primary">Real-Time Signals</h2>
         {realTimeSignals.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {realTimeSignals.map((signal, index) => (
               <SignalCard key={`realtime-${signal.timestamp}-${index}`} signal={signal} />
             ))}
           </div>
         ) : (
           !error && <p className="text-muted-foreground">No real-time signals available currently.</p> // Show only if no error
         )}
       </section>

       <Separator className="my-8" />

       {/* Signal History Section */}
       <section>
         <SignalHistory signals={historicalSignals} />
       </section>
    </div>
  );
}

// Remove declaration merging as 'asset' is now part of the base TradingSignal interface
// declare module '@/services/trading-signals' {
//   interface TradingSignal {
//     asset: string; // Add asset property
//   }
// }
