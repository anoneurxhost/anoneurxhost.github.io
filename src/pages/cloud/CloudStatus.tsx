import React from "react";
import { CheckCircle2, AlertTriangle, Clock, Server, Globe, Signal, Activity } from "lucide-react";
import CloudLayout from "./CloudLayout";

const systems = [
  { name: "Compute Engine", status: "Operational", color: "text-emerald-400" },
  { name: "Object Storage", status: "Operational", color: "text-emerald-400" },
  { name: "Global Network", status: "Degraded Performance", color: "text-amber-400", incident: "Increased latency in US-East" },
  { name: "Dashboard & CLI", status: "Operational", color: "text-emerald-400" },
  { name: "Payment Gateway", status: "Operational", color: "text-emerald-400" },
];

const CloudStatus = () => {
  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive max-w-3xl">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-lg p-8 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                   <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                 </div>
                 <div>
                    <h1 className="text-xl font-bold tracking-tight">Systems are <span className="text-emerald-400 text-lg uppercase tracking-widest ml-2">Green</span></h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Last check: 2 minutes ago</p>
                 </div>
              </div>
              <div className="hidden md:flex items-center gap-6 text-right">
                 <div>
                    <p className="text-xl font-bold">99.98%</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">Uptime (30d)</p>
                 </div>
              </div>
          </div>

          <div className="grid gap-3">
             {systems.map((s, i) => (
                <div key={i} className="p-5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-3">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                         <span className="font-bold text-white uppercase tracking-tight text-xs">{s.name}</span>
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${s.color}`}>{s.status}</span>
                   </div>
                   {s.incident && (
                     <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center gap-3">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <p className="text-[11px] text-amber-300 font-medium">{s.incident}</p>
                     </div>
                   )}
                </div>
             ))}
          </div>

          <div className="mt-16">
             <h2 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6 border-b border-white/5 pb-3">Incident History</h2>
             <div className="space-y-8">
                {[
                  { date: "May 1, 2024", title: "Partial Outage: API Gateway", desc: "Intermittent failures in London region. Resolved within 45 minutes." },
                  { date: "April 24, 2024", title: "Scheduled Maintenance", desc: "Successfully upgraded core spine routers. No traffic interruption." }
                ].map((ev, i) => (
                  <div key={i} className="relative pl-6 border-l border-white/10">
                     <div className="absolute left-[-4px] top-1 h-1.5 w-1.5 rounded-full bg-white/20" />
                     <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">{ev.date}</p>
                     <h3 className="text-sm font-bold text-white mb-1">{ev.title}</h3>
                     <p className="text-[11px] text-gray-500 leading-relaxed">{ev.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default CloudStatus;
