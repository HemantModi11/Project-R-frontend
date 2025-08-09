'use client';

import { useTheme } from '../providers/ThemeProvider';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
  const pathname = usePathname();

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: Utensils, label: 'Menu', path: '/menu' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] ${
          isDark
            ? 'bg-slate-900/95 shadow-2xl border-slate-700/50'
            : 'bg-white/90 shadow-xl border-gray-200/50'
        } backdrop-blur-sm border-r transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div
          className={`p-4 md:p-6 border-b ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                isDark
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`}
            >
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <p
                className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}
              >
                Admin User
              </p>
              <p
                className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                Manager
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 group ${
                pathname === item.path
                  ? isDark
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/25'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              } hover:scale-[1.02] hover:shadow-md`}
              onClick={onClose}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-105" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div
          className={`p-4 border-t ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <button
            className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 w-full group ${
              isDark
                ? 'text-slate-300 hover:bg-red-900/20 hover:text-red-400'
                : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
            } hover:scale-[1.02] hover:shadow-md`}
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:scale-105" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};