import React from "react";
import { motion } from "framer-motion";
import { Terminal, Book, Code, HelpCircle, ChevronRight, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import CloudLayout from "./CloudLayout";

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const CloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const categories = [
  {
    title: "Getting Started",
    icon: RocketIcon,
    links: ["Quickstart Guide", "Project Structure", "CLI Setup"]
  },
  {
    title: "Cloud Services",
    icon: CloudIcon,
    links: ["Compute Units", "Storage Buckets", "Networking"]
  },
  {
    title: "API Reference",
    icon: Code,
    links: ["Authentication", "Endpoints", "SDK Examples"]
  }
];

const CloudDocs = () => {
  return (
    <CloudLayout>
      <div className="pt-32 pb-20 min-h-screen">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
               <h1 className="text-3xl font-bold tracking-tighter mb-3">Documentation</h1>
               <p className="text-gray-400 text-sm">Everything you need to master Anoneurx Cloud.</p>
            </div>

            <div className="relative mb-12">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search articles or APIs..." 
                className="w-full h-12 pl-12 pr-10 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-violet-500/50 text-base transition-all"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               {categories.map((cat, i) => (
                 <div key={i} className="p-6 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-lg bg-violet-600/10 flex items-center justify-center mb-6">
                       <cat.icon className="h-6 w-6 text-violet-400" />
                    </div>
                    <h2 className="text-lg font-bold mb-5 tracking-tight">{cat.title}</h2>
                    <ul className="space-y-3 w-full">
                       {cat.links.map((link, lIdx) => (
                         <li key={lIdx} className="group cursor-pointer">
                            <div className="flex items-center justify-between text-[11px] text-gray-500 group-hover:text-white transition-colors">
                               {link}
                               <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                         </li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>

            {/* Popular Articles */}
            <div className="mt-20 space-y-6">
               <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Popular Articles</h3>
               <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Setting up cross-region VPCs",
                    "Protecting endpoints with firewall",
                    "Optimizing storage retrieval"
                  ].map((art, i) => (
                    <div key={i} className="group p-5 rounded-lg bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all flex items-center justify-between cursor-pointer">
                       <div className="flex items-center gap-4">
                          <FileText className="h-4 w-4 text-gray-600 group-hover:text-violet-400 transition-colors" />
                          <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">{art}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default CloudDocs;
