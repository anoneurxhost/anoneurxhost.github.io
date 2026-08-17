import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Youtube, Instagram, Linkedin, MessageCircle } from "lucide-react";

export const SocialOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const socialLinks = [
    { icon: <Youtube className="w-6 h-6" />, href: "https://youtube.com/@anoneurx", label: "YouTube", color: "text-red-500" },
    { icon: <Instagram className="w-6 h-6" />, href: "https://instagram.com/@anoneurx", label: "Instagram", color: "text-pink-500" },
    { icon: <MessageCircle className="w-6 h-6" />, href: "https://whatsapp.com/channel/0029VbAmgwp3mFYF4DFVym0z", label: "WhatsApp", color: "text-green-500" },
    { icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.3.3 0 0 1 .069.288c-.097.407-.313 1.272-.355 1.447-.058.231-.19.281-.438.167-1.637-.762-2.661-3.153-2.661-5.076 0-4.135 3.003-7.931 8.659-7.931 4.545 0 8.077 3.239 8.077 7.567 0 4.516-2.848 8.151-6.801 8.151-1.328 0-2.576-.69-3.004-1.504l-.817 3.111c-.296 1.131-1.097 2.55-1.631 3.413A12.001 12.001 0 0 0 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0z" /></svg>), href: "https://pinterest.com/anoneurx", label: "Pinterest", color: "text-red-600" },
    { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com/company/anoneurx", label: "LinkedIn", color: "text-blue-500" },
    { icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>), href: "https://x.com/anoneurx", label: "X", color: "text-white" },
    { icon: <Github className="w-6 h-6" />, href: "https://github.com/anoneurx", label: "GitHub", color: "text-white" },
    { icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" /></svg>), href: "https://gitlab.com/anoneurx", label: "GitLab", color: "text-orange-500" }
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
          {/* Overlay backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-black/60 p-8 md:p-12 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="mb-10 text-center relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Connect</span>
              <h2 className="mt-3 text-2xl font-bold text-white mb-2 tracking-tight">Stay Updated</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Join our community and follow our latest updates across our networks.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-2 w-24 h-24 rounded-2xl ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="text-xs font-semibold">{social.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
