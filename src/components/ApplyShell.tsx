import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import PageTransition from "@/components/PageTransition";

interface ApplyShellProps {
  badge: string;
  title: string;
  highlight?: string;
  subtitle: string;
  backTo: string;
  backLabel: string;
  children: ReactNode;
}

/**
 * Unified premium layout used by every "apply" page across Career Hub:
 * Internships, Hackathon, Join Dev Team, Other Opportunities.
 */
const ApplyShell = ({
  badge,
  title,
  highlight,
  subtitle,
  backTo,
  backLabel,
  children,
}: ApplyShellProps) => (
  <PageTransition>
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />

      <section className="relative z-10 px-4 pt-20 pb-12">
        <div className="container mx-auto max-w-6xl">
          <Button variant="outline" asChild className="mb-6 border-white/10 text-gray-300 hover:bg-white/5">
            <Link to={backTo} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {backLabel}
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge className="mb-4 bg-white/5 text-blue-300 border-white/10 px-4 py-1.5 backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {badge}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              {title}{" "}
              {highlight && (
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  {highlight}
                </span>
              )}
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
          </motion.div>

          {children}
        </div>
      </section>
    </div>
  </PageTransition>
);

export default ApplyShell;
