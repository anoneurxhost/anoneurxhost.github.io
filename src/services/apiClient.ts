/**
 * Central API client for the Anoneurx platform.
 * Core domain: api.anoneurx.com (configured via VITE_API_URL).
 * Integrated with the resilient multi-service API engine.
 */
import { apiResilienceClient } from './apiResilienceClient';
import { MICROSERVICES } from './config';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const API_BASE = MICROSERVICES.core.baseUrl;

async function request<T>(path: string, init: RequestInit = {}, fallback?: T): Promise<T> {
  const result = await apiResilienceClient.execute<T>(
    'core',
    path,
    init,
    fallback !== undefined ? () => fallback : undefined
  );
  return result.data;
}

export const apiClient = {
  get: <T>(path: string, fallback?: T) => request<T>(path, { method: "GET" }, fallback),
  post: <T>(path: string, data?: unknown, fallback?: T) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data ?? {}) }, fallback),
  put: <T>(path: string, data?: unknown, fallback?: T) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(data ?? {}) }, fallback),
  del: <T>(path: string, fallback?: T) => request<T>(path, { method: "DELETE" }, fallback),
};

/** Run an API call, falling back to local seed data when the backend is unreachable. */
export async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}
