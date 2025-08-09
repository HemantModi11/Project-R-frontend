'use client';

import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { ProductList } from '@/components/ProductList';
import { InventoryForm } from '@/components/InventoryForm';
import { Modal } from '@/components/Modal';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { useGetProductsQuery, useCreateProductMutation, useRestockProductMutation, useManualAdjustmentMutation } from '@/state/api';
import { PlusCircle, Search, Package, AlertTriangle, Upload } from 'lucide-react';

export default function InventoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'product' | 'restock' | 'adjustment' | 'bulk'>('product');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { isDark } = useTheme();
  const { data: products, isLoading: productsLoading, error } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [restockProduct] = useRestockProductMutation();
  const [manualAdjustment] = useManualAdjustmentMutation();
  const [formError, setFormError] = useState('');

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csv = event.target?.result as string;
      const lines = csv.split('\n').map(line => line.trim()).filter(line => line);
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        return headers.reduce((obj, header, i) => {
          obj[header] = values[i] || '';
          return obj;
        }, {} as Record<string, string>);
      });

      try {
        if (modalAction === 'bulk') {
          if (headers.includes('name')) {
            for (const row of rows) {
              await createProduct({
                name: row.name,
                quantity: Number(row.quantity) || 0,
                unit: row.unit || 'kg',
                category: row.category || 'Other',
                priority: row.priority || 'Low',
                price: Number(row.price) || 0, // Total price in INR
                minStockThreshold: Number(row.minStockThreshold) || 10,
                description: row.description || '',
              }).unwrap();
            }
          } else if (headers.includes('productId')) {
            for (const row of rows) {
              if (row.quantityCredited) {
                await restockProduct({
                  productId: row.productId,
                  quantityCredited: Number(row.quantityCredited) || 0,
                  costForQuantityCredited: Number(row.costForQuantityCredited) || 0,
                }).unwrap();
              } else {
                await manualAdjustment({
                  productId: row.productId,
                  quantityDebited: row.quantityDebited ? Number(row.quantityDebited) : undefined,
                  quantityCredited: row.quantityCredited ? Number(row.quantityCredited) : undefined,
                  reason: row.reason || 'Bulk adjustment',
                }).unwrap();
              }
            }
          }
          setModalOpen(false);
        }
      } catch (err: any) {
        setFormError(err.data?.message || 'Failed to process bulk upload');
      }
    };
    reader.readAsText(file);
  };

  if (productsLoading) {
    return (
      <ProtectedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 animate-spin text-blue-500" />
            <span className={isDark ? 'text-white' : 'text-gray-800'}>Loading inventory...</span>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Failed to load inventory</p>
            <p className="text-sm mt-1">Please try logging in again</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  const filteredProducts = products
    ?.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'name') return multiplier * a.name.localeCompare(b.name);
      if (sortBy === 'quantity') return multiplier * (a.quantity - b.quantity);
      if (sortBy === 'price') return multiplier * (a.unitPrice - b.unitPrice);
      return 0;
    });

  const lowStockCount = products?.filter(p => p.quantity <= p.minStockThreshold).length || 0;
  const totalValue = products?.reduce((sum, p) => sum + p.price, 0) || 0;

  return (
    <ProtectedLayout>
      <div className="px-4 md:px-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className={`${
            isDark ? 'bg-slate-800/50' : 'bg-white/80'
          } backdrop-blur-sm rounded-xl shadow-md p-4 md:p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Total Inventory Value
            </h3>
            <p className={`text-2xl font-bold ${isDark ? 'text-teal-400' : 'text-orange-600'}`}>
              ₹{totalValue.toFixed(2)}
            </p>
          </div>
          <div className={`${
            isDark ? 'bg-slate-800/50' : 'bg-white/80'
          } backdrop-blur-sm rounded-xl shadow-md p-4 md:p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Low Stock Alerts
            </h3>
            <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              {lowStockCount} items
            </p>
          </div>
        </div>

        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {formError}
          </div>
        )}

        <div className={`${
          isDark ? 'bg-slate-800/50' : 'bg-white/80'
        } backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
              />
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
              >
                <option value="name">Sort by Name</option>
                <option value="quantity">Sort by Stock</option>
                <option value="price">Sort by Unit Price</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className={`px-3 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
              >
                <option value="asc">↑ Ascending</option>
                <option value="desc">↓ Descending</option>
              </select>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                onClick={() => { setModalAction('product'); setModalOpen(true); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                }`}
              >
                <PlusCircle className="w-5 h-5" /> Add Product
              </button>
              <button
                onClick={() => { setModalAction('bulk'); setModalOpen(true); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                }`}
              >
                <Upload className="w-5 h-5" /> Bulk Upload
              </button>
            </div>
          </div>
        </div>

        <div className={`${
          isDark ? 'bg-slate-800/50 hover:bg-slate-800/60' : 'bg-white/90 hover:bg-white'
        } backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-6 transition-all duration-300`}>
          <ProductList 
            products={filteredProducts || []} 
            onRestock={(productId) => { setModalAction('restock'); setModalOpen(true); }}
            onAdjust={(productId) => { setModalAction('adjustment'); setModalOpen(true); }}
          />
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalAction === 'product' ? 'Add Product' : 
          modalAction === 'restock' ? 'Restock Product' : 
          modalAction === 'adjustment' ? 'Manual Adjustment' : 
          'Bulk Upload'
        }
      >
        {modalAction === 'bulk' ? (
          <div className="space-y-4">
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Upload a CSV file for bulk product creation, restocking, or adjustments. Include unit (kg or L).
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleBulkUpload}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className={`flex-1 p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
                  isDark ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <InventoryForm
            products={products || []}
            action={modalAction}
            onCreateProduct={(data) => createProduct(data).unwrap().catch((err) => setFormError(err.data?.message || 'Failed to create product'))}
            onRestockProduct={(data) => restockProduct(data).unwrap().catch((err) => setFormError(err.data?.message || 'Failed to restock product'))}
            onManualAdjustment={(data) => manualAdjustment(data).unwrap().catch((err) => setFormError(err.data?.message || 'Failed to record adjustment'))}
            isDark={isDark}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Modal>
    </ProtectedLayout>
  );
}