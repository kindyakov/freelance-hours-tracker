'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Flame, Github, Menu } from 'lucide-react'
import {
	Burger,
	Button,
	Container,
	Drawer,
	Group,
	Stack,
	Text,
} from '@mantine/core'
import { SITE_NAME, SITE_REPOSITORY_URL } from '@/lib/site'

export function Header() {
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const closeMenu = () => setIsMenuOpened(false)

	return (
		<header className='w-full absolute z-100 pt-4 px-4'>
			<Container
				size='xl'
				className='flex items-center justify-between gap-4 rounded-4xl border border-white/8 py-3 bg-white/3 backdrop-blur max-[880px]:rounded-3xl'
			>
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

				<nav className='flex flex-1 flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm max-[880px]:hidden'>
					<Link
						href='/features'
						className='layout-nav-link'
						onClick={closeMenu}
					>
						Возможности
					</Link>
					<Link href='/for-who' className='layout-nav-link' onClick={closeMenu}>
						Кому подходит
					</Link>
					<Link href='/about' className='layout-nav-link' onClick={closeMenu}>
						О проекте
					</Link>
				</nav>

				<div className='flex items-center gap-3 shrink-0 max-[880px]:hidden'>
					<Button
						component='a'
						href={SITE_REPOSITORY_URL}
						target='_blank'
						rel='noreferrer'
						variant='default'
						radius='xl'
						className='landing-button landing-button-secondary'
						leftSection={<Github size={16} />}
						onClick={closeMenu}
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
						onClick={closeMenu}
					>
						Открыть приложение
					</Button>
				</div>

				<Burger
					opened={isMenuOpened}
					onClick={() => setIsMenuOpened(prev => !prev)}
					aria-label='Открыть меню'
					color='#e8e0d5'
					size='sm'
					className='min-[881px]:hidden'
				/>
			</Container>

			<Drawer
				opened={isMenuOpened}
				onClose={() => setIsMenuOpened(false)}
				position='right'
				size='xs'
				padding='lg'
				title={
					<Group gap='xs'>
						<Menu size={16} />
						<Text fw={700}>Меню</Text>
					</Group>
				}
				styles={{
					content: {
						background: '#0d0b08',
						borderLeft: '1px solid rgba(255,255,255,0.08)',
					},
					header: {
						background: '#0d0b08',
						borderBottom: '1px solid rgba(255,255,255,0.08)',
					},
					title: {
						color: '#e8e0d5',
					},
				}}
			>
				<Stack gap='md' className='mt-3'>
					<Link href='/features' className='layout-nav-link'>
						Возможности
					</Link>
					<Link href='/for-who' className='layout-nav-link'>
						Кому подходит
					</Link>
					<Link href='/about' className='layout-nav-link'>
						О проекте
					</Link>
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
				</Stack>
			</Drawer>
		</header>
	)
}
