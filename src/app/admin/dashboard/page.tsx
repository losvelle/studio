
import React from 'react';
import { StatsCard } from '@/components/admin/stats-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { Users, BarChartBig, Send, Activity } from 'lucide-react'; // Import relevant icons

// Mock Data - Replace with actual data fetching
const stats = {
  totalUsers: 1250,
  activeSubscriptions: 980,
  signalsSentToday: 15,
};

const recentActivity = [
  { id: 1, type: 'signup', description: 'New user registered: john.doe@example.com', time: '2 hours ago', avatar: 'https://picsum.photos/40/40?random=1' },
  { id: 2, type: 'broadcast', description: 'Signal broadcasted: SMA_Crossover_1 - Buy AAPL', time: '3 hours ago', avatar: 'https://picsum.photos/40/40?random=2' },
  { id: 3, type: 'subscription', description: 'User upgraded plan: jane.smith@example.com', time: '5 hours ago', avatar: 'https://picsum.photos/40/40?random=3' },
  { id: 4, type: 'signup', description: 'New user registered: mike.jones@example.com', time: '1 day ago', avatar: 'https://picsum.photos/40/40?random=4' },
  { id: 5, type: 'broadcast', description: 'Signal broadcasted: RSI_Momentum - Sell TSLA', time: '1 day ago', avatar: 'https://picsum.photos/40/40?random=5' },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>

      {/* Statistics Overview */}
      <section className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          description="+20 since last week" // Example description
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions.toLocaleString()}
          icon={BarChartBig} // Using BarChartBig as placeholder for subscriptions
          description="95% retention rate"
        />
        <StatsCard
          title="Signals Sent Today"
          value={stats.signalsSentToday}
          icon={Send}
          description="5 more than yesterday"
        />
      </section>

      <Separator />

      {/* Recent Activity Feed */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Activity className="h-5 w-5 text-primary"/> Recent Activity
            </CardTitle>
            <CardDescription>Latest actions within the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.avatar} alt="User Avatar" />
                    <AvatarFallback>{activity.type.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                   {/* Optionally add an icon based on activity type */}
                   {/* {activity.type === 'signup' && <Users className="h-4 w-4 text-green-500" />}
                   {activity.type === 'broadcast' && <Send className="h-4 w-4 text-blue-500" />} */}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center">No recent activity.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
