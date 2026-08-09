import { ApiClient } from './apiClient';

const TOKEN_KEY = 'dream_deco_jwt_token';
const USER_KEY = 'dream_deco_user_data';

export interface UserRecord {
  id: string;
  user_id: string;
  full_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  generalError?: string;
  successMessage?: string;
}

export class AuthService {
  /**
   * Login user with User ID and Password via Express backend API.
   */
  public static async login(
    userId: string,
    password: string,
    _rememberMe?: boolean
  ): Promise<{ success: boolean; user?: UserRecord; error?: string }> {
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
        user?: UserRecord;
        token?: string;
        error?: string;
      }>('/api/auth/login', {
        userId: trimmedId,
        password: trimmedPassword,
      });

      if (response.success && response.user) {
        if (typeof window !== 'undefined') {
          if (response.token) {
            localStorage.setItem(TOKEN_KEY, response.token);
          }
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
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
   * Check authenticated session status with backend API.
   */
  public static async checkAuth(): Promise<UserRecord | null> {
    if (typeof window === 'undefined') return null;

    const cachedToken = localStorage.getItem(TOKEN_KEY);
    const cachedUser = localStorage.getItem(USER_KEY);

    if (!cachedToken && !cachedUser) {
      return null;
    }

    try {
      const response = await ApiClient.get<{
        success: boolean;
        user?: UserRecord;
      }>('/api/auth/me');

      if (response.success && response.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        return response.user;
      }

      this.clearSession();
      return null;
    } catch (err) {
      if (cachedUser) {
        try {
          return JSON.parse(cachedUser);
        } catch {
          this.clearSession();
          return null;
        }
      }
      this.clearSession();
      return null;
    }
  }

  /**
   * Immediately clears local session storage.
   */
  public static clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  /**
   * Clears auth session on backend and local storage on logout.
   */
  public static async logout(): Promise<void> {
    this.clearSession();
    try {
      await ApiClient.post('/api/auth/logout', {});
    } catch {
      // Cleared locally
    }
  }
}
