import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import { labBlogCategories, sortedLabBlogPosts, formatPostDate } from "./blogData";

/** Maps a post category onto the tile colour used for the card header. */
const TONES: Record<string, string> = {
  Robotics: "teal",
  Cybersecurity: "red",
  "Cyber-Physical Security": "red",
  AI: "blue",
  "AI Safety": "purple",
  "AI Research": "purple",
  "Lab Culture": "yellow",
};

export const blogTone = (category: string): string => TONES[category] ?? "blue";

const LabBlog = () => {
  const [category, setCategory] = useState("All");

  const posts = useMemo(
    () =>
      category === "All"
        ? sortedLabBlogPosts
        : sortedLabBlogPosts.filter((post) => post.category === category),
    [category],
  );

  return (
    <LabShell>
      <SEO
        title="Blog"
        description="Short, accessible write-ups of the research happening inside Anoneurx Lab — robotics, cybersecurity, AI, systems and the way the lab works."
        path="/lab/blog"
      />

      <section className="lab-section lab-page lab-page--compact">
        <div className="lab-container">
          <LabPageHead
            eyebrow="Blog"
            title="From the lab"
            lead="Write-ups of work-in-progress, early results and the thinking behind our open problems. The code and data behind every post link back to the problem board."
            back={{ to: "/lab", label: "Research lab" }}
          />

          <div className="lab-filter-row" role="group" aria-label="Filter blog posts by category" style={{ marginBottom: "var(--space-4)" }}>
            {["All", ...labBlogCategories].map((entry) => (
              <button
                key={entry}
                type="button"
                className="lab-chip"
                aria-pressed={category === entry}
                onClick={() => setCategory(entry)}
              >
                {entry}
              </button>
            ))}
          </div>

          {posts.length > 0 ? (
            <div className="lab-blog-grid">
              {posts.map((post) => (
                <article className={`lab-blog-card lab-blog-card--${blogTone(post.category)}`} key={post.slug}>
                  <Link to={`/lab/blog/${post.slug}`} className="lab-blog-card__media" aria-label={post.title} />
                  <div className="lab-blog-card__body">
                    <p className="lab-blog-card__category">{post.category}</p>
                    <h2 className="lab-blog-card__title">
                      <Link to={`/lab/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="lab-blog-card__excerpt">{post.excerpt}</p>
                    <div className="lab-blog-card__foot">
                      <span>
                        {formatPostDate(post.date)} · {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="lab-empty">
              <p className="lab-empty__title">Nothing here yet</p>
              <p>No posts in this category.</p>
            </div>
          )}

          <div className="lab-detail__cta">
            <h2>Work on the problems behind the posts</h2>
            <p>Every article maps to an open problem with a scoped deliverable. Pick one and the lab will help you run the study.</p>
            <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
              <Link className="lab-btn lab-btn--primary" to="/lab/problems">
                Explore open problems
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LabShell>
  );
};

export default LabBlog;
