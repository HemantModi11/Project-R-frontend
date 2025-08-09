'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Product } from '@/state/api';
import { useTheme } from '../providers/ThemeProvider';

// Register Chart.js components
Chart.register(...registerables);

interface InventoryChartProps {
  products: Product[];
}

export const InventoryChart = ({ products }: InventoryChartProps) => {
  const { isDark } = useTheme();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Select top 6 products by quantity
  const topProducts = products
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 6);

  // Calculate stock status (0: immediate, 1: order soon, 2: well-stocked)
  const stockStatus = topProducts.map((p) => {
    if (p.quantity <= p.minStockThreshold) return 0; // Immediate (red)
    if (p.quantity <= p.minStockThreshold * 2) return 1; // Order soon (yellow)
    return 2; // Well-stocked (green)
  });

  // Define colors based on theme
  const barBackgroundColor = isDark ? 'rgba(45, 212, 191, 0.6)' : 'rgba(249, 115, 22, 0.6)';
  const barBorderColor = isDark ? 'rgba(45, 212, 191, 1)' : 'rgba(249, 115, 22, 1)';
  const textColor = isDark ? '#e2e8f0' : '#1f2937';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const statusColors = stockStatus.map(status => 
    status === 0 ? 'rgba(239, 68, 68, 1)' : 
    status === 1 ? 'rgba(234, 179, 8, 1)' : 
    'rgba(16, 185, 129, 1)'
  );

  useEffect(() => {
    if (chartRef.current && topProducts.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: topProducts.map(p => p.name),
            datasets: [
              {
                label: 'Quantity',
                data: topProducts.map(p => p.quantity),
                backgroundColor: barBackgroundColor,
                borderColor: barBorderColor,
                borderWidth: 1,
                yAxisID: 'y'
              },
              {
                label: 'Stock Status',
                type: 'line',
                data: stockStatus,
                borderColor: statusColors,
                pointBackgroundColor: statusColors,
                pointRadius: 5,
                fill: false,
                yAxisID: 'y1'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Quantity',
                  color: textColor
                },
                grid: {
                  color: gridColor
                },
                ticks: {
                  color: textColor
                }
              },
              y1: {
                position: 'right',
                beginAtZero: true,
                max: 2,
                ticks: {
                  stepSize: 1,
                  callback: function(value) {
                    if (value === 0) return 'Immediate';
                    if (value === 1) return 'Order Soon';
                    return 'Well-Stocked';
                  },
                  color: textColor
                },
                grid: {
                  display: false
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Product',
                  color: textColor
                },
                grid: {
                  color: gridColor
                },
                ticks: {
                  color: textColor
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: textColor
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    if (context.dataset.label === 'Stock Status') {
                      const value = context.raw as number;
                      if (value === 0) return 'Status: Immediate Restock';
                      if (value === 1) return 'Status: Order Soon';
                      return 'Status: Well-Stocked';
                    }
                    return `${context.dataset.label}: ${context.raw}`;
                  }
                }
              }
            }
          }
        });
      }
    }

    // Cleanup to prevent memory leaks
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [topProducts, isDark, barBackgroundColor, barBorderColor, textColor, gridColor, statusColors, stockStatus]);

  return (
    <div className="h-64">
      <canvas ref={chartRef} />
    </div>
  );
};