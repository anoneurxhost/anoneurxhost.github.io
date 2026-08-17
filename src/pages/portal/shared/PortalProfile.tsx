import React from "react";
import { motion } from "framer-motion";
import {
  UserRound,
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  GraduationCap,
  Sparkles,
  Briefcase,
  Trophy,
  Award,
  FolderKanban,
  Star,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "../PortalContext";
import { getModuleById } from "../portal.config";
import { PageHeader, PortalPage, PortalSection, ModuleBadge } from "../components/ui";

const rarityStyle: Record<string, string> = {
  legendary: "from-amber-400 to-orange-500 border-amber-300/40",
  epic: "from-purple-500 to-fuchsia-500 border-purple-300/40",
  rare: "from-blue-500 to-cyan-500 border-blue-300/40",
  common: "from-slate-500 to-slate-400 border-white/15",
};

export const PortalProfile = () => {
  const { user, data } = usePortal();

  const socials = [
    { icon: Github, label: "GitHub", href: `https://${user.socials.github}`, value: user.socials.github },
    { icon: Linkedin, label: "LinkedIn", href: `https://${user.socials.linkedin}`, value: user.socials.linkedin },
    { icon: Globe, label: "Portfolio", href: `https://${user.socials.portfolio}`, value: user.socials.portfolio },
  ];

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Professional Profile"
        title="Profile"
        description="One profile across every program — education, skills, achievements, projects and program history."
        icon={UserRound}
        gradient="from-blue-500 to-purple-500"
      />

      {/* Profile header */}
      <PortalSection>
        <Card className="glass-dark border-white/10 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-fuchsia-600/30 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
          </div>
          <CardContent className="p-6 -mt-10">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white shadow-2xl ring-4 ring-black/50 shrink-0">
                {user.initials}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-sm text-slate-400">{user.title}</p>
                <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {user.location} · {user.email}
                </p>
              </div>
              <div className="flex gap-2">
                {socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" title={social.label}>
                    <Button size="icon" variant="outline" className="border-white/15 text-slate-300 hover:bg-white/10 hover:text-white">
                      <social.icon className="h-4 w-4" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-3xl">{user.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.memberships.map((membership) => {
                const module = getModuleById(membership);
                return module ? (
                  <Badge key={membership} className={cn("bg-gradient-to-r border-transparent", module.gradient)}>
                    <module.icon className="h-3 w-3 mr-1" /> {module.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      </PortalSection>

      {/* Account identity */}
      <PortalSection>
        <Card className="glass-dark border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-cyan-400" /> Anoneurx Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <UserRound className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Account ID</p>
                  <p className="text-sm font-semibold text-white font-mono">{user.anxId}</p>
                </div>
              </div>
              {user.memberships.map((membership) => {
                const module = getModuleById(membership);
                const programId = user.programIds?.[membership];
                if (!module) return null;
                return (
                  <div key={membership} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                    <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center", module.gradient)}>
                      <module.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-500">{module.name} ID</p>
                      <p className="text-sm font-semibold text-white font-mono">{programId ?? "—"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </PortalSection>

      {/* Stats */}
      <PortalSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProfileStat icon={GraduationCap} label="Education" value={`${user.education.length} entries`} gradient="from-blue-500 to-cyan-500" />
          <ProfileStat icon={Briefcase} label="Programs" value={user.memberships.length} gradient="from-emerald-500 to-teal-500" />
          <ProfileStat icon={Trophy} label="Achievements" value={user.achievements.length} gradient="from-purple-500 to-fuchsia-500" />
          <ProfileStat icon={Award} label="Certificates" value={data.certificates.length} gradient="from-amber-500 to-orange-500" />
        </div>
      </PortalSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Education */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-400" /> Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.education.map((edu) => (
                  <div key={edu.degree} className="relative pl-5 border-l border-white/10 pb-4 last:pb-0 last:border-transparent">
                    <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-blue-400" />
                    <p className="text-sm font-semibold text-white">{edu.degree}</p>
                    <p className="text-xs text-slate-500">{edu.field}</p>
                    <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
                    <p className="text-[11px] text-slate-600">{edu.period}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Skills */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" /> Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-white transition-colors">
                    {skill}
                  </span>
                ))}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Socials */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Online Presence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-white/20 hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                      <social.icon className="h-4 w-4 text-slate-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{social.label}</p>
                      <p className="text-xs text-slate-500 truncate">{social.value}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </PortalSection>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Program history */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-emerald-400" /> Program History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.programHistory.map((history) => {
                  const module = getModuleById(history.program);
                  return (
                    <div key={history.program} className="relative pl-6 border-l border-white/10 pb-4 last:pb-0 last:border-transparent">
                      <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-white">{history.title}</p>
                        <ModuleBadge module={history.program} label={module?.name ?? history.program} />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{history.period} · {history.role}</p>
                      <p className="mt-1.5 text-sm text-slate-400">{history.summary}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {history.skills.map((skill) => (
                          <span key={skill} className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Achievements */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-400" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className={cn(
                      "h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center border shrink-0",
                      rarityStyle[achievement.rarity]
                    )}>
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{achievement.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{achievement.description}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[11px] text-slate-600">{achievement.earnedOn}</span>
                        <Badge variant="outline" className="border-white/15 text-slate-400 capitalize h-5 px-1.5 text-[10px]">
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Projects + certificates */}
          <PortalSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Card className="glass-dark border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-blue-400" /> Featured Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <p className="text-sm font-medium text-white">{project.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{project.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">{project.status}</span>
                        <span className="text-[11px] text-slate-400">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-dark border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-400" /> Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.certificates.slice(0, 3).map((certificate) => (
                    <div key={certificate.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <p className="text-sm font-medium text-white">{certificate.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{certificate.issuer} · {certificate.issuedOn}</p>
                      <div className="mt-1.5">
                        <ModuleBadge module={certificate.module} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </PortalSection>

          {/* Program ratings */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Star className="h-4 w-4 text-emerald-400" /> Program Standing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StandingRow label="University" value="3.84 GPA" detail="Top 5% of cohort" module="university" />
                  <StandingRow label="Internship" value="4.6 / 5.0" detail="Mentor evaluation" module="internship" />
                  <StandingRow label="Hackathon" value="#1 of 24" detail="AI Innovation Challenge" module="hackathon" />
                </div>
              </CardContent>
            </Card>
          </PortalSection>
        </div>
      </div>
    </PortalPage>
  );
};

const ProfileStat = ({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  gradient: string;
}) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
    <div className={cn("h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center mb-2", gradient)}>
      <Icon className="h-4 w-4 text-white" />
    </div>
    <p className="text-lg font-bold text-white leading-none">{value}</p>
    <p className="mt-1 text-xs text-slate-400">{label}</p>
  </div>
);

const StandingRow = ({
  label,
  value,
  detail,
  module,
}: {
  label: string;
  value: string;
  detail: string;
  module: ProgramId;
}) => (
  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
    <div className="flex items-center justify-between">
      <p className="text-xs text-slate-500">{label}</p>
      <ModuleBadge module={module} label="" />
    </div>
    <p className="mt-2 text-lg font-bold text-white">{value}</p>
    <p className="text-xs text-slate-500 mt-0.5">{detail}</p>
  </div>
);

import type { ProgramId } from "../types";

export default PortalProfile;
