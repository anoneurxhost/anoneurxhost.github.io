import { motion } from "framer-motion";
import { ExternalLink, Github, LucideIcon, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ShowcaseCardProps {
  index?: number;
  title: string;
  description?: string;
  image?: string;
  icon?: LucideIcon;
  category?: string;
  status?: string; // "Live" | "New" | "Stable" | etc
  tags?: string[];
  impact?: string;
  liveLink?: string;
  codeLink?: string;
  liveLabel?: string;
  codeLabel?: string;
  onClick?: () => void;
}

/**
 * Shared card visual used across every Open Source list (Projects, Libraries,
 * Organizations, Templates, Showcase…) and the homepage featured section.
 * Mirrors the animation and styling of the Portfolio grid.
 */
const ShowcaseCard = ({
  index = 0,
  title,
  description,
  image,
  icon: Icon,
  category,
  status,
  tags = [],
  impact,
  liveLink,
  codeLink,
  liveLabel = "View",
  codeLabel = "Code",
  onClick,
}: ShowcaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 12) * 0.04 }}
    >
      <Card
        onClick={onClick}
        className={`group h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl overflow-hidden hover:border-primary/30 transition-all ${onClick ? "cursor-pointer" : ""}`}
      >
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {Icon && <Icon className="w-10 h-10 text-white/60 group-hover:scale-110 transition-transform duration-500" />}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {(category || status) && (
            <div className="absolute top-2 left-2 flex gap-1">
              {category && (
                <Badge className="bg-black/60 backdrop-blur text-white border-white/15 text-[9px] px-1.5 py-0">
                  {category}
                </Badge>
              )}
              {status && (
                <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30 text-[9px] px-1.5 py-0">
                  {status}
                </Badge>
              )}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{title}</h3>
          {description && (
            <p className="text-[11px] text-gray-400 leading-relaxed mb-3 line-clamp-2">{description}</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {impact && (
            <div className="flex items-center gap-1.5 mb-3 text-[10px] text-emerald-400">
              <TrendingUp className="w-3 h-3" /> {impact}
            </div>
          )}

          {(liveLink || codeLink) && (
            <div className="flex gap-1.5">
              {liveLink && (
                <Button asChild size="sm" variant="outline" className="flex-1 h-7 text-[10px] border-white/10 text-white hover:bg-white/5">
                  <a href={liveLink} target={liveLink.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 mr-1" /> {liveLabel}
                  </a>
                </Button>
              )}
              {codeLink && (
                <Button asChild size="sm" variant="outline" className="flex-1 h-7 text-[10px] border-white/10 text-white hover:bg-white/5">
                  <a href={codeLink} target="_blank" rel="noopener noreferrer">
                    <Github className="w-3 h-3 mr-1" /> {codeLabel}
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ShowcaseCard;