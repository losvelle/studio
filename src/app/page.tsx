import { getTradingSignals, type TradingSignal } from '@/services/trading-signals';
import { SignalCard } from '@/components/signal-card';
import { SignalHistoryPreview } from '@/components/signal-history-preview'; // New component for preview
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Newspaper } from "lucide-react";
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

  // Separate the very latest signal from the rest for the main card display
  const latestSignal = signals.length > 0 ? signals[0] : null;
  const recentHistorySignals = signals.slice(1, 6); // Get next 5 signals for preview

  return (
    <div className="container mx-auto py-8 px-4">
      {error && (
         <Alert variant="destructive" className="mb-6">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}

      {/* Latest Signal Section */}
       <section className="mb-12">
         <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
           <Newspaper className="h-6 w-6"/> Latest Signal
         </h2>
         {latestSignal ? (
            // Wrap SignalCard with Link to its detail page
            <Link href={`/signals/${encodeURIComponent(latestSignal.timestamp)}`}>
              <SignalCard signal={latestSignal} />
            </Link>
         ) : (
           !error && <p className="text-muted-foreground text-center py-6 bg-card rounded-lg shadow-sm">No new signals available right now.</p> // Show only if no error
         )}
       </section>

       <Separator className="my-8" />

       {/* Signal History Preview Section */}
       <section>
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-primary">Recent History</h2>
            {/* Link to full history page */}
            <Button variant="link" asChild>
                <Link href="/history">View All History</Link>
            </Button>
         </div>
         <SignalHistoryPreview signals={recentHistorySignals} />
       </section>
    </div>
  );
}
