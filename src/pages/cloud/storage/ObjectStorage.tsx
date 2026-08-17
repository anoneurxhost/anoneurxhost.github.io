import React from "react";
import { motion } from "framer-motion";
import { Database, Shield, Zap, ChevronRight, HardDrive, Share2, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const ObjectStorage = () => {
  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Database className="h-3 w-3" /> Storage Solutions
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">Object Storage</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                S3-compatible, ultra-scalable object storage for your unstructured data. Built for 99.999% durability.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
               <div className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                  <Zap className="h-6 w-6 text-violet-400" />
                  <h3 className="text-lg font-bold">High Performance</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Multi-part uploads and ultra-low latency retrieval across global regions.</p>
               </div>
               <div className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                  <Shield className="h-6 w-6 text-violet-400" />
                  <h3 className="text-lg font-bold">Secure by Default</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Server-side encryption and IAM-based bucket policies for granular access control.</p>
               </div>
            </div>

            <div className="bg-gradient-to-br from-violet-600/10 to-transparent p-10 rounded-lg border border-violet-500/20 text-center">
               <h2 className="text-2xl font-bold mb-4 italic">Scale infinitely.</h2>
               <p className="text-gray-400 text-xs mb-8">Start with a few gigabytes and grow to petabytes without complexity.</p>
               <Button className="rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold h-11 px-8 text-xs uppercase tracking-widest">
                 Create Bucket
               </Button>
            </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default ObjectStorage;
