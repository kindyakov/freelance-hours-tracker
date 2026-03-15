import { Paper, Text, Title } from '@mantine/core'

type StaticPageSection = {
	title: string
	body: string[]
}

export function StaticPage({
	eyebrow,
	title,
	intro,
	sections,
}: {
	eyebrow: string
	title: string
	intro: string
	sections: StaticPageSection[]
}) {
	return (
		<main className='relative overflow-hidden pt-20'>
			<div
				className='pointer-events-none absolute inset-x-0 top-0 h-168'
				style={{
					background:
						'radial-gradient(circle at 16% 16%, rgba(244,175,37,0.18), transparent 30%), radial-gradient(circle at 82% 8%, rgba(249,115,22,0.18), transparent 22%), linear-gradient(180deg, rgba(22,18,16,0.64) 0%, rgba(13,11,8,0) 100%)',
				}}
			/>

			<div className='mx-auto max-w-5xl px-4 py-8 md:px-5 md:py-10'>
				<section className='mb-10 max-w-4xl'>
					<Text
						span
						fw={700}
						className='uppercase tracking-[0.24em]'
						style={{ color: '#f4af25', fontSize: '0.78rem' }}
					>
						{eyebrow}
					</Text>
					<Title order={1} mt='sm' className='text-4xl text-white md:text-5xl'>
						{title}
					</Title>
					<Text mt='lg' size='lg' style={{ color: '#d4c9bd' }}>
						{intro}
					</Text>
				</section>

				<div className='grid gap-5'>
					{sections.map(section => (
						<Paper
							key={section.title}
							radius={28}
							p='xl'
							withBorder
							className='landing-card'
							style={{
								borderColor: 'rgba(255,255,255,0.08)',
								background:
									'linear-gradient(180deg, rgba(26,22,18,0.96) 0%, rgba(17,14,11,0.98) 100%)',
							}}
						>
							<Title order={2} className='text-2xl text-white'>
								{section.title}
							</Title>
							<div className='mt-4 space-y-3'>
								{section.body.map(paragraph => (
									<Text key={paragraph} style={{ color: '#d4c9bd' }}>
										{paragraph}
									</Text>
								))}
							</div>
						</Paper>
					))}
				</div>
			</div>
		</main>
	)
}
