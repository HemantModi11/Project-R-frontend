'use client';

import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '@/state/api';
import { PlusCircle, XCircle } from 'lucide-react';

interface MenuFormProps {
  onCreateRecipe: (data: any) => void;
  isDark: boolean;
}

export const MenuForm = ({ onCreateRecipe, isDark }: MenuFormProps) => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [form, setForm] = useState({
    name: '',
    ingredients: [{ productId: '', quantity: '' }],
    servings: '1',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (products && products.length > 0 && form.ingredients[0].productId === '') {
      setForm((prev) => ({
        ...prev,
        ingredients: [{ productId: products[0]._id, quantity: '' }],
      }));
    }
  }, [products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRecipe({
      ...form,
      ingredients: form.ingredients.map((ing) => ({
        productId: ing.productId,
        quantity: Number(ing.quantity),
      })),
      servings: Number(form.servings),
      price: Number(form.price),
    });
    setForm({ name: '', ingredients: [{ productId: '', quantity: '' }], servings: '1', price: '', description: '' });
  };

  if (isLoading) return <div>Loading products...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
          Dish Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`w-full p-3 border rounded-lg ${
            isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
          }`}
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
          Price
        </label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
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
          Ingredients
        </label>
        {form.ingredients.map((ing, index) => (
          <div key={index} className="flex gap-4 items-center mb-2">
            <div className="flex-1">
              <select
                value={ing.productId}
                onChange={(e) => {
                  const newIngredients = [...form.ingredients];
                  newIngredients[index].productId = e.target.value;
                  setForm({ ...form, ingredients: newIngredients });
                }}
                className={`w-full p-3 border rounded-lg ${
                  isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                required
              >
                <option value="">Select Ingredient</option>
                {products?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.quantity} available)
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={ing.quantity}
                onChange={(e) => {
                  const newIngredients = [...form.ingredients];
                  newIngredients[index].quantity = e.target.value;
                  setForm({ ...form, ingredients: newIngredients });
                }}
                className={`w-full p-3 border rounded-lg ${
                  isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
                required
                min="0"
                step="0.01"
                placeholder="Quantity"
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  const newIngredients = form.ingredients.filter((_, i) => i !== index);
                  setForm({ ...form, ingredients: newIngredients });
                }}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setForm({ ...form, ingredients: [...form.ingredients, { productId: products?.[0]?._id || '', quantity: '' }] })}
          className={`flex items-center gap-2 p-2 rounded-lg ${
            isDark ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <PlusCircle className="w-5 h-5" /> Add Ingredient
        </button>
      </div>
      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
          Servings
        </label>
        <input
          type="number"
          value={form.servings}
          onChange={(e) => setForm({ ...form, servings: e.target.value })}
          className={`w-full p-3 border rounded-lg ${
            isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
          }`}
          required
          min="1"
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`w-full p-3 border rounded-lg ${
            isDark ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800 border-gray-300'
          }`}
        />
      </div>
      <button
        type="submit"
        className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
          isDark
            ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
        }`}
      >
        Submit
      </button>
    </form>
  );
};