'use client';

import { useGetDashboardMetricsQuery } from '@/state/api';
import { TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type StockSums = {
  [category: string]: number;
};

const colors = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#FF6384'];

const CardStockSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery(undefined);

  const stockByCategorySummary = dashboardMetrics?.stockByCategorySummary || [];

  const stockSums = stockByCategorySummary.reduce(
    (acc: StockSums, item: { category: string; amount: number }) => {
      const category = item.category;
      const amount = item.amount;
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const stockCategories = Object.entries(stockSums).map(([name, value]) => ({
    name,
    value,
  }));

  const totalStock = stockCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );
  const formattedTotalStock = totalStock.toLocaleString();

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Stock Summary</h2>
            <hr />
          </div>
          <div className="xl:flex justify-between pr-7">
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={stockCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {stockCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">{formattedTotalStock}</span>
                <span className="text-sm"> Units</span>
              </div>
            </div>
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {stockCategories.map((entry, index) => (
                <li key={`legend-${index}`} className="flex items-center text-xs">
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <hr />
            {dashboardMetrics?.stockSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Low Stock Items:{' '}
                    <span className="font-semibold">
                      {dashboardMetrics.stockSummary.lowStockCount}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  {dashboardMetrics.stockSummary.lowStockCount > 0 ? 'Review' : 'Stable'}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardStockSummary;