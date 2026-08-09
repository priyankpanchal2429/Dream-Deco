import { ApiClient } from './apiClient';
import type { ValidationResult, UserRecord } from '../types/auth';

export class AuthService {
  /**
   * Login user with User ID and Password via Express backend API.
   * Session is maintained via HTTP-Only Secure Cookies (Zero LocalStorage).
   */
  public static async login(
    userId: string,
    password: string,
    _rememberMe?: boolean
  ): Promise<{ success: boolean; user?: Omit<UserRecord, 'password_hash'>; error?: string }> {
    const trimmedId = userId.trim();
    const trimmedPassword = password.trim();

    if (!trimmedId && !trimmedPassword) {
      return { success: false, error: 'User ID and Password are required.' };
    }
    if (!trimmedId) {
      return { success: false, error: 'User ID is required.' };
    }
    if (!trimmedPassword) {
      return { success: false, error: 'Password is required.' };
    }

    try {
      const response = await ApiClient.post<{
        success: boolean;
        user?: Omit<UserRecord, 'password_hash'>;
        error?: string;
      }>('/api/auth/login', {
        userId: trimmedId,
        password: trimmedPassword,
      });

      if (response.success && response.user) {
        return { success: true, user: response.user };
      }

      return { success: false, error: response.error || 'Invalid User ID or Password.' };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Invalid User ID or Password.',
      };
    }
  }

  /**
   * Register a new user via Express backend API.
   */
  public static async register(
    fullName: string,
    userId: string,
    password: string,
    confirmPassword: string
  ): Promise<ValidationResult> {
    try {
      const response = await ApiClient.post<ValidationResult>('/api/auth/register', {
        fullName,
        userId,
        password,
        confirmPassword,
      });

      return response;
    } catch (err: any) {
      return {
        isValid: false,
        errors: {},
        generalError: err.message || 'Server error during registration. Please check inputs and try again.',
      };
    }
  }

  /**
   * Reset user password via Express backend API.
   */
  public static async resetPassword(
    fullName: string,
    userId: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<ValidationResult> {
    try {
      const response = await ApiClient.post<ValidationResult>('/api/auth/forgot-password', {
        fullName,
        userId,
        newPassword,
        confirmPassword,
      });

      return response;
    } catch (err: any) {
      return {
        isValid: false,
        errors: {},
        generalError: err.message || 'Failed to update password. Please check your credentials.',
      };
    }
  }

  /**
   * Check authenticated session status with backend via HTTP-Only Cookies.
   */
  public static async checkAuth(): Promise<Omit<UserRecord, 'password_hash'> | null> {
    try {
      const response = await ApiClient.get<{
        success: boolean;
        user?: Omit<UserRecord, 'password_hash'>;
      }>('/api/auth/me');

      if (response.success && response.user) {
        return response.user;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Clears auth session on backend via HTTP-Only cookie removal.
   */
  public static async logout(): Promise<void> {
    try {
      await ApiClient.post('/api/auth/logout', {});
    } catch {
      // Session cleared locally
    }
  }
}
