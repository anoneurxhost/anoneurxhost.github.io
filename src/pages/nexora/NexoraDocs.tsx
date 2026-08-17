import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Rocket, Settings, Bookmark, Search, ChevronRight, Copy, Check } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const sections = [
  {
    id: "intro",
    title: "Introduction",
    icon: Book,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          Welcome to the Nexora documentation. Here you'll find everything you need to install, configure and master your new browser.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          Use the sidebar to navigate, or search for any topic.
        </p>
      </>
    ),
  },
  {
    id: "install",
    title: "Installation",
    icon: Rocket,
    body: (
      <>
        <h3 className="text-lg font-bold text-white mt-4 mb-3">Windows</h3>
        <CodeBlock code={`# install via winget
winget install Anoneurx.Nexora`} />
        <h3 className="text-lg font-bold text-white mt-6 mb-3">Linux</h3>
        <CodeBlock code={`# Debian / Ubuntu
sudo apt install nexora-browser

# Arch
yay -S nexora-bin`} />
        <h3 className="text-lg font-bold text-white mt-6 mb-3">macOS (coming soon)</h3>
        <p className="text-sm text-slate-400">macOS builds will land in v2.9. Sign up on the download page to be notified.</p>
      </>
    ),
  },
  {
    id: "import",
    title: "Importing Bookmarks",
    icon: Bookmark,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          Nexora can import your bookmarks, history, passwords and saved tabs from Chrome, Firefox, Edge, Brave and Safari.
        </p>
        <ol className="space-y-2 text-sm text-slate-400 list-decimal list-inside">
          <li>Open Settings → Import data</li>
          <li>Pick your previous browser from the list</li>
          <li>Choose the data you want to bring over</li>
          <li>Click Import — done in seconds</li>
        </ol>
      </>
    ),
  },
  {
    id: "settings",
    title: "Settings & Preferences",
    icon: Settings,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          Nexora's settings are organized into clear categories — Privacy, Sync, Appearance, AI, Extensions and Advanced.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          Every setting comes with a tooltip explaining what it does. We never hide consequences behind jargon.
        </p>
      </>
    ),
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-3 rounded-lg overflow-hidden border border-white/[0.08]">
      <div className="flex justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.06]">
        <span className="text-[10px] uppercase tracking-widest text-slate-500">shell</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="text-slate-500 hover:text-white">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="p-4 text-xs text-blue-300 font-mono overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}

const NexoraDocs = () => {
  const [active, setActive] = useState(sections[0].id);
  const [query, setQuery] = useState("");
  const current = sections.find((s) => s.id === active) || sections[0];
  const filtered = sections.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <NexoraLayout>
      <section className="px-4 py-12 lg:py-16">
        <div className="container-responsive max-w-7xl grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-4">
              <div className="relative mb-4">
                <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search docs…" className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-slate-600 px-2 mb-2">Nexora Browser</div>
              <nav className="space-y-1">
                {filtered.map((s) => {
                  const Icon = s.icon;
                  const isActive = s.id === active;
                  return (
                    <button key={s.id} onClick={() => setActive(s.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${isActive ? "bg-blue-500/15 text-blue-300 border border-blue-500/20" : "text-slate-400 hover:bg-white/[0.04] hover:text-white border border-transparent"}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {s.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <article>
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 lg:p-10">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-3">
                <current.icon className="h-3 w-3" /> Documentation
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{current.title}</h1>
              <div className="h-px bg-gradient-to-r from-blue-500/30 via-white/5 to-transparent my-6" />
              {current.body}
            </motion.div>
          </article>
        </div>
      </section>
    </NexoraLayout>
  );
};

export default NexoraDocs;
