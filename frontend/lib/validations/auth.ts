import { z } from 'zod';

export const loginSchema = z.object({
  userId: z
    .string()
    .min(1, { message: 'User ID is required' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full Name must be at least 2 characters' })
      .trim(),
    userId: z
      .string()
      .min(3, { message: 'User ID must be at least 3 characters' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full Name is required' })
      .trim(),
    userId: z
      .string()
      .min(1, { message: 'User ID is required' })
      .trim(),
    newPassword: z
      .string()
      .min(8, { message: 'New Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
