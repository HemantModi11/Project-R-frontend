'use client';

import { useTheme } from '../providers/ThemeProvider';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Utensils,
  Users,
  Activity,
  Calendar,
  ChefHat,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { isDark } = useTheme();

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: Package, label: 'Inventory', active: false },
    { icon: ShoppingCart, label: 'Orders', active: false },
    { icon: Utensils, label: 'Menu', active: false },
    { icon: Users, label: 'Customers', active: false },
    { icon: Activity, label: 'Analytics', active: false },
    { icon: Calendar, label: 'Schedule', active: false },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 ${
          isDark
            ? 'bg-slate-900/95 shadow-2xl border-slate-700/50'
            : 'bg-white/90 shadow-xl border-gray-200/50'
        } backdrop-blur-sm border-r transition-all duration-300 ease-in-out`}
      >
        
        {/* Profile Section */}
        <div className={`p-6 border-b ${
          isDark ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
              isDark 
                ? 'bg-gradient-to-r from-violet-600 to-purple-600' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}>
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className={`font-semibold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>Admin User</p>
              <p className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Manager</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                item.active 
                  ? isDark
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              } hover:scale-105 hover:shadow-lg`}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700">
          <button className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 w-full group ${
            isDark 
              ? 'text-slate-300 hover:bg-red-900/20 hover:text-red-400' 
              : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
          } hover:scale-105`}>
            <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};