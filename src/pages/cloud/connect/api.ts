/**
 * Cloud Connect API client.
 *
 * Talks to the standalone Rust console backend (see /server) when
 * VITE_CONNECT_API_URL is configured. When it is not configured — or the
 * backend is unreachable — every call transparently falls back to realistic
 * demo data so the console remains fully navigable.
 */

// Derive the API origin from the page host so the console also works from a
// phone / any LAN device (http://<laptop-ip>:5173 -> http://<laptop-ip>:8081).
// VITE_CONNECT_API_URL may still force a specific backend (e.g. a public one).
const envBase = (import.meta.env.VITE_CONNECT_API_URL as string | undefined)?.replace(/\/$/, "");
const BASE =
  envBase ||
  `${window.location.protocol}//${window.location.hostname}:8081`;

/** Resolved console backend origin (http://<host>:8081). */
export const getApiBase = () => BASE;

/** WebSocket base URL matching {@link getApiBase}, e.g. ws://<host>:8081. */
export const getStreamBase = () => {
  const proto = window.location.protocol === "https:" ? "wss" : "ws";
  return `${proto}://${new URL(BASE).host}`;
};

export const isLiveBackend = () => Boolean(BASE);

let sessionToken: string | null = null;
export const setSessionToken = (t: string | null) => {
  sessionToken = t;
};
export const getSessionToken = () => sessionToken;

export type ConnectMode = "live" | "demo" | "offline";
export interface Result<T> {
  data: T;
  mode: ConnectMode;
}

/**
 * Result variant used by the Security Center. Unlike the demo-fallback used
 * elsewhere, security endpoints NEVER fabricate data: when the backend is
 * unreachable `mode` is `"offline"` and `data` holds a neutral blank. When the
 * backend responded with an error, `error` carries its message (verification
 * failures, forbidden, …) so the UI can surface it instead of an offline banner.
 */
export interface SecResult<T> extends Result<T> {
  error?: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function call<T>(
  path: string,
  init: RequestInit,
  fallback: () => T | Promise<T>
): Promise<Result<T>> {
  if (!BASE) {
    await delay(320);
    return { data: await fallback(), mode: "demo" };
  }
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        ...(init.headers ?? {}),
      },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`[${res.status}] ${body || res.statusText}`);
    }
    return { data: (await res.json()) as T, mode: "live" };
  } catch (err) {
    console.warn(`Cloud Connect: ${path} unavailable, using demo data.`, err);
    await delay(200);
    return { data: await fallback(), mode: "demo" };
  }
}

const get = <T,>(path: string, fallback: () => T | Promise<T>) =>
  call<T>(path, { method: "GET" }, fallback);
const post = <T,>(path: string, body: unknown, fallback: () => T | Promise<T>) =>
  call<T>(path, { method: "POST", body: JSON.stringify(body) }, fallback);
const del = <T,>(path: string, fallback: () => T | Promise<T>) =>
  call<T>(path, { method: "DELETE" }, fallback);

/** Strict request for the Security Center: parse `{ error }` from the API
 * envelope on non-2xx so business errors (bad TOTP/recovery code, forbidden,
 * upstream agent message) surface — and never substitute demo data. */
async function secRequest<T>(path: string, init: RequestInit, fallback: T): Promise<SecResult<T>> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        ...(init.headers ?? {}),
      },
    });
    if (!res.ok) {
      let message = `request failed (HTTP ${res.status})`;
      try {
        const env: { error?: string | null } = await res.json();
        if (env && typeof env.error === "string" && env.error.trim()) message = env.error;
      } catch {
        /* non-JSON error body — keep status message */
      }
      console.warn(`Cloud Connect: ${path} -> ${res.status}.`, message);
      return { data: fallback, mode: "offline", error: message };
    }
    return { data: (await res.json()) as T, mode: "live" };
  } catch (err) {
    console.warn(`Cloud Connect: ${path} unreachable.`, err);
    return { data: fallback, mode: "offline" };
  }
}

const secGet = <T,>(path: string, fallback: T): Promise<SecResult<T>> =>
  secRequest<T>(path, { method: "GET" }, fallback);
const secPost = <T,>(path: string, body: unknown, fallback: T): Promise<SecResult<T>> =>
  secRequest<T>(path, { method: "POST", body: JSON.stringify(body) }, fallback);

/**
 * Strict session mint used by the auth screen. Unlike `connectApi.createSession`
 * it never falls back to demo data — the caller needs the real outcome (200 with
 * a JWT, or an HTTP status) to decide whether to open the live console.
 */
export interface SessionPayload {
  host: string;
  port: number;
  username: string;
  password: string;
}

export async function createSessionStrict(
  payload: SessionPayload
): Promise<{ ok: boolean; status: number; body: SessionInfo | { error?: string } | null }> {
  if (!BASE) return { ok: false, status: 0, body: null };
  try {
    const res = await fetch(`${BASE}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await res.json().catch(() => null)) as SessionInfo | { error?: string } | null;
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.warn("Cloud Connect: /api/sessions unreachable.", err);
    return { ok: false, status: 0, body: null };
  }
}

/* ------------------------------------------------------------------ types */

export interface DiscoveredHost {
  ip: string;
  hostname: string | null;
  mac: string | null;
  openPorts: number[];
  os: string | null;
  latencyMs: number;
  status: "online" | "filtered";
}

export interface SessionInfo {
  token: string;
  host: string;
  username: string;
  port: number;
  hostname: string;
}

export interface Metric {
  key: string;
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "emerald" | "amber" | "red";
  progress?: number;
}

export interface ActivityItem {
  time: string;
  text: string;
}

export interface NetworkInfo {
  publicIp: string;
  asn: string;
  throughput: string;
  updown: string;
  health: string;
  healthNote: string;
  interfaces: { name: string; ip: string; speed: string; status: string; rx: string; tx: string }[];
  routes: { destination: string; gateway: string; iface: string; metric: number }[];
}

export interface Volume {
  id: string;
  name: string;
  mount: string;
  size: string;
  used: number;
  fs: string;
  mounted: boolean;
}

export interface SystemUser {
  id: string;
  name: string;
  role: string;
  shell: string;
  last: string;
  sudo: boolean;
}

export interface FirewallRule {
  id: string;
  name: string;
  port: number;
  proto: "tcp" | "udp" | "icmp";
  source: string;
  action: "allow" | "deny";
}

export interface SshKey {
  id: string;
  name: string;
  type: string;
  fingerprint: string;
  publicKey: string;
  createdAt: string;
  lastUsed: string | null;
}

export type WebhookEvent =
  | "server.up"
  | "server.down"
  | "cpu.high"
  | "disk.threshold"
  | "auth.failed"
  | "backup.completed";

export const WEBHOOK_EVENTS: { id: WebhookEvent; label: string; description: string }[] = [
  { id: "server.up", label: "Server online", description: "Node came back online" },
  { id: "server.down", label: "Server offline", description: "Node stopped responding" },
  { id: "cpu.high", label: "High CPU", description: "CPU above threshold for 5 minutes" },
  { id: "disk.threshold", label: "Disk threshold", description: "Volume usage above 85%" },
  { id: "auth.failed", label: "Auth failure", description: "Failed SSH or console login" },
  { id: "backup.completed", label: "Backup complete", description: "Snapshot finished" },
];

export interface Webhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  secret: string;
  enabled: boolean;
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: WebhookEvent;
  status: number;
  durationMs: number;
  at: string;
  error?: string;
}

export interface ConsoleSettings {
  autoUpdate: boolean;
  notify: boolean;
  telemetry: boolean;
  sshPasswordAuth: boolean;
  timezone: string;
  hostname: string;
}

/* -------------------------------------------------- Security Center types */

export type SecStatus = "ok" | "warn" | "warning" | "critical";

export interface SecCheck {
  key: string;
  label: string;
  status: SecStatus;
  detail: string;
}

export interface SecPort {
  port: number;
  proto: string;
  address: string;
  exposed: boolean;
  process: string | null;
}

export interface SshView {
  port: number;
  password_authentication: boolean;
  permit_root_login: string;
  pubkey_authentication: boolean;
  max_auth_tries: string;
  permit_empty_passwords: string;
  x11_forwarding: string;
  allow_tcp_forwarding: string;
  kbd_interactive_authentication: string;
  login_grace_time: string;
  protocol: string;
  files: string[];
}

export interface SecBfSource {
  ip: string;
  attempts: number;
  blocked: boolean;
  exceeds_threshold: boolean;
}

export interface SecBlockedEntry {
  ip: string;
  reason: string;
  escalated: boolean;
}

export interface BruteForceView {
  window_hours: number;
  threshold: number;
  total_attempts: number;
  distinct_ips: number;
  failures_24h: number;
  blocked_ips: number;
  sources: SecBfSource[];
  blocked: SecBlockedEntry[];
}

export interface BlockEntry {
  id: string;
  cidr: string;
  reason: string;
  created_at: number;
}

export interface PortsView {
  exposed: number;
  total: number;
  listeners: (SecPort & { process?: string | null })[];
}

export interface ScanFinding {
  severity: "low" | "medium" | "high" | "critical";
  check: string;
  detail: string;
  remediation: string;
}

export interface ScanResult {
  checked_at: string;
  findings: ScanFinding[];
  summary: { critical: number; high: number; medium: number; low: number };
  verdict: "pass" | "warn" | "fail";
}

export interface IntegrityStatus {
  baseline_exists: boolean;
  baseline_created?: number;
  tracked: number;
  changed: string[];
  added?: string[];
  removed?: string[];
  intact?: boolean;
  files?: string[];
}

export interface IntegrityInitResult {
  created_at: number;
  tracked: number;
  files: string[];
}

export interface SecEvent {
  time: string | number;
  severity: string;
  kind: string;
  text: string;
}

export interface EventsFeed {
  events: SecEvent[];
  total: number;
}

export interface SecretMeta {
  id: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface SecretsView {
  encrypted: boolean;
  version: number;
  secrets: SecretMeta[];
  count: number;
}

export interface SecretGetResult {
  name: string;
  value: string;
  id: string;
}

export interface TlsStatus {
  present: boolean;
  valid?: boolean;
  days_remaining?: number;
  not_before?: number;
  not_after?: number;
  subject?: string | null;
  issuer?: string | null;
  fingerprint_sha256?: string | null;
  path?: string;
  summary: string;
}

export interface BackupFile {
  name: string;
  size_bytes: number;
  created_at: number | null;
  verified: boolean;
}

export interface BackupStatus {
  count: number;
  latest: number | null;
  files: BackupFile[];
  encrypted: boolean;
  protected: boolean;
}

export interface BackupActionResult {
  ok: boolean;
  name?: string;
  size_bytes?: number;
  files?: number;
  restored?: number;
}

export interface UpdateStatus {
  pending: string[];
  count: number;
  checked_at: string;
  agent_fingerprint_sha256: string;
  signed_updates_configured: boolean;
}

export interface RecoveryStatus {
  set: boolean;
  generated_at?: number;
  remaining: number;
}

export interface TotpStatus {
  enabled: boolean;
  configured: boolean;
  created_at?: number;
  last_verified_at?: number | null;
}

export interface TotpSetup {
  ok: boolean;
  secret: string;
  uri: string;
  qr_svg: string;
  steps: number;
  algorithm: string;
  enabled: boolean;
}

export interface SecurityStatus {
  score: number;
  level: string;
  checks: SecCheck[];
  firewall: { enabled: boolean; rules: number };
  ssh: { password_authentication: boolean; permit_root_login: string | null; port?: number | null };
  bruteforce: { blocked_ips: number; sources: SecBfSource[]; failures_24h: number };
  open_ports: SecPort[];
  integrity: { baseline_exists: boolean; tracked: number };
  tls: TlsStatus;
  totp: TotpStatus;
  recovery: RecoveryStatus;
  secrets: { stored: number };
  updates: { pending: number; checked_at: string | null };
  backups: BackupStatus;
  events_24h: number;
}

export interface OkResult {
  ok: boolean;
}

/* Neutral blanks for offline mode — never presented as live data. */
const secBlank = {
  posture: (): SecurityStatus => ({
    score: 0,
    level: "",
    checks: [],
    firewall: { enabled: false, rules: 0 },
    ssh: { password_authentication: false, permit_root_login: null, port: null },
    bruteforce: { blocked_ips: 0, sources: [], failures_24h: 0 },
    open_ports: [],
    integrity: { baseline_exists: false, tracked: 0 },
    tls: { present: false, summary: "" },
    totp: { enabled: false, configured: false },
    recovery: { set: false, remaining: 0 },
    secrets: { stored: 0 },
    updates: { pending: 0, checked_at: null },
    backups: { count: 0, latest: null, files: [], encrypted: false, protected: true },
    events_24h: 0,
  }),
  ssh: (): SshView => ({
    port: 22,
    password_authentication: false,
    permit_root_login: "",
    pubkey_authentication: false,
    max_auth_tries: "",
    permit_empty_passwords: "",
    x11_forwarding: "",
    allow_tcp_forwarding: "",
    kbd_interactive_authentication: "",
    login_grace_time: "",
    protocol: "",
    files: [],
  }),
  bruteforce: (): BruteForceView => ({
    window_hours: 24,
    threshold: 5,
    total_attempts: 0,
    distinct_ips: 0,
    failures_24h: 0,
    blocked_ips: 0,
    sources: [],
    blocked: [],
  }),
  ports: (): PortsView => ({ exposed: 0, total: 0, listeners: [] }),
  scan: (): ScanResult => ({
    checked_at: "",
    findings: [],
    summary: { critical: 0, high: 0, medium: 0, low: 0 },
    verdict: "pass",
  }),
  integrity: (): IntegrityStatus => ({ baseline_exists: false, tracked: 0, changed: [] }),
  events: (): EventsFeed => ({ events: [], total: 0 }),
  secrets: (): SecretsView => ({ encrypted: true, version: 1, secrets: [], count: 0 }),
  tls: (): TlsStatus => ({ present: false, summary: "" }),
  backups: (): BackupStatus => ({ count: 0, latest: null, files: [], encrypted: false, protected: true }),
  updates: (): UpdateStatus => ({
    pending: [],
    count: 0,
    checked_at: "",
    agent_fingerprint_sha256: "",
    signed_updates_configured: false,
  }),
  recovery: (): RecoveryStatus => ({ set: false, remaining: 0 }),
  totp: (): TotpStatus => ({ enabled: false, configured: false }),
  totpSetup: (): TotpSetup => ({
    ok: false,
    secret: "",
    uri: "",
    qr_svg: "",
    steps: 30,
    algorithm: "SHA256",
    enabled: false,
  }),
};

/* ------------------------------------------------------------- demo state */

const rid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

const demo = {
  keys: [
    {
      id: rid(),
      name: "ops-laptop",
      type: "ed25519",
      fingerprint: "SHA256:9pTd2K/uT1mWq0bZ4x8yLQeRs7VhN3cJ1oFgP2aXkYo",
      publicKey: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIF9k...ops@laptop",
      createdAt: "2025-11-02T10:12:00Z",
      lastUsed: "2026-07-27T08:41:00Z",
    },
    {
      id: rid(),
      name: "ci-runner",
      type: "rsa-4096",
      fingerprint: "SHA256:Lm4Xq8vBn2tRc6aZ0sHdKj7Yw1PeU9fGi3Ob5NxQtVs",
      publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQ...ci@runner",
      createdAt: "2025-08-19T15:30:00Z",
      lastUsed: null,
    },
  ] as SshKey[],
  hooks: [
    {
      id: rid(),
      url: "https://hooks.blackwall.net/ops/alerts",
      events: ["server.down", "cpu.high", "auth.failed"] as WebhookEvent[],
      secret: "whsec_3f9c2ad18b7e4c05",
      enabled: true,
      createdAt: "2026-02-11T09:00:00Z",
    },
  ] as Webhook[],
  deliveries: [
    { id: rid(), webhookId: "", event: "cpu.high" as WebhookEvent, status: 200, durationMs: 142, at: "2026-07-28T06:12:00Z" },
    { id: rid(), webhookId: "", event: "auth.failed" as WebhookEvent, status: 200, durationMs: 96, at: "2026-07-27T22:04:00Z" },
    { id: rid(), webhookId: "", event: "server.down" as WebhookEvent, status: 500, durationMs: 3011, at: "2026-07-26T03:18:00Z", error: "upstream timeout" },
  ] as WebhookDelivery[],
  volumes: [
    { id: rid(), name: "root", mount: "/", size: "480 GB", used: 43, fs: "btrfs", mounted: true },
    { id: rid(), name: "data", mount: "/var/lib/data", size: "2 TB", used: 61, fs: "xfs", mounted: true },
    { id: rid(), name: "backups", mount: "/mnt/backups", size: "4 TB", used: 22, fs: "zfs", mounted: true },
    { id: rid(), name: "scratch", mount: "/mnt/scratch", size: "512 GB", used: 8, fs: "ext4", mounted: false },
  ] as Volume[],
  users: [
    { id: rid(), name: "root", role: "superuser", shell: "/bin/bash", last: "now", sudo: true },
    { id: rid(), name: "ops", role: "admin", shell: "/bin/zsh", last: "2m ago", sudo: true },
    { id: rid(), name: "deploy", role: "service", shell: "/bin/sh", last: "18m ago", sudo: false },
    { id: rid(), name: "monitor", role: "readonly", shell: "/sbin/nologin", last: "yesterday", sudo: false },
  ] as SystemUser[],
  rules: [
    { id: rid(), name: "SSH (internal)", port: 22, proto: "tcp", source: "10.0.0.0/8", action: "allow" },
    { id: rid(), name: "HTTP", port: 80, proto: "tcp", source: "0.0.0.0/0", action: "allow" },
    { id: rid(), name: "HTTPS", port: 443, proto: "tcp", source: "0.0.0.0/0", action: "allow" },
    { id: rid(), name: "MySQL", port: 3306, proto: "tcp", source: "10.0.0.0/24", action: "allow" },
    { id: rid(), name: "Telnet blocked", port: 23, proto: "tcp", source: "0.0.0.0/0", action: "deny" },
  ] as FirewallRule[],
  settings: {
    autoUpdate: true,
    notify: true,
    telemetry: false,
    sshPasswordAuth: false,
    timezone: "UTC",
    hostname: "edge-01",
  } as ConsoleSettings,
};
demo.deliveries.forEach((d) => (d.webhookId = demo.hooks[0].id));

/* ------------------------------------------------------------------ CIDR */

export interface CidrInfo {
  network: string;
  prefix: number;
  hosts: number;
  first: string;
  last: string;
}

const ipToInt = (ip: string) =>
  ip.split(".").reduce((acc, o) => (acc << 8) + Number(o), 0) >>> 0;
const intToIp = (n: number) =>
  [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");

export function parseCidr(input: string): CidrInfo | null {
  const m = input.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/);
  if (!m) return null;
  const [, ip, prefixRaw] = m;
  if (ip.split(".").some((o) => Number(o) > 255)) return null;
  const prefix = Number(prefixRaw);
  if (prefix < 8 || prefix > 32) return null;
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = ipToInt(ip) & mask;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = prefix >= 31 ? broadcast - network + 1 : Math.max(broadcast - network - 1, 0);
  return {
    network: intToIp(network),
    prefix,
    hosts: total,
    first: intToIp(prefix >= 31 ? network : network + 1),
    last: intToIp(prefix >= 31 ? broadcast : broadcast - 1),
  };
}

const demoScan = (cidr: CidrInfo): DiscoveredHost[] => {
  const base = ipToInt(cidr.first);
  const count = Math.min(cidr.hosts, 6);
  const profiles = [
    { hostname: "edge-01", os: "Black Wall OS 4.2", ports: [22, 80, 443, 8443] },
    { hostname: "db-primary", os: "Debian 12", ports: [22, 3306] },
    { hostname: "cache-01", os: "Alpine 3.20", ports: [22, 6379] },
    { hostname: "gpu-node-a", os: "Ubuntu 24.04", ports: [22, 8080] },
    { hostname: null, os: null, ports: [22] },
    { hostname: "backup-vault", os: "Black Wall OS 4.1", ports: [22, 873] },
  ];
  return Array.from({ length: count }, (_, i) => {
    const p = profiles[i % profiles.length];
    return {
      ip: intToIp(base + i * 3),
      hostname: p.hostname,
      mac: `9c:2f:${(0x10 + i).toString(16).padStart(2, "0")}:4a:b1:0${i}`,
      openPorts: p.ports,
      os: p.os,
      latencyMs: Math.round(2 + Math.random() * 28),
      status: p.hostname ? ("online" as const) : ("filtered" as const),
    };
  });
};

/* --------------------------------------------------------------- endpoints */

export const connectApi = {
  scan: (cidr: string, ports: number[]) => {
    const parsed = parseCidr(cidr);
    return post<DiscoveredHost[]>("/api/scan", { cidr, ports }, () =>
      parsed ? demoScan(parsed) : []
    );
  },

  createSession: (payload: {
    host: string;
    port: number;
    username: string;
    password?: string;
    keyId?: string;
  }) =>
    post<SessionInfo>("/api/sessions", payload, () => ({
      token: `demo_${rid()}`,
      host: payload.host,
      port: payload.port,
      username: payload.username,
      hostname: payload.host,
    })),

  metrics: () =>
    get<{ metrics: Metric[]; activity: ActivityItem[] }>("/api/system/metrics", () => ({
      metrics: [
        { key: "cpu", label: "CPU Usage", value: "34%", detail: "8 cores · 3.6 GHz avg", tone: "cyan", progress: 34 },
        { key: "mem", label: "Memory", value: "12.4 / 32 GB", detail: "38% used", tone: "cyan", progress: 38 },
        { key: "disk", label: "Storage", value: "412 / 960 GB", detail: "43% used", tone: "amber", progress: 43 },
        { key: "net", label: "Network", value: "84 Mbps", detail: "↑ 22  ↓ 62 Mbps", tone: "cyan" },
        { key: "users", label: "Users", value: "6", detail: "2 SSH · 4 API sessions", tone: "emerald" },
        { key: "svc", label: "Services", value: "48 running", detail: "0 failed", tone: "emerald" },
        { key: "health", label: "System Health", value: "Healthy", detail: "Uptime 24d 6h", tone: "emerald" },
        { key: "load", label: "Load Avg", value: "0.42", detail: "1m · 5m · 15m", tone: "cyan" },
      ],
      activity: [
        { time: "2m ago", text: "systemd: nginx reloaded configuration" },
        { time: "18m ago", text: "auth: user 'ops' signed in via SSH" },
        { time: "1h ago", text: "backup: snapshot 'nightly-24' completed" },
        { time: "3h ago", text: "firewall: rule added — allow 443/tcp" },
        { time: "6h ago", text: "kernel: package updates applied (12)" },
      ],
    })),

  power: (action: "reboot" | "shutdown") =>
    post<{ ok: boolean }>(`/api/system/power`, { action }, () => ({ ok: true })),

  network: () =>
    get<NetworkInfo>("/api/network", () => ({
      publicIp: "203.0.113.42",
      asn: "AS-BLACKWALL · Frankfurt",
      throughput: "84 Mbps",
      updown: "↑ 22 · ↓ 62 Mbps",
      health: "Nominal",
      healthNote: "No packet loss detected",
      interfaces: [
        { name: "eth0", ip: "10.0.0.42", speed: "10 Gbps", status: "up", rx: "1.2 TB", tx: "480 GB" },
        { name: "eth1", ip: "10.0.1.42", speed: "10 Gbps", status: "up", rx: "310 GB", tx: "92 GB" },
        { name: "wg0", ip: "10.99.0.1", speed: "1 Gbps", status: "up", rx: "44 GB", tx: "51 GB" },
        { name: "lo", ip: "127.0.0.1", speed: "—", status: "up", rx: "8 GB", tx: "8 GB" },
      ],
      routes: [
        { destination: "0.0.0.0/0", gateway: "10.0.0.1", iface: "eth0", metric: 100 },
        { destination: "10.0.1.0/24", gateway: "0.0.0.0", iface: "eth1", metric: 100 },
        { destination: "10.99.0.0/16", gateway: "0.0.0.0", iface: "wg0", metric: 50 },
      ],
    })),

  volumes: () => get<Volume[]>("/api/storage", () => demo.volumes),
  setVolumeMounted: (id: string, mounted: boolean) =>
    post<Volume[]>(`/api/storage/${id}/mount`, { mounted }, () => {
      const v = demo.volumes.find((x) => x.id === id);
      if (v) v.mounted = mounted;
      return [...demo.volumes];
    }),

  users: () => get<SystemUser[]>("/api/users", () => demo.users),
  addUser: (u: Omit<SystemUser, "id" | "last">) =>
    post<SystemUser[]>("/api/users", u, () => {
      demo.users = [...demo.users, { ...u, id: rid(), last: "never" }];
      return demo.users;
    }),
  removeUser: (id: string) =>
    del<SystemUser[]>(`/api/users/${id}`, () => {
      demo.users = demo.users.filter((u) => u.id !== id);
      return demo.users;
    }),

  firewall: () => get<FirewallRule[]>("/api/firewall", () => demo.rules),
  addFirewallRule: (r: { name: string; port: number; proto: FirewallRule["proto"]; source: string; action: "allow" | "deny" }) =>
    post<FirewallRule[]>("/api/firewall", r, () => {
      demo.rules = [...demo.rules, { ...r, id: rid() }];
      return demo.rules;
    }),
  removeFirewallRule: (id: string) =>
    del<FirewallRule[]>(`/api/firewall/${id}`, () => {
      demo.rules = demo.rules.filter((r) => r.id !== id);
      return demo.rules;
    }),

  sshKeys: () => get<SshKey[]>("/api/ssh-keys", () => demo.keys),
  addSshKey: (name: string, publicKey: string) =>
    post<SshKey[]>("/api/ssh-keys", { name, publicKey }, () => {
      const type = publicKey.startsWith("ssh-ed25519")
        ? "ed25519"
        : publicKey.startsWith("ecdsa")
        ? "ecdsa"
        : "rsa";
      demo.keys = [
        ...demo.keys,
        {
          id: rid(),
          name,
          type,
          fingerprint: `SHA256:${btoa(publicKey).slice(0, 43).replace(/=/g, "")}`,
          publicKey,
          createdAt: now(),
          lastUsed: null,
        },
      ];
      return demo.keys;
    }),
  generateSshKey: (name: string) =>
    post<{ keys: SshKey[]; privateKey: string }>("/api/ssh-keys/generate", { name }, () => {
      const pub = `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI${rid()}${rid()} ${name}@blackwall`;
      const key: SshKey = {
        id: rid(),
        name,
        type: "ed25519",
        fingerprint: `SHA256:${btoa(pub).slice(0, 43).replace(/=/g, "")}`,
        publicKey: pub,
        createdAt: now(),
        lastUsed: null,
      };
      demo.keys = [...demo.keys, key];
      return {
        keys: demo.keys,
        privateKey: `-----BEGIN OPENSSH PRIVATE KEY-----\n${rid()}${rid()}${rid()}\n(demo key — connect a live backend to generate a real keypair)\n-----END OPENSSH PRIVATE KEY-----`,
      };
    }),
  removeSshKey: (id: string) =>
    del<SshKey[]>(`/api/ssh-keys/${id}`, () => {
      demo.keys = demo.keys.filter((k) => k.id !== id);
      return demo.keys;
    }),

  webhooks: () => get<Webhook[]>("/api/webhooks", () => demo.hooks),
  addWebhook: (url: string, events: WebhookEvent[]) =>
    post<Webhook[]>("/api/webhooks", { url, events }, () => {
      demo.hooks = [
        ...demo.hooks,
        { id: rid(), url, events, secret: `whsec_${rid()}${rid()}`, enabled: true, createdAt: now() },
      ];
      return demo.hooks;
    }),
  toggleWebhook: (id: string, enabled: boolean) =>
    post<Webhook[]>(`/api/webhooks/${id}/enabled`, { enabled }, () => {
      const h = demo.hooks.find((x) => x.id === id);
      if (h) h.enabled = enabled;
      return [...demo.hooks];
    }),
  removeWebhook: (id: string) =>
    del<Webhook[]>(`/api/webhooks/${id}`, () => {
      demo.hooks = demo.hooks.filter((h) => h.id !== id);
      demo.deliveries = demo.deliveries.filter((d) => d.webhookId !== id);
      return demo.hooks;
    }),
  testWebhook: (id: string) =>
    post<WebhookDelivery[]>(`/api/webhooks/${id}/test`, {}, () => {
      demo.deliveries = [
        { id: rid(), webhookId: id, event: "server.up", status: 200, durationMs: 118, at: now() },
        ...demo.deliveries,
      ];
      return demo.deliveries;
    }),
  deliveries: () => get<WebhookDelivery[]>("/api/webhooks/deliveries", () => demo.deliveries),

  exec: (command: string) =>
    post<{ output: string }>("/api/terminal/exec", { command }, () => ({
      output: demoShell(command),
    })),

  settings: () => get<ConsoleSettings>("/api/settings", () => demo.settings),
  saveSettings: (s: ConsoleSettings) =>
    post<ConsoleSettings>("/api/settings", s, () => {
      demo.settings = { ...s };
      return demo.settings;
    }),
};

/* --------------------------------------- Security Center (live-only, no demo) */

export const securityApi = {
  posture: () => secGet<SecurityStatus>("/api/security", secBlank.posture()),
  ssh: () => secGet<SshView>("/api/security/ssh", secBlank.ssh()),
  saveSsh: (directive: string, value: string) =>
    secPost<SshView>("/api/security/ssh", { directive, value }, secBlank.ssh()),
  bruteforce: () => secGet<BruteForceView>("/api/security/bruteforce", secBlank.bruteforce()),
  ipList: () => secGet<BlockEntry[]>("/api/security/ip-control", []),
  ipAdd: (cidr: string, reason: string) =>
    secPost<BlockEntry[]>("/api/security/ip-control", { cidr, reason }, []),
  ipRemove: (cidr: string) =>
    secPost<BlockEntry[]>("/api/security/ip-control/remove", { cidr }, []),
  ports: () => secGet<PortsView>("/api/security/ports", secBlank.ports()),
  scan: () => secPost<ScanResult>("/api/security/scan", {}, secBlank.scan()),
  integrity: () => secGet<IntegrityStatus>("/api/security/integrity", secBlank.integrity()),
  integrityInit: () =>
    secPost<IntegrityInitResult>("/api/security/integrity/init", {}, { created_at: 0, tracked: 0, files: [] }),
  integrityVerify: () =>
    secPost<IntegrityStatus>("/api/security/integrity/verify", {}, secBlank.integrity()),
  events: () => secGet<EventsFeed>("/api/security/events", secBlank.events()),
  secrets: () => secGet<SecretsView>("/api/security/secrets", secBlank.secrets()),
  secretSet: (name: string, value: string) =>
    secPost<{ ok: boolean; id?: string; updated?: boolean }>(
      "/api/security/secrets",
      { name, value },
      { ok: false }
    ),
  secretGet: (name: string) =>
    secPost<SecretGetResult>("/api/security/secrets/get", { name }, { name, value: "", id: "" }),
  secretDelete: (name: string) =>
    secPost<OkResult>("/api/security/secrets/delete", { name }, { ok: false }),
  tls: () => secGet<TlsStatus>("/api/security/tls", secBlank.tls()),
  backups: () => secGet<BackupStatus>("/api/security/backups", secBlank.backups()),
  backupCreate: () => secPost<BackupActionResult>("/api/security/backups", {}, { ok: false }),
  backupRestore: (name: string) =>
    secPost<BackupActionResult>("/api/security/backups/restore", { name }, { ok: false }),
  backupDelete: (name: string) =>
    secPost<OkResult>("/api/security/backups/delete", { name }, { ok: false }),
  updates: () => secGet<UpdateStatus>("/api/security/updates", secBlank.updates()),
  updateCheck: () => secPost<UpdateStatus>("/api/security/updates/check", {}, secBlank.updates()),
  recovery: () => secGet<RecoveryStatus>("/api/security/recovery", secBlank.recovery()),
  recoveryGenerate: () =>
    secPost<{ ok: boolean; codes: string[]; count: number; note: string }>(
      "/api/security/recovery/generate",
      {},
      { ok: false, codes: [], count: 0, note: "" }
    ),
  recoveryVerify: (code: string) =>
    secPost<OkResult>("/api/security/recovery/verify", { code }, { ok: false }),
  totp: () => secGet<TotpStatus>("/api/security/totp", secBlank.totp()),
  totpSetup: (account: string) =>
    secPost<TotpSetup>("/api/security/totp/setup", { account }, secBlank.totpSetup()),
  totpVerify: (code: string) =>
    secPost<OkResult>("/api/security/totp/verify", { code }, { ok: false }),
};

function demoShell(cmd: string): string {
  const c = cmd.trim();
  if (c === "help")
    return "Available: help, uptime, whoami, ls, df -h, free -m, uname -a, ps, ip a, clear";
  if (c === "uptime") return "up 24 days,  6:12,  2 users,  load average: 0.42, 0.38, 0.31";
  if (c === "whoami") return "ops";
  if (c === "ls") return "bin  boot  dev  etc  home  opt  srv  usr  var";
  if (c === "df -h")
    return "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1       480G  206G  274G  43% /\n/dev/sdb1       2.0T  1.2T  800G  61% /var/lib/data";
  if (c === "free -m")
    return "              total        used        free\nMem:          32768       12698       20070";
  if (c === "uname -a")
    return "Black Wall OS 4.2 edge-01 6.9.4-blackwall #1 SMP x86_64 GNU/Linux";
  if (c === "ps")
    return "  PID TTY          TIME CMD\n    1 ?        00:04:11 systemd\n  842 ?        00:00:52 nginx\n 1204 ?        00:12:03 postgres";
  if (c === "ip a")
    return "1: lo: <LOOPBACK,UP> inet 127.0.0.1/8\n2: eth0: <BROADCAST,UP> inet 10.0.0.42/24";
  return `bash: ${c.split(" ")[0]}: command not found (demo shell — type 'help')`;
}