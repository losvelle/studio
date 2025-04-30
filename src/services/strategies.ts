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
  backtestStats?: string | object; // Example: Could link to detailed report or contain more stats
   /**
   * Optional: Comma-separated list of key indicators used by the strategy.
   */
  indicatorsUsed?: string;
}

// Mock Data Source
const mockStrategies: TradingStrategy[] = [
  {
    id: 'SMA_Crossover_1',
    name: 'Simple Moving Average Crossover',
    description: 'Buys when a short-term Simple Moving Average (SMA) crosses above a long-term SMA, indicating a potential uptrend. Sells or reverses when the short-term SMA crosses below the long-term SMA.',
    category: 'Trend Following',
    performance: {
      winRate: 55.2,
      profitFactor: 1.45,
      maxDrawdown: 15.8,
    },
    indicatorsUsed: 'SMA(9), SMA(21)', // Example indicators
  },
  {
    id: 'EMA_Reversal_2',
    name: 'Exponential Moving Average Reversal',
    description: 'Identifies potential trend reversals by looking for significant price deviations from a short-term Exponential Moving Average (EMA). It assumes prices will revert back towards the average.',
    category: 'Mean Reversion',
    performance: {
      winRate: 62.1,
      profitFactor: 1.62,
       sharpeRatio: 0.95,
    },
    indicatorsUsed: 'EMA(12), Price Action',
  },
  {
    id: 'MACD_Divergence',
    name: 'MACD Divergence Hunter',
    description: 'Looks for divergences between price action and the Moving Average Convergence Divergence (MACD) indicator. Bullish divergence (lower lows in price, higher lows in MACD) suggests a buy, while bearish divergence suggests a sell.',
    category: 'Reversal',
    performance: {
      winRate: 48.5,
      profitFactor: 1.33,
      maxDrawdown: 18.2,
    },
     indicatorsUsed: 'MACD(12, 26, 9), Price Action',
  },
  {
    id: 'RSI_Momentum',
    name: 'RSI Momentum Rider',
    description: 'Enters trades when the Relative Strength Index (RSI) indicates strong momentum. Typically buys when RSI crosses above 70 (overbought, anticipating continuation) and sells when it crosses below 30 (oversold, anticipating continuation). Specific thresholds can vary.',
    category: 'Momentum',
    performance: {
      winRate: 58.0,
      profitFactor: 1.55,
      sharpeRatio: 1.1,
    },
     indicatorsUsed: 'RSI(14)',
  },
  {
    id: 'Bollinger_Breakout',
    name: 'Bollinger Band Breakout',
    description: 'Trades breakouts occurring when price closes outside the upper or lower Bollinger Bands, anticipating increased volatility and a potential start of a new trend or a strong move.',
    category: 'Volatility Breakout',
    performance: {
      winRate: 45.9,
      profitFactor: 1.28,
       maxDrawdown: 22.5,
    },
     indicatorsUsed: 'Bollinger Bands(20, 2)',
  },
   {
    id: 'Fib_Retracement',
    name: 'Fibonacci Retracement Levels',
    description: 'Identifies potential support and resistance levels during established trends using Fibonacci retracement ratios (e.g., 38.2%, 50%, 61.8%). Entries are often considered near these levels in the direction of the primary trend.',
    category: 'Trend Following',
    performance: {
      winRate: 60.5,
      profitFactor: 1.70,
      sharpeRatio: 1.05,
    },
     indicatorsUsed: 'Fibonacci Levels, Trend Analysis',
  }
];

/**
 * Asynchronously retrieves available trading strategies.
 *
 * @returns A promise that resolves to an array of TradingStrategy objects.
 */
export async function getStrategies(): Promise<TradingStrategy[]> {
  // TODO: Replace with actual API call or database query

   // Simulate potential API delay
   // await new Promise(resolve => setTimeout(resolve, 60));

  return mockStrategies;
}


/**
 * Asynchronously retrieves a single trading strategy by its ID.
 *
 * @param id The unique identifier of the strategy to retrieve.
 * @returns A promise that resolves to the TradingStrategy object if found, otherwise undefined.
 */
export async function getStrategyById(id: string): Promise<TradingStrategy | undefined> {
  // TODO: Replace with actual API call or database query to fetch a single strategy
  const strategies = await getStrategies(); // Fetch all for mock implementation
  return strategies.find(strategy => strategy.id === id);
}
