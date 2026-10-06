import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter, Globe, GraduationCap, BookOpen, Mic, Quote } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { teamPortfolios } from "@/data/teamPortfolios";

const fade = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

const CEO: React.FC = () => {
  const ceo = teamPortfolios.muhammadqasim;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ceo.name,
    jobTitle: ceo.title,
    worksFor: { "@type": "Organization", name: "Anoneurx" },
    description: ceo.about.bio,
    image: ceo.photo,
    email: ceo.email,
    url: "https://anoneurx.com/ceo",
    sameAs: [ceo.linkedin, ceo.github, ceo.twitter, ceo.website].filter(Boolean),
    alumniOf: ceo.education?.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
  };

  return (
    <PageTransition>
      <SEO
        title={`${ceo.name} — Founder & CEO`}
        description={`${ceo.name}, ${ceo.title} of Anoneurx. ${ceo.about.bio.slice(0, 140)}`}
        path="/ceo"
        image={ceo.photo}
        jsonLd={jsonLd}
      />

      <div className="min-h-screen pt-24 pb-20 text-white">
        <div className="container-responsive max-w-6xl">
          {/* Hero */}
          <motion.section initial="hidden" animate="visible" variants={fade} className="grid md:grid-cols-[320px_1fr] gap-10 items-center">
            <div className="relative mx-auto md:mx-0">
              <div className="absolute -inset-4 rounded-full bg-primary/25 blur-3xl" />
              <img
                src={ceo.photo}
                alt={ceo.name}
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl object-cover border border-white/10 shadow-2xl"
              />
            </div>
            <div className="space-y-5">
              <Badge className="bg-primary/15 text-primary border-primary/30">Founder & CEO</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                {ceo.name}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">{ceo.tagline}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {ceo.email && <a href={`mailto:${ceo.email}`}><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Mail className="w-4 h-4 mr-1.5" />Contact</Button></a>}
                {ceo.linkedin && <a href={ceo.linkedin} target="_blank" rel="noreferrer"><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Linkedin className="w-4 h-4 mr-1.5" />LinkedIn</Button></a>}
                {ceo.twitter && <a href={ceo.twitter} target="_blank" rel="noreferrer"><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Twitter className="w-4 h-4 mr-1.5" />X</Button></a>}
                {ceo.website && <a href={ceo.website} target="_blank" rel="noreferrer"><Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10"><Globe className="w-4 h-4 mr-1.5" />Website</Button></a>}
              </div>
            </div>
          </motion.section>

          {/* Vision + Message */}
          <div className="grid md:grid-cols-2 gap-6 mt-14">
            <Card className="bg-white/[0.03] border-white/10">
              <CardContent className="p-8 space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-primary">Vision</div>
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Sovereign computing for a sovereign era.
                </h2>
                <p className="text-white/70 leading-relaxed">{ceo.about.mission}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/[0.03] border-white/10">
              <CardContent className="p-8 space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-primary flex items-center gap-2"><Quote className="w-3 h-3" /> Leadership message</div>
                <p className="text-white/80 leading-relaxed italic">
                  {ceo.philosophy || "We build the systems we wished existed — patient, principled, and open."}
                </p>
                <p className="text-white/70 leading-relaxed">{ceo.about.summary}</p>
              </CardContent>
            </Card>
          </div>

          {/* Bio + Education */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/[0.03] border-white/10 md:col-span-2">
              <CardContent className="p-8 space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">Biography</div>
                <p className="text-white/80 leading-relaxed">{ceo.about.bio}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/[0.03] border-white/10">
              <CardContent className="p-8 space-y-4">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-2"><GraduationCap className="w-3 h-3" />Education</div>
                <ul className="space-y-2">
                  {(ceo.education || []).map((e, i) => (
                    <li key={i}>
                      <div className="font-medium">{e.degree}</div>
                      <div className="text-xs text-white/50">{e.school} · {e.period}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Publications + Talks */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-white/[0.03] border-white/10">
              <CardContent className="p-8 space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-2"><BookOpen className="w-3 h-3" />Publications</div>
                <ol className="space-y-2">
                  {(ceo.publications || []).map((p, i) => (
                    <li key={i} className="text-white/80">
                      <span className="text-white/40 mr-2">[{i + 1}]</span>
                      {p.title} <span className="text-white/50">— {p.venue}, {p.year}</span>
                    </li>
                  ))}
                  {!ceo.publications?.length && <li className="text-white/50 text-sm">No publications listed yet.</li>}
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.03] border-white/10">
              <CardContent className="p-8 space-y-3">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-2"><Mic className="w-3 h-3" />Interviews & Talks</div>
                <ul className="space-y-2">
                  {(ceo.talks || []).map((t, i) => (
                    <li key={i} className="text-white/80">
                      {t.title} <span className="text-white/50">— {t.venue}, {t.year}</span>
                    </li>
                  ))}
                  {!ceo.talks?.length && <li className="text-white/50 text-sm">No talks listed yet.</li>}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CEO;
