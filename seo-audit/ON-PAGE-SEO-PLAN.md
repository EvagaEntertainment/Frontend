# Eevagga — Full On-Page SEO Execution Plan
**Prepared by:** Branofy SEO Team
**Date:** 2026-07-13
**Version:** 1.0
**For:** Eevagga Dev + Content Team

---

## What Is On-Page SEO?

On-page SEO is everything on your own website that affects how Google ranks and displays your pages — titles, headings, body content, internal links, images, page speed, and structured data. Unlike off-page SEO (backlinks, PR), on-page is 100% within your control.

**Why it matters for Eevagga:** Your technical foundation is strong (88/100). Your on-page layer is holding the overall score at 75/100. Fixing the items in this plan can push the site to 90+/100 and directly improve rankings for high-intent keywords like "birthday planner Bangalore."

---

## Overall Status

| Layer | Current Score | Target | Gap |
|-------|-------------|--------|-----|
| Technical SEO | 90/100 | 95/100 | Middleware fix (done) |
| Schema / Structured Data | 87/100 | 92/100 | Minor additions |
| On-Page SEO | 80/100 | 92/100 | Titles, H1s, meta |
| Content Quality | 40/100 | 75/100 | SSR + blog content |
| AI Search Readiness | 35/100 | 65/100 | SSR + FAQ schema |
| **Overall** | **75/100** | **90/100** | This plan |

---

## Part 1 — Fix H1 Tags (All Pages)

### The Problem

Six of seven main pages have H1 tags that are visually hidden from users using CSS:
```css
position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0);
```

Google sees the H1 but users don't. Per Google's Quality Rater Guidelines, content visible to crawlers but hidden from users is a quality concern. More practically: users see no clear headline when they land on a page, hurting engagement and trust.

### What Needs to Change

The visual hero heading on each page (the big text users actually see) should be wrapped in a `<h1>` tag. The hidden `<h1>` in the Next.js page.jsx file should then be removed.

### Page-by-Page H1 Fix Plan

---

#### Page 1 — Homepage (`/`)

**Current situation:**
- Hidden H1 in `src/app/page.jsx`: "Birthday Planner in Bangalore — House Warming & Baby Shower Celebrations | Eevagga"
- Visual hero heading in `HomePage` component (CSR): unknown tag

**Target H1 (visible, in hero):**
```
Birthday Planner in Bangalore
```
This is the keyword-first phrase that users and Google should both see immediately.

**Action (Evaga Dev):**
1. In `src/pages/HomePage.jsx` (or the hero component), find the main hero heading
2. Change its HTML tag from `<h2>`, `<p>`, or `<div>` to `<h1>`
3. In `src/app/page.jsx`, remove the `<h1 style={srOnly}>` line

**Owner:** Evaga Dev
**Effort:** 30 minutes
**Impact:** HIGH — homepage H1 is a major ranking signal for "birthday planner bangalore"

---

#### Page 2 — Services (`/services`)

**Current H1 (hidden):** "Birthday & Celebration Services in Bangalore — Eevagga"

**Target H1 (visible, in hero):**
```
Birthday & Celebration Services in Bangalore
```

**Action (Evaga Dev):**
1. In `src/pages/OurService.jsx`, find the top heading of the services page
2. Change it to `<h1>`
3. Remove hidden H1 from `src/app/services/page.jsx`

**Owner:** Evaga Dev
**Effort:** 30 minutes
**Impact:** HIGH

---

#### Page 3 — Blogs (`/blogs`)

**Current H1 (hidden):** "Eevagga Blog — Birthday & Celebration Ideas, Themes & Planning Guides"

**Target H1 (visible):**
```
Birthday & Celebration Blog
```

**Action (Evaga Dev):**
1. In `src/pages/Blog.jsx`, make the page title heading an `<h1>`
2. Remove hidden H1 from `src/app/blogs/page.jsx`

**Owner:** Evaga Dev
**Effort:** 30 minutes

---

#### Page 4 — View All Packages (`/viewall`)

**Current H1 (hidden):** "Birthday & Celebration Packages in Bangalore — Browse & Book | Eevagga"

**Target H1 (visible):**
```
Birthday & Celebration Packages in Bangalore
```

**Action (Evaga Dev):**
1. In the viewall page component, make the listing page heading an `<h1>`
2. Remove hidden H1 from `src/app/viewall/page.jsx`

**Owner:** Evaga Dev
**Effort:** 30 minutes

---

#### Page 5 — Customer Service (`/customer-service`)

**Current H1 (hidden):** "Customer Service — Eevagga Support & Help"

**Target H1 (visible):**
```
Customer Service — Eevagga Support
```

**Action (Evaga Dev):**
1. In `src/pages/CustomerService.jsx`, make the page heading an `<h1>`
2. Remove hidden H1 from `src/app/customer-service/page.jsx`

**Owner:** Evaga Dev
**Effort:** 30 minutes

---

#### Page 6 — Birthday Planner Bangalore (`/birthday-planner-bangalore`) ⚠️ MOST URGENT

**This is the only page with NO H1 tag at all — not even a hidden one.**

This is the most commercially valuable page on the site (targets "birthday planner bangalore" — high buyer intent keyword). No H1 means Google has no strong signal for what this page is about.

**Target H1 (visible, in hero):**
```
Birthday Planner in Bangalore
```

**Action (Branofy + Evaga Dev):**
1. In the `ServiceLandingPage` component (`src/components/ServiceLandingPage/ServiceLandingPage.jsx`), find the main hero heading
2. Change it to `<h1>` (or add a visible `<h1>` if no heading exists in the hero)
3. All 9 service landing pages use this same component — one fix covers all of them

**Owner:** Evaga Dev (with Branofy guidance)
**Effort:** 45 minutes (covers all 9 service pages)
**Impact:** CRITICAL

---

## Part 2 — Enable Server-Side Rendering for Key Pages

### The Problem

The 4 most important pages deliver only ~110–130 words to Googlebot in server-rendered HTML. All body content — service descriptions, package listings, hero copy, testimonials — is loaded via JavaScript after the page loads. Google does execute JavaScript, but:

1. JS-rendered content is discovered and indexed more slowly (days to weeks delay)
2. Core body content that explains what the page offers isn't in the initial HTML
3. Internal links inside JS-rendered sections (package cards, CTAs) aren't discovered through link crawling

### What Needs to Change

The main content sections of these pages need to render their essential text server-side. This doesn't mean rebuilding the whole page — just the key text content.

### Minimum SSR Content Required Per Page

---

#### Homepage (`/`)

**Current SSR words:** ~110 (nav + footer only)
**Minimum needed:** 300 words SSR

**What to add to SSR (in `src/app/page.jsx` or a new Server Component):**
```jsx
// Add this server-rendered section ABOVE the Suspense boundary
<section>
  <h1>Birthday Planner in Bangalore</h1>
  <p>
    Eevagga is Bangalore's premium full-service birthday planning company.
    We handle end-to-end birthday celebrations — theme decoration, photography,
    venue coordination, entertainment, and on-ground execution. 500+ events
    delivered across Bangalore.
  </p>
  <p>
    Services: Birthday planning · House warming · Baby shower · Kids parties ·
    Luxury celebrations · Premium end-to-end planning
  </p>
</section>
```

**Owner:** Evaga Dev
**Effort:** 2 hours

---

#### Services (`/services`)

**Current SSR words:** ~119
**Minimum needed:** 400 words SSR

**What to add:**
- A server-rendered list of service types with brief descriptions
- Package price range (₹2,999 – ₹99,999)
- Service area (Bangalore)
- At least 3–4 service category names as headings or list items

---

#### View All Packages (`/viewall`)

**Current SSR words:** ~130
**Minimum needed:** 300 words SSR

**What to add:**
- Static list of package category names (Birthday, House Warming, Baby Shower, etc.)
- Brief description of what "browse packages" means
- Static price range text

---

#### Birthday Planner Bangalore (`/birthday-planner-bangalore`)

**Current SSR words:** ~112
**Minimum needed:** 600 words SSR

**This page must be the priority.** It targets the most competitive and valuable keyword. The `ServiceLandingPage` component should render its core content server-side:
- Service description (2–3 paragraphs)
- What is included (bullet list)
- Price range
- Areas served in Bangalore (Koramangala, Indiranagar, Whitefield, etc.)
- Brief FAQ (2–3 questions)

**Owner:** Evaga Dev
**Effort:** 4–6 hours per page (architecture change)
**Impact:** Very high — directly affects keyword ranking

---

## Part 3 — Internal Linking Strategy

### Current State

After our nav and footer fix (commit `9946d8e`), the internal linking structure is significantly improved. But there are still gaps.

### Link Equity Flow (Target)

```
Homepage (highest authority)
    │
    ├─ /services
    ├─ /viewall  ← (now linked from nav + footer)
    ├─ /about-us
    ├─ /blogs
    └─ /customer-service
          │
          └─ /birthday-planner-bangalore  ← (now in footer)
          └─ /birthday-decoration-bangalore
          └─ /kids-birthday-planner-bangalore
          └─ /luxury-birthday-planner-bangalore
          └─ /premium-birthday-planner
          └─ /premium-house-warming-planner
          └─ /premium-baby-shower-planner
```

### Additional Links to Add

| From Page | To Page | Link Text | Where to Add |
|-----------|---------|-----------|-------------|
| `/services` body | `/birthday-planner-bangalore` | "Birthday Planner in Bangalore" | In service list |
| `/services` body | `/viewall` | "Browse all packages" | CTA button |
| `/about-us` body | `/services` | "our services" | In narrative text |
| `/about-us` body | `/viewall` | "explore packages" | In CTA section |
| `/blogs` (each post) | Relevant service page | service page name | In post body |
| Homepage | `/birthday-planner-bangalore` | "Birthday Planning" | In services section |
| Homepage | `/viewall` | "See all packages" | Below hero CTA |

**Owner:** Evaga Dev + Content Team
**Effort:** 2–3 hours across pages
**Impact:** HIGH — distributes homepage authority to money pages

---

## Part 4 — Blog Content Plan (Topical Authority)

### Why Blog Content Is Critical

Currently Eevagga has **zero published blog posts**. This means:
- No long-tail keyword coverage ("how to plan a birthday party at home in Bangalore")
- No topical authority signals for Google
- No content for Google's AI Overviews to cite
- No reason for users to visit the site except to book directly

### Content Strategy: Topical Clusters

Build content in clusters. Each cluster has a main "pillar" page and several supporting blog posts.

---

#### Cluster 1: Birthday Planning (Target: "birthday planner bangalore")

**Pillar:** `/birthday-planner-bangalore` (already live)

**Supporting blog posts (publish in order):**
1. "How to Plan a Birthday Party in Bangalore: Complete 2026 Guide" — 2,000 words
2. "10 Best Birthday Decoration Ideas for Adults in Bangalore" — 1,500 words
3. "Birthday Themes for Kids in Bangalore: 15 Creative Ideas" — 1,500 words
4. "How Much Does a Birthday Planner Cost in Bangalore?" — 1,000 words
5. "Birthday Party Venues in Bangalore: Top 10 for 2026" — 1,500 words

---

#### Cluster 2: House Warming (Target: "house warming planner Bangalore")

**Pillar:** `/premium-house-warming-planner` (already live)

**Supporting blog posts:**
1. "Griha Pravesh Puja Decoration Ideas in Bangalore" — 1,500 words
2. "House Warming Party Planning Guide for Bangalore Homes" — 2,000 words
3. "Traditional vs Modern House Warming Themes: What's Popular in Bangalore" — 1,200 words

---

#### Cluster 3: Baby Shower (Target: "baby shower planner Bangalore")

**Pillar:** `/premium-baby-shower-planner` (already live)

**Supporting blog posts:**
1. "Baby Shower Themes for 2026: Ideas for Bangalore Celebrations" — 1,500 words
2. "How to Plan a Baby Shower in Bangalore: Budget Guide" — 1,200 words
3. "Baby Shower Decoration Ideas: Trending Themes in India" — 1,200 words

---

### Blog Publishing Schedule

| Month | Posts to Publish | Cluster |
|-------|-----------------|---------|
| July 2026 | 2 birthday posts | Cluster 1 |
| August 2026 | 2 birthday + 1 house warming | Clusters 1 & 2 |
| September 2026 | 2 house warming + 1 baby shower | Clusters 2 & 3 |
| October 2026 | 2 baby shower + 1 birthday | Clusters 1 & 3 |
| Ongoing | 3–4 posts/month | All clusters |

**Owner:** Evaga Content Team
**Effort:** 3–5 hours per post (writing + editing + images)
**Impact:** Long-tail traffic in 3–6 months; topical authority in 6–12 months

---

## Part 5 — Meta Tag Cleanup (Remaining Pages)

Most meta issues were fixed in our V8 commit. These are the remaining ones that need Evaga's attention:

### Pages with No `og:image` Set Explicitly

The 9 service landing pages inherit the default `og:image` from `layout.jsx`. This is fine as a fallback, but for best social sharing appearance each page should have a relevant hero image as its OG image.

**Recommendation:** Add `images: [{ url: 'https://www.eevagga.com/og-[page-slug].jpg', width: 1200, height: 630 }]` to each service page's metadata. Create OG images for each page (Canva or existing photography).

**Owner:** Evaga Design + Branofy
**Effort:** 2 hours (creating images) + 30 min (code)

### About Us — Add CTA to Meta Description

Current: "Eevagga is Bangalore's most trusted birthday, house warming and baby shower planning company. Premium execution, creative themes and end-to-end planning."

No call to action. Users don't know what to do.

**Recommended:** "Eevagga is Bangalore's most trusted birthday & celebration planning company. Premium execution, creative themes and end-to-end planning. Meet our team."

**Owner:** Branofy
**Effort:** 5 minutes

---

## Part 6 — Schema Markup Remaining Opportunities

### S1 — AggregateRating on Service Landing Pages

Currently only the global `LocalBusiness` schema has the aggregate rating. Individual service pages could also carry it to appear as rich results for that specific service.

```json
{
  "@type": "AggregateRating",
  "ratingValue": 4.8,
  "reviewCount": 500,
  "bestRating": 5,
  "worstRating": 1
}
```

Add this to the `Service` schema on each of the 9 service landing pages.

**Owner:** Branofy
**Effort:** 1 hour (batch update)

### S2 — FAQ Schema on Customer Service Page

The `/customer-service` page has an H2 "Frequently Asked Support Questions" with a list of FAQs below it. These should use FAQPage schema to potentially show as rich results:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I book a package?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

**Note:** As of August 2023, Google restricted FAQ rich results to government and healthcare sites. However, the schema itself is still valid and may appear in AI Overviews.

**Owner:** Branofy
**Effort:** 1 hour

### S3 — BlogPosting Schema on Individual Blog Posts

When blog posts are published, each post page should include:
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Organization", "@id": "https://www.eevagga.com/#organization" },
  "publisher": { "@id": "https://www.eevagga.com/#organization" },
  "image": { "@type": "ImageObject", "url": "...", "width": 1200, "height": 630 }
}
```

**Owner:** Branofy (when Evaga team publishes blog content)

### S4 — BreadcrumbList on Homepage

A single-item breadcrumb on the homepage is valid schema:
```json
{ "itemListElement": [{ "position": 1, "name": "Home", "item": "https://www.eevagga.com" }] }
```

**Owner:** Branofy
**Effort:** 10 minutes

---

## Part 7 — Image Optimisation

### Current State

Images are loaded from CloudFront (`d3a9w2e6vszgj1.cloudfront.net`) — this is good for performance. However, image SEO requires alt text and proper sizing.

### Actions Required

| Action | Applies To | Owner |
|--------|-----------|-------|
| Audit alt text on all images (gallery, packages, hero) | All client-rendered images | Evaga Dev |
| Ensure package card images have descriptive alt text (not empty or file names) | `/viewall` package cards | Evaga Dev |
| Add `width` and `height` attributes to all `<img>` tags (prevents CLS) | All pages | Evaga Dev |
| Consider adding `srcset` for responsive images | Large hero images | Evaga Dev |
| Add an `og-image.jpg` for each service landing page (1200×630) | 9 service pages | Evaga Design |

**Impact:** Images with proper alt text appear in Google Images search — an additional traffic channel.

---

## Part 8 — AI Search Readiness

### Why This Matters

Google's AI Overviews (formerly SGE) and tools like ChatGPT, Perplexity, and Claude pull answers from trusted, well-structured web pages. Eevagga currently scores 35/100 on AI citation readiness. Higher scores mean Eevagga appears in AI-generated answers to questions like "who is the best birthday planner in Bangalore?"

### Actions to Improve AI Visibility

| Action | Detail | Priority |
|--------|--------|---------|
| **Add statistics to About page** | "500+ events delivered", "Trusted by 2,000+ families", "5-star rated" — in visible SSR text | HIGH |
| **Create an FAQ on each service page** | 5–7 Q&A about the service in SSR HTML (not hidden behind JS) | HIGH |
| **Add "Why choose us" section to homepage** | 3–5 differentiators in visible text | HIGH |
| **Publish expert-authored blog content** | Google cites pages with genuine expertise signals | HIGH |
| **Add a "Locations served" section** | List specific Bangalore areas: Koramangala, Indiranagar, HSR Layout, Whitefield, etc. | MEDIUM |
| **Add pricing transparency** | "Packages starting from ₹2,999" visible in SSR text | MEDIUM |
| **Add trust signals in SSR** | CIN number, founding year, team size — currently only in footer or schema | LOW |

---

## Part 9 — Performance & Core Web Vitals

### Current Score: 70/100

Core Web Vitals (LCP, INP, CLS) directly affect Google rankings.

| Metric | Target | Current Issue |
|--------|--------|--------------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image loads from CloudFront — check if preloaded |
| INP (Interaction to Next Paint) | < 200ms | Multiple JS bundles from Framer Motion, GTM, FB Pixel, reCAPTCHA |
| CLS (Cumulative Layout Shift) | < 0.1 | Images without width/height cause layout shift |

### Quick Wins

1. **Preload hero image:** Add `<link rel="preload" as="image" href="[hero-img-url]">` in `layout.jsx`
2. **Lazy load below-fold images:** Add `loading="lazy"` to gallery and testimonial images
3. **Defer non-critical scripts:** GTM and FB Pixel already use `strategy="afterInteractive"` ✅
4. **Set image dimensions:** Add `width` and `height` to all `<img>` tags to prevent CLS

**Owner:** Evaga Dev
**Effort:** 2–3 hours

---

## Execution Roadmap

### Phase 1 — Quick Wins (Week 1–2)

**Branofy actions:**
- [ ] Add BreadcrumbList to homepage
- [ ] Add AggregateRating to 9 service landing pages
- [ ] Add FAQ schema to customer-service page
- [ ] Fix About Us meta description CTA
- [ ] Add `og:image` to service pages

**Evaga Dev actions:**
- [ ] Fix H1 on `/birthday-planner-bangalore` (ServiceLandingPage component)
- [ ] Remove hidden H1 from all pages where visual H1 is added
- [ ] Add `/viewall` and `/birthday-planner-bangalore` to body of homepage (text links)
- [ ] Set `width`/`height` on all `<img>` tags (CLS fix)

**Evaga Content:**
- [ ] Write and publish 2 birthday planning blog posts

**Timeline:** 2 weeks
**Projected score increase:** 75 → 82

---

### Phase 2 — Architecture Fixes (Month 1–2)

**Evaga Dev actions:**
- [ ] Make homepage hero section server-side rendered (SSR)
- [ ] Make services page content SSR
- [ ] Make /viewall package listings SSR (at least category names)
- [ ] Fix blog API so it returns posts during SSR
- [ ] Debug and fix H1 visibility across all pages (design coordination needed)

**Evaga Content:**
- [ ] Publish 6 more blog posts (total 8)
- [ ] Publish 2 press releases

**Timeline:** 1–2 months
**Projected score increase:** 82 → 88

---

### Phase 3 — Authority Building (Month 2–4)

**All teams:**
- [ ] 3–4 blog posts per month ongoing
- [ ] Add team/author profiles to About page (E-E-A-T)
- [ ] Collect and display customer reviews (Google Reviews widget)
- [ ] Enable CSP enforcement (remove -Report-Only)
- [ ] Submit updated sitemap to Google Search Console monthly
- [ ] Request indexing of new pages via Google Search Console

**Timeline:** 2–4 months
**Projected score increase:** 88 → 93+

---

## Contacts & Responsibilities

| Task Category | Owner | Point of Contact |
|---------------|-------|-----------------|
| Code fixes (schema, metadata, middleware) | Branofy | branofy.apps@gmail.com |
| React component changes (H1, SSR, nav) | Evaga Dev Team | — |
| Content writing (blogs, press releases) | Evaga Content Team | — |
| Design (OG images, hero layouts) | Evaga Design Team | — |
| Google Search Console, sitemap submission | Evaga Team | — |
| New page additions (notify Branofy for schema) | Evaga Team → Branofy | — |

---

## Success Metrics

Track these monthly in Google Search Console:

| Metric | Current | 3-Month Target | 6-Month Target |
|--------|---------|---------------|----------------|
| Overall SEO Score | 75/100 | 85/100 | 92/100 |
| Indexed pages | ~15 | 30+ | 50+ |
| Clicks (GSC) | Baseline | +40% | +120% |
| Impressions (GSC) | Baseline | +60% | +200% |
| "birthday planner bangalore" position | Not tracking | Top 20 | Top 10 |
| "birthday decoration bangalore" position | Not tracking | Top 20 | Top 10 |
| Blog posts published | 0 | 8 | 20+ |

---

*Report generated by Branofy SEO Team | branofy.apps@gmail.com*
*GitHub Branch: https://github.com/EvagaEntertainment/Frontend/tree/branofy/seo-vision-v1*
