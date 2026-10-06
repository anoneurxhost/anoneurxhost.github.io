import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Mail, Linkedin, Github, Twitter, Globe, GraduationCap,
  BookOpen, Mic, Award, ChevronLeft,
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { getSeedPortfolio } from '@/lib/teamStore';
import type { TeamPortfolio as TeamPortfolioT } from '@/data/teamPortfolios';

const fade = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

const TeamPortfolio: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const profile: TeamPortfolioT | undefined = name ? getSeedPortfolio(name) : undefined;

  if (!profile) return <Navigate to="/people" replace />;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: `${profile.title}, ${profile.department}`,
      worksFor: { '@type': 'Organization', name: 'Anoneurx', url: 'https://anoneurx.com' },
      alternateName: `${profile.name} — Anoneurx`,
      description: (profile.about?.bio || profile.tagline).slice(0, 140),
      image: profile.photo,
      email: profile.email,
      url: `https://anoneurx.com/people/${profile.slug}`,
      sameAs: [profile.linkedin, profile.github, profile.twitter, profile.website].filter(Boolean),
      alumniOf: profile.education?.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Team', item: 'https://anoneurx.com/people' },
        { '@type': 'ListItem', position: 2, name: profile.name, item: `https://anoneurx.com/people/${profile.slug}` },
      ],
    },
  ];

  const allSkills = [
    ...(profile.skills?.core || []),
    ...(profile.skills?.languages || []),
    ...(profile.skills?.frameworks || []),
    ...(profile.skills?.tools || []),
    ...(profile.skills?.platforms || []),
    ...(profile.skills?.databases || []),
    ...(profile.skills?.cloud || []),
  ];

  const hasBio = !!profile.about?.bio;
  const hasSummary = !!profile.about?.summary;
  const hasSkills = allSkills.length > 0;
  const hasFocus = (profile.currentFocus?.length ?? 0) > 0;
  const hasEducation = (profile.education?.length ?? 0) > 0;
  const hasPublications = (profile.publications?.length ?? 0) > 0;
  const hasTalks = (profile.talks?.length ?? 0) > 0;
  const hasInterests = (profile.about?.interests?.length ?? 0) > 0;
  const hasPhilosophy = !!profile.philosophy;

  return (
    <PageTransition>
      <SEO
        title={`${profile.name} — Anoneurx Team`}
        description={`${profile.name} — ${profile.title} in ${profile.department} at Anoneurx. ${(profile.about?.bio || profile.tagline).slice(0, 140)}`}
        path={`/people/${profile.slug}`}
        image={profile.photo}
        jsonLd={jsonLd}
      />
      <div className="min-h-screen pt-24 pb-20 text-white">
        <div className="container-responsive max-w-6xl">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/people">Team</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{profile.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link to="/people" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6">
            <ChevronLeft className="w-4 h-4" /> All people
          </Link>

          {/* Hero */}
          <motion.section initial="hidden" animate="visible" variants={fade} className="grid md:grid-cols-[320px_1fr] gap-10 items-center">
            <div className="relative mx-auto md:mx-0">
              <div className="absolute -inset-4 rounded-full bg-primary/25 blur-3xl" />
              <img
                src={profile.photo}
                alt={profile.name}
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl object-cover border border-white/10 shadow-2xl"
              />
            </div>
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/15 text-primary border-primary/30">{profile.title}</Badge>
                <Badge className="bg-white/[0.06] border-white/10 text-white/70">{profile.department}</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                {profile.name}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">{profile.tagline}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.email && <a href={`mailto:${profile.email}`}><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Mail className="w-4 h-4 mr-1.5" />Contact</Button></a>}
                {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Linkedin className="w-4 h-4 mr-1.5" />LinkedIn</Button></a>}
                {profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Github className="w-4 h-4 mr-1.5" />GitHub</Button></a>}
                {profile.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer"><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Twitter className="w-4 h-4 mr-1.5" />X</Button></a>}
              </div>
            </div>
          </motion.section>

          {/* Philosophy + Summary */}
          {(hasPhilosophy || hasSummary) && (
            <div className="grid md:grid-cols-2 gap-6 mt-14">
              {hasPhilosophy && (
                <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8 space-y-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-primary">Philosophy</div>
                    <p className="text-white/80 leading-relaxed italic">
                      &ldquo;{profile.philosophy}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              )}
              {hasSummary && (
                <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8 space-y-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/50">Summary</div>
                    <p className="text-white/70 leading-relaxed">{profile.about?.summary}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Bio + Education */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl md:col-span-2">
              <CardContent className="p-8 space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">Biography</div>
                <p className="text-white/80 leading-relaxed">{profile.about?.bio || profile.tagline}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl">
              <CardContent className="p-8 space-y-4">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-2"><GraduationCap className="w-3 h-3" />Education</div>
                {hasEducation ? (
                  <ul className="space-y-2">
                    {profile.education.map((e, i) => (
                      <li key={i}>
                        <div className="font-medium">{e.degree}</div>
                        <div className="text-xs text-white/50">{e.school} · {e.period}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/50 text-sm">Not specified</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills + Focus */}
          {(hasSkills || hasFocus || hasInterests) && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {hasSkills && (
                <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8 space-y-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-2"><Award className="w-3 h-3" />Areas of Expertise</div>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.map((s) => (
                        <Badge key={s} className="bg-white/[0.06] border-white/10 text-white/80">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              {(hasFocus || hasInterests) && (
                <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8 space-y-4">
                    {hasFocus && (
                      <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Current Focus</div>
                        <ul className="mt-3 space-y-1.5">
                          {profile.currentFocus.map((f) => (
                            <li key={f} className="text-white/70 text-sm flex items-start gap-2">
                              <span className="text-primary/60 mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {hasInterests && (
                      <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Interests</div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {profile.about?.interests.map((i) => (
                            <Badge key={i} className="bg-white/[0.06] border-white/10 text-white/70 text-[11px]">{i}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Publications + Talks */}
          {(hasPublications || hasTalks) && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {hasPublications && (
                <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8 space-y-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-2"><BookOpen className="w-3 h-3" />Publications</div>
                    <ol className="space-y-2">
                      {profile.publications.map((p, i) => (
                        <li key={i} className="text-white/80 text-sm">
                          <span className="text-white/40 mr-2">[{i + 1}]</span>
                          {p.title} <span className="text-white/50">— {p.venue}, {p.year}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}
              {hasTalks && (
                <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8 space-y-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-2"><Mic className="w-3 h-3" />Talks & Appearances</div>
                    <ul className="space-y-2 text-sm">
                      {profile.talks.map((t, i) => (
                        <li key={i} className="text-white/80">
                          {t.title} <span className="text-white/50">— {t.venue}, {t.year}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default TeamPortfolio;
