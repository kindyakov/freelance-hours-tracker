export const SITE_NAME = 'RoastFlow'
export const SITE_REPOSITORY_URL =
	'https://github.com/kindyakov/freelance-hours-tracker'
export const SITE_DEFAULT_URL = 'http://localhost:3000'
export const SITE_DESCRIPTION =
	'Простой сервис для учёта рабочего времени и заработка фрилансера без перегруженных функций и сложных интерфейсов.'
export const SITE_KEYWORDS = [
	'учёт рабочего времени фрилансера',
	'учёт часов и заработка',
	'тайм трекер для фрилансера',
	'простой трекер времени',
	'freelance hours tracker',
]

type SiteEnv = Record<string, string | undefined> &
	Partial<Record<'NEXT_PUBLIC_SITE_URL' | 'SITE_URL' | 'NEXTAUTH_URL', string>>

function trimTrailingSlash(value: string) {
	return value.endsWith('/') ? value.slice(0, -1) : value
}

export function getSiteUrl(env: SiteEnv = process.env) {
	const configured =
		env.NEXT_PUBLIC_SITE_URL ??
		env.SITE_URL ??
		env.NEXTAUTH_URL ??
		SITE_DEFAULT_URL

	return trimTrailingSlash(configured)
}

export function absoluteUrl(path: string, siteUrl = getSiteUrl()) {
	return new URL(path, `${siteUrl}/`).toString()
}

export function buildSoftwareApplicationSchema(siteUrl = getSiteUrl()) {
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: SITE_NAME,
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
		inLanguage: 'ru-RU',
		url: absoluteUrl('/', siteUrl),
		codeRepository: SITE_REPOSITORY_URL,
		description: SITE_DESCRIPTION,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		creator: {
			'@type': 'Person',
			name: 'kindyakov',
		},
	}
}
