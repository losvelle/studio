
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use next/navigation
import {
  LayoutDashboard,
  BarChartBig,
  Send,
  Users,
  LogOut,
  Settings, // Added Settings icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
    SidebarInset,
} from "@/components/ui/sidebar"; // Import Sidebar components
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  // Mock logout function
  const handleLogout = () => {
    console.log('Admin logout');
    // Redirect to a public page or admin login after logout
    router.push('/'); // Redirect to home page for now
  };

  // Determine active path for styling
  // Use state or pathname from usePathname() in a real app for better accuracy
  const isActive = (path: string) => {
    // Basic check, improve with usePathname if needed
     if (typeof window !== 'undefined') {
       return window.location.pathname.startsWith(path);
     }
     return false;
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center justify-between p-2">
               <Link href="/admin/dashboard" className="flex items-center gap-2">
                   <Settings className="h-6 w-6 text-primary" /> {/* Changed icon */}
                   <span className="font-bold text-lg text-primary">Admin Panel</span>
               </Link>
               <SidebarTrigger /> {/* Sidebar toggle button */}
           </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
           <SidebarMenu>
            <SidebarMenuItem>
               <SidebarMenuButton
                  href="/admin/dashboard"
                  asChild
                  isActive={isActive('/admin/dashboard')}
                  tooltip="Dashboard"
               >
                  <Link href="/admin/dashboard">
                     <LayoutDashboard />
                     <span>Dashboard</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton
                  href="/admin/strategies"
                  asChild
                  isActive={isActive('/admin/strategies')}
                  tooltip="Strategies"
               >
                  <Link href="/admin/strategies">
                     <BarChartBig />
                     <span>Strategies</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton
                  href="/admin/broadcast"
                  asChild
                  isActive={isActive('/admin/broadcast')}
                  tooltip="Broadcast Signal"
               >
                  <Link href="/admin/broadcast">
                     <Send />
                     <span>Broadcast Signal</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton
                  href="/admin/users"
                  asChild
                  isActive={isActive('/admin/users')}
                  tooltip="Users"
               >
                  <Link href="/admin/users">
                     <Users />
                     <span>User Management</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarContent>
         <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
               <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                    <LogOut />
                    <span>Logout</span>
               </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
       <SidebarInset className="p-4 md:p-6">
         {children}
       </SidebarInset>
    </SidebarProvider>
  );
}

