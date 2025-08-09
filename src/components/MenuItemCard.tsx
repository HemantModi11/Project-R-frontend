'use client';

import { useTheme } from '../providers/ThemeProvider';
import { Pizza, Sandwich, IceCream, Utensils, Star } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MenuItemCardProps {
  name: string;
  price: string;
  orders: number;
  category: 'pizza' | 'sandwich' | 'dessert' | string;
}

export const MenuItemCard = ({ 
  name, 
  price, 
  orders, 
  category 
}: MenuItemCardProps) => {
  const { isDark } = useTheme();

  const getCategoryIcon = (): LucideIcon => {
    switch (category) {
      case 'pizza':
        return Pizza;
      case 'sandwich':
        return Sandwich;
      case 'dessert':
        return IceCream;
      default:
        return Utensils;
    }
  };

  const Icon = getCategoryIcon();

  return (
    <div className={`${
      isDark 
        ? 'bg-slate-800/50 hover:bg-slate-800/70' 
        : 'bg-white hover:bg-gray-50'
    } rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm`}>
      <div className="flex items-center space-x-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
          isDark 
            ? 'bg-gradient-to-br from-violet-600 to-purple-600' 
            : 'bg-gradient-to-br from-orange-400 to-amber-400'
        }`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>{name}</h3>
          <p className="text-emerald-500 font-bold text-lg">${price}</p>
          <p className={`text-sm ${
            isDark ? 'text-slate-400' : 'text-gray-500'
          }`}>{orders} orders today</p>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span className={`text-sm ml-1 ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>4.8</span>
        </div>
      </div>
    </div>
  );
};