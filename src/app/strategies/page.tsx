import { getStrategies, type TradingStrategy } from '@/services/strategies';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Percent, Gauge } from 'lucide-react'; // Added Gauge for profit factor
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

export default async function StrategiesPage() {
  let strategies: TradingStrategy[] = [];
  let error: string | null = null;

  try {
    strategies = await getStrategies();
  } catch (e) {
    console.error("Failed to fetch strategies:", e);
    error = "Could not load strategies. Please try again later.";
  }

  // TODO: Implement filtering based on state

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

      {/* Filter Options Placeholder */}
      <Card className="mb-8 p-4 shadow grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
         <div>
           <Label htmlFor="performance-filter">Filter by Performance</Label>
           <Select disabled> {/* Disable filters for now */}
             <SelectTrigger id="performance-filter">
               <SelectValue placeholder="Select Performance Metric" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="win_rate">Win Rate</SelectItem>
               <SelectItem value="profit_factor">Profit Factor</SelectItem>
             </SelectContent>
           </Select>
         </div>
         <div>
           <Label htmlFor="category-filter">Filter by Category</Label>
            <Select disabled> {/* Disable filters for now */}
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trend">Trend Following</SelectItem>
                <SelectItem value="reversal">Mean Reversion</SelectItem>
                <SelectItem value="momentum">Momentum</SelectItem>
              </SelectContent>
            </Select>
         </div>
         <Button className="w-full md:w-auto" disabled>Apply Filters</Button> {/* Disable button */}
      </Card>


      {strategies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy) => (
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
        !error && <Card className="text-center text-muted-foreground py-10 col-span-full"><p>No strategies available.</p></Card> // Wrap message in card for consistency
      )}
    </div>
  );
}
