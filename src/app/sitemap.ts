import type { MetadataRoute } from 'next'
import { absoluteUrl, getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  return [
    {
      url: absoluteUrl('/', siteUrl),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
