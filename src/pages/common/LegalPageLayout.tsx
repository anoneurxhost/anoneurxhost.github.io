import React, { useEffect, useState } from 'react';
import PageTransition from "@/components/PageTransition";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar TOC - desktop only */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">On this page</p>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
                        activeSection === section.id
                          ? 'text-white bg-white/10 font-medium'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{title}</h1>
              <p className="text-sm text-gray-400 mb-10">Last updated: {lastUpdated}</p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
                    <div className="text-base text-gray-300 leading-relaxed space-y-4">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LegalPageLayout;
