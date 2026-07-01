# SEO Action Plan for Evaga Team
**Prepared by:** Branofy SEO Team
**Date:** 2026-07-01
**Branch with all code changes:** `branofy/seo-vision-v1`

> All code-level SEO fixes are complete and committed. This document covers only what the Evaga team needs to action. Items are ordered by priority — Critical items block Google indexing or cause visible errors; High items significantly impact rankings.

---

## CRITICAL

### C1 — Merge `feature-event-pages` Branch
**Owner:** Evaga Dev Team
**Impact:** 9 key service pages (Birthday, House Warming, Baby Shower sub-categories) currently return **404**. These are the highest-value landing pages for organic search.

**What to do:**
1. Review the `feature-event-pages` branch
2. Merge into `main` (or `branofy/seo-vision-v1` first for review)
3. Each merged page needs:
   - Unique `metadata.title` and `metadata.description`
   - `alternates.canonical` set to the page URL
   - An `<h1>` heading
   - A `Service` schema block

**Pages expected:**
- `/birthday-decoration-bangalore`
- `/house-warming-bangalore`
- `/baby-shower-bangalore`
- (+ 6 more sub-category variants)

---

### C2 — Set Vercel Environment Variable: `NEXT_PUBLIC_API_Aws_Image_BASE_URL`
**Owner:** Evaga DevOps / Rahul
**Impact:** All gallery/product images are broken on the Vercel demo site. Google cannot index image content when images fail to load — also severely damages CWV (LCP).

**What to do:**
1. Go to Vercel project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_Aws_Image_BASE_URL` = `https://d3a9w2e6vszgj1.cloudfront.net/`
   (or whatever the correct CloudFront base URL is)
3. Redeploy

---

## HIGH

### H1 — Publish Blog Content
**Owner:** Evaga Content Team
**Impact:** The `/blogs` page currently shows **"No blogs found"**. Blog content is the primary driver of long-tail organic traffic for celebration/event searches. The Blog schema and ISR fetch are already implemented and ready — the content just needs to be published.

**What to do:**
1. Log in to the Evaga admin panel
2. Publish at least 5–10 blog posts covering topics like:
   - "Birthday decoration ideas in Bangalore"
   - "Best birthday themes for kids 2026"
   - "How to plan a house warming ceremony"
   - "Baby shower planning guide Bangalore"
   - "Budget birthday decoration packages"
3. Each post should have:
   - A descriptive title (≤ 110 characters)
   - A cover image
   - At least 500 words of content
   - An excerpt/summary (used as meta description)

**Why it matters:** Once published, blog posts automatically appear in the Blog schema on the `/blogs` page (updated every hour via ISR) and in the sitemap (added at next build via `additionalPaths`).

---

### H2 — Add favicon.ico and favicon.svg
**Owner:** Evaga Design Team
**Impact:** Every page logs a **404 for favicon.ico** in the browser. This is visible in Google Search Console as a crawl error and negatively affects brand perception in browser tabs and bookmarks.

**What to do:**
1. Export the Eevagga logo as:
   - `favicon.ico` (multi-size: 16×16, 32×32, 48×48)
   - `favicon.svg` (vector, preferred by modern browsers)
   - `apple-touch-icon.png` (180×180px, for iOS)
2. Place all files in `/public/`
3. The Next.js layout already has the correct `<link>` tags — just dropping the files in `/public/` is enough.

**Optional:** Also add `icon-192.png` and `icon-512.png` for the web app manifest (`/public/manifest.json` already exists).

---

### H3 — Enable `additionalPaths` in Sitemap (API access at build time)
**Owner:** Evaga Dev Team + Branofy
**Impact:** Individual package pages (`/package/[serviceId]/[packageId]`) and blog post pages (`/blogs/singleBlog/[blogId]`) are not in the sitemap. Google discovers these pages only by crawling internal links, which is slower and less reliable.

**Current status:** The code to fetch these URLs at build time is implemented in `next-sitemap.config.js`. It will work automatically once the API is reachable during Vercel builds.

**What to do:**
1. Confirm the Vercel build environment can reach `NEXT_PUBLIC_API_BASE_URL` (i.e., the API is publicly accessible, not behind a VPN or private network)
2. Trigger a new Vercel deployment — the `additionalPaths` function will run at build time, fetch all package and blog IDs, and include them in `sitemap-0.xml`
3. No code changes needed

**Verification:** After deployment, check `https://www.eevagga.com/sitemap-0.xml` — you should see entries like:
```
https://www.eevagga.com/package/abc123/def456
https://www.eevagga.com/blogs/singleBlog/xyz789
```

---

## MEDIUM

### M1 — Add CSP `report-uri` Endpoint
**Owner:** Evaga Dev Team / Branofy (1-line change once endpoint is ready)
**Impact:** The Content Security Policy is currently `Report-Only` with no reporting endpoint. This means:
- Violations are silently discarded (no data collected)
- The CSP provides **zero XSS protection**

**What to do:**
1. Sign up at https://report-uri.com (free tier available) OR use Sentry (if already set up)
2. Get the reporting endpoint URL, e.g.: `https://youraccount.report-uri.com/r/d/csp/reportOnly`
3. Send the URL to Branofy team — we will add it to `next.config.js` in one line:
   ```
   // Current:
   "...frame-ancestors 'self';"
   
   // After adding report-uri:
   "...frame-ancestors 'self'; report-uri https://your-endpoint-here;"
   ```
4. Once violation data is collected for 2–4 weeks, we can switch from `Report-Only` to enforced CSP (which provides actual XSS protection)

---

### M2 — Add `AggregateRating` to LocalBusiness Schema
**Owner:** Evaga Dev Team (API) + Branofy (schema implementation)
**Impact:** `AggregateRating` enables **star ratings** to appear in Google Search results next to the business listing. This significantly improves click-through rate.

**What to do:**
1. Evaga team: expose an API endpoint that returns aggregate rating stats:
   ```json
   { "ratingValue": 4.8, "reviewCount": 127 }
   ```
2. Branofy team will add this to `layout.jsx`:
   ```js
   "aggregateRating": {
     "@type": "AggregateRating",
     "ratingValue": "4.8",
     "reviewCount": "127",
     "bestRating": "5",
     "worstRating": "1"
   }
   ```

**Note:** Only use real ratings. Google will penalise fake or inflated ratings.

---

### M3 — VideoObject Schema for FloatingVideoWidget
**Owner:** Evaga Dev Team (YouTube URL) + Branofy (schema)
**Impact:** If the floating video widget shows a promotional/explainer video, adding `VideoObject` schema makes it eligible to appear as a **video rich result** in Google Search.

**What to do:**
1. Evaga team: confirm the YouTube video URL used in `FloatingVideoWidget` (currently fetched from admin API at runtime)
2. Branofy team will add `VideoObject` schema with `thumbnailUrl`, `uploadDate`, `description`

---

### M4 — Update `sitemap-0.xml` `lastmod` after Content Updates
**Owner:** Evaga Dev Team
**Impact:** The sitemap's `lastmod` dates are now set to real content dates. When you significantly update a page's content, trigger a new Vercel deployment to update the sitemap.

**Key dates currently set:**
| Page | lastmod |
|------|---------|
| `/` (homepage) | 2026-06-15 |
| `/services` | 2026-05-01 |
| `/blogs` | 2026-06-27 |
| `/cancellation-policy` | 2025-02-07 |
| `/privacy-policy` | 2025-02-01 |
| `/terms-and-condition` | 2025-02-01 |

If you update these pages, let Branofy know and we will update the dates in `next-sitemap.config.js`.

---

## LOW

### L1 — Hyperlocal Area Landing Pages
**Owner:** Evaga Content + Dev Team
**Impact:** Location-specific pages (e.g., `/birthday-planner-koramangala`, `/birthday-planner-indiranagar`) rank for hyper-local searches that have high commercial intent and lower competition than city-wide terms.

**Suggested pages (11 Bangalore areas):**
- Koramangala, Indiranagar, Whitefield, HSR Layout, JP Nagar, Marathahalli, Jayanagar, Malleshwaram, Electronic City, Hebbal, Yelahanka

**Each page needs:**
- Unique title: `"Birthday Planner in [Area] — Eevagga"`
- 300+ words of localised content mentioning the area name naturally
- Service schema with `areaServed` set to the specific area
- Added to `next-sitemap.config.js` exclude-from-exclusions list (so they appear in sitemap)

---

### L2 — Customer Testimonials with Review Schema
**Owner:** Evaga Content Team
**Impact:** Individual `Review` objects on service pages help build E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals that Google uses to assess content quality.

**What to do:**
1. Collect 3–5 genuine customer testimonials with: reviewer name, star rating (1–5), review text, date
2. Add to each major service page
3. Branofy will add corresponding `Review` schema blocks

---

### L3 — Differentiate "Why Eevagga" Section Per Page Type
**Owner:** Evaga Content Team
**Impact:** The "Why People Trust Evaga" section currently shows identical content on every page. Google's duplicate content detection reduces the value of repeated identical blocks across pages.

**What to do:** Write 3 variations:
- Birthday-focused (for `/`, `/viewall`, birthday sub-pages)
- House Warming-focused (for house warming pages)
- Baby Shower-focused (for baby shower pages)

---

### L4 — Blog Content Calendar
**Owner:** Evaga Content Team
**Impact:** Consistent publishing signals to Google that the site is actively maintained. Recommended: 2–4 posts per month.

**Suggested topics for Q3 2026:**
- "10 birthday decoration ideas under ₹5,000 in Bangalore"
- "Complete guide to planning a house warming ceremony in Bangalore"
- "Baby shower themes trending in 2026"
- "Birthday party venues vs at-home celebrations — pros and cons"
- "How to choose a birthday decorator in Bangalore"
- "Surprise birthday party planning checklist"
- "Corporate event birthday celebration ideas for teams"
- "Outdoor birthday party ideas Bangalore"

---

### L5 — Enforce CSP (After `report-uri` Data Collection)
**Owner:** Branofy (once M1 is done and 4 weeks of data collected)
**Impact:** Switches the Content Security Policy from `Report-Only` (logs violations, no protection) to enforced (actively blocks XSS attacks).

**Timeline:** 4–6 weeks after M1 is implemented.

---

## Checklist Summary

```
CRITICAL (blocks indexing / causes errors)
[ ] C1 — Merge feature-event-pages branch              [Evaga Dev]
[ ] C2 — Set NEXT_PUBLIC_API_Aws_Image_BASE_URL on Vercel  [Evaga DevOps]

HIGH (significantly impacts rankings)
[ ] H1 — Publish blog content (5–10 posts)            [Evaga Content]
[ ] H2 — Add favicon.ico + favicon.svg + apple-touch-icon.png  [Evaga Design]
[ ] H3 — Verify API reachable at Vercel build time (additionalPaths)  [Evaga Dev]

MEDIUM (optimisation opportunities)
[ ] M1 — Set up CSP report-uri endpoint + send URL to Branofy  [Evaga Dev]
[ ] M2 — Expose aggregate rating API endpoint         [Evaga Dev]
[ ] M3 — Confirm FloatingVideoWidget YouTube URL      [Evaga Dev]
[ ] M4 — Notify Branofy when major pages are updated  [Evaga Team]

LOW (nice to have)
[ ] L1 — Create 11 hyperlocal area landing pages      [Evaga Content+Dev]
[ ] L2 — Collect 3–5 customer testimonials per service  [Evaga Content]
[ ] L3 — Write differentiated "Why Eevagga" per page type  [Evaga Content]
[ ] L4 — Publish 2–4 blog posts per month             [Evaga Content]
[ ] L5 — Enforce CSP (after 4 weeks of report-uri data)  [Branofy]
```

---

## How to Deploy the Code Changes

All SEO code changes are in branch `branofy/seo-vision-v1`.

```bash
# Option A: Merge directly into main
git checkout main
git merge branofy/seo-vision-v1
git push origin main

# Option B: Create a Pull Request
# Go to GitHub → New Pull Request → base: main ← compare: branofy/seo-vision-v1
```

After merging and deploying to Vercel:
1. Check `https://www.eevagga.com/robots.txt` — should have no `Host:` line
2. Check `https://www.eevagga.com/sitemap-0.xml` — should have 10+ URLs with real dates
3. Validate structured data at https://search.google.com/test/rich-results
4. Submit sitemap in Google Search Console: `https://www.eevagga.com/sitemap.xml`
5. Request indexing for key pages in Google Search Console

---

## Contact

For questions on any of the above items, contact the Branofy SEO team.
