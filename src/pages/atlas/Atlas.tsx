import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2, Cpu, Layers, Zap, Boxes, BookOpen, Rocket,
  Github, ArrowRight, Copy, Check, Terminal, Sparkles,
} from "lucide-react";

const heroCode = `// HelloWorld.ats
window (title="ATLAS Example") [
  style [
    .container {
      padding: 20px;
      background: #1a1a1a;
      color: #ffffff;
      layout: flex;
    }
  ]

  view (class="container") [
    text (size=24, weight=bold) ["Hello, ATLAS!"]
    button (onClick=greet) ["Click Me"]
  ]
]`;

const features = [
  { icon: Code2, title: "Declarative ATML", desc: "Keyword-bracket syntax with attributes in () and content in []. No closing tags, no noise." },
  { icon: Layers, title: "ATCSS Styling", desc: "A CSS-inspired styling system that lives next to your markup and compiles to native layout." },
  { icon: Cpu, title: "Rust Core", desc: "Compiler, runtime and renderer all written in Rust for memory safety and predictable speed." },
  { icon: Zap, title: "GPU Rendering", desc: "Hardware-accelerated through WebGPU and Vulkan — no browser, no Electron in sight." },
  { icon: Boxes, title: "Component Model", desc: "Reactive state, events and component lifecycles built into the language itself." },
  { icon: Sparkles, title: "Native Performance", desc: "Compiles directly to high-performance Rust binaries that ship as real native apps." },
];

const architecture = [
  { name: "Compiler", desc: "Parses ATML & ATCSS into a typed AST." },
  { name: "Runtime", desc: "State, events and component lifecycles." },
  { name: "Renderer", desc: "Hardware-accelerated drawing & layout." },
  { name: "Standard Library", desc: "Widgets and system APIs." },
  { name: "CLI", desc: "Build, run and scaffold ATLAS apps." },
];

function CodeBlock({ code, lang = "atlas" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-[10px] uppercase tracking-widest text-slate-500">{lang}</span>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="p-5 text-[13px] leading-relaxed text-blue-200 font-mono overflow-x-auto">{code}</pre>
    </div>
  );
}

const Atlas = () => {
  useEffect(() => {
    document.title = "ATLAS — Native UI at the speed of Rust | Anoneurx";
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[800px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      </div>

      {/* HERO */}
      <section className="px-4 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="container-responsive max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.08] text-[11px] uppercase tracking-widest text-blue-300 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                Design phase · v0.1.0
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
                ATLAS — Native UI at the <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">speed of Rust</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mb-8">
                A modern UI language and framework for building native operating system interfaces — with the simplicity of web technologies and the performance of WebGPU and Vulkan.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/docs/atlas" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all">
                  <BookOpen className="h-4 w-4" /> Read the docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://github.com/anoneurx/atlas" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-2xl text-white text-sm font-semibold transition-all">
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-[11px] uppercase tracking-widest text-slate-500">
                <span>MIT License</span>
                <span>·</span>
                <span>Rust 1.75+</span>
                <span>·</span>
                <span>.ats files</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <CodeBlock code={heroCode} lang="atlas" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 py-16 lg:py-20">
        <div className="container-responsive max-w-7xl">
          <div className="text-center mb-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-3">Why ATLAS</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">A language built for native</h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">Web developer experience, system-level performance. ATLAS bridges the gap between the two without the runtime cost of a browser.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl p-6 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-blue-300" />
                  </div>
                  <h3 className="text-base font-semibold mb-1.5">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="px-4 py-16 lg:py-20">
        <div className="container-responsive max-w-7xl">
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 lg:p-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-3">Architecture</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Five focused modules</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {architecture.map((m) => (
                <div key={m.name} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 hover:border-blue-500/30 transition-colors">
                  <div className="text-[10px] uppercase tracking-widest text-blue-400 mb-2">{m.name}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="container-responsive max-w-5xl">
          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-white/[0.02] to-fuchsia-600/10 backdrop-blur-2xl p-10 lg:p-14 text-center">
            <Rocket className="h-8 w-8 text-blue-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to build with ATLAS?</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">Dive into the full language specification, grammar reference, and getting-started guide.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/docs/atlas" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30">
                <Terminal className="h-4 w-4" /> Open the docs
              </Link>
              <a href="https://github.com/anoneurx/atlas" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] text-white text-sm font-semibold transition-all">
                <Github className="h-4 w-4" /> Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Atlas;
