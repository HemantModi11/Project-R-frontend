'use client';

import { useState } from 'react';
import { Product } from '@/state/api';
import { useTheme } from '@/providers/ThemeProvider';

interface InventoryFormProps {
  products: Product[];
  action: 'product' | 'restock' | 'adjustment';
  onCreateProduct: (data: any) => void;
  onRestockProduct: (data: any) => void;
  onManualAdjustment: (data: any) => void;
  isDark: boolean;
  onClose: () => void;
}

export const InventoryForm = ({
  products,
  action,
  onCreateProduct,
  onRestockProduct,
  onManualAdjustment,
  isDark,
  onClose,
}: InventoryFormProps) => {
  const [productForm, setProductForm] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    category: 'Other',
    priority: 'Low',
    price: '',
    minStockThreshold: '10',
    description: '',
  });
  const [restockForm, setRestockForm] = useState({
    productId: '',
    quantityCredited: '',
    costForQuantityCredited: '',
  });
  const [adjustmentForm, setAdjustmentForm] = useState({
    productId: '',
    quantityDebited: '',
    quantityCredited: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (action) {
      case 'product':
        onCreateProduct({
          ...productForm,
          quantity: Number(productForm.quantity),
          price: Number(productForm.price),
          minStockThreshold: Number(productForm.minStockThreshold),
        });
        setProductForm({ name: '', quantity: '', unit: 'kg', category: 'Other', priority: 'Low', price: '', minStockThreshold: '10', description: '' });
        break;
      case 'restock':
        onRestockProduct({
          productId: restockForm.productId,
          quantityCredited: Number(restockForm.quantityCredited),
          costForQuantityCredited: Number(restockForm.costForQuantityCredited),
        });
        setRestockForm({ productId: '', quantityCredited: '', costForQuantityCredited: '' });
        break;
      case 'adjustment':
        onManualAdjustment({
          productId: adjustmentForm.productId,
          quantityDebited: adjustmentForm.quantityDebited ? Number(adjustmentForm.quantityDebited) : undefined,
          quantityCredited: adjustmentForm.quantityCredited ? Number(adjustmentForm.quantityCredited) : undefined,
          reason: adjustmentForm.reason || 'Manual adjustment',
        });
        setAdjustmentForm({ productId: '', quantityDebited: '', quantityCredited: '', reason: '' });
        break;
    }
    onClose();
  };

  // Dynamically set available units based on category
  const availableUnits = productForm.category === 'Dairy' ? ['L'] : productForm.category === 'Other' ? ['kg', 'L'] : ['kg'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {action === 'product' && (
        <>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Product Name
            </label>
            <input
              type="text"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Quantity
            </label>
            <input
              type="number"
              value={productForm.quantity}
              onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
              min="0"
              step="0.001"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Unit
            </label>
            <select
              value={productForm.unit}
              onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
            >
              {availableUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={productForm.category}
              onChange={(e) => {
                const newCategory = e.target.value;
                const newUnit = newCategory === 'Dairy' ? 'L' : 'kg';
                setProductForm({ ...productForm, category: newCategory, unit: newUnit });
              }}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Priority
            </label>
            <select
              value={productForm.priority}
              onChange={(e) => setProductForm({ ...productForm, priority: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Total Price (₹)
            </label>
            <input
              type="number"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Minimum Stock Threshold
            </label>
            <input
              type="number"
              value={productForm.minStockThreshold}
              onChange={(e) => setProductForm({ ...productForm, minStockThreshold: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
              min="0"
              step="0.001"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
            />
          </div>
        </>
      )}

      {action === 'restock' && (
        <>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Product
            </label>
            <select
              value={restockForm.productId}
              onChange={(e) => setRestockForm({ ...restockForm, productId: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.quantity} {p.unit} available)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Quantity Restocked
            </label>
            <input
              type="number"
              value={restockForm.quantityCredited}
              onChange={(e) => setRestockForm({ ...restockForm, quantityCredited: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
              min="0.001"
              step="0.001"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Total Cost for Restocked Quantity (₹)
            </label>
            <input
              type="number"
              value={restockForm.costForQuantityCredited}
              onChange={(e) => setRestockForm({ ...restockForm, costForQuantityCredited: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
              min="0"
              step="0.01"
            />
          </div>
        </>
      )}

      {action === 'adjustment' && (
        <>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Product
            </label>
            <select
              value={adjustmentForm.productId}
              onChange={(e) => setAdjustmentForm({ ...adjustmentForm, productId: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.quantity} {p.unit} available)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Quantity Deducted
            </label>
            <input
              type="number"
              value={adjustmentForm.quantityDebited}
              onChange={(e) => setAdjustmentForm({ ...adjustmentForm, quantityDebited: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              min="0"
              step="0.001"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Quantity Added
            </label>
            <input
              type="number"
              value={adjustmentForm.quantityCredited}
              onChange={(e) => setAdjustmentForm({ ...adjustmentForm, quantityCredited: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
              min="0"
              step="0.001"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Reason
            </label>
            <textarea
              value={adjustmentForm.reason}
              onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })}
              className={`w-full p-3 border rounded-lg ${
                isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
            />
          </div>
        </>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          className={`flex-1 p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
            isDark ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className={`flex-1 p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
            isDark ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};