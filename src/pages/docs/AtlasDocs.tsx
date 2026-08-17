import { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Book, Rocket, Code2, Layers, Settings, Boxes, FileCode2,
  Cpu, GitBranch, Search, Copy, Check,
} from "lucide-react";

function CodeBlock({ code, lang = "atlas" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-3 rounded-lg overflow-hidden border border-white/[0.08]">
      <div className="flex justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.06]">
        <span className="text-[10px] uppercase tracking-widest text-slate-500">{lang}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="text-slate-500 hover:text-white">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="p-4 text-xs text-blue-300 font-mono overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}

type Section = { id: string; title: string; icon: typeof Book; body: ReactNode };

const sections: Section[] = [
  {
    id: "intro",
    title: "Introduction",
    icon: Book,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          <strong className="text-white">ATLAS</strong> is a modern, high-performance UI language and framework for building native operating system interfaces with the simplicity of web technologies and the power of Rust.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          It bridges web-developer experience with system-level performance — no browser, no Electron. ATLAS compiles a declarative markup language (ATML) and a CSS-inspired styling system (ATCSS) directly to high-performance Rust, using modern graphics APIs like <strong className="text-white">WebGPU</strong> and <strong className="text-white">Vulkan</strong>.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
            <div className="text-[10px] uppercase tracking-widest text-blue-400 mb-1">Status</div>
            <div className="text-sm text-white">Design phase · v0.1.0</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
            <div className="text-[10px] uppercase tracking-widest text-blue-400 mb-1">License</div>
            <div className="text-sm text-white">MIT</div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "install",
    title: "Installation",
    icon: Rocket,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-3">
          ATLAS requires <strong className="text-white">Rust 1.75+</strong>. Clone the repository and build with cargo:
        </p>
        <CodeBlock lang="shell" code={`# Clone the repository
git clone https://github.com/anoneurx/atlas.git

# Navigate to the project
cd atlas

# Build the project
cargo build`} />
        <p className="text-sm text-slate-400 leading-relaxed mt-4">
          The compiler, runtime and CLI are all under active development. Track progress in the repository's <code className="text-blue-300">ROADMAP.md</code>.
        </p>
      </>
    ),
  },
  {
    id: "basics",
    title: "Language Basics",
    icon: Code2,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          ATLAS uses a unique <strong className="text-white">keyword-bracket</strong> syntax that is easy to write and easy to parse.
        </p>
        <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside mb-4">
          <li><strong className="text-white">Conciseness</strong> — no closing tags.</li>
          <li><strong className="text-white">Clarity</strong> — attributes go in <code className="text-blue-300">()</code>, content goes in <code className="text-blue-300">[]</code>.</li>
          <li><strong className="text-white">Nesting</strong> — logical hierarchy via standard brackets.</li>
          <li>Files use the <code className="text-blue-300">.ats</code> extension.</li>
        </ul>
        <CodeBlock code={`element (attr1=value, attr2="string") [
  child [
    "text content"
  ]
]`} />
      </>
    ),
  },
  {
    id: "atml",
    title: "ATML Elements",
    icon: Layers,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          ATML provides a small set of primitive elements that compose into full interfaces.
        </p>
        <CodeBlock code={`window (title="ATLAS Example") [
  view (padding=20) [
    text (size=24, weight=bold) ["Hello, ATLAS!"]
    button (onClick=greet) ["Click Me"]
  ]
]`} />
        <div className="mt-5 space-y-2 text-sm text-slate-400">
          <p><code className="text-blue-300">window</code> — top-level OS window.</p>
          <p><code className="text-blue-300">view</code> — layout container.</p>
          <p><code className="text-blue-300">text</code> — typographic primitive.</p>
          <p><code className="text-blue-300">button</code> — interactive control.</p>
        </div>
      </>
    ),
  },
  {
    id: "atcss",
    title: "ATCSS Styling",
    icon: Settings,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          ATCSS lives inline next to your markup using a <code className="text-blue-300">style [ ... ]</code> block. Selectors mirror familiar CSS conventions.
        </p>
        <CodeBlock code={`window (title="Styled") [
  style [
    .container {
      padding: 20px;
      background: #1a1a1a;
      color: #ffffff;
      layout: flex;
    }
  ]

  view (class="container") [
    text ["Styled with ATCSS"]
  ]
]`} />
      </>
    ),
  },
  {
    id: "state",
    title: "State & Events",
    icon: Boxes,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          Declare reactive state with <code className="text-blue-300">state</code>. Reference state inside strings with <code className="text-blue-300">{`{name}`}</code> interpolation, and bind handlers to events like <code className="text-blue-300">onClick</code>.
        </p>
        <CodeBlock code={`window (title="Counter") [
  state count: int = 0

  view (padding=20) [
    text ["The count is: {count}"]
    button (onClick="count = count + 1") ["Increment"]
  ]
]`} />
      </>
    ),
  },
  {
    id: "grammar",
    title: "Grammar Reference",
    icon: FileCode2,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-3">
          A simplified EBNF-style summary of the ATLAS grammar (Draft v0.2):
        </p>
        <CodeBlock lang="ebnf" code={`Program     := (StateDecl | ComponentDef | Element)*
Element     := Keyword ( '(' Attributes ')' )? ( '[' Content ']' )?
Content     := (Element | StringLiteral | Expression)*
Attributes  := Attribute (',' Attribute)*
Attribute   := Name '=' Value`} />
      </>
    ),
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Cpu,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          ATLAS is composed of five focused modules, all written in Rust:
        </p>
        <div className="space-y-3">
          {[
            ["Compiler", "Parses ATML and ATCSS into a structured AST and prepares it for the runtime."],
            ["Runtime", "Manages application state, events, and component lifecycles."],
            ["Renderer", "Handles hardware-accelerated drawing and layout via WebGPU / Vulkan."],
            ["Standard Library", "Provides foundational UI widgets and system APIs."],
            ["CLI", "Developer tools for building and running ATLAS applications."],
          ].map(([name, desc]) => (
            <div key={name} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
              <div className="text-sm font-semibold text-white mb-1">{name}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "contributing",
    title: "Roadmap & Contributing",
    icon: GitBranch,
    body: (
      <>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          ATLAS is in its initial design phase and is being built in the open. The roadmap and contribution guidelines live in the GitHub repository.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="https://github.com/anoneurx/atlas/blob/main/ROADMAP.md" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] text-sm text-white transition-all">View Roadmap</a>
          <a href="https://github.com/anoneurx/atlas/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] text-sm text-white transition-all">Contributing Guide</a>
          <a href="https://github.com/anoneurx/atlas/issues" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/15 text-sm text-blue-200 transition-all">Good First Issues</a>
        </div>
      </>
    ),
  },
];

const AtlasDocs = () => {
  const [active, setActive] = useState(sections[0].id);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "ATLAS Documentation | Anoneurx";
  }, []);

  const current = sections.find((s) => s.id === active) || sections[0];
  const filtered = sections.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="px-4 py-12 lg:py-16 relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-[500px] w-[900px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>
      <div className="container-responsive max-w-7xl grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-4">
            <div className="relative mb-4">
              <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs…"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40"
              />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-600 px-2 mb-2">ATLAS Language</div>
            <nav className="space-y-1">
              {filtered.map((s) => {
                const Icon = s.icon;
                const isActive = s.id === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                      isActive
                        ? "bg-blue-500/15 text-blue-300 border border-blue-500/20"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white border border-transparent"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <article>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 lg:p-10"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-3">
              <current.icon className="h-3 w-3" /> ATLAS Documentation
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{current.title}</h1>
            <div className="h-px bg-gradient-to-r from-blue-500/30 via-white/5 to-transparent my-6" />
            {current.body}
          </motion.div>
        </article>
      </div>
    </section>
  );
};

export default AtlasDocs;
