'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { Menu, X, Coffee, Sun, Moon, Bell, Settings } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Navbar = ({ onToggleSidebar, sidebarOpen }: NavbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`${
        isDark
          ? 'bg-slate-900/95 border-slate-700/50'
          : 'bg-white/80 border-gray-200/50'
      } backdrop-blur-sm shadow-lg border-b sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className={`lg:hidden p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              isDark 
                ? 'hover:bg-slate-800 text-slate-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center space-x-3">
            <div className={`${
              isDark 
                ? 'bg-gradient-to-r from-violet-600 to-purple-600' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500'
            } p-3 rounded-xl shadow-lg`}>
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>F&B Manager</h1>
              <p className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <p className={`text-sm font-medium ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className={`text-xs ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDark 
                  ? 'hover:bg-slate-800 text-slate-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 relative ${
              isDark 
                ? 'hover:bg-slate-800 text-slate-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></span>
            </button>
            <button className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              isDark 
                ? 'hover:bg-slate-800 text-slate-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};