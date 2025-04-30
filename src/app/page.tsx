
import { getTradingSignals, type TradingSignal } from '@/services/trading-signals';
import { SignalCard } from '@/components/signal-card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Newspaper, History } from "lucide-react"; // Added History icon
import { Separator } from '@/components/ui/separator';
import Link from 'next/link'; // Import Link
import { Button } from '@/components/ui/button'; // Import Button

export default async function Home() {
  let signals: TradingSignal[] = [];
  let error: string | null = null;

  try {
    signals = await getTradingSignals();
  } catch (e) {
    console.error("Failed to fetch trading signals:", e);
    error = "Could not load trading signals. Please try again later.";
  }

  // No longer slicing to get latest signals, will display all fetched signals
  // const latestSignals = signals.slice(0, 3);

  return (
    <div className="container mx-auto py-8 px-4">
      {error && (
         <Alert variant="destructive" className="mb-6">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}

      {/* Main Signals Section */}
       <section className="mb-12">
         <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
               <Newspaper className="h-6 w-6"/> Trading Signals
             </h2>
             {/* Link to full history page */}
             <Button variant="link" asChild>
                 <Link href="/history">View Full History <History className="ml-2 h-4 w-4"/></Link>
             </Button>
         </div>

         {signals.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Iterate over all fetched signals */}
              {signals.map((signal, index) => (
                // Wrap SignalCard with Link to its detail page using a unique key
                <Link key={`${signal.timestamp}-${index}`} href={`/signals/${encodeURIComponent(signal.timestamp)}`}>
                  <SignalCard signal={signal} />
                </Link>
             ))}
           </div>
         ) : (
           !error && <p className="text-muted-foreground text-center py-6 bg-card rounded-lg shadow-sm">No signals available right now.</p> // Show only if no error
         )}
       </section>

       {/* Removed Separator and Signal History Preview Section */}
       {/* <Separator className="my-8" /> */}
       {/* <section>...</section> */}
    </div>
  );
}
