import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StockSummary {
  totalStock: number;
  lowStockCount: number;
}

interface SalesSummary {
  date: string;
  totalValue: number;
  changePercentage: number;
}

interface StockByCategorySummary {
  category: string;
  amount: number;
}

interface ConsumptionSummary {
  date: string;
  totalConsumed: number;
  changePercentage: number;
}

interface PopularProduct {
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}

interface Notification {
  _id: string;
  message: string;
  type: string;
  createdAt: string;
  read: boolean;
}

interface DashboardMetrics {
  stockSummary: StockSummary;
  salesSummary: SalesSummary[];
  stockByCategorySummary: StockByCategorySummary[];
  consumptionSummary: ConsumptionSummary[];
  popularProducts: PopularProduct[];
  notifications: Notification[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include', // Send cookies with requests
    prepareHeaders: async (headers) => {
      // Fetch CSRF token for mutations
      try {
        const res = await fetch('http://localhost:5000/api/auth/csrf-token', {
          method: 'GET',
          credentials: 'include',
        });
        const { csrfToken } = await res.json();
        headers.set('X-CSRF-Token', csrfToken);
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => '/inventory/dashboard-metrics',
    }),
    getNotifications: builder.query<Notification[], void>({
      query: () => '/inventory/notifications',
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/inventory/products',
        method: 'POST',
        body: product,
      }),
    }),
    createSale: builder.mutation({
      query: (sale) => ({
        url: '/inventory/sales',
        method: 'POST',
        body: sale,
      }),
    }),
    restockProduct: builder.mutation({
      query: (restock) => ({
        url: '/inventory/restock',
        method: 'POST',
        body: restock,
      }),
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetNotificationsQuery,
  useCreateProductMutation,
  useCreateSaleMutation,
  useRestockProductMutation,
} = api;