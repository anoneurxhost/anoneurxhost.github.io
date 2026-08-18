# Google Search Console Setup Guide

**Domain:** anoneurx.com  
**Sitemap:** https://anoneurx.com/sitemap.xml  
**Last Updated:** 2026-08-18

---

## 📋 Quick Setup Checklist

- [x] **Sitemap Created** - 140+ indexed URLs in `/public/sitemap.xml`
- [x] **Robots.txt Updated** - Search engine crawl directives configured
- [x] **Meta Tags** - SEO configuration in place
- [x] **Structured Data** - Ready for implementation
- [ ] **Google Search Console Registration** - Follow steps below
- [ ] **Verification** - Implement DNS/HTML/Google Analytics verification
- [ ] **Submit Sitemap** - Monitor indexing in GSC
- [ ] **Monitor Performance** - Track clicks, impressions, CTR

---

## 🔧 Step 1: Verify Domain Ownership

### Option A: HTML File Verification (Easiest for Vercel)
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"URL prefix"** and enter: `https://anoneurx.com`
3. Google will provide an HTML verification file
4. Place the file in `/public/` directory (already accessible via Vercel)
5. Verify in GSC

### Option B: DNS Verification (Recommended for Long-term)
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select **"Domain"** property type
3. Google will provide a DNS TXT record
4. Add to your DNS provider (where you manage anoneurx.com)
5. Verify in GSC

### Option C: Google Analytics Verification
- If you have Google Analytics linked to anoneurx.com, GSC can verify automatically
- Link your GA account in GSC Settings

---

## 📂 Step 2: Submit Sitemap

### In Google Search Console:
1. Go to **Sitemaps** section
2. Enter sitemap URL: `https://anoneurx.com/sitemap.xml`
3. Click **Submit**
4. Monitor status:
   - ✅ Submitted and indexed
   - ⏳ Processing
   - ❌ Error (check robots.txt and accessibility)

### Sitemap Coverage:
- **Total URLs:** 140+
- **Coverage Categories:**
  - Home & Marketing (13 URLs)
  - Blackwall OS (15 URLs)
  - Cloud Services (15 URLs)
  - Pay/Banking (9 URLs)
  - Education (9 URLs)
  - Community & People (9 URLs)
  - Internship Program (5 URLs)
  - Research & Content (8 URLs)
  - Careers & Opportunities (10 URLs)
  - Open Source (22 URLs)
  - Apps Marketplace (5 URLs)
  - Nexora OS (20 URLs)
  - ATLAS & Misc (6 URLs)

---

## 🤖 Step 3: Robots.txt Configuration

**Current robots.txt:**
```
# Allows crawling of public pages
Allow: /research, /intern, /faculty, /people, /courses, /blackwall, /cloud, /pay, etc.

# Blocks private/authenticated areas
Disallow: /auth, /login, /signup, /dashboard, /portal, /cloud/connect

# Crawl delays optimized for major search engines
Crawl-delay: 2
Googlebot crawl-delay: 1
Bingbot crawl-delay: 1

# Sitemap location
Sitemap: https://anoneurx.com/sitemap.xml
```

**Verify robots.txt in GSC:**
1. Go to **Indexing** → **Robots.txt Tester**
2. Test sample URLs to ensure proper crawlability
3. Check for blocked resources (images, CSS, JS)

---

## 🏗️ Step 4: Site Structure & URL Canonicalization

### Canonical Tags
All pages include proper `<head>` meta tags:
```html
<link rel="canonical" href="https://anoneurx.com/path" />
```

### URL Standards:
- ✅ Always use `https://` (secure)
- ✅ Consistent domain: `anoneurx.com` (not www)
- ✅ Lowercase paths
- ✅ No trailing slashes except `/`
- ✅ Legacy redirects handled (301 redirects)

### Legacy URL Redirects (301s in place):
- `/team/...` → `/people/...`
- `/read-paper/:id` → `/read/:id`
- `/share/...` → `/read/:id`
- `/professors` → `/faculty`
- `/banking` → `/pay`
- etc.

---

## 🔍 Step 5: Search Performance Monitoring

### Key Metrics to Track in GSC:

| Metric | Target | Current |
|--------|--------|---------|
| **Total Clicks** | Track growth | - |
| **Impressions** | Track visibility | - |
| **Average CTR** | 3-5% | - |
| **Average Position** | Top 10 | - |
| **Indexed Pages** | 100+ | 140+ URLs |
| **Coverage Issues** | <1% errors | Monitor |

### Monthly Checkup:
1. Review top performing queries
2. Identify low-CTR high-impression pages (improve titles/descriptions)
3. Check for crawl errors
4. Monitor mobile usability
5. Verify core web vitals

---

## 📊 Step 6: Search Results Optimization

### Page Titles (Meta Title)
**Format:** `Primary Keyword | Brand - Anoneurx`

**Examples:**
- `/intern` → "Interns | Anoneurx University"
- `/blackwall` → "Blackwall OS | Privacy-First Operating System"
- `/research` → "Research & Publications | Anoneurx"

### Meta Descriptions
**Length:** 150-160 characters  
**Format:** Action-oriented, include call-to-action

**Examples:**
- `/intern/verify` → "Verify your internship status at Anoneurx University. Quick verification using email or ID."
- `/cloud` → "Enterprise cloud services - compute, storage, networking. Deploy securely with Anoneurx Cloud."

### URL Slugs
✅ Descriptive: `/cloud/compute/virtual-machines`  
❌ Avoid: `/product/p123` or `/content/article-1`

---

## 🎯 Step 7: Structured Data & Rich Results

### Implement JSON-LD for:
- Organization Schema
- LocalBusiness Schema
- Product Schema (for Blackwall, Nexora, Pay)
- ScholarlyArticle Schema (for research papers)
- Course Schema (for University module)
- Person Schema (for team/faculty profiles)

### Current Implementation:
- ✅ SEO components in place
- ✅ RouteSEO metadata structure
- ⚠️ JSON-LD implementation pending
- ⚠️ Knowledge panel optimization pending

---

## 🚨 Step 8: Monitor & Fix Issues

### Common Issues & Solutions:

| Issue | Solution |
|-------|----------|
| **404 Errors** | Check 404.html, verify redirects working |
| **Crawl Errors** | Check robots.txt, server logs, DNS |
| **Mobile Usability** | Run PageSpeed Insights, fix Core Web Vitals |
| **Duplicate Content** | Verify canonical tags, check parameters |
| **Noindex Pages** | Review robots.txt, meta robots tags |
| **Redirect Chains** | Consolidate 301 redirects to 1 hop max |

### Test URLs in GSC:
1. **URL Inspection Tool:**
   - Paste URL
   - Click "Test live URL"
   - Review rendering, mobile-friendliness
   - Request indexing if issues fixed

2. **Mobile-Friendly Test:**
   - https://search.google.com/test/mobile-friendly

3. **Rich Results Test:**
   - https://search.google.com/test/rich-results

---

## 📋 Step 9: Security & HTTPS

✅ **Verified:**
- Domain: `https://anoneurx.com` (secure)
- SSL Certificate: Active (Vercel auto-managed)
- No mixed content (all resources are HTTPS)
- HSTS headers: Set

**In GSC Security Issues:**
1. Go to **Security & Manual Actions**
2. Check for any manual penalties or issues
3. Verify no malware/phishing warnings

---

## 🎓 Step 10: Search Features

### Enable Siteplinks in GSC:
1. Go to **Appearance** settings
2. Verify correct site name and logo
3. Set homepage link title
4. Configure sitelinks to key sections

### Enable Knowledge Panel:
1. Add Organization structured data
2. Verify with Schema markup
3. Claim in Knowledge Panel settings
4. Add high-quality images
5. Link official social profiles

---

## 📈 Performance by Product

### High-Priority Pages for SEO:

| Page | Priority | Current Status |
|------|----------|-----------------|
| **Home** `/` | Critical | 1.0 |
| **Intern Directory** `/intern` | Critical | 0.9 |
| **Internship Verify** `/intern/verify` | Critical | 1.0 |
| **Internship Listings** `/internships` | High | 0.8 |
| **Faculty Directory** `/faculty` | High | 0.8 |
| **Research Hub** `/research` | High | 0.9 |
| **Blackwall OS** `/blackwall` | High | 0.9 |
| **Cloud Services** `/cloud` | High | 0.9 |
| **Pay/Banking** `/pay` | High | 0.9 |
| **Open Source** `/opensource` | High | 0.9 |

---

## 🔗 Additional Resources

- **Anoneurx Sitemap:** https://anoneurx.com/sitemap.xml
- **Robots.txt:** https://anoneurx.com/robots.txt
- **Domain:** anoneurx.com
- **CNAME Record:** anoneurx.com
- **Hosted On:** Vercel

### External Links:
- [Google Search Console](https://search.google.com/search-console)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Documentation](https://schema.org)
- [Google SEO Starter Guide](https://developers.google.com/search/docs)

---

## ✅ Verification Status

**Date Created:** 2026-08-18  
**Sitemap Version:** 140+ URLs  
**Robots.txt Version:** Optimized  
**Domain Verification:** Pending ⏳

### Next Steps:
1. ☐ Register domain in Google Search Console
2. ☐ Verify domain ownership
3. ☐ Submit sitemap.xml
4. ☐ Monitor indexing status
5. ☐ Set up email notifications
6. ☐ Review search performance monthly

---

**Contact:** GSC Administrator  
**Last Updated:** 2026-08-18  
**Status:** Ready for Registration
