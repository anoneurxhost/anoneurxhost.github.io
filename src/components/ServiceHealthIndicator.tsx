import React, { useEffect, useState } from 'react';
import { apiResilienceClient, ServiceHealth, ServiceDomain, MICROSERVICES } from '@/services';
import { ShieldCheck, Server, Globe, Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const ServiceHealthIndicator: React.FC = () => {
  const [healthState, setHealthState] = useState<Record<ServiceDomain, ServiceHealth>>(() =>
    apiResilienceClient.getHealthState()
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = apiResilienceClient.subscribeHealth((newHealth) => {
      setHealthState(newHealth);
    });
    return unsubscribe;
  }, []);

  const domainIcons: Record<ServiceDomain, React.ReactNode> = {
    auth: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
    opensource: <Globe className="w-3.5 h-3.5 text-purple-400" />,
    core: <Server className="w-3.5 h-3.5 text-emerald-400" />,
    connect: <Cpu className="w-3.5 h-3.5 text-amber-400" />,
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl p-4 shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Anoneurx API Network
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white text-xs px-2 py-0.5 rounded bg-white/5"
            >
              Close
            </button>
          </div>

          <div className="space-y-2.5">
            {(Object.keys(MICROSERVICES) as ServiceDomain[]).map((domainKey) => {
              const info = MICROSERVICES[domainKey];
              const status = healthState[domainKey];
              const isFallback = status?.status === 'fallback';

              return (
                <div
                  key={domainKey}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    {domainIcons[domainKey]}
                    <div>
                      <p className="text-xs font-medium text-white">{info.domain}</p>
                      <p className="text-[10px] text-white/40">{info.name}</p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="outline"
                          className={`text-[9px] px-2 py-0.5 flex items-center gap-1 ${
                            isFallback
                              ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                              : 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                          }`}
                        >
                          {isFallback ? (
                            <>
                              <AlertTriangle className="w-2.5 h-2.5" /> Mock Mode
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-2.5 h-2.5" /> Online
                            </>
                          )}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-[10px]">
                          {isFallback
                            ? `${info.domain} offline. Graceful Mock Data Fallback active.`
                            : `${info.domain} is active and online.`}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-white/30 mt-3 text-center">
            Domain: <span className="text-white/60">anoneurx.com</span> · Resilient Multi-Backend Architecture
          </p>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[11px] text-white/70 hover:text-white hover:border-white/20 transition-all shadow-lg group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase text-white/50 group-hover:text-white/80">API System</span>
        </button>
      )}
    </div>
  );
};
