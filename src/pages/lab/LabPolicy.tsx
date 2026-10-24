import { Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import { getPolicy, labPolicies, type PolicyBlock } from "./policies";

const renderBlock = (block: PolicyBlock, index: number) => {
  switch (block.type) {
    case "p":
      return <p key={index}>{block.text}</p>;
    case "list":
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="lab-policy__note" key={index}>
          {block.text}
        </p>
      );
    case "dl":
      return (
        <dl className="lab-policy__terms" key={index}>
          {block.items.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
};

const LabPolicy = ({ slug }: { slug: string }) => {
  const policy = getPolicy(slug);

  if (!policy) return <Navigate to="/lab" replace />;

  const siblings = labPolicies.filter((entry) => entry.slug !== policy.slug);

  return (
    <LabShell>
      <SEO
        title={policy.title}
        description={policy.description}
        path={`/lab/${policy.slug}`}
      />

      <section className="lab-section lab-page">
        <div className="lab-container">
          <LabPageHead
            eyebrow="Policies & legal"
            title={policy.title}
            lead={policy.summary}
            back={{ to: "/lab", label: "Research lab" }}
          />

          <dl className="lab-policy__meta">
            <div>
              <dt>Effective</dt>
              <dd>{policy.effective}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>{policy.updated}</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>{policy.owner}</dd>
            </div>
          </dl>

          <div className="lab-detail__grid">
            <div className="lab-detail__body">
              <div className="lab-prose lab-policy">
                {policy.sections.map((section) => (
                  <section key={section.id} aria-labelledby={section.id}>
                    <h2 id={section.id}>{section.title}</h2>
                    {section.blocks.map(renderBlock)}
                  </section>
                ))}
              </div>
            </div>

            <aside className="lab-detail__panel" aria-label={`${policy.title} contents`}>
              <p className="lab-eyebrow">On this page</p>
              <ol className="lab-guide-toc">
                {policy.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span className="lab-mono lab-muted">{String(index + 1).padStart(2, "0")}</span>
                      {section.title.replace(/^\d+\.\s*/, "")}
                    </a>
                  </li>
                ))}
              </ol>

              <div className="lab-policy__siblings">
                <p className="lab-eyebrow">Other policies</p>
                <ul className="lab-footer__links lab-policy__links">
                  {siblings.map((entry) => (
                    <li key={entry.slug}>
                      <Link to={`/lab/${entry.slug}`}>{entry.shortTitle}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </LabShell>
  );
};

export default LabPolicy;
