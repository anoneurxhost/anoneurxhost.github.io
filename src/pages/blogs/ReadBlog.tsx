import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import blogData from "@/data/blogData.json";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ReadBlog = () => {
  const { id } = useParams();
  const blog = blogData.find(b => b.id === parseInt(id || '0'));
  const relatedBlogs = blogData.filter(b => b.id !== blog?.id).slice(0, 3);

  if (!blog) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
            <p className="text-white/50 mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/blogs">
              <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                <ArrowLeft className="w-4 h-4" /> Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: blog.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="pt-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link to="/blogs" className="hover:text-white/60 transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/60 truncate max-w-[200px]">{blog.title}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero */}
        <section className="px-4 pb-8">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <Link to="/blogs">
                <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/[0.06] mb-6 -ml-2">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blogs
                </Button>
              </Link>

              <div className="flex items-center gap-3 mb-5">
                <Badge className="bg-white/[0.06] border-white/[0.1] text-white/70 text-xs">
                  {blog.category}
                </Badge>
                <span className="text-xs text-white/30 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {blog.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-5 text-sm text-white/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 text-xs font-semibold">
                      {blog.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleShare}
                  className="text-white/40 hover:text-white hover:bg-white/[0.06]"
                >
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </motion.div>

            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-white/[0.08] mb-12"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-4 pb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="grid lg:grid-cols-[1fr_240px] gap-10">
              {/* Main Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="bg-white/[0.02] backdrop-blur-2xl border-white/[0.06]">
                  <CardContent className="p-8 sm:p-10">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg text-white/70 leading-relaxed mb-8 font-light">
                        {blog.excerpt}
                      </p>

                      <div className="text-white/60 leading-relaxed space-y-6 text-[15px]">
                        <p>{blog.content}</p>

                        <h2 className="text-xl font-bold text-white mt-10 mb-4">The Challenge</h2>
                        <p>
                          As technology continues to evolve at an unprecedented pace, organizations face the dual challenge of keeping up with innovation while maintaining stability and security in their existing systems.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-10 mb-4">Our Approach</h2>
                        <p>
                          At Anoneurx, we believe in a balanced approach that combines cutting-edge research with practical implementation. Our team of experts works closely with stakeholders to identify the most impactful areas for innovation.
                        </p>

                        <div className="my-8 p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          <p className="text-white/80 italic text-base leading-relaxed">
                            "Innovation is not just about building new things — it's about solving real problems in ways that create lasting impact."
                          </p>
                          <p className="text-white/40 text-sm mt-3">— Anoneurx Research Team</p>
                        </div>

                        <h2 className="text-xl font-bold text-white mt-10 mb-4">Key Insights</h2>
                        <ul className="list-none space-y-3 my-6">
                          {[
                            "Revolutionary approaches in modern technology",
                            "Impact on future development and innovation",
                            "Practical applications and real-world benefits",
                            "Challenges and opportunities ahead",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <h2 className="text-xl font-bold text-white mt-10 mb-4">Looking Ahead</h2>
                        <p>
                          The future of technology continues to evolve at an unprecedented pace. As we move forward, it's crucial to stay informed about these developments and their implications for industries worldwide.
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/[0.06]">
                      {blog.tags.map(tag => (
                        <Badge key={tag} className="bg-white/[0.04] border-white/[0.08] text-white/50 text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <Card className="bg-white/[0.02] backdrop-blur border-white/[0.06]">
                    <CardContent className="p-5">
                      <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Author</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 text-sm font-semibold">
                          {blog.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{blog.author}</p>
                          <p className="text-xs text-white/30">Anoneurx Team</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/[0.02] backdrop-blur border-white/[0.06]">
                    <CardContent className="p-5">
                      <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">On This Page</h4>
                      <div className="space-y-2">
                        {["The Challenge", "Our Approach", "Key Insights", "Looking Ahead"].map(heading => (
                          <p key={heading} className="text-xs text-white/40 hover:text-white/70 cursor-pointer transition-colors">
                            {heading}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="px-4 pb-20">
            <div className="container mx-auto max-w-4xl">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-white/40" /> Related Articles
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedBlogs.map(related => (
                    <Link key={related.id} to={`/blog/${related.id}`}>
                      <Card className="bg-white/[0.02] backdrop-blur border-white/[0.06] hover:bg-white/[0.05] transition-all duration-300 h-full group">
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                          <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <CardContent className="p-4">
                          <span className="text-[10px] text-white/30">{related.category}</span>
                          <h4 className="text-sm font-semibold text-white mt-1 leading-snug group-hover:text-white/80 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
};

export default ReadBlog;
