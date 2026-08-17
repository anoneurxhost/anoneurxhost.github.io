import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Clock, ArrowRight, Pin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const categories = [
  { name: "General Discussion", description: "Chat about anything tech-related", members: 4200, posts: 12800, threads: 3400, color: "from-blue-500/20 to-cyan-500/20", lastActive: "2 min ago" },
  { name: "Technical Help", description: "Get help with code, bugs, and architecture", members: 3100, posts: 9400, threads: 2100, color: "from-green-500/20 to-emerald-500/20", lastActive: "5 min ago" },
  { name: "Project Showcase", description: "Share your work and get feedback", members: 2800, posts: 5600, threads: 1200, color: "from-purple-500/20 to-pink-500/20", lastActive: "12 min ago" },
  { name: "Research & Papers", description: "Discuss latest research and publications", members: 1900, posts: 3200, threads: 780, color: "from-amber-500/20 to-orange-500/20", lastActive: "1 hour ago" },
  { name: "Career & Jobs", description: "Job postings, career advice, and mentorship", members: 2400, posts: 4100, threads: 950, color: "from-teal-500/20 to-green-500/20", lastActive: "30 min ago" },
  { name: "Off-Topic", description: "Memes, hobbies, and non-tech chat", members: 3600, posts: 8200, threads: 2800, color: "from-rose-500/20 to-pink-500/20", lastActive: "Just now" },
];

const trendingTopics = [
  { title: "Best practices for LLM fine-tuning in production", replies: 47, views: 1240, category: "Technical Help" },
  { title: "Showcase: Built a full-stack app with Anoneurx Platform", replies: 32, views: 890, category: "Project Showcase" },
  { title: "RFC: New plugin architecture proposal", replies: 28, views: 670, category: "General Discussion" },
  { title: "WebAssembly vs native: performance benchmarks", replies: 21, views: 540, category: "Research & Papers" },
  { title: "How I got my first open source contribution merged", replies: 19, views: 480, category: "General Discussion" },
];

const pinnedPosts = [
  { title: "Welcome! Read Before Posting — Community Rules", author: "Admin", date: "Jan 1, 2026" },
  { title: "Anoneurx Platform v3.2 Release Notes", author: "Core Team", date: "Mar 20, 2026" },
  { title: "Upcoming AMA with the Founding Team — Apr 30", author: "Moderator", date: "Mar 22, 2026" },
];

const CommunityForums = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <section className="relative py-24 sm:py-32 px-4">
          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
                <MessageSquare className="w-3 h-3 mr-1" /> Forums
              </Badge>
              <h1 className="text-white mb-6">Discussion Forums</h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Ask questions, share knowledge, and connect with the community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pinned */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-2">
              {pinnedPosts.map((post) => (
                <div key={post.title} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <Pin className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
                  <span className="text-sm text-white/70 flex-1">{post.title}</span>
                  <span className="text-xs text-white/30">{post.author} · {post.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-white mb-8">Categories</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((forum, i) => (
                <motion.div key={forum.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                  <Link to={`/community/forums/${forum.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${forum.color} flex items-center justify-center mb-4`}>
                        <MessageSquare className="w-5 h-5 text-foreground/70" />
                      </div>
                      <h3 className="text-foreground mb-1">{forum.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{forum.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex gap-4">
                          <span><Users className="w-3 h-3 inline mr-1" />{forum.members.toLocaleString()}</span>
                          <span>{forum.threads.toLocaleString()} threads</span>
                          <span>{forum.posts.toLocaleString()} posts</span>
                        </div>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {forum.lastActive}</span>
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-5 h-5 text-white/40" />
              <h2 className="text-white">Trending Discussions</h2>
            </div>
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
              <CardContent className="p-0">
                {trendingTopics.map((topic, i) => (
                  <div key={topic.title} className={`flex items-center gap-4 px-5 py-4 ${i !== trendingTopics.length - 1 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.02] transition-colors cursor-pointer`}>
                    <MessageSquare className="w-4 h-4 text-white/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 font-medium truncate">{topic.title}</p>
                      <p className="text-xs text-white/30 mt-0.5">{topic.category}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/30 shrink-0">
                      <span>{topic.replies} replies</span>
                      <span>{topic.views} views</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Link to="/community">
                <Button variant="outline" className="gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
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

export default CommunityForums;
