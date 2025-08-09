'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const router = useRouter();
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side checks
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);
    const accessToken = cookies['accessToken'] || localStorage.getItem('accessToken');

    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  if (!isClient) {
    return null; // Prevent SSR mismatch
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <main
          className={`flex-1 pt-8 pl-0 pb-10 md:pl-64 overflow-y-auto transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800'
              : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};