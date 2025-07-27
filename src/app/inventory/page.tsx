'use client';

import { useState } from 'react';
import { useCreateProductMutation, useCreateSaleMutation, useRestockProductMutation, useGetDashboardMetricsQuery } from '@/state/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Inventory = () => {
  const [productForm, setProductForm] = useState({
    name: '',
    quantity: '',
    category: 'Other',
    priority: 'Low',
    price: '',
    description: '',
    minStockThreshold: '10',
  });
  const [saleForm, setSaleForm] = useState({ productId: '', quantityDebited: '' });
  const [restockForm, setRestockForm] = useState({ productId: '', quantityCredited: '', costForQuantityCredited: '' });
  const [error, setError] = useState('');

  const [createProduct] = useCreateProductMutation();
  const [createSale] = useCreateSaleMutation();
  const [restockProduct] = useRestockProductMutation();
  const { data: dashboardMetrics } = useGetDashboardMetricsQuery(undefined);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSaleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSaleForm({ ...saleForm, [e.target.name]: e.target.value });
  };

  const handleRestockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRestockForm({ ...restockForm, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        ...productForm,
        quantity: parseInt(productForm.quantity),
        price: parseFloat(productForm.price),
        minStockThreshold: parseInt(productForm.minStockThreshold),
      }).unwrap();
      setProductForm({ name: '', quantity: '', category: 'Other', priority: 'Low', price: '', description: '', minStockThreshold: '10' });
      setError('');
    } catch (err: any) {
      setError(err.data?.message || 'Failed to create product');
    }
  };

  const handleSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSale({
        productId: saleForm.productId,
        quantityDebited: parseInt(saleForm.quantityDebited),
      }).unwrap();
      setSaleForm({ productId: '', quantityDebited: '' });
      setError('');
    } catch (err: any) {
      setError(err.data?.message || 'Failed to record sale');
    }
  };

  const handleRestockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await restockProduct({
        productId: restockForm.productId,
        quantityCredited: parseInt(restockForm.quantityCredited),
        costForQuantityCredited: parseFloat(restockForm.costForQuantityCredited),
      }).unwrap();
      setRestockForm({ productId: '', quantityCredited: '', costForQuantityCredited: '' });
      setError('');
    } catch (err: any) {
      setError(err.data?.message || 'Failed to record restock');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Navbar />
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Inventory Management</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Add Product</h2>
              <form onSubmit={handleProductSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productForm.quantity}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    name="priority"
                    value={productForm.priority}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={productForm.description}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Min Stock Threshold</label>
                  <input
                    type="number"
                    name="minStockThreshold"
                    value={productForm.minStockThreshold}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  Add Product
                </button>
              </form>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Record Sale</h2>
              <form onSubmit={handleSaleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Product</label>
                  <select
                    name="productId"
                    value={saleForm.productId}
                    onChange={handleSaleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Product</option>
                    {dashboardMetrics?.popularProducts.map((product: any) => (
                      <option key={product.productId} value={product.productId}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Quantity Sold</label>
                  <input
                    type="number"
                    name="quantityDebited"
                    value={saleForm.quantityDebited}
                    onChange={handleSaleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  Record Sale
                </button>
              </form>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Restock Product</h2>
              <form onSubmit={handleRestockSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Product</label>
                  <select
                    name="productId"
                    value={restockForm.productId}
                    onChange={handleRestockChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Product</option>
                    {dashboardMetrics?.popularProducts.map((product: any) => (
                      <option key={product.productId} value={product.productId}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Quantity Restocked</label>
                  <input
                    type="number"
                    name="quantityCredited"
                    value={restockForm.quantityCredited}
                    onChange={handleRestockChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Cost ($)</label>
                  <input
                    type="number"
                    name="costForQuantityCredited"
                    value={restockForm.costForQuantityCredited}
                    onChange={handleRestockChange}
                    className="w-full p-2 border rounded"
                    step="0.01"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  Restock Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;