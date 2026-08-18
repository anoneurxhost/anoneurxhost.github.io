import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, "../dist");

const SRC = readFileSync(resolve(dist, "index.html"), "utf-8");

// Extract the bundled JS and CSS paths from the built index.html
const jsMatch = SRC.match(/<script[^>]*src="(\/assets\/index-[^"]+\.js)"[^>]*><\/script>/);
const cssMatch = SRC.match(/<link[^>]*href="(\/assets\/index-[^"]+\.css)"[^>]*>/);
const jsPath = jsMatch ? jsMatch[1] : "/assets/index.js";
const cssPath = cssMatch ? cssMatch[1] : "/assets/index.css";

const TITLE = "Anoneurx | Verify Intern";
const DESCRIPTION =
  "Verify an Anoneurx intern instantly. Confirm internship credentials, department, batch, status, certificates and service records using an intern ID or email address. Official Anoneurx internship verification tool.";
const KEYWORDS =
  "anoneurx intern, anoneurx internship, verify intern, internship verification, intern verification, anoneurx intern verify, anoneurx internship certificate, verify internship certificate, anoneurx intern id, intern status check, anoneurx intern records, verify intern credentials, anoneurx internship program, anoneurx intern directory, check intern status, anoneurx intern batch, anoneurx intern department, verify anoneurx employee, anoneurx intern proof, intern badge verification, anoneurx academy intern, anoneurx intern confirmation, internship record lookup, verify intern online, anoneurx intern portal";
const CANONICAL = "https://anoneurx.com/intern/verify";
const URL = CANONICAL;

const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Anoneurx Internship Verification Portal",
    url: URL,
    applicationCategory: "BusinessApplication",
    description:
      "Verify Anoneurx intern credentials, certificates, and service records in real time using an intern ID or email address.",
    publisher: {
      "@type": "Organization",
      name: "Anoneurx",
      url: "https://anoneurx.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anoneurx", item: "https://anoneurx.com" },
      { "@type": "ListItem", position: 2, name: "Interns", item: "https://anoneurx.com/intern" },
      { "@type": "ListItem", position: 3, name: "Verify", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I verify an Anoneurx intern?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter the intern's ID (e.g. ANX26INTSE044) or registered email address into the verification form at anoneurx.com/intern/verify to instantly confirm their credentials.",
        },
      },
      {
        "@type": "Question",
        name: "What information does Anoneurx intern verification show?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Verification displays the intern's name, department, intern ID, email, batch, status (active/completed), institution, location, internship history, badges and awards.",
        },
      },
      {
        "@type": "Question",
        name: "Can I verify an Anoneurx internship certificate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use the Anoneurx internship verification portal at anoneurx.com/intern/verify to confirm the authenticity of any Anoneurx internship certificate or credential.",
        },
      },
    ],
  },
];

// Build the <head> block for the intern verify page
const headContent = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${TITLE}</title>
  <meta name="description" content="${DESCRIPTION}" />
  <meta name="author" content="Anoneurx" />
  <meta name="keywords" content="${KEYWORDS}" />

  <link rel="canonical" href="${CANONICAL}" />

  <meta property="og:site_name" content="Anoneurx" />
  <meta property="og:title" content="${TITLE}" />
  <meta property="og:description" content="${DESCRIPTION}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${URL}" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${TITLE}" />
  <meta name="twitter:description" content="${DESCRIPTION}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif&display=swap" rel="stylesheet" />

  <link rel="icon" type="image/png" href="/assets/logo.png" />

  <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Anoneurx",
        "url": "https://anoneurx.com",
        "logo": "https://anoneurx.com/assets/logo.png",
        "sameAs": []
      }
    </script>
  <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Anoneurx",
        "url": "https://anoneurx.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://anoneurx.com/apps/browse?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    </script>
  ${JSON_LD.map((ld) => `<script type="application/ld+json">${JSON.stringify(ld)}</script>`).join("\n  ")}

  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    (function (l) {
      if (l.search[1] === '/') {
        var decoded = l.search.slice(1).split('&').map(function (s) {
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <!-- End Single Page Apps for GitHub Pages -->

  <script type="module" crossorigin src="${jsPath}"></script>
  <link rel="stylesheet" crossorigin href="${cssPath}">`;

// Replace the content between <head> and </head> in the built index.html
// The dist index.html has a static <script type="module" src="/src/main.tsx"> which Vite replaces.
// We need to replace the entire <head>...</head> block.
const result = SRC.replace(
  /<head>[\s\S]*?<\/head>/,
  `<head>${headContent}\n</head>`
);

const outDir = resolve(dist, "intern/verify");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "index.html"), result, "utf-8");

console.log(`✓ Prerendered /intern/verify → ${outDir}/index.html`);
