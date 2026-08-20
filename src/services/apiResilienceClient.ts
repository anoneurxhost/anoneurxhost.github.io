/**
 * Anoneurx Resilient Multi-Service API Client
 * 
 * Fault-Tolerant Microservice Architecture:
 * - Domain Isolation: auth.anoneurx.com, opensource.anoneurx.com, api.anoneurx.com, connect.anoneurx.com.
 * - If one microservice backend goes down, other microservices continue functioning normally.
 * - Automatic Mock Data Fallback: When a backend is unreachable, the client transparently switches
 *   to local mock data for that service without throwing breaking unhandled exceptions.
 */

import { MICROSERVICES, ServiceDomain, ServiceHealth, ENABLE_MOCK_FALLBACK } from './config';

type HealthListener = (healthState: Record<ServiceDomain, ServiceHealth>) => void;

class ApiResilienceClient {
  private healthState: Record<ServiceDomain, ServiceHealth> = {
    auth: { domain: 'auth', status: 'online', lastChecked: new Date().toISOString(), activeEndpoint: MICROSERVICES.auth.baseUrl },
    opensource: { domain: 'opensource', status: 'online', lastChecked: new Date().toISOString(), activeEndpoint: MICROSERVICES.opensource.baseUrl },
    core: { domain: 'core', status: 'online', lastChecked: new Date().toISOString(), activeEndpoint: MICROSERVICES.core.baseUrl },
    connect: { domain: 'connect', status: 'online', lastChecked: new Date().toISOString(), activeEndpoint: MICROSERVICES.connect.baseUrl },
  };

  private listeners: Set<HealthListener> = new Set();

  public getHealthState(): Record<ServiceDomain, ServiceHealth> {
    return { ...this.healthState };
  }

  public subscribeHealth(listener: HealthListener): () => void {
    this.listeners.add(listener);
    listener(this.getHealthState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateHealth(domain: ServiceDomain, status: 'online' | 'fallback' | 'offline', latencyMs?: number) {
    this.healthState[domain] = {
      domain,
      status,
      lastChecked: new Date().toISOString(),
      latencyMs,
      activeEndpoint: MICROSERVICES[domain].baseUrl,
    };
    this.listeners.forEach((listener) => listener(this.getHealthState()));
  }

  /**
   * Execute an API call to a specific domain (auth, opensource, core, connect) with fallback.
   */
  public async execute<T>(
    domain: ServiceDomain,
    path: string,
    init: RequestInit = {},
    fallback?: () => T | Promise<T>
  ): Promise<{ data: T; isFallback: boolean; status: number }> {
    const service = MICROSERVICES[domain];
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${service.baseUrl}${cleanPath}`;
    const token = localStorage.getItem('authToken');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((init.headers as Record<string, string>) || {}),
    };

    const startTime = Date.now();

    try {
      // Use controller for timeout (5s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`Service ${service.domain} returned HTTP ${response.status}`);
      }

      const data = (await response.json()) as T;
      this.updateHealth(domain, 'online', latencyMs);

      return { data, isFallback: false, status: response.status };
    } catch (err: any) {
      console.warn(`[ApiResilience] ${service.domain} (${path}) unavailable/failed:`, err?.message || err);

      this.updateHealth(domain, 'fallback');

      if (fallback && ENABLE_MOCK_FALLBACK) {
        const fallbackResult = await fallback();
        return { data: fallbackResult, isFallback: true, status: 200 };
      }

      throw err;
    }
  }
}

export const apiResilienceClient = new ApiResilienceClient();
