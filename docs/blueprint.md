# **App Name**: SignalStream

## Core Features:

- Signal Display: Display real-time trading signals, including buy/sell direction, entry/exit prices, strategy name, timestamp, and key indicator values.
- Signal History: Maintain a signal history log with filtering by date, asset, and strategy.
- Notifications: Allow users to opt-in to push/email notifications for new signals.

## Style Guidelines:

- Primary color: Deep blue (#1A237E) to convey trust and stability.
- Secondary color: Light gray (#EEEEEE) for backgrounds to ensure readability.
- Accent: Teal (#00BCD4) for interactive elements and highlights.
- Mobile-first responsive design with clear, concise data presentation.
- Use clear, consistent icons to represent different signal types and actions.

## Original User Request:
I want to build a web and mobile app that delivers trading signals to users based on a collection of my proprietary trading strategies.

Core Features:
	•	Broadcast real-time trade signals to users.
	•	Each signal must include:
	•	Buy/Sell direction
	•	Entry and exit price (or rules)
	•	Strategy name or ID that triggered it
	•	Timestamp of signal
	•	Any key indicator values (e.g., RSI, ATR)
	•	A signal history log, with filters by date, asset, and strategy.
	•	Push/email notifications for new signals (opt-in).

User Roles:
	•	Admin: Can upload/manage strategies, manually send signals, view analytics, and manage users.
	•	Client/User: Can view signals according to their subscription tier and manage notifications.

Monetization:
	•	Free tier: Limited number of signals per week or access to only 1–2 strategies.
	•	Paid tiers:
	•	Access to more strategies or higher-frequency signals.
	•	Premium users can access real-time alerts and detailed backtest stats.
	•	Stripe or PayPal integration for billing.

Design:
	•	Clean, modern interface optimized for mobile (but responsive on desktop).
	•	You’re free to choose color palettes and branding elements that convey professionalism and trust.
	•	Strategy names and visuals should be easy to understand, even for non-technical users.

Optional (nice to have):
	•	Strategy performance dashboard (win rate, Sharpe ratio, etc.)
	•	User analytics (top performing strategies, most followed signals)
	•	API/webhook support for advanced users to plug into their own systems
  