'use client';

import { useTheme } from '../providers/ThemeProvider';
import { AlertTriangle, Clock, Info, AlertCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type AlertType = 'warning' | 'danger' | 'info' | 'success';

interface AlertCardProps {
  message: string;
  type: AlertType;
  time: string;
}

export const AlertCard = ({ message, type, time }: AlertCardProps) => {
  const { isDark } = useTheme();

  const getAlertConfig = () => {
    const config: {
      icon: LucideIcon;
      borderColor: string;
      bgColor: string;
      textColor: string;
      iconColor: string;
    } = {
      icon: AlertTriangle,
      borderColor: 'border-amber-400',
      bgColor: isDark ? 'bg-amber-900/30' : 'bg-amber-100',
      textColor: isDark ? 'text-amber-300' : 'text-amber-700',
      iconColor: 'text-amber-500',
    };

    switch (type) {
      case 'danger':
        config.icon = AlertCircle;
        config.borderColor = 'border-rose-400';
        config.bgColor = isDark ? 'bg-rose-900/30' : 'bg-rose-100';
        config.textColor = isDark ? 'text-rose-300' : 'text-rose-700';
        config.iconColor = 'text-rose-500';
        break;
      case 'info':
        config.icon = Info;
        config.borderColor = 'border-blue-400';
        config.bgColor = isDark ? 'bg-blue-900/30' : 'bg-blue-100';
        config.textColor = isDark ? 'text-blue-300' : 'text-blue-700';
        config.iconColor = 'text-blue-500';
        break;
      case 'success':
        config.icon = AlertTriangle; // or use CheckCircle if you have it
        config.borderColor = 'border-emerald-400';
        config.bgColor = isDark ? 'bg-emerald-900/30' : 'bg-emerald-100';
        config.textColor = isDark ? 'text-emerald-300' : 'text-emerald-700';
        config.iconColor = 'text-emerald-500';
        break;
    }

    return config;
  };

  const { icon: Icon, borderColor, bgColor, textColor, iconColor } = getAlertConfig();

  return (
    <div
      className={`${
        isDark
          ? 'bg-slate-800/50 hover:bg-slate-800/70'
          : 'bg-white hover:bg-gray-50'
      } rounded-xl p-4 border-l-4 ${borderColor} shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-xl ${bgColor}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
          <div className="flex items-center mt-1 space-x-2">
            <Clock className={`w-3 h-3 ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`} />
            <p className={`text-xs ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`}>{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};