/**
 * Dream Deco - User Entity & Authentication Types
 * Maintains strict single source of truth for DB schema and Form validation.
 */

export interface UserRecord {
  id: string;            // Primary Key (UUID)
  full_name: string;     // Full name of user
  user_id: string;       // Unique handle / user identifier
  password_hash: string; // Bcrypt / PBKDF2 hashed password
  created_at: string;    // ISO Date string
  updated_at: string;    // ISO Date string
}

export type AuthView = 'login' | 'register' | 'forgot-password' | 'dashboard';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  generalError?: string;
  successMessage?: string;
}

export interface AuthSession {
  user: Omit<UserRecord, 'password_hash'>;
  token: string;
}
