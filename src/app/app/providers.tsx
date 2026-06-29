'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

/**
 * Redux Provider Component
 * This provider is isolated to the /app directory to keep other routes SSR-friendly
 * Only components nested under /src/app/app will have access to Redux
 */
export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
