import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, ProfileBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Mail, Linkedin, Github, MapPin, ArrowRight, X, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllPortfolios, subscribe, availabilityOf } from '@/lib/teamStore';
import { teamPortfolios, type TeamPortfolio } from '@/data/teamPortfolios';
import { rankRecords, isBrandQuery } from '@/lib/search';

const allPeopleFromFile = (): TeamPortfolio[] => Object.values(teamPortfolios);

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const slugifyDept = (d: string) => d.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

type SortKey = 'relevance' | 'name-asc' | 'name-desc' | 'department' | 'availability';
type Availability = 'all' | 'open' | 'limited' | 'closed';

const AVAIL_BADGE: Record<Exclude<Availability, 'all'>, string> = {
  open: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  limited: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  closed: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

const Team = () => {
  const [members, setMembers] = useState<TeamPortfolio[]>(allPeopleFromFile);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState<string>('All');
  const [avail, setAvail] = useState<Availability>('all');
  const [sort, setSort] = useState<SortKey>('relevance');

  useEffect(() => {
    let mounted = true;
    const refresh = async () => {
      try {
        const data = await fetchAllPortfolios();
        if (!mounted) return;
        if (data.length) setMembers(data);
      } catch {
        if (mounted) setMembers(allPeopleFromFile());
      }
    };
    refresh();
    const unsub = subscribe(refresh);
    return () => { mounted = false; unsub(); };
  }, []);

  const departments = useMemo(
    () => ['All', ...Array.from(new Set(members.map((m) => m.department).filter(Boolean)))],
    [members],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);
    const matchesQuery = (m: TeamPortfolio) => {
      if (!tokens.length) return true;
      const hay = [
        m.name, m.title, m.department, m.tagline, m.location, m.about?.bio,
        ...(m.skills?.core || []), ...(m.skills?.languages || []), ...(m.skills?.frameworks || []),
        ...(m.about?.interests || []), ...(m.currentFocus || []), ...(m.favoriteTech || []),
      ].filter(Boolean).join(' ').toLowerCase();
      return tokens.every((t) => hay.includes(t));
    };
    const scoped = members.filter((m) => {
      if (dept !== 'All' && m.department !== dept) return false;
      if (avail !== 'all' && availabilityOf(m) !== avail) return false;
      return true;
    });

    if (query.trim() && isBrandQuery(query)) {
      return rankRecords(scoped, query, (m) => ({
        name: m.name,
        keywords: [m.title, m.department, m.tagline, m.location, ...(m.skills?.core || [])],
        seniority: /ceo|founder/i.test(m.title) ? 60 : /lead|head|director|principal/i.test(m.title) ? 40 : 0,
      }));
    }

    return scoped.filter(matchesQuery);
  }, [members, query, dept, avail]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'department') {
      list.sort(
        (a, b) =>
          (a.department || '').localeCompare(b.department || '') || (a.name || '').localeCompare(b.name || ''),
      );
    }
    else if (sort === 'availability') {
      const rank: Record<string, number> = { open: 0, limited: 1, closed: 2 };
      list.sort((a, b) => (rank[availabilityOf(a)] ?? 3) - (rank[availabilityOf(b)] ?? 3));
    }
    return list;
  }, [filtered, sort]);

  const ceo = sorted.find((m) => /ceo|founder/i.test(m.title));
  const others = sorted.filter((m) => m !== ceo);
  const hasFilters = query || dept !== 'All' || avail !== 'all' || sort !== 'relevance';

  return (
      <div className="min-h-screen pt-24 pb-20 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-12">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center space-y-5">
              <ProfileBadge variant="profilePill">
                <Users className="w-4 h-4 mr-1.5" /> People & Team
              </ProfileBadge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Meet the people behind Anoneurx</h1>
              <p className="text-white/60 max-w-2xl mx-auto">
                Founders, department heads, and engineers building operating systems, AI, robotics, space tech, and the web.
              </p>
            </motion.div>

            
            {/* CEO highlight */}
            {ceo && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to="/ceo">
                  <Card className="bg-black/10 backdrop-blur-2xl transition-all group">
                    <CardContent className="p-6 md:p-8 grid md:grid-cols-[180px_1fr] gap-6 items-center">
                      <div className="relative mx-auto md:mx-0">
                        <div className="absolute -inset-3 rounded-full bg-primary/30 blur-3xl" />
                        <img
                          src={ceo.photo}
                          alt={ceo.name}
                          className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-white/15 shadow-2xl"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 items-center">
                          <ProfileBadge variant="profilePill">Executive Leader</ProfileBadge>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold">{ceo.name}</h2>
                        <p className="text-primary/90">{ceo.title}</p>
                        <p className="text-white/65 max-w-2xl">{ceo.tagline}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )}

            {/* Members grid */}
            <section className="space-y-5">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">Department Heads & People</h2>
              </div>

              {others.length === 0 ? (
                <div className="text-center py-12 text-white/50">
                  {loading ? 'Loading…' : 'There Is No Team Yet You can Join Us'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {others.map((m, i) => {
                    const av = availabilityOf(m);
                    return (
                      <motion.div
                        key={m.slug}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ delay: (i % 4) * 0.06 }}
                      >
                        <Link to={`/people/${slugifyDept(m.department)}/${m.slug}`}>
                          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] hover:border-primary/30 transition-all h-full group">
                            <CardContent className="p-5 space-y-3">
                              <div className="flex items-center gap-3">
                                <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-2xl object-cover border border-white/10 group-hover:border-primary/40 transition-colors" />
                                <div className="min-w-0">
                                  <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors truncate">{m.name}</h3>
                                  <p className="text-xs text-primary/80 truncate">{m.title}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <ProfileBadge variant="profilePill" className="text-[10px] px-2 py-0.5">{m.department}</ProfileBadge>
                                <span className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded-full border ${AVAIL_BADGE[av]}`}>
                                  {av}
                                </span>
                              </div>
                              <p className="text-xs text-white/55 line-clamp-2">{m.tagline}</p>
                              {m.location && (
                                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                                  <MapPin className="w-3 h-3" /> {m.location}
                                </div>
                              )}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {(m.skills?.core || []).slice(0, 3).map((s) => (
                                  <ProfileBadge key={s} variant="githubPill" className="text-[10px] px-2 py-0.5">{s}</ProfileBadge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
  );
};

export default Team;
