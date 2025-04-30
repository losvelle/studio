
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

// Paths where certain header elements (like notifications) should be hidden
const AUTH_PATHS = ['/login', '/signup', '/forgot-password'];

interface HeaderContentProps {
  children: React.ReactNode;
}

export function HeaderContent({ children }: HeaderContentProps) {
  const pathname = usePathname();

  // Hide children if the current path is one of the auth paths
  const hideContent = AUTH_PATHS.includes(pathname);

  if (hideContent) {
    return null; // Render nothing on auth pages
  }

  return <>{children}</>; // Render children (e.g., NotificationsPanel) on other pages
}
