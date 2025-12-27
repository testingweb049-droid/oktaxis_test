module.exports = {
  siteUrl: 'https://oktaxis.co.uk/',
  generateRobotsTxt: true,
  
  // Exclude booking flow pages, order pages, and admin pages (these should be noindex)
  exclude: [
    '/admin', 
    '/login',
    '/book-ride/select-car',
    '/book-ride/passenger-details',
    '/booking',
    '/order',
    '/order/*',
    '/order-placed',
  ],
  sitemapSize: 5000,
  
  // Additional configuration
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/book-ride/select-car', '/book-ride/passenger-details', '/booking', '/order', '/order-placed'],
      },
    ],
  },
};
