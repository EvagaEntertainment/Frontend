/** @type {import('next').NextConfig} */
const nextConfig = {
  // 301 redirects: PascalCase legacy Pages Router URLs → canonical lowercase App Router URLs
  async redirects() {
    return [
      { source: '/AdvertisewithUs', destination: '/advertise-with-us', permanent: true },
      { source: '/Careers', destination: '/careers', permanent: true },
      { source: '/CustomPackages', destination: '/custom-packages', permanent: true },
      { source: '/CustomerService', destination: '/customer-service', permanent: true },
      { source: '/PressRelease', destination: '/press-releases', permanent: true },
      { source: '/PrivacyAndPolicy', destination: '/privacy-policy', permanent: true },
      { source: '/RefundAndCancellation', destination: '/cancellation-policy', permanent: true },
      { source: '/SinglePackage', destination: '/viewAll', permanent: true },
      // Category index has no page — redirect to browse
      { source: '/category', destination: '/viewAll', permanent: false },
      // Other legacy ghost routes
      { source: '/HomePage', destination: '/', permanent: true },
      { source: '/HomePageOld', destination: '/', permanent: true },
      { source: '/AboutEvaga', destination: '/about-us', permanent: true },
      { source: '/OurService', destination: '/services', permanent: true },
      { source: '/ViewAllPage', destination: '/viewAll', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=(self)',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // Remove X-Powered-By header
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3a9w2e6vszgj1.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'public-vendor-service-assets.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'api.eevagga.com',
      },
    ],
  },
};

module.exports = nextConfig;