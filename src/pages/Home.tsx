import React, { useEffect } from "react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import Hero from "@/components/home/Hero";
import ProductSlider from "@/components/home/ProductSlider";
import Research from "@/components/home/Research";
import OpenSource from "@/components/home/OpenSource";

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Anoneurx";
  }, []);

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anoneurx",
    url: "https://anoneurx.com",
    logo: "https://anoneurx.com/assets/logo.jpeg",
    description:
      "Anoneurx builds innovative software, operating systems, AI, cloud, research, developer tools, and open source technologies.",
    sameAs: [
      "https://github.com/anoneurx",
      "https://twitter.com/anoneurx",
      "https://linkedin.com/company/anoneurx",
    ],
    knowsAbout: [
      "Software Engineering",
      "Operating Systems",
      "Artificial Intelligence",
      "Cloud Compute Infrastructure",
      "Open Source Software",
    ],
  };

  return (
    <PageTransition>
      <SEO
        title="Building the Future of Software, AI, Cloud & Open Source"
        description="Anoneurx is a modern technology organization building Software, Operating Systems (Black Wall), Artificial Intelligence, Cloud Infrastructure, Research, Developer Tools, and Open Source."
        path="/"
        jsonLd={jsonLdOrganization}
      />

      <main className="w-full bg-transparent text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
        {/* Section 1: Hero Section */}
        <Hero />

        {/* Section 2: Product Showcase Slider (Cloud, Pay, Opensource, Black Wall, Black Wall Server, APP) */}
        <ProductSlider />

        <Research />
      </main>
    </PageTransition>
  );
};

export default Home;
