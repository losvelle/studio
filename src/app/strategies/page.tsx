import { getStrategies, type TradingStrategy } from '@/services/strategies';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Percent } from 'lucide-react'; // Example icons
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default async function StrategiesPage() {
  // Fetch strategies - replace with actual data fetching logic
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
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Filter Options Placeholder */}
      <div className="mb-8 p-4 bg-card rounded-lg shadow grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
         <div>
           <Label htmlFor="performance-filter">Filter by Performance</Label>
           <Select>
             <SelectTrigger id="performance-filter">
               <SelectValue placeholder="Select Performance Metric" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="win_rate">Win Rate</SelectItem>
               <SelectItem value="profit_factor">Profit Factor</SelectItem>
               {/* Add more metrics */}
             </SelectContent>
           </Select>
         </div>
         <div>
           <Label htmlFor="category-filter">Filter by Category</Label>
            <Select>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trend">Trend Following</SelectItem>
                <SelectItem value="reversal">Mean Reversion</SelectItem>
                <SelectItem value="momentum">Momentum</SelectItem>
                {/* Add more categories */}
              </SelectContent>
            </Select>
         </div>
         <Button className="w-full md:w-auto">Apply Filters</Button>
      </div>


      {strategies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{strategy.name}</CardTitle>
                <CardDescription>{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground flex items-center gap-1"><Percent className="h-4 w-4"/> Win Rate:</span>
                   <Badge variant={strategy.performance.winRate > 60 ? "default" : strategy.performance.winRate > 40 ? "secondary" : "destructive"} className={strategy.performance.winRate > 60 ? "bg-green-600 text-white" : ""}>
                     {strategy.performance.winRate.toFixed(1)}%
                   </Badge>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground flex items-center gap-1"><TrendingUp className="h-4 w-4"/> Profit Factor:</span>
                   <span className="font-semibold">{strategy.performance.profitFactor.toFixed(2)}</span>
                 </div>
                 {/* Add more performance metrics as needed */}
              </CardContent>
              {/* Add a footer for actions like 'View Details' if required */}
              {/* <CardFooter>
                <Button variant="outline" size="sm">View Details</Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      ) : (
        !error && <p className="text-center text-muted-foreground py-10">No strategies available.</p>
      )}
    </div>
  );
}
