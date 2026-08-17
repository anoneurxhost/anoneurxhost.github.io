import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Flame, ArrowRight, GraduationCap, ChevronLeft, ChevronRight, Medal } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const leaderboard = [
  { rank: 1, name: "Sarah Chen", points: 4850, contributions: 342, streak: 45, level: "Platinum", prs: 198, issues: 87, reviews: 57 },
  { rank: 2, name: "Alex Kumar", points: 4120, contributions: 287, streak: 32, level: "Gold", prs: 156, issues: 72, reviews: 59 },
  { rank: 3, name: "Maria Santos", points: 3690, contributions: 234, streak: 28, level: "Gold", prs: 121, issues: 68, reviews: 45 },
  { rank: 4, name: "James Wilson", points: 3210, contributions: 198, streak: 21, level: "Silver", prs: 104, issues: 52, reviews: 42 },
  { rank: 5, name: "Yuki Tanaka", points: 2980, contributions: 176, streak: 18, level: "Silver", prs: 89, issues: 48, reviews: 39 },
  { rank: 6, name: "Omar Hassan", points: 2750, contributions: 154, streak: 15, level: "Silver", prs: 78, issues: 41, reviews: 35 },
  { rank: 7, name: "Lisa Park", points: 2540, contributions: 143, streak: 12, level: "Bronze", prs: 72, issues: 38, reviews: 33 },
  { rank: 8, name: "Raj Patel", points: 2310, contributions: 128, streak: 10, level: "Bronze", prs: 65, issues: 34, reviews: 29 },
  { rank: 9, name: "Emma Davis", points: 2100, contributions: 112, streak: 8, level: "Bronze", prs: 58, issues: 30, reviews: 24 },
  { rank: 10, name: "Carlos Rivera", points: 1890, contributions: 98, streak: 6, level: "Bronze", prs: 51, issues: 26, reviews: 21 },
];

const levelColors: Record<string, string> = {
  Platinum: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  Gold: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Silver: "text-gray-300 bg-gray-400/10 border-gray-400/20",
  Bronze: "text-amber-400 bg-amber-600/10 border-amber-600/20",
};

const medalEmoji = ["🥇", "🥈", "🥉"];

const CommunityLeaderboard = () => {
  const [period, setPeriod] = useState<"monthly" | "alltime">("alltime");
  const [sortBy, setSortBy] = useState<"points" | "prs" | "streak">("points");
  const [page, setPage] = useState(1);

  const sorted = [...leaderboard].sort((a, b) => (b as any)[sortBy] - (a as any)[sortBy]);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <section className="relative py-24 sm:py-32 px-4">
          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-muted-foreground">
                <Trophy className="w-3 h-3 mr-1" /> Rankings
              </Badge>
              <h1 className="text-foreground mb-4">Community Leaderboard</h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Recognizing our top contributors who build, review, and improve the platform.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex gap-1 bg-white/[0.04] rounded-lg p-1">
                {(["monthly", "alltime"] as const).map(p => (
                  <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${period === p ? "bg-white/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {p === "monthly" ? "Monthly" : "All Time"}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 bg-white/[0.04] rounded-lg p-1">
                {([["points", "Points"], ["prs", "PRs"], ["streak", "Streak"]] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setSortBy(key as any)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${sortBy === key ? "bg-white/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[sorted[1], sorted[0], sorted[2]].map((entry, i) => {
                const order = [2, 1, 3][i];
                return (
                  <motion.div key={entry.rank} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                    <Card className={`bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] text-center ${order === 1 ? "ring-1 ring-amber-400/20" : ""}`}>
                      <CardContent className="p-6">
                        <span className="text-3xl mb-2 block">{medalEmoji[order - 1]}</span>
                        <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-muted-foreground text-lg font-semibold mx-auto mb-3">
                          {entry.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 className="text-foreground text-sm font-medium">{entry.name}</h4>
                        <Badge className={`mt-2 text-[10px] border ${levelColors[entry.level]}`}>{entry.level}</Badge>
                        <p className="text-xl font-bold text-foreground mt-3">{entry.points.toLocaleString()}</p>
                        <p className="text-[11px] text-muted-foreground">points</p>
                        <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Flame className="w-3 h-3 text-orange-400/60" /> {entry.streak} day streak
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Full List */}
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
              <CardContent className="p-0">
                <div className="hidden sm:grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem_5rem] gap-2 px-5 py-3 border-b border-white/[0.06] text-xs text-muted-foreground font-medium">
                  <span>#</span><span>Contributor</span><span className="text-right">PRs</span><span className="text-right">Issues</span><span className="text-right">Reviews</span><span className="text-right">Streak</span><span className="text-right">Points</span>
                </div>
                {sorted.map((entry, i) => (
                  <motion.div key={entry.rank} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.03, duration: 0.3 }}>
                    <div className={`grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem_5rem] gap-2 items-center px-5 py-4 ${i !== sorted.length - 1 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.02] transition-colors`}>
                      <div className="text-center">
                        {i < 3 ? <span className="text-lg">{medalEmoji[i]}</span> : <span className="text-sm text-muted-foreground font-mono">{entry.rank}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-muted-foreground text-xs font-semibold shrink-0">
                          {entry.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{entry.name}</p>
                          <Badge className={`text-[9px] border ${levelColors[entry.level]} mt-0.5`}>{entry.level}</Badge>
                        </div>
                      </div>
                      <p className="hidden sm:block text-sm text-muted-foreground text-right">{entry.prs}</p>
                      <p className="hidden sm:block text-sm text-muted-foreground text-right">{entry.issues}</p>
                      <p className="hidden sm:block text-sm text-muted-foreground text-right">{entry.reviews}</p>
                      <p className="hidden sm:block text-sm text-muted-foreground text-right flex items-center justify-end gap-1"><Flame className="w-3 h-3 text-orange-400/50" />{entry.streak}</p>
                      <p className="font-bold text-foreground text-sm text-right">{entry.points.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button variant="outline" size="sm" disabled className="border-white/[0.1] text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-white/[0.1] bg-white/[0.1] text-foreground">1</Button>
              <Button variant="outline" size="sm" className="border-white/[0.1] text-muted-foreground">2</Button>
              <Button variant="outline" size="sm" className="border-white/[0.1] text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link to="/community/mentorship">
                <Button className="gap-2">
                  <GraduationCap className="w-4 h-4" /> Apply as Mentor
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" className="gap-2 border-white/[0.1] text-muted-foreground">
                  Back to Community <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default CommunityLeaderboard;
