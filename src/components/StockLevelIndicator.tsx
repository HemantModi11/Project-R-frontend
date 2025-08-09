'use client';

import React from 'react';

interface StockLevelIndicatorProps {
  currentStock: number;
  minThreshold: number;
  maxCapacity?: number;
  isDark?: boolean;
}

export const StockLevelIndicator: React.FC<StockLevelIndicatorProps> = ({
  currentStock,
  minThreshold,
  maxCapacity = minThreshold * 3,
  isDark = false
}) => {
  const percentage = Math.min((currentStock / maxCapacity) * 100, 100);
  
  const getStockColor = () => {
    const thresholdPercentage = (minThreshold / maxCapacity) * 100;
    const midPercentage = thresholdPercentage * 2;
    
    if (percentage <= thresholdPercentage) {
      return 'bg-gradient-to-r from-red-500 to-red-600';
    } else if (percentage <= midPercentage) {
      return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    } else {
      return 'bg-gradient-to-r from-green-500 to-emerald-500';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Battery-like indicator */}
      <div className={`relative w-8 h-3 ${isDark ? 'bg-slate-600' : 'bg-gray-200'} rounded-sm border ${isDark ? 'border-slate-500' : 'border-gray-300'}`}>
        {/* Battery tip */}
        <div className={`absolute -right-0.5 top-0.5 w-0.5 h-2 ${isDark ? 'bg-slate-600 border-slate-500' : 'bg-gray-200 border-gray-300'} rounded-r-sm border-r`}></div>
        
        {/* Fill level */}
        <div 
          className={`h-full rounded-sm transition-all duration-300 ${getStockColor()}`}
          style={{ width: `${Math.max(percentage, 4)}%` }}
        ></div>
        
        {/* Critical level indicator */}
        {percentage <= (minThreshold / maxCapacity) * 100 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      
      {/* Stock text */}
      <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {currentStock}
      </span>
    </div>
  );
};