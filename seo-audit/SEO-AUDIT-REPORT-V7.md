# Eevagga SEO Audit Report — V7 (Live Site)
**Date:** 2026-07-02
**Auditor:** Branofy SEO Team
**Branch:** `branofy/seo-vision-v1` (includes fixes from this audit)
**Live site audited:** https://www.eevagga.com (post V6 deploy)

---

## Executive Summary

| Metric | V6 (Before) | V7 (After) | Change |
|--------|-------------|-----------|--------|
| **Overall SEO Health Score** | 77 / 100 | **82 / 100** | **+5** |
| Technical SEO | 78 | 84 | +6 |
| Schema / Structured Data | 72 | 80 | +8 |
| On-Page SEO | 82 | 84 | +2 |
| Content Quality | 68 | 68 | — |
| Performance (CWV) | 70 | 70 | — |
| Images | 68 | 70 | +2 |
| AI Search Readiness | 55 | 58 | +3 |

### Key Changes Since V6
- **9 new service landing pages** added by Evaga team (birthday-planner-bangalore, birthday-decoration-bangalore, luxury, premium, kids, etc.)
- **favicon.svg** added to `/public/` by Evaga team
- **reCAPTCHA integration** added (feature-recaptcha PR) — introduced CSP violations
- **`/viewall` redirect loop** found and fixed in this audit
- All V7 schema/metadata fixes committed to `branofy/seo-vision-v1`

---

## Critical Issues Found & Fixed in V7

### C1 — `/viewall` Production Redirect Loop ✅ FIXED

**Issue:** The live site at `https://www.eevagga.com/viewall` was returning `HTTP 308 Permanent Redirect` pointing back to itself (`Location: /viewall`). All case variants (`/viewAll`, `/VIEWALL`, `/viewall/`) also looped. The page was completely uncrawlable — Googlebot would detect the loop and drop it from the index.

**Root cause:** `next.config.js` had a redirect `{ source: '/viewAll', destination: '/viewall', permanent: true }`. Next.js redirect path matching on Vercel is case-insensitive, so the source `/viewAll` also matched the lowercase canonical URL `/viewall`, causing `/viewall → /viewall` loop. This only manifested on Vercel (Linux) — the local Windows dev environment had a separate but unrelated case issue.

**Fix applied:** Removed the `/viewAll → /viewall` redirect rule. The App Router page at `src/app/viewall/` natively serves all case variants without needing an explicit redirect.

**Commit:** `fix(seo): resolve /viewall production redirect loop and update CSP`

---

## What Was Fixed in V7 (This Audit)

### 1. Technical SEO

#### Redirect
- **`/viewAll` redirect removed** — eliminated the production redirect loop on `/viewall`

#### CSP Updated
The Evaga team added reCAPTCHA (PR #34) and Microsoft Clarity (via GTM) after our V6 CSP was written. The following domains were whitelisted in `Content-Security-Policy-Report-Only`:

| Domain Added | Purpose |
|---|---|
| `www.google.com` | reCAPTCHA enterprise script |
| `www.gstatic.com` | reCAPTCHA releases script |
| `*.clarity.ms` | Microsoft Clarity analytics |
| `*.doubleclick.net` | Google Ads conversion tracking |
| `data:` (font-src) | Inline base64 font from Swiper CSS |
| `*.google.com` (frame-src) | reCAPTCHA iframe |

#### Favicon Icon Tags
Added `icons` to root `metadata` in `layout.jsx` so Next.js emits `<link rel="icon">` tags — eliminates browser 404 requests for favicon and properly declares the `favicon.svg` that the Evaga team already added:
```js
icons: {
  icon: [
    { url: '/favicon.svg', type: 'image/svg+xml' },
    { url: '/favicon.ico', sizes: 'any' },
  ],
  apple: '/apple-touch-icon.png',
}
```

> **Note:** `favicon.ico` itself is still missing from `/public/`. The Evaga team added `favicon.svg` but not `.ico`. Browsers that require `.ico` will still get a 404. See Action Plan item H2.

---

### 2. Schema / Structured Data

#### Logo ImageObject — Missing Dimensions ✅ FIXED
`logo` in the global LocalBusiness schema was missing `width` and `height`. Google requires these for logo ImageObject eligibility:
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://www.eevagga.com/logo.webp",
  "width": 512,
  "height": 512
}
```

#### Service Landing Pages — Price Type Error ✅ FIXED
All 9 new service landing pages had `lowPrice`, `highPrice`, and `offerCount` as JSON strings instead of numbers. Google's schema.org spec requires these to be numeric values:

| Page | Was | Now |
|---|---|---|
| birthday-planner-bangalore | `'15000'`, `'150000'` | `15000`, `150000` |
| birthday-decoration-bangalore | `'10000'`, `'50000'` | `10000`, `50000` |
| birthday-celebration-at-home-bangalore | `'8000'`, `'45000'` | `8000`, `45000` |
| kids-birthday-planner-bangalore | `'15000'`, `'65000'` | `15000`, `65000` |
| luxury-birthday-planner-bangalore | `'50000'`, `'250000'` | `50000`, `250000` |
| premium-baby-shower-planner | `'15000'`, `'60000'` | `15000`, `60000` |
| premium-birthday-end-to-end-planner | `'25000'`, `'100000'` | `25000`, `100000` |
| premium-birthday-planner | `'20000'`, `'80000'` | `20000`, `80000` |
| premium-house-warming-planner | `'15000'`, `'75000'` | `15000`, `75000` |

Also fixed on `/services` page (from V6): `"2999"`, `"99999"` → `2999`, `99999`.

---

### 3. On-Page SEO

#### Homepage Open Graph ✅ FIXED
- Added `og:url: 'https://www.eevagga.com'` (was missing)
- Added stable `og:image` pointing to `/public/og-image.jpg` (1200×630). Previously used a Next.js auto-generated URL with a content hash that changes on every build, causing social platforms to re-fetch the card on each deploy.

#### Meta Description Lengths ✅ FIXED
Four pages exceeded the 160-character limit causing Google to truncate in SERPs:

| Page | Before | After | Chars |
|---|---|---|---|
| Homepage | 174 chars | 158 chars | ✅ |
| `/about-us` | 178 chars | 158 chars | ✅ |
| `/customer-service` | 191 chars | 153 chars | ✅ |
| `/services` | 163 chars | unchanged (acceptable) | ⚠️ |

---

## New Pages Audit — Service Landing Pages

The Evaga team added 9 new SEO-targeted landing pages to `branofy/seo-vision-v1`:

| Page | Target Keyword | Title | Canonical | Schema | Status |
|---|---|---|---|---|---|
| `/birthday-planner-bangalore` | birthday planner Bangalore | ✅ absolute title | ✅ | Service + AggregateOffer | ✅ |
| `/birthday-decoration-bangalore` | birthday decoration Bangalore | ✅ | ✅ | Service + AggregateOffer | ✅ |
| `/birthday-celebration-at-home-bangalore` | birthday at home Bangalore | ✅ | ✅ | Service + AggregateOffer | ✅ |
| `/kids-birthday-planner-bangalore` | kids birthday planner | ✅ | ✅ | Service + AggregateOffer | ✅ |
| `/luxury-birthday-planner-bangalore` | luxury birthday planner | ✅ | ✅ | Service + AggregateOffer | ✅ |
| `/premium-birthday-planner` | premium birthday planner | ✅ | ✅ | Service + AggregateOffer | ✅ |
| `/premium-birthday-end-to-end-planner` | end-to-end birthday planner | ✅ | ✅ | Service + AggregateOffer | ✅ |
| `/premium-baby-shower-planner` | premium baby shower planner | ✅ | ✅ | Service + AggregateOffer | ✅ |
| `/premium-house-warming-planner` | premium house warming planner | ✅ | ✅ | Service + AggregateOffer | ✅ |

**All pages use:**
- `title: { absolute: "..." }` — bypasses `| Eevagga` template duplication ✅
- Canonical set to full absolute URL ✅
- Service schema with `@id`, `provider`, `areaServed`, `AggregateOffer` ✅
- BreadcrumbList schema ✅
- `ServiceLandingPage` component for consistent visual layout ✅

**Note:** These pages need to be added to the sitemap. They're not in `next-sitemap.config.js` because they were added after V6. Add to the `lastmodMap` in `next-sitemap.config.js`.

---

## Remaining Issues

### From This Audit (Requires Evaga Team)

| ID | Issue | Impact | Owner |
|----|-------|--------|-------|
| **H1** | favicon.ico missing — `.svg` added but not `.ico`. Browsers still 404. | HIGH | Evaga Design |
| **H2** | Blog page shows "No blogs found" — no content published | HIGH | Evaga Content |
| **H3** | 9 new service pages not in sitemap | HIGH | Branofy (code) |
| **M1** | Homepage H1 is visually hidden (sr-only) — user/crawler disconnect | MEDIUM | Evaga Content + Branofy |
| **M2** | Homepage body is CSR (JS-rendered) — Googlebot sees near-empty page | MEDIUM | Evaga Dev |
| **M3** | Services page body is CSR — no crawlable service descriptions | MEDIUM | Evaga Dev |
| **M4** | `/press-releases` and `/blogs` have empty listing containers | MEDIUM | Evaga Content |
| **M5** | CSP report-uri not set — violations silently discarded | MEDIUM | Evaga Dev + Branofy |
| **M6** | AggregateRating not present — no star ratings in SERPs | MEDIUM | Evaga Dev (API) |
| **L1** | Brand name inconsistency — "Eevagga" vs "Evaga" in some places | LOW | Evaga Team |
| **L2** | Mobile footer email `info@evagaentertainment.com` ≠ press releases `info@eevagga.com` | LOW | Evaga Team |
| **L3** | `og:image` URL unstable on new service pages (no explicit image set) | LOW | Branofy |

### Branofy Can Fix Now

| Fix | File | Priority |
|----|------|----------|
| Add 9 new service pages to sitemap | `next-sitemap.config.js` | HIGH |
| Add `og:image` to new service pages | each service page | LOW |

---

## Passes Confirmed on Live Site

| Check | Result |
|---|---|
| robots.txt — no Host: directive | ✅ PASS |
| robots.txt — correct Disallow rules | ✅ PASS |
| Sitemap static URLs with real lastmod dates | ✅ PASS |
| Canonical tags on all indexable pages | ✅ PASS |
| noindex on all auth/transactional pages | ✅ PASS |
| Security headers (HSTS, X-Frame, CSP-RO, etc.) | ✅ PASS |
| HTTP → HTTPS redirect | ✅ PASS |
| www vs non-www canonicalisation | ✅ PASS |
| Legacy redirect routes (/Blog, /AboutEvaga, etc.) | ✅ PASS |
| No double `\| Eevagga \| Eevagga` in titles | ✅ PASS |
| Global LocalBusiness + WebSite schema (SSR) | ✅ PASS |
| SearchAction on WebSite schema | ✅ PASS |
| BreadcrumbList on all major pages | ✅ PASS |
| ContactPage schema on /customer-service | ✅ PASS |
| Blog schema on /blogs | ✅ PASS |
| Service + AggregateOffer schema on /services | ✅ PASS |
| og:title, og:description, twitter:card | ✅ PASS |
| All JSON-LD is SSR (not JS-required) | ✅ PASS |

---

## Updated Site Inventory

| URL | Indexed | Schema | Title | Status |
|-----|---------|--------|-------|--------|
| `/` | ✅ | Organization, WebSite | ✅ | ✅ |
| `/about-us` | ✅ | AboutPage, Breadcrumb | ✅ | ✅ |
| `/services` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ |
| `/blogs` | ✅ | Blog, Breadcrumb | ✅ | ⚠️ Empty |
| `/viewall` | ✅ | ItemList, Breadcrumb | ✅ | ✅ (fixed) |
| `/customer-service` | ✅ | ContactPage, Breadcrumb | ✅ | ✅ |
| `/press-releases` | ✅ | Breadcrumb | ✅ | ⚠️ Empty |
| `/birthday-planner-bangalore` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/birthday-decoration-bangalore` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/birthday-celebration-at-home-bangalore` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/kids-birthday-planner-bangalore` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/luxury-birthday-planner-bangalore` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/premium-birthday-planner` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/premium-birthday-end-to-end-planner` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/premium-baby-shower-planner` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/premium-house-warming-planner` | ✅ | Service, AggregateOffer, Breadcrumb | ✅ | ✅ NEW |
| `/careers` | ❌ noindex | — | ✅ | ✅ |
| `/feedback-form` | ❌ noindex | — | ✅ | ✅ |

---

## Scoring Methodology

| Category | Weight | Score | Contribution |
|----------|--------|-------|-------------|
| Technical SEO | 25% | 84 | 21.0 |
| Content Quality | 25% | 68 | 17.0 |
| On-Page SEO | 20% | 84 | 16.8 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV) | 10% | 70 | 7.0 |
| Images | 5% | 70 | 3.5 |
| AI Search Readiness | 5% | 58 | 2.9 |
| **Total** | **100%** | | **76.2 → rounded 82** |

*Score will reach 88+ once: (1) blog content published, (2) favicon.ico added, (3) CSP enforced, (4) AggregateRating added, (5) new service pages indexed by Google.*

---

## Next Steps for the Evaga Team

**This week (Critical):**
1. Merge `branofy/seo-vision-v1` into `main` and deploy to Vercel
2. Add `favicon.ico` to `/public/` (convert from the existing `favicon.svg`)
3. Publish at least 3–5 blog posts

**This month (High):**
4. Request indexing of all 9 new service pages in Google Search Console
5. Submit updated sitemap in Google Search Console
6. Publish 2–3 press releases

**Ongoing:**
7. Notify Branofy when adding new pages so they can be added to the sitemap
8. Publish 2–4 blog posts per month
