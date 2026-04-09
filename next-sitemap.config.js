/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.eevagga.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/vendor/*', '/user/*', '/checkout/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.eevagga.com/sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/vendor', '/user', '/checkout', '/search', '/select-your-interest'],
      },
    ],
  },
}
