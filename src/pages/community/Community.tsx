import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Users, MessageSquare, Calendar, Star, Globe, Trophy,
  Heart, Code, BookOpen, ArrowRight, ExternalLink, Award,
  Zap, GitPullRequest, GitMerge, Mail, Send, Shield,
  Target, Sparkles, Clock, ChevronRight
} from "lucide-react";

// ── Stats ──
const communityStats = [
  { label: "Members", value: "12,000+", icon: Users },
  { label: "Projects", value: "340+", icon: Code },
  { label: "Contributors", value: "1,800+", icon: Heart },
  { label: "Countries", value: "45+", icon: Globe },
];

// ── Forums ──
const forums = [
  { name: "General Discussion", description: "Chat about anything tech-related", members: 4200, posts: 12800 },
  { name: "Technical Help", description: "Get help with code, bugs, and architecture", members: 3100, posts: 9400 },
  { name: "Project Showcase", description: "Share your work and get feedback", members: 2800, posts: 5600 },
  { name: "Research & Papers", description: "Discuss latest research and publications", members: 1900, posts: 3200 },
];

// ── Events ──
const events = [
  { title: "AI/ML Community Meetup", date: "Apr 15, 2026", type: "Virtual", attendees: 320, description: "Monthly meetup discussing latest AI trends" },
  { title: "Open Source Sprint", date: "Apr 22-23, 2026", type: "Hybrid", attendees: 150, description: "48-hour open source contribution marathon" },
  { title: "Tech Talk: WebAssembly", date: "May 5, 2026", type: "Virtual", attendees: 200, description: "Deep dive into WebAssembly and its future" },
  { title: "Robotics Workshop", date: "May 15, 2026", type: "In-Person", attendees: 80, description: "Hands-on workshop building autonomous robots" },
];

// ── Leaderboard ──
const leaderboard = [
  { rank: 1, name: "Sarah Chen", points: 4850, badge: "🏆", contributions: 342, streak: 45 },
  { rank: 2, name: "Alex Kumar", points: 4120, badge: "🥈", contributions: 287, streak: 32 },
  { rank: 3, name: "Maria Santos", points: 3690, badge: "🥉", contributions: 234, streak: 28 },
  { rank: 4, name: "James Wilson", points: 3210, badge: "", contributions: 198, streak: 21 },
  { rank: 5, name: "Yuki Tanaka", points: 2980, badge: "", contributions: 176, streak: 18 },
  { rank: 6, name: "Omar Hassan", points: 2750, badge: "", contributions: 154, streak: 15 },
  { rank: 7, name: "Lisa Park", points: 2540, badge: "", contributions: 143, streak: 12 },
  { rank: 8, name: "Raj Patel", points: 2310, badge: "", contributions: 128, streak: 10 },
];

// ── Community Resources ──
const resources = [
  { name: "YouTube", description: "Tutorials and tech talks", link: "https://youtube.com/@anoneurx", icon: Target, color: "text-red-400" },
  { name: "Instagram", description: "Behind the scenes & updates", link: "https://instagram.com/@anoneurx", icon: Heart, color: "text-pink-400" },
  { name: "GitHub", description: "Source code and issue tracking", link: "https://github.com/anoneurx", icon: Code, color: "text-white/70" },
  { name: "GitLab", description: "Repositories and CI/CD pipelines", link: "https://gitlab.com/anoneurx", icon: Globe, color: "text-orange-400" },
  { name: "WhatsApp", description: "Join our channel for updates", link: "https://whatsapp.com/channel/0029VbAmgwp3mFYF4DFVym0z", icon: MessageSquare, color: "text-green-400" },
  { name: "Blog", description: "In-depth technical articles", link: "/blogs", icon: BookOpen, color: "text-blue-400" },
];

// ── Mentorship ──
const mentorshipInfo = {
  description: "Our mentorship program pairs experienced developers with newcomers for 3-month learning journeys. Mentors provide code reviews, career guidance, and project support.",
  stats: [
    { label: "Active Mentors", value: "85" },
    { label: "Mentees Matched", value: "340+" },
    { label: "Avg. Duration", value: "3 months" },
    { label: "Satisfaction", value: "96%" },
  ],
};

// ── Community Projects ──
const communityProjects = [
  { name: "AnonUI Kit", description: "Open-source UI component library built on top of Anoneurx design system", stars: 1240, contributors: 34, language: "TypeScript" },
  { name: "Data Pipeline", description: "ETL framework for processing large datasets with AI Engine integration", stars: 890, contributors: 18, language: "Python" },
  { name: "Mobile SDK", description: "React Native wrapper for Arcadeum gaming APIs", stars: 670, contributors: 12, language: "TypeScript" },
  { name: "CLI Tools", description: "Command-line utilities for managing Anoneurx deployments", stars: 540, contributors: 8, language: "Go" },
];

// ── Testimonials ──
const testimonials = [
  { name: "Priya Sharma", role: "Full-Stack Developer", quote: "The Anoneurx community helped me transition from junior to senior developer in just one year. The mentorship program is incredible.", avatar: "PS" },
  { name: "Marcus Johnson", role: "ML Engineer", quote: "Contributing to the AI Engine opened doors I never imagined. The team is supportive, and the codebase is a joy to work with.", avatar: "MJ" },
  { name: "Elena Volkov", role: "DevOps Engineer", quote: "I started with a 'good first issue' and now I'm a core maintainer. This community genuinely invests in its people.", avatar: "EV" },
];

// ── Activity Feed ──
const activityFeed = [
  { type: "pr", user: "sarahchen", action: "merged PR #2847", detail: "Add real-time notification system", time: "2 hours ago" },
  { type: "issue", user: "alexkumar", action: "closed issue #1234", detail: "Fix dashboard loading state", time: "5 hours ago" },
  { type: "discussion", user: "mariasantos", action: "started a discussion", detail: "RFC: New plugin architecture", time: "8 hours ago" },
  { type: "release", user: "anoneurx", action: "released v3.2.0", detail: "Platform update with new features", time: "1 day ago" },
  { type: "pr", user: "yukitanaka", action: "opened PR #2850", detail: "Add E2E tests for auth flow", time: "1 day ago" },
  { type: "event", user: "community", action: "upcoming event", detail: "AI/ML Meetup — Apr 15", time: "3 days away" },
];

const activityIcons: Record<string, any> = { pr: GitPullRequest, issue: Zap, discussion: MessageSquare, release: Sparkles, event: Calendar };
const activityColors: Record<string, string> = { pr: "text-green-400", issue: "text-blue-400", discussion: "text-purple-400", release: "text-amber-400", event: "text-cyan-400" };

// ── Guidelines ──
const guidelines = {
  dos: ["Be respectful and constructive", "Help newcomers feel welcome", "Give credit where it's due", "Report issues through proper channels", "Follow the code of conduct"],
  donts: ["Don't spam or self-promote excessively", "Don't share others' private information", "Don't use offensive or discriminatory language", "Don't dismiss others' contributions", "Don't engage in personal attacks"],
};

const Community = () => {
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<"monthly" | "alltime">("alltime");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 sm:py-32 px-4">
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
                <Users className="w-3 h-3 mr-1" /> Open Community
              </Badge>
              <h1 className="text-white mb-6">
                Join the Anoneurx Community
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                Connect with developers, researchers, and innovators building the future of technology together.
              </p>
              {/* Subpage navigation */}
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <Link to="/community/forums">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    <MessageSquare className="w-4 h-4" /> Forums
                  </Button>
                </Link>
                <Link to="/community/events">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    <Calendar className="w-4 h-4" /> Events
                  </Button>
                </Link>
                <Link to="/community/leaderboard">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    <Trophy className="w-4 h-4" /> Leaderboard
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {communityStats.map((stat) => (
                  <Card key={stat.label} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                    <CardContent className="p-5 text-center">
                      <stat.icon className="w-6 h-6 text-white/40 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/50">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-10">
                <Zap className="w-6 h-6 text-white/40" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Recent Activity</h2>
              </div>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activityFeed.map((item, i) => {
                const Icon = activityIcons[item.type];
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                      <div className={`w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 ${activityColors[item.type]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-white/70">
                          <span className="text-white/90 font-medium">@{item.user}</span> {item.action}
                        </p>
                        <p className="text-xs text-white/40 truncate">{item.detail}</p>
                        <p className="text-[11px] text-white/25 mt-1">{item.time}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-white/40" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Leaderboard</h2>
              </div>
              <div className="flex gap-1 bg-white/[0.04] rounded-lg p-1">
                {(["monthly", "alltime"] as const).map(period => (
                  <button
                    key={period}
                    onClick={() => setLeaderboardPeriod(period)}
                    className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                      leaderboardPeriod === period ? "bg-white/[0.1] text-white" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {period === "monthly" ? "Monthly" : "All Time"}
                  </button>
                ))}
              </div>
            </div>
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
              <CardContent className="p-0">
                {leaderboard.map((entry, i) => (
                  <div key={entry.rank} className={`flex items-center gap-4 px-5 py-4 ${i !== leaderboard.length - 1 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.02] transition-colors`}>
                    <div className="w-8 text-center">
                      {entry.badge ? <span className="text-lg">{entry.badge}</span> : <span className="text-sm text-white/30 font-mono">{entry.rank}</span>}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 text-xs font-semibold shrink-0">
                      {entry.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm">{entry.name}</p>
                      <p className="text-xs text-white/30">{entry.contributions} contributions · {entry.streak} day streak</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white text-sm">{entry.points.toLocaleString()}</p>
                      <p className="text-[11px] text-white/30">points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Forums */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <MessageSquare className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Discussion Forums</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {forums.map((forum) => (
                <Card key={forum.name} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
                      <MessageSquare className="w-5 h-5 text-white/70" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{forum.name}</h3>
                    <p className="text-sm text-white/50 mb-4">{forum.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span>{forum.members.toLocaleString()} members</span>
                      <span>{forum.posts.toLocaleString()} posts</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Calendar className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Upcoming Events</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {events.map((event) => (
                <Card key={event.title} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-white/[0.08] border-white/[0.1] text-white/70 text-xs">{event.type}</Badge>
                      <span className="text-xs text-white/40">{event.attendees} attending</span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-white/50 mb-3">{event.description}</p>
                    <p className="text-xs text-white/40 flex items-center gap-1"><Clock className="w-3 h-3" /> {event.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Resources */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Globe className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Community Resources</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((res) => (
                <a key={res.name} href={res.link} className="block">
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 h-full">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                        <res.icon className={`w-5 h-5 ${res.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm">{res.name}</h3>
                        <p className="text-xs text-white/40">{res.description}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-white/20 shrink-0" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Mentorship Program */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Heart className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Mentorship Program</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                <CardContent className="p-6">
                  <p className="text-white/60 leading-relaxed mb-6">{mentorshipInfo.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {mentorshipInfo.stats.map(s => (
                      <div key={s.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                        <p className="text-lg font-bold text-white">{s.value}</p>
                        <p className="text-xs text-white/40">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/community/mentorship">
                    <Button className="mt-6 w-full gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                      <Heart className="w-4 h-4" /> Apply as Mentor/Mentee
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Community Projects */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-white/40" /> Community Projects
                </h3>
                {communityProjects.map(project => (
                  <Card key={project.name} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white text-sm">{project.name}</h4>
                          <p className="text-xs text-white/40 mt-0.5">{project.description}</p>
                        </div>
                        <Badge className="bg-white/[0.06] border-white/[0.1] text-white/50 text-[10px] shrink-0">{project.language}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {project.stars}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {project.contributors}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Sparkles className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">What Our Community Says</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <Card key={t.name} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-6">
                    <p className="text-sm text-white/60 italic leading-relaxed mb-4">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-semibold">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{t.name}</p>
                        <p className="text-xs text-white/40">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <Shield className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Community Guidelines</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-green-400 mb-4 flex items-center gap-2"><span className="text-lg">✓</span> Do</h3>
                  <ul className="space-y-2.5">
                    {guidelines.dos.map((item, i) => (
                      <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                        <span className="text-green-400/50 mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-400 mb-4 flex items-center gap-2"><span className="text-lg">✗</span> Don't</h3>
                  <ul className="space-y-2.5">
                    {guidelines.donts.map((item, i) => (
                      <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                        <span className="text-red-400/50 mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Combined CTA & Newsletter */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* CTA Section */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/[0.08]">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
                  <p className="text-white/50 mb-8 max-w-md">
                    Be part of a growing community of innovators, developers, and researchers shaping the future.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                      <Code className="w-4 h-4" /> GitHub
                    </Button>
                    <Link to="/contributions">
                      <Button variant="outline" className="gap-2 w-full border-white/[0.1] text-white/70 hover:bg-white/[0.06] bg-transparent">
                        <BookOpen className="w-4 h-4" /> Contribution Guide <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-center bg-white/[0.01]">
                  <Mail className="w-8 h-8 text-white/30 mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-3">Stay in the Loop</h2>
                  <p className="text-white/50 mb-6 max-w-md">
                    Get weekly updates on community highlights, new projects, and upcoming events.
                  </p>
                  {subscribed ? (
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">You're subscribed! Check your inbox.</span>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/[0.04] border-white/[0.1] text-white placeholder:text-white/30 flex-1"
                      />
                      <Button
                        onClick={() => { if (email) setSubscribed(true); }}
                        className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1] shrink-0"
                      >
                        <Send className="w-4 h-4" /> Subscribe
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Community;