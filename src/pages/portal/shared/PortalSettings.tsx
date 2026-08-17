import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  UserRound,
  Palette,
  ShieldCheck,
  Moon,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { PageHeader, PortalPage, PortalSection } from "../components/ui";

const SettingRow = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <div className="flex items-start gap-3 min-w-0">
      <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-slate-300" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const ThemeOption = ({
  active,
  label,
  children,
  onClick,
}: {
  active: boolean;
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
      active
        ? "bg-blue-600/20 text-blue-200 border-blue-500/40"
        : "bg-white/[0.03] text-slate-400 border-white/10 hover:text-white hover:bg-white/5"
    )}
  >
    {children}
    {label}
  </button>
);

export const PortalSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [theme, setTheme] = useState<"dark" | "system">("dark");

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage your account preferences, notifications, appearance and security."
        icon={Settings}
        gradient="from-blue-500 to-purple-500"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-400" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-white/5">
              <SettingRow icon={Bell} title="Email notifications" description="Receive program updates by email">
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </SettingRow>
              <SettingRow icon={Bell} title="Push notifications" description="Real-time alerts for tasks and deadlines">
                <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
              </SettingRow>
              <SettingRow icon={Bell} title="Weekly digest" description="A summary of your week across all programs">
                <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
              </SettingRow>
            </CardContent>
          </Card>
        </PortalSection>

        {/* Appearance */}
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Palette className="h-4 w-4 text-purple-400" /> Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex flex-wrap gap-2">
                <ThemeOption active={theme === "dark"} label="Dark" onClick={() => setTheme("dark")}>
                  <Moon className="h-3.5 w-3.5" />
                </ThemeOption>
                <ThemeOption active={theme === "system"} label="System" onClick={() => setTheme("system")}>
                  <Monitor className="h-3.5 w-3.5" />
                </ThemeOption>
              </div>
              <p className="text-xs text-slate-500">
                The portal ships with the Anoneurx dark theme. System follows your device preference.
              </p>
            </CardContent>
          </Card>
        </PortalSection>

        {/* Profile */}
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <UserRound className="h-4 w-4 text-emerald-400" /> Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Display name</label>
                <Input defaultValue="Muhammad Qasim" className="bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Email</label>
                <Input type="email" defaultValue="intern@anoneurx.com" className="bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium">Save changes</Button>
            </CardContent>
          </Card>
        </PortalSection>

        {/* Security */}
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" /> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-white/5">
              <SettingRow icon={ShieldCheck} title="Two-factor authentication" description="Protect your account with a second step">
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </SettingRow>
              <SettingRow icon={ShieldCheck} title="Active sessions" description="Review and revoke logged-in devices">
                <Button variant="outline" size="sm" className="border-white/15 text-slate-200 hover:bg-white/10">
                  Manage
                </Button>
              </SettingRow>
            </CardContent>
          </Card>
        </PortalSection>
      </div>

      <PortalSection>
        <p className="text-xs text-slate-600 flex items-center gap-1.5">
          <motion.span className="inline-block h-2 w-2 rounded-full bg-emerald-500/60 animate-pulse" />
          Preferences are saved locally to this browser.
        </p>
      </PortalSection>
    </PortalPage>
  );
};

export default PortalSettings;
