import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Zap, Bug, GitMerge, Clock, CheckCircle, AlertCircle, XCircle, BarChart3 } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const reviewStages = [
  { stage: "Auto Checks", description: "CI runs linting, type checking, and tests automatically", time: "~5 min", icon: Zap, color: "text-yellow-400" },
  { stage: "Code Review", description: "At least one maintainer reviews code quality and architecture", time: "24-48 hours", icon: Eye, color: "text-blue-400" },
  { stage: "QA Testing", description: "Manual testing for UI changes, automated for logic", time: "1-2 days", icon: Bug, color: "text-purple-400" },
  { stage: "Merge", description: "Squash-merged to main with a clean commit message", time: "Immediate", icon: GitMerge, color: "text-green-400" },
];

const prStatuses = [
  { status: "Open", icon: AlertCircle, color: "text-green-400 bg-green-500/10 border-green-500/20", description: "PR is open and awaiting review. Maintainers will be notified." },
  { status: "Changes Requested", icon: XCircle, color: "text-orange-400 bg-orange-500/10 border-orange-500/20", description: "Reviewer has requested changes. Address feedback and push updates." },
  { status: "Approved", icon: CheckCircle, color: "text-blue-400 bg-blue-500/10 border-blue-500/20", description: "PR has been approved. It will be merged after final checks." },
  { status: "Merged", icon: GitMerge, color: "text-purple-400 bg-purple-500/10 border-purple-500/20", description: "PR has been merged into the main branch. Congratulations!" },
];

const recentPRs = [
  { id: "#1247", title: "Add real-time notification system", author: "sarahchen", status: "Merged", time: "2 days ago", labels: ["feature", "enhancement"] },
  { id: "#1245", title: "Fix dashboard loading state", author: "alexkumar", status: "Approved", time: "3 days ago", labels: ["bug", "fix"] },
  { id: "#1243", title: "Update API documentation for v3.2", author: "mariasantos", status: "Open", time: "4 days ago", labels: ["documentation"] },
  { id: "#1241", title: "Improve authentication token refresh", author: "jameswilson", status: "Changes Requested", time: "5 days ago", labels: ["security"] },
  { id: "#1239", title: "Add lazy loading for portfolio images", author: "lisapark", status: "Merged", time: "1 week ago", labels: ["performance"] },
  { id: "#1237", title: "Implement role-based sidebar navigation", author: "yukitanaka", status: "Merged", time: "1 week ago", labels: ["feature"] },
];

const stats = [
  { label: "Open PRs", value: "12", color: "text-green-400" },
  { label: "In Review", value: "8", color: "text-blue-400" },
  { label: "Merged This Week", value: "34", color: "text-purple-400" },
  { label: "Avg Review Time", value: "18h", color: "text-amber-400" },
];

const statusColor: Record<string, string> = {
  Open: "bg-green-500/20 text-green-300",
  "Changes Requested": "bg-orange-500/20 text-orange-300",
  Approved: "bg-blue-500/20 text-blue-300",
  Merged: "bg-purple-500/20 text-purple-300",
};

const ReviewProgress = () => (
  <PageTransition>
    <div className="min-h-screen">
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/contributions" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Contributions
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
              <BarChart3 className="w-3 h-3 mr-1" /> Progress
            </Badge>
            <h1 className="text-white mb-4">Review Progress</h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Track the status of pull requests and understand our review pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 -mt-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-4 text-center">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[11px] text-white/40">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Pipeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-white mb-8">Review Pipeline</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviewStages.map((stage, i) => (
              <motion.div key={stage.stage} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] h-full relative">
                  {i < reviewStages.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 text-white/20 z-10">→</div>
                  )}
                  <CardContent className="p-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center mx-auto mb-3">
                      <stage.icon className={`w-5 h-5 ${stage.color}`} />
                    </div>
                    <h3 className="text-white text-sm mb-1">{stage.stage}</h3>
                    <p className="text-xs text-white/40 mb-2">{stage.description}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-white/30">
                      <Clock className="w-3 h-3" /> {stage.time}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PR Status Guide */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-white mb-8">PR Status Guide</h2>
          <div className="space-y-3">
            {prStatuses.map((s, i) => (
              <motion.div key={s.status} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <Card className={`bg-white/[0.03] backdrop-blur-2xl border ${s.color.split(' ')[2]}`}>
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${s.color.split(' ')[1]} flex items-center justify-center shrink-0`}>
                      <s.icon className={`w-5 h-5 ${s.color.split(' ')[0]}`} />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{s.status}</h3>
                      <p className="text-sm text-white/50">{s.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent PRs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-white mb-8">Recent Pull Requests</h2>
          <div className="space-y-3">
            {recentPRs.map((pr, i) => (
              <motion.div key={pr.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-colors">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/30 font-mono">{pr.id}</span>
                        <h3 className="text-white text-sm truncate">{pr.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span>by @{pr.author}</span>
                        <span>{pr.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {pr.labels.map(l => (
                        <Badge key={l} className="bg-white/[0.06] border-white/[0.1] text-white/50 text-[10px]">{l}</Badge>
                      ))}
                      <Badge className={`${statusColor[pr.status]} text-xs`}>{pr.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <Link to="/contributions">
            <Button variant="outline" className="gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
              <ArrowLeft className="w-3 h-3" /> Back to Contributions
            </Button>
          </Link>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default ReviewProgress;
