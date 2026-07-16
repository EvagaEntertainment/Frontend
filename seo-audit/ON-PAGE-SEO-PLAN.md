# Eevagga — On-Page SEO Action Plan
**Prepared by:** Branofy SEO Team
**Date:** July 2026

---

## What Needs to Be Done

Issues are split between what Branofy can fix in the code vs what the Evaga team needs to do on their side.

---

## Branofy Actions (Code)

### Already Done ✅

- `/viewall` redirect loop — fixed
- `/viewAll` 404 — middleware added
- Nav "Celebrations" button → crawlable link to `/viewall`
- Footer — added `/viewall` + 7 service pages as crawlable links
- `aggregateRating` values corrected to numbers (was strings)
- `availability: InStock` added to all 9 service landing pages
- `offerCount: 3` added to services page
- Telephone corrected to E.164 format
- Title tags trimmed on Homepage, About Us, Blogs
- Meta descriptions trimmed on Homepage, About Us, Services, Birthday Planner

---

### Still To Do (Branofy)

**Schema additions:**

- Add `AggregateRating` to each of the 9 service landing pages (currently only on the global LocalBusiness — adding it per-page enables rich results for individual service searches)
- Add `BreadcrumbList` to the homepage (single-item is valid)
- Add FAQ schema to `/customer-service` for the FAQ section that's already there
- When blog posts go live — add `BlogPosting` schema template to the blog post page component

**Meta:**

- Add a CTA to `/about-us` meta description ("Meet our team" or "See how we work")
- Add explicit `og:image` to each of the 9 service landing pages (currently inherits from layout)

---

## Evaga Dev Team Actions

### H1 Tags — Every Main Page Has This Wrong

The H1 on most pages is hidden from users with CSS (position:absolute, clip:rect). Google sees it but real visitors don't. The fix is to make the visual hero heading on each page an actual `<h1>` tag, then remove the hidden one from the page.jsx files.

Pages to fix:

| Page | Current Hidden H1 | Should Become |
|------|-------------------|---------------|
| Homepage | "Birthday Planner in Bangalore..." | The hero headline users see |
| `/services` | "Birthday & Celebration Services in Bangalore" | The services page hero heading |
| `/blogs` | "Eevagga Blog — Birthday & Celebration Ideas..." | The blog page main heading |
| `/viewall` | "Birthday & Celebration Packages in Bangalore" | The packages page main heading |
| `/customer-service` | "Customer Service — Eevagga Support & Help" | The support page main heading |
| `/birthday-planner-bangalore` | **No H1 at all** | Add one to the ServiceLandingPage component hero |

The birthday planner page is the most urgent — it's the most commercially important page on the site and has no H1 whatsoever.

Since all 9 service landing pages use the same `ServiceLandingPage` component, fixing the component once fixes all of them.

---

### Body Content Is Not Server-Rendered

The homepage, services, viewall, and birthday planner pages each deliver about 110–130 words to Google in the raw HTML. Everything else — hero copy, service cards, package listings — loads via JavaScript after the page loads.

Google does crawl JS content, but it is slower and treated as lower confidence. The pages that matter most for ranking have almost no text for Google to read.

Minimum fix: render the main headline + 2–3 sentences of intro text server-side for each page. The rest can stay client-side.

Pages where this is critical:

**Homepage** — Hero headline and a short description of what Eevagga does should be in the server-rendered HTML. Not JS-only.

**`/birthday-planner-bangalore`** — This page targets the highest-value keyword. Its entire content (service description, what's included, areas served, pricing) is loaded via JavaScript. At minimum the first 2 paragraphs and the service bullet list should render server-side.

**`/viewall`** — The packages listing page should render at least the category names and price ranges server-side. Currently Google sees zero package information.

**`/services`** — The service catalogue should have SSR text describing what Eevagga offers.

---

### Blog API Returning Empty

The `/blogs` page tries to fetch blog posts from the API during server-side rendering and gets zero results. Google sees "No blogs found" in the raw HTML.

Two things need to happen:
1. Fix why the API returns empty during SSR (check if `NEXT_PUBLIC_API_BASE_URL` resolves correctly on Vercel's server environment, and whether the API endpoint is accessible from Vercel)
2. Publish actual blog posts once the API is confirmed working

---

### Internal Links Missing in Page Bodies

The footer and nav now link to all key pages (done). But the page bodies themselves have no contextual links to service pages.

Add these links inside page content (not just nav/footer):

| On This Page | Add Link To | Link Text |
|---|---|---|
| Homepage services section | `/birthday-planner-bangalore` | "Birthday Planning" |
| Homepage CTA | `/viewall` | "See all packages" |
| `/services` page | `/birthday-planner-bangalore` | "Birthday Planner in Bangalore" |
| `/services` page | `/viewall` | "Browse all packages" |
| `/about-us` page body | `/services` | "our services" |
| Each blog post (once published) | Relevant service page | service page name |

---

### Brand Email Inconsistency

The footer and customer service page show `info@evagaentertainment.com` (old brand, single-e). All the rest of the site uses "Eevagga" (double-e). Replace with an `@eevagga.com` email across footer and all contact references.

---

### Image Alt Text

Package card images and gallery images load from CloudFront. Most have empty or filename-based alt text. Every `<img>` tag on the site needs a descriptive alt attribute that describes what's in the photo.

Also: every `<img>` tag should have explicit `width` and `height` attributes. Without them, the browser doesn't know the image dimensions until it loads, which causes layout shift (a Google ranking signal — CLS).

---

## Evaga Content Team Actions

### Publish Blog Posts

Zero blog posts published. This is the single biggest gap for long-term SEO. Blog content builds topical authority and captures long-tail searches that the main pages don't target.

Priority articles to write first (these match searches people are actually making):

1. "How to Plan a Birthday Party in Bangalore — Complete Guide"
2. "Birthday Decoration Ideas for Adults in Bangalore"
3. "How Much Does a Birthday Planner Cost in Bangalore?"
4. "Best Birthday Themes for Kids in Bangalore"
5. "House Warming Decoration Ideas in Bangalore"
6. "Baby Shower Planning Guide for Bangalore"
7. "Birthday Party Venues in Bangalore"
8. "Griha Pravesh Puja Decoration Ideas"

Each article should be 1,000–1,500 words, use the target keyword in the title and first paragraph, and link to the relevant Eevagga service page.

---

### Add Statistics and Proof to the About Page

The About Us page has good company narrative (~530 words) but lacks specific proof points. Add in plain visible text:

- Number of events delivered ("500+ events")
- Years in business
- Areas served in Bangalore (list them: Koramangala, Indiranagar, HSR Layout, Whitefield, Jayanagar, etc.)
- Named team members if possible (E-E-A-T signal)

---

### Google Search Console

- Submit the updated sitemap (`https://www.eevagga.com/sitemap.xml`) in Search Console
- Request indexing for each of the 9 new service landing pages manually
- Once blog posts are published, request indexing for each post URL

---

## Priority Order

**Do first (highest ranking impact):**
1. Fix H1 on `/birthday-planner-bangalore` and all service pages via ServiceLandingPage component
2. Publish the first 3 blog posts
3. Make homepage and birthday planner page body content server-side rendered

**Do next:**
4. Fix H1 visibility on remaining pages (Homepage, Services, Viewall, Customer Service)
5. Fix blog API SSR empty state
6. Add internal body links (homepage → service pages)

**Do after:**
7. Image alt text audit
8. og:image per service page
9. CSP enforcement (remove -Report-Only mode)
10. Author/team profiles on About page

---

*GitHub branch with all code fixes: https://github.com/EvagaEntertainment/Frontend/tree/branofy/seo-vision-v1*
*Branofy contact: branofy.apps@gmail.com*
