'use client';

import { useState } from 'react';
import { Product } from '@/state/api';
import { useTheme } from '@/providers/ThemeProvider';
import { StockLevelIndicator } from './StockLevelIndicator';
import { TrendingUp, Edit, Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { useDeleteProductMutation } from '@/state/api';

interface ProductListProps {
  products: Product[];
  onRestock: (productId: string) => void;
  onAdjust: (productId: string) => void;
}

export const ProductList = ({ products, onRestock, onAdjust }: ProductListProps) => {
  const { isDark } = useTheme();
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete).unwrap();
        setDeleteModalOpen(false);
        setProductToDelete(null);
      } catch (err: any) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`${isDark ? 'bg-slate-700' : 'bg-gray-50'} ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <th className="p-3 font-medium text-sm">Name</th>
              <th className="p-3 font-medium text-sm">Stock Level</th>
              <th className="p-3 font-medium text-sm">Category</th>
              <th className="p-3 font-medium text-sm">Unit Price</th>
              <th className="p-3 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className={`border-b ${isDark ? 'border-slate-600' : 'border-gray-100'} ${
                  isDark ? 'hover:bg-slate-600/30' : 'hover:bg-gray-50/50'
                } ${isDark ? 'text-white' : 'text-gray-800'} transition-colors`}
              >
                <td className="p-3">
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    {product.quantity <= product.minStockThreshold && (
                      <div className="text-xs text-red-500 mt-1">Low Stock Alert</div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <StockLevelIndicator
                    currentStock={product.quantity}
                    minThreshold={product.minStockThreshold}
                    maxCapacity={product.minStockThreshold * 4}
                    isDark={isDark}
                  />
                  <div className="text-xs mt-1">{product.quantity} {product.unit}</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isDark ? 'bg-slate-600 text-slate-200' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {product.category}
                  </span>
                </td>
                <td className="p-3">
                  <span className="font-medium text-sm">₹{product.unitPrice.toFixed(2)}/{product.unit}</span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onRestock(product._id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isDark 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      Restock
                    </button>
                    <button
                      onClick={() => onAdjust(product._id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isDark 
                          ? 'bg-slate-600 hover:bg-slate-700 text-white' 
                          : 'bg-gray-400 hover:bg-gray-500 text-white'
                      }`}
                    >
                      <Edit className="w-3 h-3" />
                      Adjust
                    </button>
                    <button
                      onClick={() => {
                        setProductToDelete(product._id);
                        setDeleteModalOpen(true);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isDark 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className={`flex-1 p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
                isDark ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className={`flex-1 p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
                isDark ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};