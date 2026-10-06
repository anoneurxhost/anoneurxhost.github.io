import React, { useEffect } from "react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import Hero from "@/components/home/Hero";
import ProductSlider from "@/components/home/ProductSlider";
import Research from "@/components/home/Research";

export const Home: React.FC = () => {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anoneurx",
    url: "https://anoneurx.com",
    logo: "https://anoneurx.com/assets/logo.jpeg",
    description:
      "Anoneurx builds Black Wall OS, the Nexora browser, Anoneurx Cloud, Anoneurx Pay and the ASTRA research lab, and maintains open source developer tools and published research.",
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
        title="Anoneurx — Black Wall OS, Nexora, Anoneurx Cloud & Open Source"
        description="Anoneurx builds Black Wall OS, the Nexora browser, Anoneurx Cloud, Anoneurx Pay and the ASTRA research lab, and maintains open source developer tools and published research."
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
