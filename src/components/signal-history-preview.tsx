'use client';

import type { TradingSignal } from '@/services/trading-signals';
import React from 'react';
import { SignalCard } from './signal-card';
import Link from 'next/link'; // Import Link

interface SignalHistoryPreviewProps {
  signals: TradingSignal[];
}

export function SignalHistoryPreview({ signals }: SignalHistoryPreviewProps) {
  if (!signals || signals.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground bg-card rounded-lg shadow-sm">
        No recent signal history available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {signals.map((signal, index) => (
         // Wrap SignalCard with Link to its detail page
         <Link key={`preview-${signal.timestamp}-${index}`} href={`/signals/${encodeURIComponent(signal.timestamp)}`} className="block hover:opacity-90 transition-opacity">
            <SignalCard signal={signal} />
         </Link>
      ))}
    </div>
  );
}
