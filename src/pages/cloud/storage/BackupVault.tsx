import React from "react";
import { Shield, Clock, RotateCcw, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const BackupVault = () => {
  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Shield className="h-3 w-3" /> Data Retention
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">Backup Vault</h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mb-12">
            Automated, point-in-time recovery for your compute and storage services. Keep your data safe from accidental deletion and hardware failure.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
             {[
               {
                 icon: Clock,
                 title: "Auto Snapshots",
                 desc: "Set hourly, daily, or weekly backup schedules with 1-click restoration."
               },
               {
                 icon: RotateCcw,
                 title: "Point-in-Time Restore",
                 desc: "Roll back your entire system state to any minute in the last 30 days."
               },
               {
                 icon: Lock,
                 title: "Air-Gapped Safety",
                 desc: "Backups are stored on physically isolated infrastructure for maximum security."
               },
               {
                 icon: Shield,
                 title: "Encryption",
                 desc: "All snapshots are encrypted with mandatory KMS keys for compliance."
               }
             ].map((f, i) => (
                <div key={i} className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                   <f.icon className="h-6 w-6 text-emerald-400" />
                   <h3 className="text-lg font-bold">{f.title}</h3>
                   <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
             ))}
          </div>

          <div className="mt-16 bg-white/[0.03] border border-white/10 rounded-lg p-10 text-center">
             <p className="text-sm font-bold mb-4">Ready to secure your data?</p>
             <Button className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 px-8 text-xs uppercase tracking-widest">
                Configure Backups
             </Button>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default BackupVault;
