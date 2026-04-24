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
    '/category',
    '/user/*',
    '/vendor/*',
    '/admin/*',
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
    '/Careers',
    '/CustomPackages',
    '/CustomerService',
    '/PressRelease',
    '/PrivacyAndPolicy',
    '/RefundAndCancellation',
    '/SinglePackage',
    // Next.js OG image route — not an HTML page
    '/opengraph-image.jpg',
  ],

  // Strip priority and changefreq — Google ignores them
  transform: async (_config, path) => ({
    loc: path,
    lastmod: new Date().toISOString(),
  }),

  // TODO: uncomment and implement once APIs are stable
  // additionalPaths: async (config) => {
  //   const paths = [];
  //
  //   // Package detail pages
  //   // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}packages/get-all-packages`);
  //   // const data = await res.json();
  //   // data?.data?.forEach(pkg => {
  //   //   paths.push({ loc: `/package/${pkg.serviceId}/${pkg._id}`, lastmod: pkg.updatedAt });
  //   // });
  //
  //   // Blog posts
  //   // const blogs = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blog/get-all-blogs`);
  //   // const blogData = await blogs.json();
  //   // blogData?.data?.forEach(blog => {
  //   //   paths.push({ loc: `/blogs/singleBlog/${blog._id}`, lastmod: blog.updatedAt });
  //   // });
  //
  //   // Category pages (once /category/[slug] route exists)
  //   // paths.push({ loc: '/category/birthday-celebration' });
  //   // paths.push({ loc: '/category/wedding' });
  //
  //   return paths;
  // },

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
        ],
      },
    ],
  },
};