import type { MetadataRoute } from 'next'
import { absoluteUrl, getSiteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/history', '/log', '/login', '/api/'],
      },
    ],
    host: siteUrl,
    sitemap: absoluteUrl('/sitemap.xml', siteUrl),
  }
}
