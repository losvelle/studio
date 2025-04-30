import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import './globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SignalStream',
  description: 'Real-time trading signals based on proprietary strategies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased font-sans' // Use sans font by default
        )}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M2 12h3m5 0h3m5 0h3"/>
                    <path d="M5 17h3m5 0h3m5 0h3M5 7h3m5 0h3m5 0h3"/>
                  </svg>
                <span className="font-bold">SignalStream</span>
              </a>
            </div>
            {/* Add Navigation/User menu here later */}
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
