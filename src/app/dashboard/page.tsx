'use client';

import { useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { MenuItemCard } from '../components/MenuItemCard';
import { AlertCard } from '../components/AlertCard';
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  Clock,
  Star,
  TrendingUp,
} from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50'
    }`}>
      <Navbar 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Today's Revenue"
              value="$2,847"
              change="12.5"
              icon={DollarSign}
              color="border-emerald-500"
              trend="up"
            />
            <StatCard
              title="Orders Today"
              value="156"
              change="8.2"
              icon={ShoppingCart}
              color="border-blue-500"
              trend="up"
            />
            <StatCard
              title="Active Tables"
              value="24/30"
              change="-5.1"
              icon={Users}
              color="border-orange-500"
              trend="down"
            />
            <StatCard
              title="Inventory Alerts"
              value="7"
              change="15.3"
              icon={AlertTriangle}
              color="border-violet-500"
              trend="up"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Popular Menu Items */}
            <div className="lg:col-span-2">
              <div className={`${
                isDark 
                  ? 'bg-slate-800/50 hover:bg-slate-800/60' 
                  : 'bg-white/80 hover:bg-white/90'
              } backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>Today's Popular Items</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}>Live updates</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <MenuItemCard
                    name="Margherita Pizza"
                    price="14.99"
                    orders={23}
                    category="pizza"
                  />
                  <MenuItemCard
                    name="Grilled Chicken Sandwich"
                    price="12.50"
                    orders={18}
                    category="sandwich"
                  />
                  <MenuItemCard
                    name="Chocolate Ice Cream"
                    price="6.99"
                    orders={15}
                    category="dessert"
                  />
                  <MenuItemCard
                    name="Caesar Salad"
                    price="9.99"
                    orders={12}
                    category="salad"
                  />
                </div>
              </div>
            </div>

            {/* Alerts and Quick Actions */}
            <div className="space-y-6">
              <div className={`${
                isDark 
                  ? 'bg-slate-800/50 hover:bg-slate-800/60' 
                  : 'bg-white/80 hover:bg-white/90'
              } backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300`}>
                <h2 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Inventory Alerts</h2>
                <div className="space-y-3">
                  <AlertCard
                    message="Tomatoes running low (5 kg left)"
                    type="warning"
                    time="2 min ago"
                  />
                  <AlertCard
                    message="Mozzarella cheese out of stock"
                    type="danger"
                    time="15 min ago"
                  />
                  <AlertCard
                    message="New delivery scheduled for 3 PM"
                    type="info"
                    time="1 hour ago"
                  />
                </div>
              </div>

              <div className={`${
                isDark 
                  ? 'bg-slate-800/50 hover:bg-slate-800/60' 
                  : 'bg-white/80 hover:bg-white/90'
              } backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300`}>
                <h2 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Quick Actions</h2>
                <div className="space-y-3">
                  <button className={`w-full text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
                    isDark 
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700' 
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                  }`}>
                    Add New Order
                  </button>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                    Update Inventory
                  </button>
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className={`${
              isDark 
                ? 'bg-slate-800/50 hover:bg-slate-800/60' 
                : 'bg-white/80 hover:bg-white/90'
            } backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Kitchen Status</h3>
                <Clock className={`w-5 h-5 ${
                  isDark ? 'text-violet-400' : 'text-orange-500'
                }`} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Pending Orders</span>
                  <span className={`font-semibold ${
                    isDark ? 'text-violet-400' : 'text-orange-600'
                  }`}>8</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Prep Time</span>
                  <span className="font-semibold text-emerald-500">12 min</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Staff on Duty</span>
                  <span className="font-semibold text-blue-500">6</span>
                </div>
              </div>
            </div>

            <div className={`${
              isDark 
                ? 'bg-slate-800/50 hover:bg-slate-800/60' 
                : 'bg-white/80 hover:bg-white/90'
            } backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Customer Satisfaction</h3>
                <Star className="w-5 h-5 text-amber-400 fill-current" />
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>4.8</div>
                <div className="flex justify-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>Based on 127 reviews</p>
              </div>
            </div>

            <div className={`${
              isDark 
                ? 'bg-slate-800/50 hover:bg-slate-800/60' 
                : 'bg-white/80 hover:bg-white/90'
            } backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Weekly Sales</h3>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>This Week</span>
                  <span className="font-semibold text-emerald-500">$18,245</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Last Week</span>
                  <span className={`font-semibold ${
                    isDark ? 'text-slate-300' : 'text-gray-500'
                  }`}>$16,890</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Growth</span>
                  <span className="font-semibold text-emerald-500">+8.0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};