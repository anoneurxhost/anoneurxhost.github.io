import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Clock, ArrowLeft, ThumbsUp, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const categoryData: Record<string, { name: string; description: string; members: number }> = {
  "general": { name: "General Discussion", description: "Chat about anything tech-related. Share ideas, ask questions, and connect with the community.", members: 4200 },
  "technical-help": { name: "Technical Help", description: "Get help with code, bugs, architecture decisions, and debugging.", members: 3100 },
  "project-showcase": { name: "Project Showcase", description: "Share your work and get constructive feedback from the community.", members: 2800 },
  "research": { name: "Research & Papers", description: "Discuss latest research, publications, and academic work.", members: 1900 },
  "careers": { name: "Career & Jobs", description: "Job postings, career advice, mentorship, and professional growth.", members: 2400 },
  "off-topic": { name: "Off-Topic", description: "Memes, hobbies, and non-tech conversations.", members: 3600 },
};

const posts = [
  { id: 1, title: "Best practices for LLM fine-tuning in production", author: "Sarah Chen", avatar: "SC", replies: 47, views: 1240, likes: 89, time: "2 hours ago", tags: ["AI", "LLM", "Production"], pinned: true },
  { id: 2, title: "How to structure a large React codebase for scalability", author: "Alex Kumar", avatar: "AK", replies: 32, views: 890, likes: 65, time: "4 hours ago", tags: ["React", "Architecture"] },
  { id: 3, title: "WebAssembly vs native: my benchmark results", author: "James Wilson", avatar: "JW", replies: 28, views: 670, likes: 42, time: "6 hours ago", tags: ["WASM", "Performance"] },
  { id: 4, title: "Showcase: Built a full-stack app with Anoneurx Platform", author: "Maria Santos", avatar: "MS", replies: 21, views: 540, likes: 38, time: "8 hours ago", tags: ["Showcase", "Full-stack"] },
  { id: 5, title: "RFC: New plugin architecture proposal", author: "Omar Hassan", avatar: "OH", replies: 19, views: 480, likes: 31, time: "12 hours ago", tags: ["RFC", "Architecture"] },
  { id: 6, title: "How I optimized our CI pipeline by 60%", author: "Lisa Park", avatar: "LP", replies: 15, views: 320, likes: 27, time: "1 day ago", tags: ["DevOps", "CI/CD"] },
  { id: 7, title: "Understanding Rust ownership for JS developers", author: "Raj Patel", avatar: "RP", replies: 12, views: 290, likes: 24, time: "1 day ago", tags: ["Rust", "Learning"] },
  { id: 8, title: "Designing accessible component libraries", author: "Emma Davis", avatar: "ED", replies: 9, views: 210, likes: 18, time: "2 days ago", tags: ["A11y", "Design"] },
];

const filters = ["All", "Most Recent", "Most Popular", "Most Replies", "Unanswered"];

const DiscussionCategory = () => {
  const { categoryId } = useParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const category = categoryData[categoryId || "general"] || categoryData.general;

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Banner */}
        <section className="relative py-20 sm:py-28 px-4">
         
          <div className="container mx-auto max-w-5xl relative z-10">
            <Link to="/community/forums" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Forums
            </Link>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <h1 className="text-foreground mb-3">{category.name}</h1>
              <p className="text-base text-muted-foreground max-w-2xl mb-4">{category.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {category.members.toLocaleString()} members</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {posts.length} posts</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 pb-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === f
                      ? "bg-white/[0.12] text-foreground border border-white/[0.2]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06] border border-transparent"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
              <CardContent className="p-0">
                {posts.map((post, i) => (
                  <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.04, duration: 0.3 }}>
                    <div className={`flex items-start gap-4 px-6 py-5 ${i !== posts.length - 1 ? "border-b border-white/[0.05]" : ""} hover:bg-white/[0.02] transition-colors cursor-pointer`}>
                      <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-muted-foreground text-xs font-semibold shrink-0">
                        {post.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {post.pinned && <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/20 text-[10px]">Pinned</Badge>}
                          <h4 className="text-foreground text-sm font-medium truncate">{post.title}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span>{post.author}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map(t => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted-foreground border border-white/[0.06]">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-5 text-xs text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {post.likes}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {post.replies}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="border-white/[0.1] text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {[1, 2, 3].map(p => (
                <Button key={p} variant="outline" size="sm" onClick={() => setCurrentPage(p)} className={`border-white/[0.1] ${currentPage === p ? "bg-white/[0.1] text-foreground" : "text-muted-foreground"}`}>
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} className="border-white/[0.1] text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default DiscussionCategory;
