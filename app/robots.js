export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getsoft.sa'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
