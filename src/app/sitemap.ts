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
    {
      url: absoluteUrl('/features', siteUrl),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/for-who', siteUrl),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/about', siteUrl),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/privacy-policy', siteUrl),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/terms', siteUrl),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
