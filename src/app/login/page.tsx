'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Coffee, Utensils, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthForm from '../../components/AuthForm';

interface LoginResponse {
  accessToken: string;
  user: { username: string; email: string };
}

export default function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/csrf-token', {
          withCredentials: true,
        });
        setCsrfToken(res.data.csrfToken);
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (formData: { username: string; password: string }) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post<LoginResponse>(
        'http://localhost:5000/api/auth/login',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        }
      );

      if (res.data.accessToken) {
        router.replace('/dashboard');
      } else {
        setError('No access token received');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please ensure the backend is running on port 5000.');
      } else if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Login card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        {/* Logo and title */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center items-center space-x-2 mb-4"
          >
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-full">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div className="flex space-x-1">
              <Utensils className="w-6 h-6 text-orange-500" />
              <ShoppingCart className="w-6 h-6 text-amber-500" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Sign in to your F&B Manager account
          </motion.p>
        </div>

        {/* Auth form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AuthForm
            type="login"
            onSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
            csrfToken={csrfToken}
          />
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          Don't have an account?{' '}
          <a href="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
            Sign up
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}