import { Lock, RefreshCw, ShieldCheck, Clock } from "lucide-react";
import ConnectSection from "../ConnectSection";
import { securityApi, type TlsStatus } from "../api";
import { useAsyncData } from "../useConnectData";
import { SecAutoRefresh, SecBadge, SecLiveStatus, SecLoading, SecOffline, SecPanel, SecStat, fmtTs, useAutoRefresh, usePageTitle, useRefreshShortcut } from "./securityUI";

const SecurityTls = () => {
  usePageTitle("TLS Certificate");
  const { data, mode, loading, error, refresh } = useAsyncData<TlsStatus>(
    () => securityApi.tls(),
    []
  );
  const autorefresh = useAutoRefresh(refresh);
  useRefreshShortcut(refresh);

  const valid = data?.valid;

  return (
    <ConnectSection
      title="TLS Certificate"
      subtitle="Certificate presence, validity and fingerprint for this host."
      icon={Lock}
      actions={
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      }
    >
      {loading && <SecLoading label="Inspecting certificate…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat
              value={data.present ? "Present" : "Not found"}
              label="Certificate"
              tone={data.present ? "ok" : "warn"}
            />
            <SecStat
              value={data.present ? (valid ? "Valid" : "Expired") : "—"}
              label="Validity"
              tone={data.present ? (valid ? "ok" : "danger") : "neutral"}
            />
            <SecStat
              value={data.days_remaining !== undefined ? `${data.days_remaining}d` : "—"}
              label="Days remaining"
              tone={data.days_remaining !== undefined && data.days_remaining < 30 ? "warn" : "ok"}
            />
            <SecStat value={data.path || "—"} label="Certificate path" />
          </div>

          <SecPanel title="Certificate Details">
            <dl className="divide-y divide-slate-200/50 dark:divide-white/5 text-sm">
              {[
                ["Summary", data.summary],
                ["Subject", data.subject ?? null],
                ["Issuer", data.issuer ?? null],
                ["Valid from", data.not_before ? fmtTs(data.not_before) : null],
                ["Valid until", data.not_after ? fmtTs(data.not_after) : null],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 px-5 py-3">
                  <dt className="shrink-0 text-slate-500 dark:text-slate-400">{label}</dt>
                  <dd className="text-right text-slate-900 dark:text-slate-200 break-all">{value ?? "—"}</dd>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 px-5 py-3">
                <dt className="shrink-0 text-slate-500 dark:text-slate-400">SHA-256 Fingerprint</dt>
                <dd className="font-mono text-[11px] text-cyan-600 dark:text-cyan-300 break-all">
                  {data.fingerprint_sha256 ?? "—"}
                </dd>
              </div>
            </dl>
          </SecPanel>

          {data.present && valid === false && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 dark:bg-red-500/[0.06] px-4 py-3 text-xs text-red-700 dark:text-red-200">
              <Clock className="w-4 h-4 shrink-0" />
              <p>The certificate is expired or not valid yet. Renew it to keep encrypted service delivery healthy.</p>
            </div>
          )}
          {data.present && valid === undefined && (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <p>Certificate present — validity metadata unavailable in this response.</p>
            </div>
          )}
        </div>
      )}
    </ConnectSection>
  );
};

export default SecurityTls;