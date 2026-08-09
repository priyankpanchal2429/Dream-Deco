import type { UserRecord } from '../types/auth';
import { CryptoService } from './cryptoService';

/**
 * DatabaseService
 * Single source of truth for the `users` table persistence.
 * Uses browser IndexedDB / localStorage persistence with pre-seeded demo account.
 */
export class DatabaseService {
  private static STORAGE_KEY = 'dream_deco_users_v1';
  private static INITIALIZED = false;

  /**
   * Initializes the database with pre-seeded default demo user if empty.
   */
  public static async initDB(): Promise<void> {
    if (this.INITIALIZED) return;
    
    const existingData = localStorage.getItem(this.STORAGE_KEY);
    if (!existingData) {
      // Seed default admin account
      const defaultHash = await CryptoService.hashPassword('Password123!');
      const now = new Date().toISOString();
      const defaultUser: UserRecord = {
        id: 'usr_default_001',
        full_name: 'Admin User',
        user_id: 'admin',
        password_hash: defaultHash,
        created_at: now,
        updated_at: now,
      };
      
      const initialUsers: UserRecord[] = [defaultUser];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialUsers));
    }
    
    this.INITIALIZED = true;
  }

  /**
   * Retrieves all user records from storage.
   */
  public static async getUsers(): Promise<UserRecord[]> {
    await this.initDB();
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Finds a user record by their unique user_id (case-insensitive).
   */
  public static async findByUserId(userId: string): Promise<UserRecord | null> {
    const users = await this.getUsers();
    const target = userId.trim().toLowerCase();
    const found = users.find(u => u.user_id.toLowerCase() === target);
    return found || null;
  }

  /**
   * Finds a user record by user_id and full_name (case-insensitive match for password reset).
   */
  public static async findByUserIdAndName(userId: string, fullName: string): Promise<UserRecord | null> {
    const users = await this.getUsers();
    const targetId = userId.trim().toLowerCase();
    const targetName = fullName.trim().toLowerCase();

    const found = users.find(
      u => u.user_id.toLowerCase() === targetId && u.full_name.trim().toLowerCase() === targetName
    );
    return found || null;
  }

  /**
   * Creates and saves a new user record to the `users` table.
   * Throws an error if user_id is not unique.
   */
  public static async createUser(userData: {
    full_name: string;
    user_id: string;
    password_hash: string;
  }): Promise<UserRecord> {
    await this.initDB();
    const users = await this.getUsers();
    const normalizedUserId = userData.user_id.trim();

    // Enforce User ID Uniqueness
    const exists = users.some(u => u.user_id.toLowerCase() === normalizedUserId.toLowerCase());
    if (exists) {
      throw new Error('User ID already exists');
    }

    const now = new Date().toISOString();
    const newUser: UserRecord = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      full_name: userData.full_name.trim(),
      user_id: normalizedUserId,
      password_hash: userData.password_hash,
      created_at: now,
      updated_at: now,
    };

    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return newUser;
  }

  /**
   * Updates user's password_hash and updated_at timestamp in the `users` table.
   */
  public static async updatePassword(userId: string, newPasswordHash: string): Promise<boolean> {
    await this.initDB();
    const users = await this.getUsers();
    const index = users.findIndex(u => u.user_id.toLowerCase() === userId.trim().toLowerCase());

    if (index === -1) {
      return false;
    }

    users[index].password_hash = newPasswordHash;
    users[index].updated_at = new Date().toISOString();

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return true;
  }
}
