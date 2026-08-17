import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortalSection } from "./ui";
import type { LucideIcon } from "lucide-react";

export interface ProgramNavItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface ProgramNavigationProps {
  tabs: ProgramNavItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const ProgramNavigation = ({ tabs, activeTab, onTabChange }: ProgramNavigationProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <PortalSection>
        <TabsList className="w-full lg:w-auto flex-wrap lg:flex-nowrap h-auto lg:h-10 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-1 rounded-xl overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white/15 data-[state=active]:to-white/5 data-[state=active]:text-white data-[state=active]:shadow text-slate-400 gap-1.5"
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span className="whitespace-nowrap">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </PortalSection>
    </Tabs>
  );
};
