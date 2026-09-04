import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, Send, Github, MessageSquare } from "lucide-react";
import OSPage from "./OSPage";

const OSContact = () => {
  return (
    <OSPage>
      <div className="text-center mb-16">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl mb-4">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Contact <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">Anoneurx Open Source</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed text-white/70">
          Maintainers, security disclosure, sponsorship and community — reach the people who keep every Anoneurx repository moving.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl hover:border-white/20 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 mb-5">
            <Mail className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">General Email</h3>
          <p className="text-sm text-white/60 mb-4">Reach the open source team for any inquiry.</p>
          <a href="mailto:opensource@anoneurx.com" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-medium">
            opensource@anoneurx.com
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl hover:border-white/20 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 mb-5">
            <MessageSquare className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Discussions</h3>
          <p className="text-sm text-white/60 mb-4">Public questions get answers fastest here.</p>
          <Link to="/opensource/community" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-medium">
            Join the community
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl hover:border-white/20 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 mb-5">
            <Clock className="h-6 w-6 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Response Time</h3>
          <p className="text-sm text-white/60 mb-4">We aim to reply within 2 business days.</p>
          <p className="text-sm text-white/50">Security issues get a 48h acknowledgement.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl hover:border-white/20 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 mb-5">
            <MapPin className="h-6 w-6 text-violet-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Location</h3>
          <p className="text-sm text-white/60 mb-4">Global community with contributors worldwide.</p>
          <p className="text-sm text-white/50">Remote-first, async-friendly culture.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl hover:border-white/20 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 mb-5">
            <Phone className="h-6 w-6 text-rose-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Security</h3>
          <p className="text-sm text-white/60 mb-4">Coordinated vulnerability disclosure.</p>
          <a href="mailto:security@anoneurx.com" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-medium">
            security@anoneurx.com
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl hover:border-white/20 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 mb-5">
            <Send className="h-6 w-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
          <p className="text-sm text-white/60 mb-4">Explore the ecosystem.</p>
          <div className="flex flex-col gap-2">
            <Link to="/opensource/projects" className="text-sm text-blue-300 hover:text-blue-200">Browse Projects →</Link>
            <Link to="/opensource/contributors" className="text-sm text-blue-300 hover:text-blue-200">View Contributors →</Link>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Departments</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-200">ML</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Maintainer Requests</p>
                <p className="text-xs text-white/40">Repository transfers & triage</p>
              </div>
            </div>
            <a href="mailto:opensource@anoneurx.com" className="text-xs text-blue-300 hover:underline">opensource@anoneurx.com</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-200">SP</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sponsorship</p>
                <p className="text-xs text-white/40">Fund a project or milestone</p>
              </div>
            </div>
            <a href="mailto:opensource@anoneurx.com" className="text-xs text-blue-300 hover:underline">opensource@anoneurx.com</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-amber-200">LX</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Licensing</p>
                <p className="text-xs text-white/40">Compatibility & commercial use</p>
              </div>
            </div>
            <a href="mailto:opensource@anoneurx.com" className="text-xs text-blue-300 hover:underline">opensource@anoneurx.com</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/opensource/community"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <MessageSquare className="h-4 w-4" />
          Start a Discussion
        </Link>
      </div>
    </OSPage>
  );
};

export default OSContact;
