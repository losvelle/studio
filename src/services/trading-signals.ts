/**
 * Represents a trading signal.
 */
export interface TradingSignal {
  /**
   * The asset identifier (e.g., 'AAPL', 'BTC/USD').
   */
  asset: string; // Added asset property
  /**
   * The direction of the trade (Buy or Sell).
   */
  direction: 'Buy' | 'Sell';
  /**
   * The entry price for the trade.
   */
  entryPrice: number;
  /**
   * The stop loss price for the trade.
   */
  stopLoss: number; // Renamed from exitPrice
  /**
   * The target price for the trade.
   */
  targetPrice: number; // Added targetPrice property
  /**
   * The name or ID of the strategy that triggered the signal.
   */
  strategyId: string;
  /**
   * The timestamp of the signal.
   */
  timestamp: string;
  /**
   * Key indicator values (e.g., RSI, ATR).
   */
  indicatorValues: { [key: string]: number };
}

/**
 * Asynchronously retrieves trading signals.
 *
 * @returns A promise that resolves to an array of TradingSignal objects.
 */
export async function getTradingSignals(): Promise<TradingSignal[]> {
  // TODO: Implement this by calling an external API or service.
  // Returning more mock data for demonstration.

  // Helper function to generate random timestamps within the last week
  const getRandomTimestamp = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7); // Last 7 days
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString();
  }

  const assets = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'BTC/USD', 'ETH/USD', 'EUR/USD', 'SPY'];
  const strategies = ['SMA_Crossover_1', 'EMA_Reversal_2', 'MACD_Divergence', 'RSI_Momentum', 'Bollinger_Breakout'];

  const mockSignals: TradingSignal[] = Array.from({ length: 25 }, (_, i) => {
    const direction = Math.random() > 0.5 ? 'Buy' : 'Sell';
    const entryPrice = Math.random() * 500 + 50; // Random price between 50 and 550
    const priceMovementRange = (Math.random() * 20 + 5); // Random movement range between 5 and 25

    let stopLoss: number;
    let targetPrice: number;

    if (direction === 'Buy') {
      stopLoss = entryPrice - (priceMovementRange * (Math.random() * 0.4 + 0.3)); // Stop loss is below entry
      targetPrice = entryPrice + (priceMovementRange * (Math.random() * 0.6 + 0.7)); // Target price is above entry
    } else { // Sell
      stopLoss = entryPrice + (priceMovementRange * (Math.random() * 0.4 + 0.3)); // Stop loss is above entry
      targetPrice = entryPrice - (priceMovementRange * (Math.random() * 0.6 + 0.7)); // Target price is below entry
    }


    return {
      asset: assets[i % assets.length],
      direction: direction,
      entryPrice: entryPrice,
      stopLoss: stopLoss,
      targetPrice: targetPrice,
      strategyId: strategies[i % strategies.length],
      timestamp: getRandomTimestamp(),
      indicatorValues: { // Keep indicator values in data, but won't display in card
        RSI: Math.random() * 100,
        ATR: Math.random() * 5 + 0.5,
        ...(Math.random() > 0.5 ? { MACD_Signal: Math.random() * 2 - 1 } : {}),
      }
    };
  });

  // Sort by timestamp descending (newest first) before returning
  mockSignals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Simulate potential API delay
  // await new Promise(resolve => setTimeout(resolve, 50)); // Optional: Simulate network latency

  return mockSignals;
}
