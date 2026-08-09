/**
 * API Client
 * Centralized fetch wrapper with credentials enabled (HTTP-only cookie auth, zero localStorage).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dream-deco.onrender.com';

export class ApiClient {
  private static getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Fetch with automatic retry logic to handle server cold-starts smoothly.
   */
  private static async fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = 3,
    delayMs = 1500
  ): Promise<Response> {
    const fetchOptions: RequestInit = {
      ...options,
      credentials: 'include',
    };

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(url, fetchOptions);
        return response;
      } catch (err) {
        if (attempt === retries - 1) throw err;
        console.warn(`[ApiClient] Attempt ${attempt + 1} failed. Retrying in ${delayMs}ms...`);
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
    throw new Error('Network request failed');
  }

  public static async post<T>(endpoint: string, body: Record<string, any>): Promise<T> {
    try {
      const response = await this.fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return data as T;
    } catch (err: any) {
      console.error(`[API Error ${endpoint}]`, err);
      throw err;
    }
  }

  public static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();
      return data as T;
    } catch (err: any) {
      console.error(`[API Error ${endpoint}]`, err);
      throw err;
    }
  }
}
