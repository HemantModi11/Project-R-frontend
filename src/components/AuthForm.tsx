'use client';

import { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (formData: any) => void;
  error: string;
  isLoading: boolean;
  csrfToken: string;
}

export default function AuthForm({ type, onSubmit, error, isLoading, csrfToken }: AuthFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'login') {
      onSubmit({ username: formData.username, password: formData.password });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <input type="hidden" name="_csrf" value={csrfToken} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white/70 backdrop-blur-sm"
          placeholder="Enter your username"
          required
          disabled={isLoading}
        />
      </div>

      {type === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white/70 backdrop-blur-sm"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white/70 backdrop-blur-sm"
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />
      </div>

      {type === 'signup' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white/70 backdrop-blur-sm"
              placeholder="Enter your first name"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white/70 backdrop-blur-sm"
              placeholder="Enter your last name"
              disabled={isLoading}
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isLoading || !csrfToken}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {type === 'login' ? 'Signing In...' : 'Signing Up...'}
          </div>
        ) : (
          type === 'login' ? 'Sign In' : 'Sign Up'
        )}
      </button>
    </form>
  );
}