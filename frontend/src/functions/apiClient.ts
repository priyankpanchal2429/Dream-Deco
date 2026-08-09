/**
 * API Client
 * Centralized fetch wrapper supporting dual-layer token auth (Authorization Bearer Header + HTTP-Only Cookie).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dream-deco.onrender.com';
const TOKEN_KEY = 'dream_deco_jwt_token';

export class ApiClient {
  private static getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  /**
   * Fetch with automatic retry logic for Render server cold starts.
   */
  private static async fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = 3,
    delayMs = 1500
  ): Promise<Response> {
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
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
      });

      const data = await response.json();
      return data as T;
    } catch (err: any) {
      console.error(`[API Error ${endpoint}]`, err);
      throw err;
    }
  }
}
