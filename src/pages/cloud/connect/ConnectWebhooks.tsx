import { useState } from "react";
import { Webhook as WebhookIcon, Plus, Send, Trash2, Copy, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { connectApi, WEBHOOK_EVENTS, WebhookEvent, WebhookDelivery } from "./api";
import { useAsyncData } from "./useConnectData";

const ConnectWebhooks = () => {
  const { data: hooks, setData, mode, loading } = useAsyncData(() => connectApi.webhooks(), []);
  const { data: deliveries, setData: setDeliveries } = useAsyncData(() => connectApi.deliveries(), []);

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState<WebhookEvent[]>(["server.down", "cpu.high"]);
  const [busy, setBusy] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleEvent = (id: WebhookEvent) =>
    setEvents((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  const create = async () => {
    try {
      const parsed = new URL(url.trim());
      if (!/^https?:$/.test(parsed.protocol)) throw new Error();
    } catch {
      return toast.error("Enter a valid http(s) endpoint URL");
    }
    if (events.length === 0) return toast.error("Select at least one event");
    setBusy(true);
    const res = await connectApi.addWebhook(url.trim(), events);
    setData(res.data);
    setBusy(false);
    setOpen(false);
    setUrl("");
    toast.success("Webhook created");
  };

  const toggle = async (id: string, enabled: boolean) => {
    const res = await connectApi.toggleWebhook(id, enabled);
    setData(res.data);
    toast.success(enabled ? "Webhook enabled" : "Webhook paused");
  };

  const remove = async (id: string) => {
    const res = await connectApi.removeWebhook(id);
    setData(res.data);
    setDeliveries((d) => (d ?? []).filter((x) => x.webhookId !== id));
    toast.success("Webhook deleted");
  };

  const test = async (id: string) => {
    const res = await connectApi.testWebhook(id);
    setDeliveries(res.data);
    toast.success("Test event dispatched");
  };

  const statusTone = (d: WebhookDelivery) =>
    d.status >= 200 && d.status < 300
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      : "border-red-400/30 bg-red-400/10 text-red-300";

  return (
    <ConnectSection
      title="Webhooks"
      subtitle="Push signed server events to your own endpoints — alerts, automations, incident tooling."
      icon={WebhookIcon}
      actions={
        <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
          <Plus className="w-4 h-4 mr-1.5" /> New webhook
        </Button>
      }
    >
      {mode === "demo" && <DemoBanner />}

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <Loader2 className="w-5 h-5 animate-spin mx-auto text-cyan-300" />
        </div>
      ) : hooks && hooks.length > 0 ? (
        <div className="space-y-4">
          {hooks.map((h) => (
            <div key={h.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-mono text-sm text-slate-100 break-all">{h.url}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {h.events.map((e) => (
                      <span key={e} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-200 font-mono">
                        {e}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Signing secret</span>
                    <code className="font-mono text-slate-300">
                      {revealed[h.id] ? h.secret : "•".repeat(18)}
                    </code>
                    <button onClick={() => setRevealed((r) => ({ ...r, [h.id]: !r[h.id] }))}
                      className="text-slate-400 hover:text-white" aria-label="Toggle secret">
                      {revealed[h.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(h.secret); toast.success("Secret copied"); }}
                      className="text-slate-400 hover:text-white" aria-label="Copy secret">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={h.enabled} onCheckedChange={(v) => toggle(h.id, v)} />
                  <Button size="sm" variant="outline" onClick={() => test(h.id)}
                    className="border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]">
                    <Send className="w-3.5 h-3.5 mr-1" /> Test
                  </Button>
                  <button onClick={() => remove(h.id)}
                    className="w-8 h-8 grid place-items-center rounded-lg border border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20"
                    aria-label="Delete webhook">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-slate-400">
          <WebhookIcon className="w-6 h-6 mx-auto mb-3 opacity-60" />
          No webhooks configured yet.
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 text-sm font-semibold">Recent deliveries</div>
        {deliveries && deliveries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[620px]">
              <thead className="text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="text-left px-5 py-2 font-medium">Event</th>
                  <th className="text-left px-5 py-2 font-medium">Status</th>
                  <th className="text-left px-5 py-2 font-medium">Duration</th>
                  <th className="text-left px-5 py-2 font-medium">When</th>
                  <th className="text-right px-5 py-2 font-medium">Retry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {deliveries.map((d) => (
                  <tr key={d.id}>
                    <td className="px-5 py-3 font-mono text-xs text-slate-200">{d.event}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] ${statusTone(d)}`}>{d.status}</span>
                      {d.error && <span className="ml-2 text-[11px] text-red-300/70">{d.error}</span>}
                    </td>
                    <td className="px-5 py-3 text-slate-400">{d.durationMs} ms</td>
                    <td className="px-5 py-3 text-slate-400">{new Date(d.at).toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => test(d.webhookId)} className="text-xs text-cyan-300 hover:text-cyan-200">
                        Resend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">No deliveries recorded yet.</div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0a0d12] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>New webhook endpoint</DialogTitle>
            <DialogDescription className="text-slate-400">
              Deliveries are signed with HMAC-SHA256 in the <code className="font-mono">X-Blackwall-Signature</code> header.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-300">Endpoint URL</Label>
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/hooks/blackwall"
                className="bg-white/[0.04] border-white/10 text-white h-10 font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-slate-300">Events</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WEBHOOK_EVENTS.map((e) => (
                  <label key={e.id} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2.5 cursor-pointer hover:bg-white/[0.05]">
                    <Checkbox checked={events.includes(e.id)} onCheckedChange={() => toggleEvent(e.id)} className="mt-0.5" />
                    <span>
                      <span className="block text-xs text-slate-100">{e.label}</span>
                      <span className="block text-[10px] text-slate-500">{e.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-slate-300 hover:bg-white/[0.06]">Cancel</Button>
            <Button onClick={create} disabled={busy} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
              {busy && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default ConnectWebhooks;