import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import { faqItems } from "./data";

const LabFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <LabShell>
      <SEO
        title="FAQ"
        description="Frequently asked questions about Anoneurx Lab: research problems, joining the lab, eligibility, mentorship, publishing, and open source research."
        path="/lab/faq"
      />

      <section className="lab-section lab-page">
        <div className="lab-container">
          <LabPageHead
            eyebrow="FAQ"
            title="Frequently asked questions"
            lead="Short answers to the questions applicants ask most. Anything missing can go through the application."
            back={{ to: "/lab", label: "Research lab" }}
          />

          <div className="lab-accordion">
            {faqItems.map((item, index) => {
              const open = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              return (
                <div className="lab-accordion__item" key={item.question}>
                  <h2>
                    <button
                      id={buttonId}
                      type="button"
                      className="lab-accordion__trigger"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      {item.question}
                      <ChevronDown className="lab-btn__icon lab-accordion__icon" aria-hidden="true" />
                    </button>
                  </h2>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="lab-accordion__panel"
                    hidden={!open}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lab-detail__cta">
            <h2>Still deciding?</h2>
            <p>Read the research guide first, then pick a problem from the board.</p>
            <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
              <Link className="lab-btn lab-btn--ghost" to="/lab/guide">
                Research guide
              </Link>
              <Link className="lab-btn lab-btn--primary" to="/lab/problems">
                Browse problems
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LabShell>
  );
};

export default LabFaq;
