import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, User, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import blogData from "@/data/blogData.json";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const OurBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(blogData.map((b) => b.category))];

  const filtered = blogData.filter((blog) => {
    const matchSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = activeCategory === "All" || blog.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = blogData[0];
  const rest = filtered.filter((b) => b.id !== featured?.id);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Hero */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center space-y-6">
              <Badge className="bg-white/[0.06] border-white/[0.1] text-white/80 px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" /> Our Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Insights & Innovations
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mx-auto">
                Deep dives into technology, research, and the future we're building.
              </p>
            </motion.div>

            {/* Search + Filters */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 rounded-xl backdrop-blur-sm text-sm focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            {featured && activeCategory === "All" && !searchTerm && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/blog/${featured.id}`}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] rounded-2xl overflow-hidden group hover:border-white/15 transition-all duration-300">
                    <div className="grid md:grid-cols-2">
                      <div className="aspect-video md:aspect-auto overflow-hidden">
                        <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-primary/20 text-primary border-primary/20 text-xs">
                          <Sparkles className="w-3 h-3 mr-1" /> Featured
                        </Badge>
                        <span className="text-xs text-gray-500 mb-2">{featured.category} · {featured.readTime}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-base text-gray-400 mb-5 leading-relaxed">{featured.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="w-3.5 h-3.5 mr-1.5" />
                            {featured.author}
                            <span className="mx-2">·</span>
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {new Date(featured.date).toLocaleDateString()}
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )}

            {/* Blog Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-base mb-4">No articles found</p>
                <Button variant="outline" onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="border-white/10 text-white/70">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === "All" && !searchTerm ? rest : filtered).map((blog, i) => (
                  <motion.div key={blog.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: (i % 3) * 0.08 }}>
                    <Link to={`/blog/${blog.id}`} className="block h-full">
                      <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] rounded-2xl overflow-hidden group hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <img src={blog.image} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <CardContent className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-white/[0.06] border-white/[0.08] text-white/60 text-xs">{blog.category}</Badge>
                            <span className="text-xs text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" />{blog.readTime}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-primary transition-colors flex-1">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{blog.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                            <div className="flex items-center"><User className="w-3 h-3 mr-1" />{blog.author}</div>
                            <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{new Date(blog.date).toLocaleDateString()}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center">
              <Link to="/blogs/all">
                <Button variant="outline" size="lg" className="border-white/10 text-white/70 hover:bg-white/[0.06] px-10">
                  View All Posts <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OurBlogs;
