/**
 * Anoneurx Platform Microservices API Configuration
 * Domain: anoneurx.com
 */

export interface MicroserviceConfig {
  name: string;
  domain: string;
  baseUrl: string;
  description: string;
}

export type ServiceDomain = 'auth' | 'core' | 'connect';

export interface ServiceHealth {
  domain: ServiceDomain;
  status: 'online' | 'fallback' | 'offline';
  lastChecked: string;
  latencyMs?: number;
  activeEndpoint: string;
}

// Retrieve environment variables with fallback defaults to production subdomains
const env = import.meta.env;

export const MAIN_DOMAIN = (env.VITE_MAIN_DOMAIN as string) || 'anoneurx.com';
export const APP_URL = (env.VITE_APP_URL as string) || `https://${MAIN_DOMAIN}`;

export const MICROSERVICES: Record<ServiceDomain, MicroserviceConfig> = {
  auth: {
    name: 'Authentication & Identity',
    domain: 'auth.anoneurx.com',
    baseUrl: (env.VITE_AUTH_API_URL as string) || 'https://auth.anoneurx.com',
    description: 'User authentication, OAuth2, session management, and RBAC security.',
  },
  core: {
    name: 'Core Platform API',
    domain: 'api.anoneurx.com',
    baseUrl: (env.VITE_API_URL as string) || 'https://api.anoneurx.com',
    description: 'Platform data, user profiles, interns, departments, and general system endpoints.',
  },
  connect: {
    name: 'Cloud & Infrastructure Console',
    domain: 'connect.anoneurx.com',
    baseUrl: (env.VITE_CONNECT_API_URL as string) || 'https://connect.anoneurx.com',
    description: 'Node telemetry, SSH key management, terminal exec, and infrastructure monitoring.',
  },
};

export const ENABLE_MOCK_FALLBACK = (env.VITE_ENABLE_MOCK_FALLBACK as string) !== 'false';
