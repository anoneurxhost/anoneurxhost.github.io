import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Heart, ArrowRight } from "lucide-react";
import OSPage from "./OSPage";

const OSAbout = () => {
  return (
    <OSPage>
      <div className="relative text-white">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl mb-4">
            Our Mission & Philosophy
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Building the future, <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              in the open.
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            At Anoneurx, we believe that the most robust, secure, and innovative technology is built collaboratively. Our open-source program is dedicated to sharing our core building blocks with developers worldwide.
          </p>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/25 transition duration-300">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Hardened Security</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Open source code allows peer reviews, independent audits, and community scrutiny, leading to significantly safer software ecosystems.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/25 transition duration-300">
            <div className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community First</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              We empower builders by welcoming contributions, hosting discussions, and providing mentorship to help developers level up.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/25 transition duration-300">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
              <Heart className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Permissive Licensing</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Our projects use open-source licenses that grant developers the freedom to learn, build, customize, and commercialize.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14 mb-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-2">10M+</div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Downloads</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-2">50k+</div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">GitHub Stars</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-2">500+</div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Contributors</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-2">20+</div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Active Projects</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to start building?</h2>
          <div className="flex justify-center gap-4">
            <Link
              to="/opensource/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/opensource/community"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </div>
    </OSPage>
  );
};

export default OSAbout;
