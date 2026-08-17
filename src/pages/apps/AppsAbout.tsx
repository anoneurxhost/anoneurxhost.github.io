import AppsLayout from "./AppsLayout";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe2, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AppsAbout = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Security First",
      desc: "Every app undergoes rigorous security scanning and verification before it reaches your device.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Optimized delivery pipeline ensures your downloads and updates are faster than ever.",
    },
    {
      icon: Globe2,
      title: "Global Reach",
      desc: "Connect with developers and users from around the world in a unified ecosystem.",
    },
    {
      icon: Users,
      title: "Community Driven",
      desc: "User reviews, developer feedback, and community discussions shape the future of our store.",
    },
  ];

  return (
    <AppsLayout title="About · Anoneurx Store">
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="container-responsive relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
              <Sparkles className="h-3 w-3" /> Our Mission
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Empowering the Next Generation of Apps
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              The Anoneurx Store is more than just a marketplace. It's a premium ecosystem designed to empower developers and wowed users by providing high-quality, secure, and futuristic software solutions.
            </p>
          </motion.div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <v.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Vision Section */}
          <div className="relative rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-2xl p-8 lg:p-16">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">A Vision for the Digital Frontier</h2>
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  Built by Anoneurx, the store serves as the central nervous system for our growing software infrastructure. We believe that software should be beautiful, intentional, and deeply integrated.
                </p>
                <p>
                  From powerful AI tools like Nexora Browser to high-performance security utilities on Black Wall, every product in our marketplace is selected to enhance your digital life.
                </p>
                <p>
                  Our commitment to developers is equally strong. By providing a low-friction publishing pipeline and robust analytics, we ensure that the best ideas can reach the global stage without compromise.
                </p>
              </div>
              
              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  to="/apps/browse"
                  className="px-8 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-1"
                >
                  Explore apps
                </Link>
                <Link
                  to="/contact"
                  className="px-8 h-14 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppsLayout>
  );
};

export default AppsAbout;
