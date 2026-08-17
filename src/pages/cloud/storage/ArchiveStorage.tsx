import React from "react";
import { Snowflake, Clock, Database, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const ArchiveStorage = () => {
  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Snowflake className="h-3 w-3" /> Cold Storage
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">Archive Storage</h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mb-12">
            Ultra-low cost storage for data that is rarely accessed but must be retained for compliance or historical analysis.
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
             <div className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                   <Database className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold">Incredible Cost Efficiency</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Store petabytes of data for as low as $0.00099 per GB/month.</p>
             </div>
             <div className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                   <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold">Standardized Retrieval</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Choose between Instant, Expedited (1-5 min), or Standard (3-5 hours) retrieval modes.</p>
             </div>
          </div>

          <div className="mt-16 p-10 rounded-lg bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 flex flex-col items-center text-center">
             <h2 className="text-xl font-bold mb-3 tracking-tight italic text-blue-300">Deep Freeze Architecture</h2>
             <p className="text-xs text-gray-500 mb-8 max-w-md">Secure your historical archives with the same 11 nines of durability as our Object Storage.</p>
             <Button className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 px-8 text-xs uppercase tracking-widest">
                Deploy Archive
             </Button>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default ArchiveStorage;
