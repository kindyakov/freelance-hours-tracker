import Link from 'next/link'
import { ArrowRight, Flame, Github } from 'lucide-react'
import { Button, Container, Group, Text } from '@mantine/core'
import { SITE_NAME, SITE_REPOSITORY_URL } from '@/lib/site'

export function Header() {
	return (
		<header className='w-full absolute z-100 pt-4'>
			<Container
				size='xl'
				className='rounded-4xl border border-white/8 py-3 bg-white/3 backdrop-blur'
			>
				<div className='flex flex-wrap items-center justify-between gap-4'>
					<div className='flex min-w-0 items-center gap-6'>
						<Link href='/' className='flex shrink-0 items-center gap-3'>
							<div
								className='flex size-12 items-center justify-center rounded-2xl text-[#0d0b08]'
								style={{
									background: 'linear-gradient(135deg, #f4af25, #f97316)',
								}}
							>
								<Flame size={22} />
							</div>
							<Text fw={800} className='text-lg text-white'>
								{SITE_NAME}
							</Text>
						</Link>

						<nav className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm'>
							<Link href='/features' className='layout-nav-link'>
								Возможности
							</Link>
							<Link href='/for-who' className='layout-nav-link'>
								Кому подходит
							</Link>
							<Link href='/about' className='layout-nav-link'>
								О проекте
							</Link>
						</nav>
					</div>

					<Group gap='sm' className='shrink-0'>
						<Button
							component='a'
							href={SITE_REPOSITORY_URL}
							target='_blank'
							rel='noreferrer'
							variant='default'
							radius='xl'
							className='landing-button landing-button-secondary'
							leftSection={<Github size={16} />}
							styles={{
								root: {
									background: 'rgba(255,255,255,0.04)',
									borderColor: 'rgba(255,255,255,0.08)',
									color: '#e8e0d5',
								},
							}}
						>
							GitHub
						</Button>
						<Button
							component='a'
							href='/login'
							radius='xl'
							color='orange'
							className='landing-button landing-button-primary'
							rightSection={<ArrowRight size={16} />}
						>
							Открыть приложение
						</Button>
					</Group>
				</div>
			</Container>
		</header>
	)
}
