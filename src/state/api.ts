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

export interface Product {
  unitPrice: any;
  unit: number;
  _id: string;
  cynicalId?: string;
  name: string;
  quantity: number;
  category: string;
  priority: string;
  price: number; // Price in INR
  description?: string;
  minStockThreshold: number;
}

interface Recipe {
  _id: string;
  cynicalId?: string;
  name: string;
  ingredients: { productId: Product | string; quantity: number }[];
  servings: number;
  description?: string;
  userId: string;
  price: number; // Price in INR
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: async (headers) => {
      try {
        console.log('Fetching CSRF token...');
        const csrfRes = await fetch('http://localhost:5000/api/inventory/csrf-token', {
          method: 'GET',
          credentials: 'include',
        });
        if (!csrfRes.ok) {
          console.error('CSRF fetch failed:', csrfRes.status, await csrfRes.text());
          throw new Error('Failed to fetch CSRF token');
        }
        const { csrfToken } = await csrfRes.json();
        if (!csrfToken) {
          console.error('No CSRF token received');
          throw new Error('CSRF token not received');
        }
        headers.set('x-csrf-token', csrfToken);
        console.log('CSRF token set:', csrfToken);

        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [name, value] = cookie.trim().split('=');
          acc[name] = value;
          return acc;
        }, {} as Record<string, string>);
        console.log('Cookies:', cookies);

        let accessToken = cookies['accessToken'] || localStorage.getItem('accessToken');
        console.log('Initial accessToken:', accessToken);

        if (!accessToken || isTokenExpired(accessToken)) {
          const refreshToken = cookies['refreshToken'];
          console.log('Refresh token:', refreshToken);
          if (refreshToken) {
            console.log('Attempting token refresh...');
            const refreshRes = await fetch('http://localhost:5000/api/auth/refresh', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
              },
              body: JSON.stringify({ refreshToken }),
            });

            if (refreshRes.ok) {
              const { accessToken: newAccessToken } = await refreshRes.json();
              accessToken = newAccessToken;
              localStorage.setItem('accessToken', newAccessToken);
              console.log('New accessToken:', newAccessToken);
            } else {
              console.error('Token refresh failed:', refreshRes.status, await refreshRes.json());
              throw new Error('Unable to refresh token');
            }
          } else {
            console.warn('No refresh token available, skipping token refresh');
            return headers;
          }
        }

        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
          console.log('Authorization header set:', `Bearer ${accessToken}`);
        } else {
          console.warn('No access token available, proceeding without Authorization');
        }
      } catch (err) {
        console.error('Error setting headers:', err);
      }
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => '/inventory/dashboard-metrics',
    }),
    getNotifications: builder.query<Notification[], void>({
      query: () => '/inventory/notifications',
    }),
    getProducts: builder.query<Product[], void>({
      query: () => '/inventory/products',
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/inventory/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
    restockProduct: builder.mutation({
      query: (restock) => ({
        url: '/inventory/restock',
        method: 'POST',
        body: restock,
      }),
      invalidatesTags: ['Products'],
    }),
    manualAdjustment: builder.mutation({
      query: (adjustment) => ({
        url: '/inventory/manual-adjustment',
        method: 'POST',
        body: adjustment,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/inventory/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    bulkCreateProducts: builder.mutation({
      query: (products) => ({
        url: '/inventory/bulk-products',
        method: 'POST',
        body: products,
      }),
      invalidatesTags: ['Products'],
    }),
    bulkRestockProducts: builder.mutation({
      query: (restocks) => ({
        url: '/inventory/bulk-restock',
        method: 'POST',
        body: restocks,
      }),
      invalidatesTags: ['Products'],
    }),
    bulkManualAdjustments: builder.mutation({
      query: (adjustments) => ({
        url: '/inventory/bulk-adjustments',
        method: 'POST',
        body: adjustments,
      }),
      invalidatesTags: ['Products'],
    }),
    getRecipes: builder.query<Recipe[], void>({
      query: () => '/inventory/recipes',
    }),
    createRecipe: builder.mutation({
      query: (recipe) => ({
        url: '/inventory/recipes',
        method: 'POST',
        body: recipe,
      }),
    }),
    recordRecipeConsumption: builder.mutation({
      query: (consumption) => ({
        url: '/inventory/recipe-consumption',
        method: 'POST',
        body: consumption,
      }),
    }),
  }),
});

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() >= expiry;
  } catch (err) {
    console.error('Error decoding token:', err);
    return true;
  }
}

export const {
  useGetDashboardMetricsQuery,
  useGetNotificationsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useRestockProductMutation,
  useManualAdjustmentMutation,
  useDeleteProductMutation,
  useBulkCreateProductsMutation,
  useBulkRestockProductsMutation,
  useBulkManualAdjustmentsMutation,
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useRecordRecipeConsumptionMutation,
} = api;