import type { Metadata } from 'next'
import { LandingPage } from '@/components/marketing/LandingPage'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  buildSoftwareApplicationSchema,
} from '@/lib/site'

export const metadata: Metadata = {
  title: 'Простой учёт рабочего времени и заработка для фрилансера',
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: `${SITE_NAME} — простой учёт часов и заработка`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/'),
  },
}

export default function RootPage() {
  const schema = buildSoftwareApplicationSchema()

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LandingPage />
    </>
  )
}
