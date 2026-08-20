import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge, ProfileBadge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Clock, Mail, ExternalLink, Award, ChevronLeft, MapPin } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { slugify } from "@/lib/utils";
import { facultyDirectory, FacultyRecord } from "@/data/faculty";

const fade = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

const FacultyProfile: React.FC = () => {
  const { department, name } = useParams<{ department: string; name: string }>();
  const person: FacultyRecord | undefined = facultyDirectory.find(
    (f) => slugify(f.department) === department && slugify(f.name) === name,
  );

  if (!person) {
    return <Navigate to="/faculty" replace />;
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: person.name,
      jobTitle: `${person.position}, ${person.department}`,
      worksFor: { "@type": "Organization", name: "Anoneurx University", url: "https://anoneurx.com" },
      affiliation: { "@type": "EducationalOrganization", name: "Anoneurx University" },
      alternateName: `${person.name} — Anoneurx University`,
      description: person.bio,
      image: person.photo,
      email: person.email,
      url: `https://anoneurx.com/faculty/${department}/${name}`,
      alumniOf: person.education?.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
      sameAs: [person.scholar, person.orcid].filter(Boolean),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "University", item: "https://anoneurx.com/university" },
        { "@type": "ListItem", position: 2, name: "Faculty", item: "https://anoneurx.com/faculty" },
        { "@type": "ListItem", position: 3, name: person.name, item: `https://anoneurx.com/faculty/${department}/${name}` },
      ],
    },
  ];

  return (
    <PageTransition>
      <SEO
        title={`${person.name} — Anoneurx University Faculty (${person.department})`}
        description={`${person.name} — ${person.position} in ${person.department} at Anoneurx University. ${person.bio.slice(0, 140)}`}
        path={`/faculty/${department}/${name}`}
        image={person.photo}
        jsonLd={jsonLd}
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-responsive max-w-5xl text-white">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/university">University</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/faculty">Faculty</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{person.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link to="/faculty" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6">
            <ChevronLeft className="w-4 h-4" /> All faculty
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fade}>
            <Card className="bg-white/[0.04] border-white/10 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-6 md:p-10 grid md:grid-cols-[220px_1fr] gap-8 items-start">
                <div className="mx-auto md:mx-0">
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04]">
                    <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <ProfileBadge variant="facultyPill">{person.position}</ProfileBadge>
                    <ProfileBadge variant="githubPill">{person.department}</ProfileBadge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{person.name}</h1>
                  <p className="text-white/70 max-w-3xl leading-relaxed">{person.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-white/60">
                    {person.office && (
                      <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {person.office}</span>
                    )}
                    {person.officeHours && (
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {person.officeHours}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {person.email && (
                      <a href={`mailto:${person.email}`}>
                        <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                          <Mail className="w-4 h-4 mr-1.5" /> Contact
                        </Button>
                      </a>
                    )}
                    {person.scholar && (
                      <a href={person.scholar} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                          <ExternalLink className="w-4 h-4 mr-1.5" /> Google Scholar
                        </Button>
                      </a>
                    )}
                    {person.orcid && (
                      <a href={person.orcid} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                          <ExternalLink className="w-4 h-4 mr-1.5" /> ORCID
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card className="bg-white/[0.03] border-white/10 md:col-span-2">
              <CardContent className="p-6 space-y-6">
                <section>
                  <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Research Interests
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {person.researchInterests.map((r) => (
                      <ProfileBadge key={r} variant="facultyPill">{r}</ProfileBadge>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Selected Publications
                  </h2>
                  <ol className="space-y-3">
                    {person.publications.map((p, i) => (
                      <li key={i} className="text-white/80 leading-relaxed">
                        <span className="text-white/40 mr-2">[{i + 1}]</span>
                        <span className="font-medium">{p.title}</span>
                        <span className="text-white/50"> — {p.venue}, {p.year}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.03] border-white/10">
              <CardContent className="p-6 space-y-6">
                <section>
                  <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Education
                  </h2>
                  <ul className="space-y-2 text-sm">
                    {person.education.map((e, i) => (
                      <li key={i} className="text-white/80">
                        <div className="font-medium">{e.degree}</div>
                        <div className="text-white/50 text-xs">{e.school} · {e.period}</div>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="text-sm uppercase tracking-widest text-white/50 mb-3">Office</h2>
                  <p className="text-white/70 text-sm">{person.office || "By appointment"}</p>
                  <p className="text-white/50 text-xs mt-1">{person.officeHours}</p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FacultyProfile;
