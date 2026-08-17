import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { navLinks, projects } from "./data";

const OpenSourceHome = () => {
  return (
    <div className="relative min-h-screen text-white">
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">
            Anoneurx Open Source Program
          </span>

          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Build with us,
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              in the open.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Languages, operating systems, runtimes, developer tools, and
            frameworks — free to use, inspect, improve, and contribute. One
            home for every Anoneurx open source project.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/opensource/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/community"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold">Featured Projects</h2>

            <p className="mt-3 text-white/60">
              The flagship projects of the Anoneurx ecosystem.
            </p>
          </div>

          <Link
            to="/opensource/projects"
            className="hidden text-white/80 transition hover:text-white md:block"
          >
            See all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_20px_80px_rgba(0,0,0,.45)]"
            >
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                  {p.language}
                </span>

                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {p.stars.toLocaleString()}
              </div>

              <h3 className="mt-5 text-xl font-semibold transition group-hover:text-indigo-300">
                {p.name}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/60">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= EXPLORE ================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-32 md:px-8">
        <h2 className="mb-10 text-4xl font-bold">
          Explore the Program
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {navLinks.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
            >
              <span className="font-medium">
                {l.label}
              </span>

              <ArrowRight className="h-5 w-5 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OpenSourceHome;