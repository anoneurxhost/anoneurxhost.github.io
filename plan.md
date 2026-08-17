## What I verified first

- `src/App.tsx` (601 lines) has one `PublicLayout` route tree plus a `/dashboard` `PrivateLayout` tree. There is **no** `/intern`, `/faculty`, `/people`, `/ceo`, or `/share` public route today; `/team`, `/team/:name`, `/team/:dept/:name` exist and render `TeamPortfolio`.
- `src/pages/opensource/` already contains `OSReleases.tsx`, `OSRoadmaps.tsx`, `OSDiscussions.tsx`, but the `/opensource` route block in `App.tsx` (lines 304–316) only mounts index, about, projects, organizations, libraries, packages, templates, vscode-extensions, showcase, sponsors, contributors — so those three components are unrouted. There is no `/opensource/repos` or `/opensource/events` page.
- `src/data/opensource/data.ts` already exports `releases`, `roadmaps`, `discussions`, `events`, `sponsors`, `contributors`, `showcase` seed arrays, plus a `navLinks` list that already points at the missing routes.
- `src/components/RouteSEO.tsx` is a central exact-path + pattern map mounted once; it already covers most static routes. It has no entries for the new profile/share routes.
- `src/pages/auth/Auth.tsx` is login-only, posts to a relative `/api/auth/login`, honors a `redirect` query param, and has commented-out social buttons.
- `src/services/api.ts` base URL is `import.meta.env.VITE_API_URL || '/api'` — no `api.anoneurx.com` default.
- `src/pages/banking/BankingDashboard.tsx` (`/pay/dashboard`) has a header with an "Add Money" button and no logout control.
- `src/components/Navigation.tsx` computes nav items per module prefix; the default set is Home / About / Contact, and there is no university branch.

## 1. API client

Add `src/services/apiClient.ts` wrapping `fetch` against `https://api.anoneurx.com` (overridable via `VITE_API_URL`), with bearer-token injection from `localStorage`, JSON parsing, and typed error envelopes. Point `src/services/api.ts` and `src/services/authApi.ts` at it so every internal call goes to the same origin. Each new module gets a namespaced API object (`internsApi`, `facultyApi`, `peopleApi`, `papersApi`, `osApi`) with graceful fallback to the existing local seed data when a request fails, so pages render during backend downtime.

## 2. Auth redesign (`/auth`)

Rewrite `src/pages/auth/Auth.tsx` as a single card with animated mode switching (framer-motion) across five modes: **login**, **signup**, **forgot**, **verify** (OTP/code), **reset**. Mode is driven by a `?mode=` query param so each state is linkable and back-button friendly; the existing `redirect` param keeps working. Social auth row (GitHub, Google, Microsoft) is re-enabled as UI that calls `authApi.oauth(provider)` and redirects to the returned URL, with a clear "not yet configured" toast if the endpoint 404s. Extract shared form fields into `src/pages/auth/` subcomponents to keep the file small.

## 3. Payment dashboard logout

Add a user section to `BankingDashboard.tsx` header: avatar + name dropdown with a **Log out** item that opens an `AlertDialog` confirmation, then calls `logout()` from `AuthContext` and navigates to `/auth`.

## 4. Navigation

In `Navigation.tsx`:
- Default (home) nav becomes **Black Wall · Anoneurx Pay · Cloud · University · Login** (Login rendered as the existing auth CTA when signed out, dashboard avatar when signed in).
- Add a university branch (`/university`, `/professors`, `/courses`, `/intern` prefixes) rendering **University · Professors · Courses · Interns** — no Community entry.

## 5. Intern module

- `src/pages/intern/InternList.tsx` at `/intern` — search box, filters (department, batch, status), sorted grid of `ShowcaseCard`-style profile cards, client-side pagination.
- `src/pages/intern/InternProfile.tsx` at `/intern/:internName` — bio, internship history timeline, open-source contributions, certificates, badges.
- Data from `internsApi`, seeded from a new `src/data/internProfiles.ts` fallback.

## 6. Faculty module

`src/pages/faculty/FacultyProfile.tsx` at `/faculty/:department/:name` — education, position, research areas, publications, office hours. Existing `Professors.tsx` cards link into it (slugified name + department), replacing the current modal-only detail view.

## 7. Team → People

- Add `/people` and `/people/:department/:name` routes rendering the existing `Team` / `TeamPortfolio` components, retargeted to organizational info (role, department, reporting line, focus areas) rather than the full personal-portfolio surface.
- `/team`, `/team/:name`, `/team/:dept/:name` become `Navigate` redirects to the `/people` equivalents so existing links and the sitemap keep resolving.
- Update in-app links in `Navigation.tsx`, `Footer.tsx`, `public/sitemap.xml`, and the `/dev-team` and `/our-dev-team` redirects.

## 8. CEO profile

`src/pages/marketing/CEO.tsx` at `/ceo` — executive layout: portrait hero, vision statement, leadership message, milestones timeline, focus areas, press/speaking, contact CTA. Sourced from the `muhammadqasim` entry in `src/data/teamPortfolios.ts`.

## 9. Research paper sharing

`src/pages/research/SharePaper.tsx` at `/share/:paperId` — embedded PDF viewer (reusing the viewer logic already in `ReadPaper.tsx`), citation block with BibTeX/APA copy buttons, author list, and share buttons. `ScholarlyArticle` JSON-LD plus per-paper OG/Twitter tags.

## 10. Open source expansion + search

- Route the three orphaned components: `/opensource/releases`, `/opensource/roadmaps`, `/opensource/discussions`.
- Add `/opensource/events` and `/opensource/repos` pages driven by the existing `events` seed and a new `repos` seed.
- Add detail routes `/opensource/projects/:id` and `/opensource/repos/:id` with README rendering, activity feed, maintainers, releases, and language breakdown.
- New `src/pages/opensource/useOSSearch.ts` hook + `OSToolbar.tsx` (search input, sort select, multi-facet filter chips) reused across every list page, and a global `/opensource/search` page that queries across all datasets.

## 11. SEO

Extend `RouteSEO.tsx`:
- Exact entries for `/people`, `/ceo`, `/intern`, `/opensource/{repos,events,releases,roadmaps,discussions,search}`.
- Pattern entries for `/intern/:name`, `/faculty/:department/:name`, `/people/:department/:name`, `/share/:paperId`, `/opensource/projects/:id`, `/opensource/repos/:id` emitting `Person`, `BreadcrumbList`, `ScholarlyArticle`, and `SoftwareSourceCode` JSON-LD built from the fetched record so profiles can rank by name.
- Add the new routes to `public/sitemap.xml`.

## Technical notes

- Client-side only; no Lovable Cloud. All dynamic data comes from `api.anoneurx.com` with local seed fallbacks so nothing renders blank.
- All new surfaces use the existing tokens plus `SEO`, `PageHero`, `Reveal`, and `ShowcaseCard`; no hardcoded colors.
- Route additions are grouped by module inside the existing `PublicLayout` tree; all new pages are `React.lazy` like the rest of `App.tsx`.
- Accessibility: labelled inputs on auth and search, `aria-current` on nav, focus-visible rings, 44px tap targets on mobile.

## Out of scope

- Backend implementation at `api.anoneurx.com` — I consume it, I don't build it.
- Accurate per-page social previews on non-JS crawlers (LinkedIn/Slack/Facebook). This is a static Vite SPA, so `/share/:paperId` previews only work for JS-executing crawlers; real previews need SSR, which would be a [TanStack Start migration](https://lovable.dev/blog/building-apps-using-tanstack-start) in a follow-up.
