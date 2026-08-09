import bcrypt from 'bcryptjs';

/**
 * CryptoService
 * Handles password hashing and verification following modern security standards.
 * Ensures plain text passwords are never stored or logged.
 */
export class CryptoService {
  private static SALT_ROUNDS = 10;

  /**
   * Hashes a plain text password using bcrypt with salt rounds.
   */
  public static async hashPassword(password: string): Promise<string> {
    if (!password || password.trim() === '') {
      throw new Error('Password cannot be empty');
    }
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  /**
   * Verifies a plain text password against a stored bcrypt hash.
   */
  public static async verifyPassword(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) return false;
    try {
      return await bcrypt.compare(password, hash);
    } catch {
      return false;
    }
  }
}
