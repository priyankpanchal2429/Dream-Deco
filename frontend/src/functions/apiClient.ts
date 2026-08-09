/**
 * API Client
 * Centralized fetch wrapper communicating with the Express MongoDB Backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export class ApiClient {
  private static getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('dream_deco_auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  public static async post<T>(endpoint: string, body: Record<string, any>): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok && !data.isValid && !data.error && !data.generalError) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }

      return data as T;
    } catch (err: any) {
      console.error(`[API Error ${endpoint}]`, err);
      throw err;
    }
  }

  public static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
