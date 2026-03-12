import Link from 'next/link'
import { Container, Text } from '@mantine/core'

export function Footer() {
	return (
		<footer className='mt-16 border-t border-white/8 py-8'>
			<Container
				size='xl'
				className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'
			>
				<Text size='sm' style={{ color: '#b09a87' }}>
					RoastFlow - личный учёт часов и заработка без перегруженной логики.
				</Text>
				<nav className='flex flex-wrap gap-x-5 gap-y-2 text-sm'>
					<Link href='/privacy-policy' className='layout-nav-link'>
						Политика конфиденциальности
					</Link>
					<Link href='/terms' className='layout-nav-link'>
						Условия использования
					</Link>
				</nav>
			</Container>
		</footer>
	)
}
