import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, Loader2 } from "lucide-react";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { connectApi, isLiveBackend } from "./api";
import { useConnectSession } from "./ConnectSession";

interface Line { kind: "cmd" | "out"; text: string }

const ConnectTerminal = () => {
  const { server } = useConnectSession();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Black Wall console shell — type 'help' for available commands." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const prompt = `${server?.username ?? "operator"}@${server?.host ?? "console"}:~$`;

  const run = async () => {
    const cmd = input.trim();
    if (!cmd || busy) return;
    setInput("");
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    setLines((l) => [...l, { kind: "cmd", text: `${prompt} ${cmd}` }]);
    setBusy(true);
    const res = await connectApi.exec(cmd);
    setBusy(false);
    setLines((l) => [...l, { kind: "out", text: res.data.output }]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); run(); }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (next >= 0) { setHistIdx(next); setInput(history[next]); }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? history[next] : "");
    }
  };

  return (
    <ConnectSection
      title="Terminal"
      subtitle="Run commands against the connected server."
      icon={TerminalIcon}
    >
      {!isLiveBackend() && <DemoBanner />}

      <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-[11px] text-slate-500 font-mono">{prompt}</span>
        </div>

        <div className="h-[420px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
          {lines.map((l, i) => (
            <pre key={i} className={`whitespace-pre-wrap break-words ${l.kind === "cmd" ? "text-cyan-300" : "text-slate-300"}`}>
              {l.text}
            </pre>
          ))}
          {busy && <div className="text-slate-500 flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> running…</div>}
          <div ref={endRef} />
        </div>

        <div className="border-t border-white/5 px-4 py-3 flex items-center gap-2">
          <span className="font-mono text-[13px] text-cyan-300 shrink-0">{prompt}</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command"
            className="flex-1 bg-transparent border-0 outline-none font-mono text-[13px] text-slate-100 placeholder:text-slate-600"
            placeholder="type a command…"
          />
        </div>
      </div>
    </ConnectSection>
  );
};

export default ConnectTerminal;