import {
  Globe, Shield, Cloud, Lock, Sparkles, ListChecks, Wand2, Terminal,
  Briefcase, GraduationCap, Gamepad2, Brain, Wrench, Code2, type LucideIcon,
  MessageSquare, Camera, Play, Music, Layout, ShoppingBag, Joystick
} from "lucide-react";

export interface AppItem {
  id: string;
  name: string;
  developer: string;
  verified?: boolean;
  rating: number;
  reviews: number;
  price: "Free" | string;
  category: string;
  icon: LucideIcon;
  color: string;
  trending?: boolean;
  newRelease?: boolean;
  desc: string;
}

export const apps: AppItem[] = [
  // Existing
  { id: "nexora-browser", name: "Nexora Browser", developer: "Anoneurx Labs", verified: true, rating: 4.9, reviews: 12840, price: "Free", category: "Productivity", icon: Globe, color: "from-blue-500 to-cyan-400", trending: true, desc: "Fast, private browser with built-in AI." },
  { id: "blackwall-tools", name: "Black Wall OS Tools", developer: "Anoneurx Systems", verified: true, rating: 4.8, reviews: 8210, price: "Free", category: "Security", icon: Shield, color: "from-slate-700 to-slate-900", desc: "Power utilities for Black Wall users." },
  { id: "cloud-sync", name: "Cloud Sync", developer: "Anoneurx Cloud", verified: true, rating: 4.7, reviews: 5320, price: "Free", category: "Utilities", icon: Cloud, color: "from-sky-500 to-indigo-500", newRelease: true, desc: "Sync files across all your devices instantly." },
  { id: "secure-vault", name: "Secure Vault", developer: "VaultWorks", rating: 4.6, reviews: 2145, price: "$9.99", category: "Security", icon: Lock, color: "from-emerald-500 to-teal-500", desc: "Zero-knowledge password and secret manager." },
  { id: "ai-writer", name: "AI Writer", developer: "Lumen AI", verified: true, rating: 4.8, reviews: 9800, price: "$4.99", category: "AI Tools", icon: Wand2, color: "from-fuchsia-500 to-pink-500", trending: true, desc: "Pro-grade AI writing assistant." },
  { id: "task-flow", name: "Task Flow", developer: "FlowLabs", rating: 4.5, reviews: 1320, price: "Free", category: "Productivity", icon: ListChecks, color: "from-amber-400 to-orange-500", desc: "Beautiful task management for teams." },
  
  // New Trending Apps (Microsoft-like mock)
  { id: "whatsapp", name: "WhatsApp", developer: "Meta", verified: true, rating: 4.2, reviews: 1500000, price: "Free", category: "Social", icon: MessageSquare, color: "from-green-400 to-green-600", trending: true, desc: "Simple. Reliable. Private." },
  { id: "tiktok", name: "TikTok", developer: "ByteDance", rating: 3.4, reviews: 890000, price: "Free", category: "Entertainment", icon: Camera, color: "from-black to-slate-800", trending: true, desc: "Real people. Real videos." },
  { id: "instagram", name: "Instagram", developer: "Meta", verified: true, rating: 4.1, reviews: 1200000, price: "Free", category: "Social", icon: Camera, color: "from-purple-500 to-orange-500", trending: true, desc: "Bringing you closer to the people and things you love." },
  { id: "chatgpt", name: "ChatGPT", developer: "OpenAI", verified: true, rating: 4.6, reviews: 500000, price: "Free", category: "Productivity", icon: Brain, color: "from-teal-500 to-emerald-600", trending: true, desc: "Your daily AI assistant." },
  
  // New Trending Games
  { id: "roblox", name: "Roblox", developer: "Roblox Corporation", rating: 4.5, reviews: 2000000, price: "Free", category: "Action & adventure", icon: Joystick, color: "from-red-500 to-red-700", trending: true, desc: "The ultimate virtual universe." },
  { id: "asphalt-8", name: "Asphalt 8: Airborne", developer: "Gameloft", rating: 4.7, reviews: 300000, price: "Free", category: "Racing & flying", icon: Play, color: "from-blue-600 to-blue-800", trending: true, desc: "High-speed arcade racing." },
  { id: "minecraft", name: "Minecraft Launcher", developer: "Mojang", rating: 4.4, reviews: 1000000, price: "Free", category: "Action & adventure", icon: Layout, color: "from-green-600 to-green-800", trending: true, desc: "Explore infinite worlds." },
  { id: "asphalt-9", name: "Asphalt Legends", developer: "Gameloft", rating: 4.5, reviews: 150000, price: "Free", category: "Racing & flying", icon: Play, color: "from-purple-600 to-indigo-800", trending: true, desc: "The next-gen arcade racing." }
];

export const categories: { name: string; icon: LucideIcon; color: string }[] = [
  { name: "Productivity", icon: Briefcase, color: "from-blue-500 to-cyan-400" },
  { name: "Security", icon: Shield, color: "from-emerald-500 to-teal-500" },
  { name: "Gaming", icon: Gamepad2, color: "from-pink-500 to-rose-500" },
  { name: "Education", icon: GraduationCap, color: "from-amber-400 to-orange-500" },
  { name: "AI Tools", icon: Brain, color: "from-fuchsia-500 to-purple-500" },
  { name: "Social", icon: MessageSquare, color: "from-sky-400 to-blue-500" },
  { name: "Entertainment", icon: Play, color: "from-red-500 to-pink-500" },
  { name: "Developer Tools", icon: Code2, color: "from-green-500 to-emerald-600" },
];
