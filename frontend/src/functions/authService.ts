import { ApiClient } from './apiClient';
import type { ValidationResult, UserRecord } from '../types/auth';

const REMEMBER_ME_KEY = 'dream_deco_remember_user_id';
const TOKEN_KEY = 'dream_deco_auth_token';

export class AuthService {
  /**
   * Login user with User ID and Password via Express backend API.
   */
  public static async login(
    userId: string,
    password: string,
    rememberMe: boolean
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
        token?: string;
        error?: string;
      }>('/api/auth/login', {
        userId: trimmedId,
        password: trimmedPassword,
      });

      if (response.success && response.user) {
        if (response.token) {
          localStorage.setItem(TOKEN_KEY, response.token);
        }

        if (rememberMe) {
          localStorage.setItem(REMEMBER_ME_KEY, trimmedId);
        } else {
          localStorage.removeItem(REMEMBER_ME_KEY);
        }

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
   * Retrieves remembered User ID if rememberMe was set.
   */
  public static getRememberedUserId(): string {
    return localStorage.getItem(REMEMBER_ME_KEY) || '';
  }

  /**
   * Clears auth session on sign out.
   */
  public static logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
