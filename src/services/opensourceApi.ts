/**
 * Dedicated Open Source Microservice API Client
 * Primary Endpoint: opensource.anoneurx.com (configured via VITE_OPENSOURCE_API_URL)
 * 
 * If opensource.anoneurx.com is offline or undergoing maintenance, this service
 * gracefully falls back to local seed data, ensuring zero downtime for the frontend.
 */

import { apiResilienceClient } from './apiResilienceClient';
import {
  projects as mockProjects,
  organizations as mockOrgs,
  libraries as mockLibraries,
  packages as mockPackages,
  templates as mockTemplates,
  docs as mockDocs,
  posts as mockPosts,
  releases as mockReleases,
  discussions as mockDiscussions,
  events as mockEvents,
  sponsors as mockSponsors,
  contributors as mockContributors,
  showcase as mockShowcase,
  Project,
  Org,
  Library,
  Pkg,
  Template,
  Doc,
  Post,
  Release,
  Discussion,
  Event as OSEvent,
  Sponsor,
  Contributor,
  Showcase
} from '@/pages/opensource/data';

export const opensourceApi = {
  // Get all open source projects
  getProjects: async (): Promise<{ data: Project[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Project[]>(
      'opensource',
      '/api/v1/projects',
      { method: 'GET' },
      () => mockProjects
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get project by ID
  getProjectById: async (id: string): Promise<{ data: Project | undefined; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Project>(
      'opensource',
      `/api/v1/projects/${id}`,
      { method: 'GET' },
      () => mockProjects.find((p) => p.id === id) || mockProjects[0]
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get organizations
  getOrganizations: async (): Promise<{ data: Org[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Org[]>(
      'opensource',
      '/api/v1/organizations',
      { method: 'GET' },
      () => mockOrgs
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get libraries
  getLibraries: async (): Promise<{ data: Library[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Library[]>(
      'opensource',
      '/api/v1/libraries',
      { method: 'GET' },
      () => mockLibraries
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get packages
  getPackages: async (): Promise<{ data: Pkg[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Pkg[]>(
      'opensource',
      '/api/v1/packages',
      { method: 'GET' },
      () => mockPackages
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get templates
  getTemplates: async (): Promise<{ data: Template[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Template[]>(
      'opensource',
      '/api/v1/templates',
      { method: 'GET' },
      () => mockTemplates
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get documentation
  getDocs: async (): Promise<{ data: Doc[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Doc[]>(
      'opensource',
      '/api/v1/docs',
      { method: 'GET' },
      () => mockDocs
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get posts / blog
  getPosts: async (): Promise<{ data: Post[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Post[]>(
      'opensource',
      '/api/v1/posts',
      { method: 'GET' },
      () => mockPosts
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get releases
  getReleases: async (): Promise<{ data: Release[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Release[]>(
      'opensource',
      '/api/v1/releases',
      { method: 'GET' },
      () => mockReleases
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get discussions
  getDiscussions: async (): Promise<{ data: Discussion[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Discussion[]>(
      'opensource',
      '/api/v1/discussions',
      { method: 'GET' },
      () => mockDiscussions
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get events
  getEvents: async (): Promise<{ data: OSEvent[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<OSEvent[]>(
      'opensource',
      '/api/v1/events',
      { method: 'GET' },
      () => mockEvents
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get sponsors
  getSponsors: async (): Promise<{ data: Sponsor[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Sponsor[]>(
      'opensource',
      '/api/v1/sponsors',
      { method: 'GET' },
      () => mockSponsors
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get contributors
  getContributors: async (): Promise<{ data: Contributor[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Contributor[]>(
      'opensource',
      '/api/v1/contributors',
      { method: 'GET' },
      () => mockContributors
    );
    return { data: res.data, isFallback: res.isFallback };
  },

  // Get showcases
  getShowcase: async (): Promise<{ data: Showcase[]; isFallback: boolean }> => {
    const res = await apiResilienceClient.execute<Showcase[]>(
      'opensource',
      '/api/v1/showcase',
      { method: 'GET' },
      () => mockShowcase
    );
    return { data: res.data, isFallback: res.isFallback };
  },
};
