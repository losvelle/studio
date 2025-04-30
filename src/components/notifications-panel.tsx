
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

// Mock notification data - replace with actual data fetching
const mockNotifications = [
  { id: 1, type: 'signal', title: 'New Buy Signal: AAPL', description: 'Strategy SMA_Crossover_1 triggered.', timestamp: new Date(Date.now() - 1000 * 60 * 5), read: false, iconUrl: 'https://picsum.photos/seed/aapl/40/40' },
  { id: 2, type: 'alert', title: 'Price Alert: TSLA', description: 'TSLA reached your target price of $200.', timestamp: new Date(Date.now() - 1000 * 60 * 30), read: false, iconUrl: 'https://picsum.photos/seed/tsla/40/40' },
  { id: 3, type: 'strategy', title: 'Strategy Update: RSI_Momentum', description: 'Parameters updated for better performance.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), read: true, iconUrl: 'https://picsum.photos/seed/rsi/40/40' },
  { id: 4, type: 'system', title: 'Maintenance Scheduled', description: 'Planned maintenance on Sunday at 2 AM UTC.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), read: true, iconUrl: 'https://picsum.photos/seed/system/40/40' },
   { id: 5, type: 'signal', title: 'New Sell Signal: BTC/USD', description: 'Strategy EMA_Reversal_2 identified a sell opportunity.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), read: false, iconUrl: 'https://picsum.photos/seed/btc/40/40' },
   { id: 6, type: 'account', title: 'Subscription Renewal', description: 'Your Professional plan renews next week.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), read: true, iconUrl: 'https://picsum.photos/seed/account/40/40' },
];

// Define notification types and corresponding badges/icons if needed
const notificationTypeStyles = {
  signal: { variant: 'default', className: 'bg-blue-500' },
  alert: { variant: 'destructive', className: 'bg-yellow-500' },
  strategy: { variant: 'secondary', className: 'bg-purple-500' },
  system: { variant: 'outline', className: 'border-gray-500 text-gray-500' },
  account: { variant: 'default', className: 'bg-green-500' },
} as const;


export function NotificationsPanel() {
  // In a real app, use state and fetch notifications
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(currentNotifications =>
      currentNotifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    console.log(`Notification ${id} marked as read.`);
    // TODO: Add API call to mark notification as read on the backend
  };

  const markAllAsRead = () => {
    setNotifications(currentNotifications =>
      currentNotifications.map(n => ({ ...n, read: true }))
    );
    console.log('All notifications marked as read.');
     // TODO: Add API call to mark all as read
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    console.log('All notifications cleared.');
     // TODO: Add API call to clear notifications
  };


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Open Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0"> {/* Added flex flex-col */}
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            View recent updates and alerts from SignalStream.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto"> {/* Added flex-1 */}
          <div className="p-6 space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const typeStyle = notificationTypeStyles[notification.type as keyof typeof notificationTypeStyles] || notificationTypeStyles.system;
                return (
                  <div key={notification.id} className={`flex items-start gap-4 p-4 rounded-lg ${!notification.read ? 'bg-muted/50' : ''}`}>
                     <Avatar className="h-10 w-10 border">
                        <AvatarImage src={notification.iconUrl} alt={notification.type} />
                         <AvatarFallback>{notification.type.substring(0, 2).toUpperCase()}</AvatarFallback>
                     </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {!notification.read && (
                           <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => markAsRead(notification.id)}> {/* Added onClick handler */}
                               <X className="h-4 w-4 text-muted-foreground" />
                               <span className="sr-only">Mark as read</span>
                           </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{notification.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <Badge
                          variant={typeStyle.variant}
                          className={typeStyle.className}
                        >
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </Badge>
                        <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-muted-foreground py-8">No notifications yet.</p>
            )}
          </div>
        </ScrollArea>
         {notifications.length > 0 && (
           <div className="p-4 border-t flex justify-between gap-2">
             <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
               Mark All Read
             </Button>
             <Button variant="destructive" size="sm" onClick={clearAllNotifications}>
               Clear All
             </Button>
           </div>
         )}
      </SheetContent>
    </Sheet>
  );
}
