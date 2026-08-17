/**
 * Deterministic SVG cover generator for research papers.
 * Returns a data-URI so it can be used as an <img src>.
 */
const PALETTES = [
  ["#0f172a", "#312e81", "#7c3aed"],
  ["#0b132b", "#1c2541", "#3a506b"],
  ["#111827", "#1e3a8a", "#0ea5e9"],
  ["#0f0f10", "#3b0764", "#db2777"],
  ["#0a0a0a", "#164e63", "#22d3ee"],
  ["#0b0f19", "#7f1d1d", "#f97316"],
];

function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h;
}

export function paperCoverSVG(title: string, category = "Research", seed = title): string {
  const palette = PALETTES[hash(seed) % PALETTES.length];
  const [a, b, c] = palette;
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const short = title.length > 60 ? title.slice(0, 57).trimEnd() + "…" : title;
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="0.55" stop-color="${b}"/>
      <stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.15" r="0.9">
      <stop offset="0" stop-color="${c}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${c}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g fill="rgba(255,255,255,0.06)">
    <circle cx="120" cy="520" r="180"/>
    <circle cx="1080" cy="120" r="140"/>
  </g>
  <text x="72" y="120" font-family="ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif"
        font-size="22" letter-spacing="6" fill="rgba(255,255,255,0.65)" font-weight="600">
    ${esc(category.toUpperCase())}
  </text>
  <text x="72" y="360" font-family="'Instrument Serif','Fraunces',Georgia,serif"
        font-size="72" fill="#fff" font-weight="500">
    <tspan x="72" dy="0">${esc(short)}</tspan>
  </text>
  <g transform="translate(72,470)">
    <rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>
    <text x="60" y="82" text-anchor="middle" font-family="'Instrument Serif',Georgia,serif"
          font-size="60" fill="#fff">${esc(initials)}</text>
  </g>
  <text x="220" y="518" font-family="ui-sans-serif,system-ui,sans-serif" font-size="20"
        fill="rgba(255,255,255,0.75)" font-weight="600">ANONEURX · RESEARCH</text>
  <text x="220" y="548" font-family="ui-sans-serif,system-ui,sans-serif" font-size="16"
        fill="rgba(255,255,255,0.55)">Open access research paper</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
