export default function robot() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://noventravisuals.in/sitemap.xml',
  }
}