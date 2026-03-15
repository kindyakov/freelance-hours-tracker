import { ArrowRight, FolderKanban, Github } from 'lucide-react'
import {
	Badge,
	Button,
	Container,
	Group,
	Paper,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core'
import { SITE_REPOSITORY_URL } from '@/lib/site'
import {
	benefits,
	painPoints,
	productWindows,
	sectionContent,
	steps,
	trustChips,
	type ProductPreviewKey,
} from './landing-content'
import { HeroPreviewCard } from './HeroPreviewCard'
import { ProductWindow } from './ProductWindow'
import { SectionHeading } from './SectionHeading'
import {
	DashboardPreview,
	HistoryPreview,
	LogPreview,
} from './product-previews'

function PreviewByKey({ preview }: { preview: ProductPreviewKey }) {
	switch (preview) {
		case 'dashboard':
			return <DashboardPreview />
		case 'log':
			return <LogPreview />
		case 'history':
			return <HistoryPreview />
	}
}

export function HeroSection() {
	return (
		<section className='pb-20 pt-30 max-sm:pb-10'>
			<div className='grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]'>
				<div className='landing-reveal landing-delay-1'>
					<Badge radius='xl' variant='light' color='orange'>
						{sectionContent.heroBadge}
					</Badge>
					<h1 className='mt-4 text-5xl font-bold text-white max-xl:text-4xl max-sm:text-3xl'>
						{sectionContent.heroTitle}
					</h1>
					<p
						className='max-w-2xl text-xl max-xl:text-lg mt-4 max-sm:text-base'
						style={{ color: '#d4c9bd' }}
					>
						{sectionContent.heroDescription}
					</p>
					<Group mt='xl' gap='md'>
						<Button
							component='a'
							href={SITE_REPOSITORY_URL}
							target='_blank'
							rel='noreferrer'
							size='lg'
							radius='xl'
							color='orange'
							className='landing-button landing-button-primary max-[480px]:w-full!'
							leftSection={<Github size={18} />}
						>
							Смотреть код на GitHub
						</Button>
						<Button
							component='a'
							href='/login'
							size='lg'
							radius='xl'
							variant='default'
							className='landing-button landing-button-secondary max-[480px]:w-full!'
							rightSection={<ArrowRight size={18} />}
							styles={{
								root: {
									background: 'rgba(255,255,255,0.04)',
									borderColor: 'rgba(255,255,255,0.08)',
									color: '#e8e0d5',
								},
							}}
						>
							Войти через GitHub
						</Button>
					</Group>
					<div className='mt-8 flex flex-wrap gap-3'>
						{trustChips.map(item => (
							<span
								key={item}
								className='landing-chip rounded-full border border-white/8 px-4 py-2 text-sm'
								style={{
									color: '#d4c9bd',
									background: 'rgba(255,255,255,0.03)',
								}}
							>
								{item}
							</span>
						))}
					</div>
				</div>

				<div className='landing-reveal landing-delay-2'>
					<HeroPreviewCard />
				</div>
			</div>
		</section>
	)
}

export function PainSection() {
	return (
		<section className='landing-reveal landing-delay-2 py-20 max-sm:py-10'>
			<SectionHeading {...sectionContent.problem} />
			<SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg' mt='xl'>
				{painPoints.map(point => (
					<Paper
						key={point.title}
						p='xl'
						withBorder
						className='landing-card landing-card max-xl:p-4! rounded-3xl! max-sm:rounded-2xl!'
						style={{
							borderColor: 'rgba(255,255,255,0.07)',
							background:
								'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
						}}
					>
						<ThemeIcon radius='xl' size={44} variant='light' color='orange'>
							<FolderKanban size={20} />
						</ThemeIcon>
						<Title order={3} mt='lg' className='text-white'>
							{point.title}
						</Title>
						<Text mt='sm' style={{ color: '#b09a87' }}>
							{point.description}
						</Text>
					</Paper>
				))}
			</SimpleGrid>
		</section>
	)
}

export function BenefitsSection() {
	return (
		<section className='landing-reveal landing-delay-2 py-20 max-sm:py-10'>
			<SectionHeading {...sectionContent.benefits} />
			<SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg' mt='xl'>
				{benefits.map(({ icon: Icon, title, description }) => (
					<Paper
						key={title}
						p='xl'
						withBorder
						className='landing-card landing-card max-xl:p-4! rounded-3xl! max-sm:rounded-2xl!'
						style={{
							borderColor: 'rgba(255,255,255,0.07)',
							background:
								'radial-gradient(circle at top right, rgba(244,175,37,0.12), transparent 35%), linear-gradient(180deg, rgba(26,22,18,0.98), rgba(18,15,12,0.98))',
						}}
					>
						<ThemeIcon
							radius='xl'
							size={48}
							variant='gradient'
							gradient={{ from: 'orange', to: 'yellow', deg: 135 }}
						>
							<Icon size={22} />
						</ThemeIcon>
						<Title order={3} mt='lg' className='text-white'>
							{title}
						</Title>
						<Text mt='sm' style={{ color: '#b09a87' }}>
							{description}
						</Text>
					</Paper>
				))}
			</SimpleGrid>
		</section>
	)
}

export function ProductSection() {
	return (
		<section className='landing-reveal landing-delay-2 py-20 max-sm:py-10'>
			<SectionHeading {...sectionContent.product} />
			<Stack gap='lg' mt='xl'>
				{productWindows.map(item => (
					<ProductWindow
						key={item.eyebrow}
						icon={item.icon}
						eyebrow={item.eyebrow}
						title={item.title}
						description={item.description}
					>
						<PreviewByKey preview={item.preview} />
					</ProductWindow>
				))}
			</Stack>
		</section>
	)
}

export function StepsSection() {
	return (
		<section className='landing-reveal landing-delay-2 py-20 max-sm:py-10'>
			<SectionHeading {...sectionContent.steps} />
			<SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg' mt='xl'>
				{steps.map(item => (
					<Paper
						key={item.step}
						p='xl'
						withBorder
						className='landing-card landing-card max-xl:p-4! rounded-3xl! max-sm:rounded-2xl!'
						style={{
							borderColor: 'rgba(255,255,255,0.08)',
							background: 'rgba(255,255,255,0.03)',
						}}
					>
						<Text fw={800} className='text-4xl' style={{ color: '#f4af25' }}>
							{item.step}
						</Text>
						<Title order={3} mt='md' className='text-white'>
							{item.title}
						</Title>
						<Text mt='sm' style={{ color: '#b09a87' }}>
							{item.description}
						</Text>
					</Paper>
				))}
			</SimpleGrid>
		</section>
	)
}

export function FinalCtaSection() {
	return (
		<section className='landing-reveal landing-delay-2 py-20 max-sm:py-10'>
			<Paper
				p='xl'
				withBorder
				className='landing-card rounded-4xl! max-sm:p-4! max-sm:rounded-3xl!'
				style={{
					borderColor: 'rgba(255,255,255,0.08)',
					background:
						'radial-gradient(circle at top left, rgba(244,175,37,0.16), transparent 28%), linear-gradient(180deg, rgba(27,22,18,0.98), rgba(16,13,10,1))',
				}}
			>
				<div className='grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end'>
					<div className='landing-reveal landing-delay-1'>
						<Badge radius='xl' variant='light' color='orange'>
							{sectionContent.finalCtaBadge}
						</Badge>
						<Title
							order={2}
							mt='lg'
							className='max-w-2xl text-white text-3xl! max-sm:text-2xl!'
						>
							{sectionContent.finalCtaTitle}
						</Title>
						<Text
							mt='lg'
							size='lg'
							className='max-w-2xl max-sm:text-base!'
							style={{ color: '#d4c9bd' }}
						>
							Репозиторий открыт на GitHub:{' '}
							<a
								href={SITE_REPOSITORY_URL}
								target='_blank'
								rel='noreferrer'
								className='underline decoration-[#f4af25]/60 underline-offset-4'
							>
								{SITE_REPOSITORY_URL}
							</a>
							. {sectionContent.finalCtaDescription}
						</Text>
					</div>
					<div className='space-y-4'>
						<Button
							component='a'
							href={SITE_REPOSITORY_URL}
							target='_blank'
							rel='noreferrer'
							fullWidth
							size='lg'
							radius='xl'
							color='orange'
							className='landing-button landing-button-primary'
							leftSection={<Github size={18} />}
						>
							Перейти в GitHub
						</Button>
						<Button
							component='a'
							href='/login'
							fullWidth
							size='lg'
							radius='xl'
							variant='default'
							className='landing-button landing-button-secondary'
							rightSection={<ArrowRight size={18} />}
							styles={{
								root: {
									background: 'rgba(255,255,255,0.04)',
									borderColor: 'rgba(255,255,255,0.08)',
									color: '#e8e0d5',
								},
							}}
						>
							Открыть демо / вход
						</Button>
						<Text size='sm' style={{ color: '#b09a87' }}>
							{sectionContent.finalCtaFootnote}
						</Text>
					</div>
				</div>
			</Paper>
		</section>
	)
}

export function LandingShell({ children }: { children: React.ReactNode }) {
	return (
		<Container size='xl' className='relative py-0!'>
			{children}
		</Container>
	)
}
