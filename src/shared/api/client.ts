import { API_BASE_URL } from '../config/env';
import { REQUEST_TIMEOUT_MS } from '../config/game';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiFetch = async <TResponse, TBody = unknown>(
  endpoint: string,
  options?: Omit<RequestInit, 'body'> & { body?: TBody }
): Promise<TResponse> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    clearTimeout(id);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.error ?? 'Unknown error');
    }

    return await response.json();
  } catch (error) {
    clearTimeout(id);
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(0, 'Request timeout. Please check your connection.');
    }

    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
};
