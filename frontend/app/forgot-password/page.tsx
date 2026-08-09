'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Lock, KeyRound, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth';
import { AuthService } from '@/lib/authService';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [generalError, setGeneralError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      fullName: '',
      userId: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setGeneralError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const result = await AuthService.resetPassword(
        data.fullName,
        data.userId,
        data.newPassword,
        data.confirmPassword
      );

      if (result.isValid) {
        setSuccessMsg(result.successMessage || 'Password reset successfully!');
        setTimeout(() => {
          router.push('/login');
        }, 1800);
      } else {
        if (result.generalError) setGeneralError(result.generalError);
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, msg]) => {
            setError(field as keyof ForgotPasswordFormData, { message: msg });
          });
        }
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
          Reset Password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Verify your account details to update your password
        </p>

        {generalError && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 mb-4">
            <AlertCircle size={16} />
            <span>{generalError}</span>
          </div>
        )}

        {successMsg && (
          <div className="w-full bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 mb-4">
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4" noValidate>
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-900 block">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <input
                {...register('fullName')}
                type="text"
                placeholder="Enter account Full Name"
                className={`w-full h-10 pl-9 pr-3 text-sm bg-white border rounded-lg outline-none transition-all ${
                  errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
            {errors.fullName && (
              <span className="text-xs text-red-500 font-medium block">{errors.fullName.message}</span>
            )}
          </div>

          {/* User ID */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-900 block">User ID</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <input
                {...register('userId')}
                type="text"
                placeholder="Enter account User ID"
                className={`w-full h-10 pl-9 pr-3 text-sm bg-white border rounded-lg outline-none transition-all ${
                  errors.userId ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
            {errors.userId && (
              <span className="text-xs text-red-500 font-medium block">{errors.userId.message}</span>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-900 block">New Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <input
                {...register('newPassword')}
                type="password"
                placeholder="New Password (min 8 chars)"
                className={`w-full h-10 pl-9 pr-3 text-sm bg-white border rounded-lg outline-none transition-all ${
                  errors.newPassword ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
            {errors.newPassword && (
              <span className="text-xs text-red-500 font-medium block">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-900 block">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm new password"
                className={`w-full h-10 pl-9 pr-3 text-sm bg-white border rounded-lg outline-none transition-all ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500 font-medium block">{errors.confirmPassword.message}</span>
            )}
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
                <KeyRound size={16} />
                <span>Reset Password</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <Link href="/login" className="inline-flex items-center gap-1 font-bold text-gray-900 hover:underline">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
