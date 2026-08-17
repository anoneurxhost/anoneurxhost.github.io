import { teamPortfolios, TeamPortfolio } from '@/data/teamPortfolios';

const localCache = new Map<string, TeamPortfolio>();
const listeners = new Set<() => void>();

export function listSeedPortfolios(): TeamPortfolio[] {
  return Object.values(teamPortfolios);
}

export function getSeedPortfolio(slug: string): TeamPortfolio | undefined {
  return teamPortfolios[slug];
}

export async function fetchAllPortfolios(): Promise<TeamPortfolio[]> {
  const merged = new Map<string, TeamPortfolio>();
  for (const s of Object.values(teamPortfolios)) merged.set(s.slug, s);
  for (const [slug, p] of localCache) merged.set(slug, p);
  return Array.from(merged.values());
}

export async function fetchPortfolio(slug: string): Promise<TeamPortfolio | undefined> {
  if (localCache.has(slug)) return localCache.get(slug);
  return teamPortfolios[slug];
}

export async function savePortfolio(p: TeamPortfolio): Promise<void> {
  localCache.set(p.slug, p);
  listeners.forEach((cb) => cb());
}

export async function deletePortfolio(slug: string): Promise<void> {
  localCache.delete(slug);
  listeners.forEach((cb) => cb());
}

export function emptyPortfolio(slug = ''): TeamPortfolio {
  return {
    slug,
    department: '',
    name: '',
    title: '',
    tagline: '',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80',
    location: '',
    email: '',
    about: { bio: '', summary: '', interests: [], mission: '' },
    experience: [],
    skills: { core: [], languages: [], frameworks: [], tools: [], platforms: [], databases: [], cloud: [] },
    services: [],
    projects: [],
    openSource: [],
    achievements: [],
    education: [],
    publications: [],
    leadership: [],
    testimonials: [],
    stats: [],
    timeline: [],
    media: [],
    availability: [{ label: 'Consulting', status: 'open' }],
    faqs: [],
    currentFocus: [],
    nowBuilding: [],
    ventures: [],
    philosophy: '',
    funFacts: [],
    favoriteTech: [],
    books: [],
    talks: [],
  };
}

export async function uploadTeamMedia(file: File, _folder = 'gallery'): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function availabilityOf(p: TeamPortfolio): 'open' | 'limited' | 'closed' {
  const av = p.availability || [];
  if (av.some((a) => a.status === 'open')) return 'open';
  if (av.some((a) => a.status === 'limited')) return 'limited';
  if (av.length) return 'closed';
  return 'open';
}
