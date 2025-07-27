'use client';

import { ThemeProvider } from './ThemeProvider';
import ReduxProvider from './ReduxProvider';

interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ReduxProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}