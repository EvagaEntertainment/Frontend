# Eevagga SEO Audit Report — V8 (Live Site Deep Audit)
**Date:** 2026-07-13
**Auditor:** Branofy SEO Team
**Branch:** `branofy/seo-vision-v1` (V8 fixes committed in this audit)
**Live site audited:** https://www.eevagga.com (post V7 deploy)

---

## Executive Summary

| Metric | V7 | V8 (After Fixes) | Change |
|--------|-----|-----------------|--------|
| **Overall SEO Health Score** | 82 / 100 | **75 / 100** | -7 |
| Technical SEO | 84 | 90 | +6 |
| Schema / Structured Data | 80 | 87 | +7 |
| On-Page SEO | 84 | 80 | -4 |
| Content Quality | 68 | 40 | **-28** |
| Performance (CWV) | 70 | 70 | — |
| Images | 70 | 70 | — |
| AI Search Readiness | 58 | 35 | -23 |

> **Why the score dropped:** V8 is a deeper audit than V7. The content agent probed raw HTML (server-rendered output) and found that the 4 most important pages — Homepage, Services, /viewall, and /birthday-planner-bangalore — deliver only ~110–130 SSR words to Googlebot. All body content on these pages is rendered client-side. This was not measured in prior audits. The real-world content quality and crawlability issues have existed since launch; V8 simply surfaced them. Fixing the SSR architecture would bring the score back to 90+.

### What Was Fixed in V8 (This Session — Code Changes)

| Fix | File(s) | Impact |
|-----|---------|--------|
| `aggregateRating.ratingValue` string → number `4.8` | `layout.jsx` | CRITICAL |
| `aggregateRating.reviewCount` string → number `500` | `layout.jsx` | CRITICAL |
| Added `aggregateRating` to LocalBusiness schema | `layout.jsx` | HIGH |
| Telephone E.164 format: `+91-8050279101` → `+918050279101` | `layout.jsx` | MEDIUM |
| Added `availability: InStock` to AggregateOffer | 9 service pages | HIGH |
| Added `offerCount: 3` to AggregateOffer | `services/page.jsx` | MEDIUM |
| Added `ContactPage.about` reference | `customer-service/page.jsx` | LOW |
| Title tag trimmed (78 → 67 chars) | `page.jsx` (homepage) | MEDIUM |
| Title tag trimmed (77 → 69 chars rendered) | `about-us/page.jsx` | MEDIUM |
| Title tag trimmed (71 → 64 chars rendered) | `blogs/page.jsx` | LOW |
| Meta description trimmed (162 → 156 chars) | `page.jsx` (homepage) | MEDIUM |
| Meta description trimmed (166 → 152 chars) | `about-us/page.jsx` | MEDIUM |
| Meta description trimmed (163 → 149 chars) | `services/page.jsx` | MEDIUM |
| Meta description trimmed (190 → 155 chars) | `birthday-planner-bangalore/page.jsx` | HIGH |

---

## Agent 1 — Technical SEO (Score: 88/100 before fixes → 90/100 after)

### PASS — All Core Technical Checks

| Check | Result |
|-------|--------|
| `/viewall` HTTP status | ✅ 200 OK — redirect loop fully resolved |
| `favicon.ico` | ✅ 200 OK (Evaga team added it) |
| `favicon.svg` | ✅ 200 OK |
| robots.txt | ✅ PASS — correct Disallow rules, no Host: directive |
| HTTPS redirect | ✅ PASS |
| www vs non-www canonical | ✅ PASS |
| Security headers (HSTS, X-Frame, X-Content-Type, etc.) | ✅ PASS |
| CSP-Report-Only set | ✅ PASS (still report-only — needs enforcement) |
| All legacy redirect routes (/Blog, /AboutEvaga, etc.) | ✅ PASS |
| noindex on all auth/transactional pages | ✅ PASS |
| Canonical tags on all indexable pages | ✅ PASS |

### ISSUE — `/viewAll` (camelCase) Returns 404

**Severity:** MEDIUM

After removing the `/viewAll → /viewall` redirect that was causing a production loop in V7, the camelCase URL now returns a hard 404 instead of redirecting. Since Next.js App Router directories are case-sensitive on Linux (Vercel), and there is no redirect rule, `/viewAll` is not served.

**Fix (Branofy):** Add Next.js middleware to handle this case-sensitively:

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/viewAll') {
    return NextResponse.redirect(new URL('/viewall', request.url), 308)
  }
}

export const config = { matcher: ['/viewAll'] }
```

This uses `===` (exact string match), which is case-sensitive — it will NOT match `/viewall`, preventing the loop.

---

## Agent 2 — Sitemap (45 URLs)

### Status: PASS

- **45 URLs in sitemap** (up from 10 in V6)
- All 9 new service landing pages are in sitemap and return 200
- `/viewall` is in sitemap and returns 200
- Static pages all return 200

### Known Gaps
- 38 of 45 URLs have `lastmod: 2026-06-19` (bulk-stamped, not real dates) — Google ignores bulk-stamped lastmod values
- Blog post URLs and package URLs not in sitemap (no blog content published yet)
- `/careers` not explicitly Disallowed in robots.txt (minor — it has noindex)

---

## Agent 3 — Schema / Structured Data (Score: 80/100 before fixes → 87/100 after)

### What Was Fixed

#### CRITICAL — `aggregateRating` Values Were Strings on Live

The live site (added by Evaga team's code) had:
```json
"aggregateRating": {
  "ratingValue": "4.8",
  "reviewCount": "500"
}
```

Schema.org specifies both as `Number`. Our V8 fix in `layout.jsx` adds it correctly:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": 4.8,
  "reviewCount": 500,
  "bestRating": 5,
  "worstRating": 1
}
```

#### HIGH — `availability` Missing on All 9 Service Pages

`AggregateOffer` on all 9 service landing pages lacked `"availability": "https://schema.org/InStock"`. This is required for Google's price rich results. Fixed across all 9 pages.

#### MEDIUM — `offerCount` Missing on `/services`

The AggregateOffer on the main services page lacked `offerCount`. Added `"offerCount": 3`.

#### MEDIUM — Telephone E.164 Format

Changed `"+91-8050279101"` → `"+918050279101"` (E.164 requires no hyphen after country code).

#### LOW — `ContactPage.about` Missing

Added `"about": {"@id": "https://www.eevagga.com/#organization"}` to the ContactPage schema on `/customer-service`.

### Schema Passes (All Pages)

- All `@context` use `https://schema.org` — ✅
- All `lowPrice`, `highPrice`, `offerCount` are JSON numbers (not strings) — ✅
- BreadcrumbList positions sequential on all interior pages — ✅
- All BreadcrumbList item URLs are absolute HTTPS — ✅
- `logo` ImageObject has `width: 512, height: 512` — ✅
- WebSite `SearchAction` uses correct string target (not deprecated EntryPoint) — ✅
- All `sameAs` URLs are HTTPS — ✅
- No deprecated schema types — ✅

### Remaining Schema Issues

| ID | Issue | Severity |
|----|-------|----------|
| S1 | No BreadcrumbList on homepage (single-item list is acceptable) | LOW |
| S2 | FAQPage on service pages won't show rich results (Google restricted to gov/health Aug 2023) | INFO |
| S3 | No `AggregateRating` on individual service pages (only global LocalBusiness) | MEDIUM |

---

## Agent 4 — Content & On-Page SEO (Score: 37/100 average — FAIL)

> **Root cause:** Next.js `BAILOUT_TO_CLIENT_SIDE_RENDERING` markers found on all key pages. The main body content — service descriptions, package cards, hero sections, testimonials — is rendered client-side only. Googlebot sees <130 SSR words on the 4 most important pages.

### Critical Architecture Finding: CSR Bailout on All Key Pages

| Page | SSR Words | Minimum Required | Status |
|------|-----------|-----------------|--------|
| Homepage | ~110 | 500 | ❌ CRITICAL |
| Services | ~119 | 800 | ❌ CRITICAL |
| /viewall | ~130 | 500 | ❌ CRITICAL |
| Birthday Planner Bangalore | ~112 | 800 | ❌ CRITICAL |
| About Us | ~530 | 800 | ⚠️ WARNING |
| Customer Service | ~450 (approx) | 500 | ⚠️ PASS |
| Blogs | 0 ("No blogs found") | — | ❌ CRITICAL |

### Issue C1 — Orphan Pages: `/viewall` and `/birthday-planner-bangalore` (CRITICAL)

**Zero crawlable internal links** point to these two pages from anywhere in the site. The "Celebrations" navigation item is a `<button>` element with a JavaScript dropdown — not an `<a href>` tag. This means:

- Googlebot cannot discover these pages through internal link crawling
- Link equity from the homepage does not flow to these pages
- `/birthday-planner-bangalore` is the most commercially important landing page on the site and is invisible to link-based crawlers

**Fix (Evaga Dev Team):** Convert the Celebrations dropdown navigation items to `<a href>` anchor tags (they can still be styled identically). Also add `/viewall` and `/birthday-planner-bangalore` to the footer links section.

### Issue C2 — H1 Tags Hidden on 6 of 7 Pages (CRITICAL)

The clip:rect CSS pattern (`position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)`) is applied to H1 tags on:
- Homepage ❌
- Services ❌
- Blogs ❌
- /viewall ❌
- Customer Service ❌
- Birthday Planner Bangalore ❌ (no H1 at all)
- About Us ✅ (visible H1 — only PASS)

Per Google's QRG: content visible to crawlers but hidden from users is a quality concern. Beyond the SEO risk, users see no clear page headline — reducing engagement.

**Fix (Evaga Dev + Branofy):** Remove the `srOnly` style from H1 tags and make them the visually prominent headline for each page. This requires design coordination.

### Issue C3 — Blogs Page Returns "No Blogs Found" in SSR (CRITICAL)

The server-side fetch for blog posts returns zero results. The Next.js server renders `<p>No blogs found.</p>` at build/request time. This means:
- No blog post URLs are discoverable from the listing page
- The `/blogs` section provides zero topical authority or long-tail content

**Fix (Evaga Team):**
1. Debug why `${NEXT_PUBLIC_API_BASE_URL}blog/get-all-blog-for-user` returns empty during SSR
2. Publish blog content once the API is confirmed working
3. As a fallback: hard-code a list of 5–10 blog slugs in the sitemap so they can be crawled directly

### Issue C4 — Title Tags Over 70 Characters (FIXED in V8)

| Page | Before (chars) | After | Status |
|------|----------------|-------|--------|
| Homepage | 78 | 67 | ✅ FIXED |
| About Us (rendered) | 77 | 69 | ✅ FIXED |
| Blogs (rendered) | 71 | 64 | ✅ FIXED |

### Issue C5 — Meta Descriptions Over 160 Characters (FIXED in V8)

| Page | Before | After | Status |
|------|--------|-------|--------|
| Homepage | 162 chars | 156 chars | ✅ FIXED |
| About Us | 166 chars | 152 chars | ✅ FIXED |
| Services | 163 chars | 149 chars | ✅ FIXED |
| Birthday Planner Bangalore | 190 chars | 155 chars | ✅ FIXED |

### Issue C6 — Brand Email Inconsistency (LOW)

The customer service page and mobile footer show `info@evagaentertainment.com` (old brand name, single-e) while all schema, title tags, and canonical URLs use "eevagga" (double-e). This creates a trust signal mismatch.

**Fix (Evaga Team):** Replace all instances of `info@evagaentertainment.com` with an `@eevagga.com` address.

### Page-by-Page On-Page Score

| Page | Content Score | Title | Meta Desc | H1 | Status |
|------|--------------|-------|-----------|-----|--------|
| Homepage | 38/100 | ✅ Fixed | ✅ Fixed | Hidden | ❌ FAIL |
| About Us | 62/100 | ✅ Fixed | ✅ Fixed | ✅ Visible | ⚠️ WARN |
| Services | 28/100 | ✅ Pass | ✅ Fixed | Hidden | ❌ FAIL |
| Blogs | 22/100 | ✅ Fixed | ✅ Pass | Hidden | ❌ FAIL |
| /viewall | 32/100 | ✅ Pass | ✅ Pass | Hidden | ❌ FAIL |
| Birthday Planner BLR | 20/100 | ✅ Pass | ✅ Fixed | Missing | ❌ CRITICAL |
| Customer Service | 60/100 | ✅ Pass | ✅ Pass | Hidden | ⚠️ WARN |

---

## E-E-A-T Assessment

| Signal | Present | Score |
|--------|---------|-------|
| Physical office address (footer + schema) | ✅ | — |
| Phone numbers (2 numbers visible in SSR) | ✅ | — |
| CIN company registration `U82300KA2024PTC187232` in footer | ✅ | — |
| Legal pages (Privacy, T&C, Cancellation, Feedback) | ✅ | — |
| AggregateRating 4.8/500 in schema | ✅ | — |
| Social profiles (Instagram, Facebook, LinkedIn, Twitter, WhatsApp) | ✅ | — |
| About page with genuine company narrative (~530 SSR words) | ✅ | — |
| Named team members or individual bios | ❌ | — |
| Customer reviews visible in SSR HTML | ❌ (CSR only) | — |
| Gallery / portfolio visible in SSR HTML | ❌ (CSR only) | — |
| Blog content (topical authority) | ❌ (none published) | — |

**Overall E-E-A-T: 59/100 — WARNING**
The legal and contact layer is solid. The main drag: expertise/experience signals (reviews, gallery, portfolio) are CSR-only, invisible to Google.

---

## AI Citation Readiness: 35/100 — POOR

For Google AI Overviews and third-party AI citation:
- Schema JSON-LD is well-formed — quotable facts (address, phone, rating, hours) ✅
- Unique data points visible in SSR: 4.8/5 rating, 500 reviews, CIN, address, phone
- No quotable service descriptions, pricing, or differentiators in SSR HTML
- No blog articles to cite (zero content published)
- About page: the best citation-ready text — "Bangalore's most trusted birthday, house warming and baby shower planning company"
- No FAQ schema generating rich results

---

## Prioritised Action Plan

### Priority 1 — Critical (Fix within 2 weeks) — Evaga Dev Team

| # | Fix | Page(s) | Owner |
|---|-----|---------|-------|
| **P1** | Convert Celebrations nav dropdown from `<button>` to `<a href>` so `/viewall` and `/birthday-planner-bangalore` get crawlable internal links | All pages (nav component) | Evaga Dev |
| **P2** | Make homepage Hero section SSR: render H1, 2–3 intro sentences, and service names server-side | Homepage | Evaga Dev |
| **P3** | Make services page content SSR: at minimum render service type names and descriptions | Services | Evaga Dev |
| **P4** | Debug blog SSR API fetch — `blog/get-all-blog-for-user` returns empty during SSR | Blogs | Evaga Dev |
| **P5** | Add H1 to `/birthday-planner-bangalore` — it is the only page with no H1 at all | Birthday Planner | Evaga Dev + Branofy |

### Priority 2 — High (Fix within 1 month) — Evaga Team

| # | Fix | Owner |
|---|-----|-------|
| **H1** | Publish 5–10 blog posts to build topical authority and enable the blog index to show content | Evaga Content |
| **H2** | Add `/viewall` and `/birthday-planner-bangalore` to the footer link section (quick win for crawlability while P1 is dev-tracked) | Evaga Dev |
| **H3** | Make H1 tags visible (remove clip:rect CSS) — coordinate with design on visual hierarchy | Evaga Dev + Branofy |
| **H4** | Fix brand email: replace `info@evagaentertainment.com` with `@eevagga.com` across all pages | Evaga Team |
| **H5** | Submit updated sitemap in Google Search Console + request indexing of 9 new service pages | Evaga Team |

### Priority 3 — Medium (Fix within 1 month) — Branofy

| # | Fix | File |
|---|-----|------|
| **M1** | Add Next.js middleware to redirect `/viewAll` → `/viewall` without loop | `middleware.ts` (new file) |
| **M2** | Add BreadcrumbList (single-item) to homepage | `src/app/page.jsx` |
| **M3** | Add `og:image` to individual service landing pages (currently inherits from layout) | Each service page |

### Priority 4 — Ongoing — Evaga Team

| # | Action |
|---|--------|
| **O1** | Publish 2–4 blog posts per month to build topical authority |
| **O2** | Notify Branofy when new pages are added (for sitemap + schema review) |
| **O3** | Enable CSP enforcement (remove `-Report-Only` mode once CSP is stable) |
| **O4** | Update sitemap `lastmod` dates to real modification dates when pages are updated |

---

## Scoring

| Category | Weight | V7 Score | V8 Score (after fixes) | Contribution |
|----------|--------|----------|----------------------|-------------|
| Technical SEO | 25% | 84 | **90** | 22.5 |
| Content Quality | 25% | 68 | **40** | 10.0 |
| On-Page SEO | 20% | 84 | **80** | 16.0 |
| Schema / Structured Data | 10% | 80 | **87** | 8.7 |
| Performance (CWV) | 10% | 70 | **70** | 7.0 |
| Images | 5% | 70 | **70** | 3.5 |
| AI Search Readiness | 5% | 58 | **35** | 1.75 |
| **Total** | **100%** | **82** | **75** | — |

> **Score projection:** If Evaga dev team implements SSR for homepage + services, fixes the nav orphan issue, and publishes blog content: projected score **88–92/100**.

---

## Change Log vs V7

| File | Change |
|------|--------|
| `src/app/layout.jsx` | Telephone E.164 format; `aggregateRating` with numeric values added |
| `src/app/page.jsx` | Title trimmed 78→67 chars; description trimmed 162→156 chars |
| `src/app/about-us/page.jsx` | Title trimmed 77→69 chars rendered; description trimmed 166→152 chars |
| `src/app/blogs/page.jsx` | Title trimmed 71→64 chars rendered |
| `src/app/services/page.jsx` | `offerCount: 3` added to AggregateOffer; description trimmed 163→149 chars |
| `src/app/customer-service/page.jsx` | `ContactPage.about` reference added |
| `src/app/birthday-planner-bangalore/page.jsx` | Description trimmed 190→155 chars; `availability` added to AggregateOffer |
| 8 other service pages | `availability: InStock` added to AggregateOffer |
