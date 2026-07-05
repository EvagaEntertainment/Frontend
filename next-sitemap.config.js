/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.eevagga.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,

  // Exclude transactional, private, PascalCase legacy, and admin routes
  exclude: [
    // Transactional / private
    '/checkout', '/checkout/*',
    '/wishlist',
    '/search',
    '/thank-you',
    '/track-order',
    '/select-your-interest',
    '/booking-form',
    '/feedback-form',
    '/orderStatus',
    '/custom-packages',
    '/advertise-with-us',
    '/category',
    '/user/*',
    '/vendor/*',
    '/admin/*',
    // noindex pages
    '/careers',
    // PascalCase Pages Router duplicates (now 301-redirected via next.config.js)
    '/HomePage', '/HomePageOld',
    '/AboutEvaga',
    '/Blog',
    '/CatgeoryPage',
    '/CheckOut',
    '/NotFound',
    '/SinglePackageNew',
    '/ThankYou',
    '/Wishlist',
    '/SearchResultPage',
    '/OrderPage',
    '/OrderSucessPage',
    '/PaymentPage',
    '/InterestSelection',
    '/TrackOrder',
    '/BookingForm',
    '/singleBlogPage',
    '/FeedBack',
    '/OurService',
    '/ViewAllPage',
    '/userOrderDetailPage',
    '/TermsAndConditions',
    '/PrivacyPolicy',
    // Missing PascalCase pages now added
    '/AdvertisewithUs',
    '/CustomPackages',
    '/CustomerService',
    '/PressRelease',
    '/PrivacyAndPolicy',
    '/RefundAndCancellation',
    '/SinglePackage',
    // Next.js OG image route — not an HTML page
    '/opengraph-image.jpg',
  ],

  // Per-page lastmod dates — use actual content dates, not build timestamp
  transform: async (_config, path) => {
    const lastmodMap = {
      // Core pages
      '/':                                          '2026-06-15',
      '/about-us':                                  '2026-05-01',
      '/services':                                  '2026-05-01',
      '/blogs':                                     '2026-06-27',
      '/viewall':                                   '2026-06-01',
      '/customer-service':                          '2026-05-01',
      '/press-releases':                            '2026-05-01',
      '/cancellation-policy':                       '2025-02-07',
      '/privacy-policy':                            '2025-02-01',
      '/terms-and-condition':                       '2025-02-01',

      // Original 9 service landing pages
      '/birthday-planner-bangalore':                '2026-06-19',
      '/birthday-decoration-bangalore':             '2026-06-19',
      '/birthday-celebration-at-home-bangalore':    '2026-06-19',
      '/kids-birthday-planner-bangalore':           '2026-06-19',
      '/luxury-birthday-planner-bangalore':         '2026-06-19',
      '/premium-birthday-planner':                  '2026-06-19',
      '/premium-birthday-end-to-end-planner':       '2026-06-19',
      '/premium-baby-shower-planner':               '2026-06-19',
      '/premium-house-warming-planner':             '2026-06-19',

      // H1 — Theme-Based pages
      '/unicorn-theme-birthday-bangalore':          '2026-06-19',
      '/jungle-theme-birthday-bangalore':           '2026-06-19',
      '/barbie-theme-birthday-bangalore':           '2026-06-19',
      '/space-theme-birthday-bangalore':            '2026-06-19',
      '/cocomelon-birthday-theme-bangalore':        '2026-06-19',
      '/boss-baby-birthday-decoration-bangalore':   '2026-06-19',

      // H2 — Age-Based pages
      '/1st-birthday-planner-bangalore':            '2026-06-19',
      '/kids-birthday-party-bangalore':             '2026-06-19',
      '/teen-birthday-celebration-bangalore':       '2026-06-19',
      '/adult-birthday-planner-bangalore':          '2026-06-19',

      // H3 — Venue pages
      '/birthday-venues-bangalore':                 '2026-06-19',
      '/indoor-birthday-venues-bangalore':          '2026-06-19',
      '/birthday-venues-whitefield':                '2026-06-19',
      '/birthday-party-resorts-bangalore':          '2026-06-19',
      '/birthday-venues-under-50k-bangalore':       '2026-06-19',

      // H4 — Hyperlocal pages
      '/birthday-planner-whitefield':               '2026-06-19',
      '/birthday-planner-hsr-layout':               '2026-06-19',
      '/birthday-planner-koramangala':              '2026-06-19',
      '/birthday-planner-indiranagar':              '2026-06-19',
      '/birthday-planner-sarjapur':                 '2026-06-19',
      '/birthday-planner-bellandur':                '2026-06-19',
      '/birthday-planner-hebbal':                   '2026-06-19',
      '/birthday-planner-electronic-city':          '2026-06-19',
      '/birthday-planner-hennur':                   '2026-06-19',
      '/birthday-planner-yellhanka':                '2026-06-19',
      '/birthday-planner-jp-nagar':                 '2026-06-19',
    };
    return {
      loc: path,
      lastmod: lastmodMap[path] || '2026-05-01',
    };
  },

  // Fetch dynamic routes at build time — gracefully skips if API unavailable
  additionalPaths: async (config) => {
    const paths = [];
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return paths;

    try {
      const res = await fetch(`${base}packages/get-all-packages`, { signal: AbortSignal.timeout(10000) });
      if (res.ok) {
        const data = await res.json();
        (data?.data || []).forEach(pkg => {
          if (pkg.serviceId && pkg._id) {
            paths.push({ loc: `/package/${pkg.serviceId}/${pkg._id}`, lastmod: pkg.updatedAt || '2026-05-01' });
          }
        });
      }
    } catch {}

    try {
      const res = await fetch(`${base}blog/get-all-blog-for-user`, { signal: AbortSignal.timeout(10000) });
      if (res.ok) {
        const data = await res.json();
        (data?.data || []).forEach(blog => {
          if (blog._id) {
            paths.push({ loc: `/blogs/singleBlog/${blog._id}`, lastmod: blog.updatedAt || '2026-05-01' });
          }
        });
      }
    } catch {}

    return paths;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/vendor',
          '/user',
          '/checkout',
          '/search',
          '/select-your-interest',
          '/track-order',
          '/wishlist',
          '/booking-form',
          '/feedback-form',
          '/orderStatus',
          '/thank-you',
          '/advertise-with-us',
          '/custom-packages',
        ],
      },
    ],
  },
};