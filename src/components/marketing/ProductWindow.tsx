import { Group, Paper, Text, ThemeIcon, Title } from '@mantine/core'
import type { LucideIcon } from 'lucide-react'

export function ProductWindow({
	icon: Icon,
	eyebrow,
	title,
	description,
	children,
}: {
	icon: LucideIcon
	eyebrow: string
	title: string
	description: string
	children: React.ReactNode
}) {
	return (
		<Paper
			radius={28}
			p='lg'
			withBorder
			className='landing-card overflow-hidden'
			style={{
				background:
					'linear-gradient(180deg, rgba(26,22,18,0.96) 0%, rgba(17,14,11,0.98) 100%)',
				borderColor: 'rgba(255,255,255,0.08)',
				boxShadow: '0 28px 90px rgba(0,0,0,0.35)',
			}}
		>
			<div className='mb-6 flex items-start justify-between gap-4'>
				<div>
					<Group gap='xs'>
						<ThemeIcon radius='xl' variant='light' color='orange'>
							<Icon size={16} />
						</ThemeIcon>
						<Text fw={700} style={{ color: '#f4af25' }}>
							{eyebrow}
						</Text>
					</Group>
					<Title order={3} mt='md' className='text-white max-sm:text-xl!'>
						{title}
					</Title>
					<Text mt='sm' style={{ color: '#b09a87' }} className=''>
						{description}
					</Text>
				</div>
				<div className='flex items-center gap-2'>
					<span className='size-3 rounded-full bg-[#ff7a59]' />
					<span className='size-3 rounded-full bg-[#ffbd4a]' />
					<span className='size-3 rounded-full bg-[#25c869]' />
				</div>
			</div>
			{children}
		</Paper>
	)
}
