import { Github, Youtube, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SiHuggingface } from "@icons-pack/react-simple-icons";

export const SocialRow = () => {
  const socialLinks = [
    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/@anoneurx", label: "YouTube", color: "text-red-500" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/@anoneurx", label: "Instagram", color: "text-pink-500" },
    { icon: <MessageCircle className="w-5 h-5" />, href: "https://whatsapp.com/channel/0029VbAmgwp3mFYF4DFVym0z", label: "WhatsApp", color: "text-green-500" },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.3.3 0 0 1 .069.288c-.097.407-.313 1.272-.355 1.447-.058.231-.19.281-.438.167-1.637-.762-2.661-3.153-2.661-5.076 0-4.135 3.003-7.931 8.659-7.931 4.545 0 8.077 3.239 8.077 7.567 0 4.516-2.848 8.151-6.801 8.151-1.328 0-2.576-.69-3.004-1.504l-.817 3.111c-.296 1.131-1.097 2.55-1.631 3.413A12.001 12.001 0 0 0 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0z" />
        </svg>
      ), href: "https://pinterest.com/anoneurx", label: "Pinterest", color: "text-red-600"
    },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/company/anoneurx", label: "LinkedIn", color: "text-blue-500" },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ), href: "https://x.com/anoneurx", label: "X", color: "text-white"
    },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/anoneurx", label: "GitHub", color: "text-white" },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
        </svg>
      ), href: "https://gitlab.com/anoneurx", label: "GitLab", color: "text-orange-500"
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L4.5 6.5v11L12 22l7.5-4.5v-11L12 2z" />
          <path d="M12 22V12" />
          <path d="M19.5 6.5L12 12 4.5 6.5" />
          <path d="M4.5 17.5L12 12l7.5 5.5" />
        </svg>
      ), href: "https://marketplace.visualstudio.com/publishers/Anoneurx", label: "VS Marketplace", color: "text-blue-400"
    },
    { icon: <SiHuggingface className="w-5 h-5 text-[#FFD21E]" />, href: "https://huggingface.co/anoneurx", label: "Hugging Face", color: "text-[#FFD21E]", },
  ];

  return (
    <div className="flex flex-nowrap items-center gap-1.5 pt-2">
      {socialLinks.map((social, idx) => (
        <a
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color}`}
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export const BrandSection = () => {
  const location = useLocation();
  const isNexora = location.pathname.startsWith('/nexora');
  const isBlackwall = location.pathname.startsWith('/blackwall');
  const isCloud = location.pathname.startsWith('/cloud');

  const isApps = location.pathname.startsWith('/apps');
  const isBanking = location.pathname.startsWith('/pay');

  if (isNexora) {
    return (
      <div className="lg:w-1/3">
        <Link to="/nexora" className="flex items-center gap-3 mb-6">
          <span className="text-xl font-bold tracking-tighter text-white font-brand">NEXORA</span>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">
          The next frontier of browsing. A system designed for privacy, speed, and deep integration with the Anoneurx ecosystem.
        </p>
        <SocialRow />
      </div>
    );
  }

  if (isCloud) {
    return (
      <div className="lg:w-1/3">
        <Link to="/cloud" className="flex items-center gap-3 mb-6">
          <span className="text-xl font-bold tracking-tighter text-white font-brand">CLOUD</span>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">
          High-performance infrastructure for world-scale applications. Scalable, secure, and developer-first.
        </p>
        <SocialRow />
      </div>
    );
  }

  if (isBlackwall) {
    return (
      <div className="lg:w-1/3">
        <Link to="/blackwall" className="flex items-center gap-3 mb-6">
          <span className="text-xl font-bold tracking-tighter text-white font-brand">BLACK WALL</span>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">
          Blackwall is a system designed for privacy, speed, and deep integration with the Anoneurx ecosystem.
        </p>
        <SocialRow />
      </div>
    );
  }

  if (isApps) {
    return (
      <div className="lg:w-1/3">
        <Link to="/apps" className="flex items-center gap-3 mb-6">
          <span className="text-xl font-bold tracking-tighter text-white font-brand">ANONEURX STORE</span>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">
          Discover a premium marketplace for apps, themes, and extensions built for the Anoneurx ecosystem.
        </p>
        <SocialRow />
      </div>
    );
  }
  if (isBanking) {
    return (
      <div className="lg:w-1/3">
        <Link to="/pay" className="flex items-center gap-3 mb-6">
          <span className="text-xl font-bold tracking-tighter text-white font-brand">ANONEURX  PAY</span>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">
          A new era of digital banking. Secure, fast, and built for the next generation of builders and creators.
        </p>
        <SocialRow />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-sm">
      <div className="space-y-6">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <span className="text-xl font-bold text-white font-brand tracking-tight">
            ANONEURX
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          ɪɴɴᴏᴠᴀᴛɪᴠᴇ sᴏғᴛᴡᴀʀᴇ ᴅᴇsɪɢɴᴇᴅ ᴛᴏ ᴇᴍᴘᴏᴡᴇʀ ᴅᴇᴠᴇʟᴏᴘᴇʀs.
        </p>
        <SocialRow />
      </div>
    </div>
  );
};
