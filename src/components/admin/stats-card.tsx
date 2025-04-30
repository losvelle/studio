
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from 'lucide-react'; // Import LucideIcon type

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon; // Expect a Lucide icon component
  description?: string; // Optional description or change indicator
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, description, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
            <p className="text-xs text-muted-foreground">
                {description}
            </p>
        )}
      </CardContent>
    </Card>
  );
}
