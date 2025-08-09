'use client';

import { useTheme } from '../providers/ThemeProvider';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  trend: 'up' | 'down';
}

export const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  trend,
}: StatCardProps) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${
      isDark 
        ? 'bg-slate-800/50 hover:bg-slate-800/70 border-l-4' 
        : 'bg-white hover:bg-gray-50 border-l-4'
    } ${color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            isDark ? 'text-slate-400' : 'text-gray-600'
          }`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
            }`}>
              {change}%
            </span>
          </div>
        </div>
        <div className={`p-4 rounded-2xl shadow-lg ${
          color.includes('emerald') 
            ? isDark ? 'bg-gradient-to-r from-emerald-900/50 to-teal-900/50' : 'bg-gradient-to-r from-emerald-100 to-teal-100'
            : color.includes('blue') 
            ? isDark ? 'bg-gradient-to-r from-blue-900/50 to-cyan-900/50' : 'bg-gradient-to-r from-blue-100 to-cyan-100'
            : color.includes('orange') 
            ? isDark ? 'bg-gradient-to-r from-orange-900/50 to-amber-900/50' : 'bg-gradient-to-r from-orange-100 to-amber-100'
            : isDark ? 'bg-gradient-to-r from-violet-900/50 to-purple-900/50' : 'bg-gradient-to-r from-violet-100 to-purple-100'
        }`}>
          <Icon className={`w-8 h-8 ${
            color.includes('emerald') 
              ? isDark ? 'text-emerald-400' : 'text-emerald-600'
              : color.includes('blue') 
              ? isDark ? 'text-blue-400' : 'text-blue-600'
              : color.includes('orange') 
              ? isDark ? 'text-orange-400' : 'text-orange-600'
              : isDark ? 'text-violet-400' : 'text-violet-600'
          }`} />
        </div>
      </div>
    </div>
  );
};