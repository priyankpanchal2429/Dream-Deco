'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { AuthService } from '@/lib/authService';

export default function LoginPage() {
  const router = useRouter();
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError('');
    setIsLoading(true);

    try {
      const result = await AuthService.login(data.userId, data.password, data.rememberMe);
      if (result.success && result.user) {
        router.push('/dashboard');
      } else {
        setGeneralError(result.error || 'Invalid User ID or Password.');
      }
    } catch {
      setGeneralError('An unexpected server error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-grid-bg min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center"
      >
        <Logo size={40} showWordmark={true} />

        <h1 className="text-2xl font-bold text-gray-900 mt-5 mb-1 tracking-tight text-center">
          Sign In to Workspace
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Access your 3D room design projects and MongoDB Atlas data
        </p>

        {generalError && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 mb-4">
            <AlertCircle size={16} />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4" noValidate>
          {/* User ID Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-900 block">User ID</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <input
                {...register('userId')}
                type="text"
                placeholder="Enter your User ID"
                className={`w-full h-10 pl-9 pr-3 text-sm bg-white border rounded-lg outline-none transition-all ${
                  errors.userId ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
            {errors.userId && (
              <span className="text-xs text-red-500 font-medium block">{errors.userId.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-900">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-gray-900 underline hover:text-black">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                className={`w-full h-10 pl-9 pr-3 text-sm bg-white border rounded-lg outline-none transition-all ${
                  errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 font-medium block">{errors.password.message}</span>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <input
              {...register('rememberMe')}
              type="checkbox"
              id="remember-me"
              className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900"
            />
            <label htmlFor="remember-me" className="text-xs text-gray-600 cursor-pointer">
              Remember me on this device
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-gray-900 hover:bg-black text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={16} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 text-center">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold text-gray-900 hover:underline">
            Create Account
          </Link>
        </div>
      </motion.div>

      <footer className="mt-8 text-xs text-gray-400 text-center">
        © 2026 Dream Deco. All rights reserved.
      </footer>
    </div>
  );
}
