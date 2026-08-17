import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Linkedin, MessageCircle, Facebook, Mail, Link as LinkIcon, Github, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

interface ShareOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  description?: string;
}

/**
 * Reusable share overlay combining quick social share targets, link copy, and official follow accounts.
 */
export const ShareOverlay = ({ isOpen, onClose, url, title = "", description = "" }: ShareOverlayProps) => {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const shareUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast("Link copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Failed to copy link");
    }
  };

  const socials = [
    {
      label: "Copy Link",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40",
      onClick: copy,
      icon: copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />,
    },
    {
      label: "Email",
      color: "text-amber-300 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40",
      href: `mailto:?subject=${enc(title)}&body=${enc(description ? `${description}\n\n${shareUrl}` : shareUrl)}`,
      icon: <Mail className="w-6 h-6" />,
    },
    {
      label: "WhatsApp",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40",
      href: `https://api.whatsapp.com/send?text=${enc(`${title} ${shareUrl}`)}`,
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      label: "X",
      color: "text-white bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30",
      href: `https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(title)}`,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      color: "text-blue-500 bg-blue-600/10 border-blue-500/20 hover:bg-blue-600/20 hover:border-blue-500/40",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
      icon: <Facebook className="w-6 h-6" />,
    },
    {
      label: "LinkedIn",
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20 hover:bg-sky-500/20 hover:border-sky-500/40",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl)}`,
      icon: <Linkedin className="w-6 h-6" />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-mono">Share</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Instrument Serif',Georgia,serif" }}>
                {title || "Share this page"}
              </h2>
            </div>

            {/* 2 Rows of 3 App Icons Grid */}
            <div className="grid grid-cols-3 gap-3.5 relative z-10 mb-8 max-w-xs mx-auto">
              {socials.map((t) =>
                t.onClick ? (
                  <button
                    key={t.label}
                    onClick={t.onClick}
                    className={`flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border transition-all hover:scale-105 shadow-md ${t.color}`}
                    aria-label={t.label}
                  >
                    {t.icon}
                    <span className="text-xs font-semibold">{t.label}</span>
                  </button>
                ) : (
                  <a
                    key={t.label}
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border transition-all hover:scale-105 shadow-md ${t.color}`}
                    aria-label={`Share on ${t.label}`}
                  >
                    {t.icon}
                    <span className="text-xs font-semibold">{t.label}</span>
                  </a>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareOverlay;

