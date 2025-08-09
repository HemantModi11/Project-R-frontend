'use client';

import { useState } from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { MenuForm } from '../../components/MenuForm';
import { useGetRecipesQuery, useCreateRecipeMutation, useRecordRecipeConsumptionMutation } from '@/state/api';
import { PlusCircle } from 'lucide-react';

export default function MenuPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isDark } = useTheme();
  const { data: recipes, isLoading } = useGetRecipesQuery();
  const [createRecipe] = useCreateRecipeMutation();
  const [recordRecipeConsumption] = useRecordRecipeConsumptionMutation();
  const [error, setError] = useState('');

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800'
        : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
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

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>Menu Management</h1>
            <button
              onClick={() => setModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
                isDark 
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
              }`}
            >
              <PlusCircle className="w-5 h-5" /> Add Menu Item
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className={`${
            isDark 
              ? 'bg-slate-800/50 hover:bg-slate-800/60' 
              : 'bg-white/80 hover:bg-white/90'
          } backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>Menu Items</h2>
            {recipes?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No menu items found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes?.map((recipe) => (
                  <div
                    key={recipe._id}
                    className={`p-4 rounded-lg border ${
                      isDark ? 'border-slate-600 bg-slate-700/50' : 'border-gray-200 bg-white/50'
                    }`}
                  >
                    <h3 className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>{recipe.name}</h3>
                    <p className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}>Price: ${recipe.price}</p>
                    <p className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}>Servings: {recipe.servings}</p>
                    <button
                      onClick={() => recordRecipeConsumption({ recipeId: recipe._id, servings: 1 }).unwrap().catch((err) => setError(err.data?.message || 'Failed to record consumption'))}
                      className={`mt-2 w-full p-2 rounded-lg font-medium ${
                        isDark 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                      }`}
                    >
                      Record Sale
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Menu Item"
      >
        <MenuForm
          onCreateRecipe={(data) => createRecipe(data).unwrap().then(() => setModalOpen(false)).catch((err) => setError(err.data?.message || 'Failed to create recipe'))}
          isDark={isDark}
        />
      </Modal>
    </div>
  );
}