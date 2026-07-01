'use client';

import React from 'react';
import { ReduxProvider } from './providers';

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * App Layout
 * Wraps all /app/* routes (member and employee dashboards) with Redux provider
 * This keeps Redux isolated to only this directory, keeping other routes SSR-friendly
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
