import React from "react";
import { motion } from "framer-motion";
import { Server, Database, GitBranch, Globe, Cpu, HardDrive, Share2, Shield, Activity, Terminal, Boxes } from "lucide-react";
import { Link } from "react-router-dom";
import CloudLayout from "./CloudLayout";

const LayersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const products = [
  {
    category: "Compute",
    items: [
      { name: "Virtual Machines", desc: "General purpose instances", icon: Server, path: "/cloud/compute/virtual-machines" },
      { name: "GPU Servers", desc: "H100 powered for AI/ML", icon: Cpu, path: "/cloud/compute/gpu-servers" },
      { name: "Bare Metal", desc: "Dedicated hardware", icon: Activity, path: "/cloud/compute/bare-metal" },
      { name: "Kubernetes (AKS)", desc: "Managed containers", icon: Boxes, path: "/cloud/compute/kubernetes" },
    ]
  },
  {
    category: "Storage",
    items: [
      { name: "Object Storage", desc: "S3-compatible buckets", icon: Database, path: "/cloud/storage/object" },
      { name: "Block Storage", desc: "Performance SSD volumes", icon: HardDrive, path: "/cloud/storage/block" },
      { name: "Backup Vault", desc: "Encrypted offline backup", icon: Shield, path: "/cloud/storage/backup" },
      { name: "Archive Storage", desc: "Ultra-low cost cold storage", icon: LayersIcon, path: "/cloud/storage/archive" },
    ]
  },
  {
    category: "Network",
    items: [
      { name: "Global CDN", desc: "200+ edge locations", icon: Globe, path: "/cloud/products" },
      { name: "Anycast DNS", desc: "Fast global resolution", icon: Share2, path: "/cloud/products" },
      { name: "Cloud Firewall", desc: "L3-L7 protection", icon: Shield, path: "/cloud/products" },
    ]
  },
  {
    category: "DevOps",
    items: [
      { name: "CI/CD Pipelines", desc: "Automate builds", icon: GitBranch, path: "/cloud/products" },
      { name: "Container Registry", desc: "Secure image storage", icon: Terminal, path: "/cloud/products" },
    ]
  }
];

const CloudProducts = () => {
  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center lg:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">Cloud Services</h1>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">High-performance infrastructure building blocks for your applications.</p>
          </motion.div>

          <div className="space-y-16">
            {products.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-white uppercase tracking-widest">{section.category}</h2>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.items.map((item, iIdx) => (
                    <Link 
                      key={iIdx}
                      to={item.path}
                      className="p-6 rounded-lg bg-white/[0.03] border border-white/5 hover:border-violet-500/30 transition-all group flex items-start gap-5"
                    >
                      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-violet-500/10 transition-colors">
                        <item.icon className="h-5 w-5 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1 text-sm">{item.name}</h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default CloudProducts;
