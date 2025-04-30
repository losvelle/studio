/**
 * Represents the performance metrics of a trading strategy.
 */
export interface StrategyPerformance {
  /**
   * The win rate of the strategy (percentage).
   */
  winRate: number;
  /**
   * The profit factor (gross profit / gross loss).
   */
  profitFactor: number;
  /**
   * Optional: Sharpe ratio, if available.
   */
  sharpeRatio?: number;
  /**
   * Optional: Maximum drawdown percentage, if available.
   */
  maxDrawdown?: number;
}

/**
 * Represents a trading strategy.
 */
export interface TradingStrategy {
  /**
   * Unique identifier for the strategy.
   */
  id: string;
  /**
   * The name of the strategy.
   */
  name: string;
  /**
   * A brief description of the strategy.
   */
  description: string;
  /**
   * Performance metrics for the strategy.
   */
  performance: StrategyPerformance;
  /**
   * Optional: Category of the strategy (e.g., 'Trend Following', 'Mean Reversion').
   */
  category?: string;
   /**
   * Optional: Detailed backtest statistics URL or data object.
   */
  backtestStats?: string | object;
}


/**
 * Asynchronously retrieves available trading strategies.
 *
 * @returns A promise that resolves to an array of TradingStrategy objects.
 */
export async function getStrategies(): Promise<TradingStrategy[]> {
  // TODO: Replace with actual API call or database query
  const mockStrategies: TradingStrategy[] = [
    {
      id: 'SMA_Crossover_1',
      name: 'Simple Moving Average Crossover',
      description: 'Buys when short-term SMA crosses above long-term SMA, sells on the reverse.',
      category: 'Trend Following',
      performance: {
        winRate: 55.2,
        profitFactor: 1.45,
        maxDrawdown: 15.8,
      },
    },
    {
      id: 'EMA_Reversal_2',
      name: 'Exponential Moving Average Reversal',
      description: 'Identifies potential reversals using deviations from short-term EMA.',
      category: 'Mean Reversion',
      performance: {
        winRate: 62.1,
        profitFactor: 1.62,
         sharpeRatio: 0.95,
      },
    },
    {
      id: 'MACD_Divergence',
      name: 'MACD Divergence Hunter',
      description: 'Looks for divergences between price action and the MACD indicator.',
      category: 'Reversal', // Can be Trend or Reversal depending on setup
      performance: {
        winRate: 48.5,
        profitFactor: 1.33,
        maxDrawdown: 18.2,
      },
    },
    {
      id: 'RSI_Momentum',
      name: 'RSI Momentum Rider',
      description: 'Enters trades when RSI indicates strong momentum (above 70 for buy, below 30 for sell).',
      category: 'Momentum',
      performance: {
        winRate: 58.0,
        profitFactor: 1.55,
        sharpeRatio: 1.1,
      },
    },
    {
      id: 'Bollinger_Breakout',
      name: 'Bollinger Band Breakout',
      description: 'Trades breakouts above or below the Bollinger Bands, anticipating volatility.',
      category: 'Volatility Breakout',
      performance: {
        winRate: 45.9,
        profitFactor: 1.28,
         maxDrawdown: 22.5,
      },
    },
     {
      id: 'Fib_Retracement',
      name: 'Fibonacci Retracement Levels',
      description: 'Uses Fibonacci levels as potential entry/exit points during trends.',
      category: 'Trend Following',
      performance: {
        winRate: 60.5,
        profitFactor: 1.70,
        sharpeRatio: 1.05,
      },
    }
  ];

   // Simulate potential API delay
   // await new Promise(resolve => setTimeout(resolve, 60));

  return mockStrategies;
}
