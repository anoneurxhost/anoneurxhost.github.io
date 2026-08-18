import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Award, GitPullRequest, GraduationCap, Users, Sparkles, MapPin, Mail, Github } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { slugify } from "@/lib/utils";
import { internProfiles } from "@/data/internProfiles";

const fade = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

const InternProfile: React.FC = () => {
  const { department, name, internId } = useParams<{
    department?: string;
    name?: string;
    internId?: string;
  }>();

  const person = internId
    ? internProfiles.find((p) => p.internId.toLowerCase() === internId.toLowerCase())
    : internProfiles.find(
        (p) => slugify(p.department) === department && slugify(p.name) === name,
      );

  if (!person) return <Navigate to="/intern" replace />;

  if (!internId) return <Navigate to={`/intern/${person.internId}`} replace />;

  const path = `/intern/${person.internId}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: person.name,
      identifier: person.internId.toUpperCase(),
      jobTitle: `Intern, ${person.department}`,
      worksFor: { "@type": "Organization", name: "Anoneurx", url: "https://anoneurx.com" },
      alternateName: `${person.name} — Anoneurx`,
      description: person.bio,
      image: person.photo,
      email: person.email,
      url: `https://anoneurx.com${path}`,
      alumniOf: person.university ? { "@type": "EducationalOrganization", name: person.university } : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Interns", item: "https://anoneurx.com/intern" },
        { "@type": "ListItem", position: 2, name: person.name, item: `https://anoneurx.com${path}` },
      ],
    },
  ];

  return (
    <PageTransition>
      <SEO
        title={`${person.name} — Anoneurx ${person.department} Intern`}
        description={`Anoneurx ${person.department} intern ${person.name} (${person.internId.toUpperCase()}). ${person.bio.slice(0, 120)}`}
        path={path}
        image={person.photo}
        jsonLd={jsonLd}
      />

      <div className="min-h-screen pt-24 pb-20">
        <div className="container-responsive max-w-5xl text-white">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/intern">Interns</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{person.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link to="/intern" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6">
            <ChevronLeft className="w-4 h-4" /> All interns
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fade}>
            <Card className="glass backdrop-blur-2xl bg-white/[0.04] border-white/10 rounded-2xl shadow-2xl">
              <CardContent className="p-6 md:p-10 grid md:grid-cols-[200px_1fr] gap-8 items-start">
                <img src={person.photo} alt={person.name} className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover border border-white/10 mx-auto md:mx-0 shadow-lg" />
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/15 text-primary border-primary/30">Intern</Badge>
                    <Badge className="bg-white/[0.06] border-white/10 text-white/70">{person.department}</Badge>
                    <Badge className="bg-white/[0.06] border-white/10 text-white/70">{person.status}</Badge>
                    <Badge className="bg-white/[0.06] border-white/10 text-white/70">{person.batch}</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{person.name}</h1>
                  <p className="text-white/70 leading-relaxed max-w-3xl">{person.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-white/60">
                    {person.university && <span className="inline-flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />{person.university}</span>}
                    {person.location && <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" />{person.location}</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {person.email && (
                      <a href={`mailto:${person.email}`}>
                        <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                          <Mail className="w-4 h-4 mr-1.5" /> Mail
                        </Button>
                      </a>
                    )}
                    {person.github && (
                      <a href={person.github} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                          <Github className="w-4 h-4 mr-1.5" /> GitHub
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="glass backdrop-blur-2xl bg-white/[0.04] border-white/10 rounded-2xl shadow-xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-widest text-white/50 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Internship History
                </h2>
                <ol className="space-y-4">
                  {person.history.map((h, i) => (
                    <li key={i} className="relative pl-4 border-l border-white/10">
                      <div className="font-semibold text-white">{h.role}</div>
                      <div className="text-sm text-white/60">{h.department} · {h.duration}</div>
                      <div className="text-xs text-white/50">Mentor: {h.mentor}</div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="glass backdrop-blur-2xl bg-white/[0.04] border-white/10 rounded-2xl shadow-xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-widest text-white/50 flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4" /> Open Source Contribution
                </h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><div className="text-white/40 text-xs">Status</div><div>{person.openSource.status}</div></div>
                  <div><div className="text-white/40 text-xs">Pull Requests</div><div>{person.openSource.pullRequests}</div></div>
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Collaboration History</div>
                  <div className="flex flex-wrap gap-2">
                    {person.openSource.collaborations.map((c) => (
                      <Badge key={c} className="bg-white/[0.06] border-white/10 text-white/80">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Organizations</div>
                  <div className="flex flex-wrap gap-2">
                    {person.openSource.organizations.map((o) => (
                      <Badge key={o} className="bg-white/[0.06] border-white/10 text-white/80">{o}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Contribution Timeline</div>
                  <ol className="space-y-2">
                    {person.openSource.timeline.map((t, i) => (
                      <li key={i} className="text-sm">
                        <span className="text-white/40 mr-2 font-mono text-xs">{t.date}</span>
                        <span className="text-white/80">{t.org} {t.pr} — {t.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card className="glass backdrop-blur-2xl bg-white/[0.04] border-white/10 rounded-2xl shadow-xl">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-sm uppercase tracking-widest text-white/50 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Certifications
                </h2>
                <ul className="space-y-2">
                  {person.certifications.map((c, i) => (
                    <li key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                      <div className="font-medium">{c.title}</div>
                      <div className="text-xs text-white/50">{c.issuer} · {c.date}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass backdrop-blur-2xl bg-white/[0.04] border-white/10 rounded-2xl shadow-xl">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-sm uppercase tracking-widest text-white/50 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Badges
                </h2>
                <div className="flex flex-wrap gap-2">
                  {person.badges.map((b) => (
                    <Badge key={b} className="bg-gradient-to-r from-primary/25 to-fuchsia-500/20 border-primary/30 text-white">
                      {b}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default InternProfile;
