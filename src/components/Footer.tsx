import { Link, useLocation } from "react-router-dom";
import { BrandSection } from "@/components/BrandSection";

const Footer = () => {
  const location = useLocation();
  const isNexora = location.pathname.startsWith('/nexora');
  const isBlackwall = location.pathname.startsWith('/blackwall');
  const isCloud = location.pathname.startsWith('/cloud');
  const isApps = location.pathname.startsWith('/apps');
  const isBanking = location.pathname.startsWith('/pay');
  const isOpensource = location.pathname.startsWith('/opensource');

  const cloudLinks = [
    {
      title: "Compute",
      links: [
        { name: "Virtual Machines", path: "/cloud/compute/virtual-machines" },
        { name: "GPU Servers", path: "/cloud/compute/gpu-servers" },
        { name: "Bare Metal", path: "/cloud/compute/bare-metal" },
        { name: "Kubernetes", path: "/cloud/compute/kubernetes" },
      ]
    },
    {
      title: "Storage",
      links: [
        { name: "Object Storage", path: "/cloud/storage/object" },
        { name: "Block Storage", path: "/cloud/storage/block" },
        { name: "Backup Vault", path: "/cloud/storage/backup" },
      ]
    },
    {
      title: "Network",
      links: [
        { name: "Global CDN", path: "/cloud/products" },
        { name: "Anycast DNS", path: "/cloud/products" },
        { name: "Cloud Firewall", path: "/cloud/products" },
        { name: "VPC / Private", path: "/cloud/products" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Collaboration", path: "/collaboration" },
        { name: "Pricing", path: "/cloud/pricing" },
        { name: "Status Page", path: "/cloud/status" },
        { name: "Security", path: "/cloud/security" },
      ]
    }
  ];

  const nexoraLinks = [
    {
      title: "Browser",
      links: [
        { name: "Download", path: "/nexora/download" },
        { name: "Features", path: "/nexora/features" },
        { name: "Screenshots", path: "/nexora/screenshots" },
      ]
    },
    {
      title: "System",
      links: [
        { name: "Security", path: "/nexora/features" },
        { name: "Speed", path: "/nexora/features" },
        { name: "Privacy", path: "/nexora/features" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Documentation", path: "/nexora/docs" },
        { name: "FAQ", path: "/nexora/faq" },
        { name: "Bug Report", path: "/reportbug/nexora" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
        { name: "Cookies", path: "/cookies" },
        { name: "Support", path: "/support" },
      ]
    }
  ];

  const blackwallLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Download", path: "/blackwall/download" },
        { name: "Features", path: "/blackwall/features" },
        { name: "Screenshots", path: "/blackwall/screenshots" },
      ]
    },
    {
      title: "System",
      links: [
        { name: "Architecture", path: "/blackwall/architecture" },
        { name: "Security", path: "/blackwall/security" },
        { name: "Performance", path: "/blackwall/performance" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", path: "/docs/blackwall" },
        { name: "FAQ", path: "/blackwall/faq" },
        { name: "Bug Report", path: "/reportbug/blackwall" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/blackwall/about" },
        { name: "Anoneurx", path: "/" },
        { name: "Contact", path: "/contact" },
      ]
    }
  ];

  const appsLinks = [
    {
      title: "Marketplace",
      links: [
        { name: "Home", path: "/apps" },
        { name: "Browse", path: "/apps/browse" },
        { name: "Categories", path: "/apps/categories" },
        { name: "Top Charts", path: "/apps/browse" },
      ]
    },
    {
      title: "Developers",
      links: [
        { name: "Become a Developer", path: "/apps/developers" },
        { name: "Submit App", path: "/apps/submit" },
        { name: "Dashboard", path: "/apps/dashboard" },
        { name: "Docs", path: "/docs" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact", path: "/contact" },
        { name: "Help Center", path: "/apps" },
        { name: "Report Bug", path: "/reportbug" },
        { name: "Status Page", path: "/cloud/status" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
        { name: "Cookies", path: "/cookies" },
        { name: "Support", path: "/support" },
      ]
    }
  ];
  
  const bankingLinks = [
    {
      title: "Services",
      links: [
        { name: "Personal Account", path: "/pay" },
        { name: "Features", path: "/pay/features" },
        { name: "Security", path: "/pay/security" },
        { name: "Virtual Cards", path: "/pay/features" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/pay/faq" },
        { name: "Documentation", path: "/pay/faq" },
        { name: "FAQ", path: "/pay/faq" },
        { name: "Contact Support", path: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Card Terms", path: "/terms" },
        { name: "Fee Schedule", path: "/pay/faq" },
      ]
    }
  ];

  const opensourceLinks = [
    {
      title: "Ecosystem",
      links: [
        { name: "Projects", path: "/opensource/projects" },
        { name: "Organizations", path: "/opensource/organizations" },
        { name: "Libraries", path: "/opensource/libraries" },
        { name: "Packages", path: "/opensource/packages" },
      ]
    },
    {
      title: "Tools & Showcase",
      links: [
        { name: "Templates", path: "/opensource/templates" },
        { name: "VS Code Extensions", path: "/opensource/vscode-extensions" },
        { name: "Showcase", path: "/opensource/showcase" },
        { name: "Blog", path: "/blogs" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Events", path: "/community/events" },
        { name: "Community Hub", path: "/community" },
        { name: "Sponsors", path: "/sponsors" },
        { name: "Contributors", path: "/contributors" },
      ]
    }
  ];

  const globalLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Career Hub", path: "/careers" },
        { name: "Interns", path: "/intern" },
        { name: "Collaboration", path: "/collaboration" },
        // { name: "Verify Credentials", path: "/verify" },
      ]
    },
    {
      title: "Technologies",
      links: [
        // { name: "Robotics", path: "/robotics-systems" },
        { name: "Blockchain", path: "/blockchain-systems" },
        { name: "Operating Systems", path: "/operating-systems" },
        { name: "Artificial Intelligence", path: "/artificial-intelligence" },
      ]
    },
    {
      title: "Education",
      links: [
        { name: "University", path: "/university" },
        { name: "Research", path: "/research" },
        { name: "Professors", path: "/faculty" },
        // { name: "Courses", path: "/courses" },
      ]
    },
    {
      title: "Company",
      links: [
        // { name: "About Us", path: "/about" },
        { name: "People", path: "/people" },
        { name: "Our Blogs", path: "/blogs" },
        { name: "Open Source", path: "/opensource" },
      ]
    }
  ];


  const activeLinks = isNexora
    ? nexoraLinks
    : isBlackwall
    ? blackwallLinks
    : isCloud
    ? cloudLinks
    : isApps
    ? appsLinks
    : isBanking
    ? bankingLinks
    : isOpensource
    ? opensourceLinks
    : globalLinks;

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-black/40 backdrop-blur-md pt-16 pb-8">
      <div className="container-responsive">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-12">
          <BrandSection />

          {/* Links Grid */}
          <div className="flex-2 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 lg:gap-x-12">
            {activeLinks.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-sm font-semibold text-white tracking-widest uppercase">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        to={link.path} 
                        className="text-gray-400 text-sm hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-0 overflow-hidden transition-all duration-300 mr-0">›</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs tracking-wide">
            <span className="font-brand">A N O N E U R X</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-gray-500 text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-xs hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-500 text-xs hover:text-white transition-colors">Cookies</Link>
            <Link to="/support" className="text-gray-500 text-xs hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
