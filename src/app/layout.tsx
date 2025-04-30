
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Use Inter font
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Home, BarChart, User } from 'lucide-react'; // Removed Bell
import { NotificationsPanel } from '@/components/notifications-panel'; // Import NotificationsPanel
import { HeaderContent } from '@/components/header-content'; // Import HeaderContent

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' }); // Define Inter font variable

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
    <html lang="en" suppressHydrationWarning>
      <body
        // Removed suppressHydrationWarning from body as it's better on html
        className={cn(
          inter.variable, // Use Inter font variable
          'antialiased font-sans flex flex-col min-h-screen bg-background' // Apply background color here
        )}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="mr-4 flex items-center">
              <Link className="mr-6 flex items-center space-x-2" href="/">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M2 12h3m5 0h3m5 0h3"/>
                    <path d="M5 17h3m5 0h3m5 0h3M5 7h3m5 0h3m5 0h3"/>
                  </svg>
                <span className="font-bold">SignalStream</span>
              </Link>
            </div>
            {/* Use HeaderContent to conditionally render NotificationsPanel */}
            <HeaderContent>
              <NotificationsPanel />
            </HeaderContent>
            {/* Add User menu here later */}
          </div>
        </header>

        {/* Add padding-bottom to main content to prevent overlap with fixed footer */}
        <main className="flex-1 pb-16">{children}</main>

        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-14 items-center justify-around">
            <Link href="/" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/strategies" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
              <BarChart className="h-5 w-5" />
              <span className="text-xs">Strategies</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
              <User className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Link>
          </nav>
        </footer>

        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
