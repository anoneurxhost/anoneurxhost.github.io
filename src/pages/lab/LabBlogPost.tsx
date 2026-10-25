import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import LabShell from "@/components/lab/LabShell";
import { findLabBlogPost, formatPostDate } from "./blogData";
import { problems } from "./data";
import { blogTone } from "./LabBlog";

const LabBlogPost = () => {
  const { slug } = useParams();
  const post = findLabBlogPost(slug);

  if (!post) {
    return <Navigate to="/lab/blog" replace />;
  }

  const problem = post.relatedProblemId
    ? problems.find((entry) => entry.id === post.relatedProblemId)
    : undefined;

  const url = `/lab/blog/${post.slug}`;

  return (
    <LabShell>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={url}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: post.authors.map((name) => ({ "@type": "Person", name })),
            publisher: { "@type": "Organization", name: "Anoneurx Lab" },
          },
        ]}
      />

      <article className={`lab-article lab-blog-card--${blogTone(post.category)}`}>
        <div className="lab-article__head">
          <Link className="lab-back" to="/lab/blog">
            <ArrowLeft size={16} aria-hidden="true" />
            All posts
          </Link>
          <p className="lab-blog-card__category">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="lab-article__byline">
            By {post.authors.join(", ")} · {formatPostDate(post.date)} · {post.readTime}
          </p>
        </div>

        <hr className="lab-article__rule" />

        <p className="lab-lead">{post.excerpt}</p>

        {post.sections.map((section) => (
          <section className="lab-article__section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        ))}

        <footer className="lab-article__footer">
          {problem && (
            <div>
              <p className="lab-blog-card__category">Related open problem</p>
              <h2 style={{ fontSize: "1.15rem", marginTop: "var(--space-1)" }}>
                <Link to={`/lab/problems/${problem.id}`}>{problem.title}</Link>
              </h2>
              <p className="lab-muted" style={{ fontSize: "0.92rem", marginTop: "var(--space-1)" }}>
                {problem.description}
              </p>
            </div>
          )}
        </footer>
      </article>
    </LabShell>
  );
};

export default LabBlogPost;
