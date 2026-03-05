import { Stack, Title, Group, Skeleton } from '@mantine/core'

function EarningsPanelSkeleton() {
	return (
		<div
			className='flex-1/3 rounded-xl border border-white/5 overflow-hidden'
			style={{ background: 'var(--mantine-color-dark-7)' }}
		>
			{/* Header */}
			<div
				className='flex items-center justify-between px-4 py-3'
				style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
			>
				<Skeleton height={12} width={120} radius='sm' />
				<Skeleton height={14} width={70} radius='sm' />
			</div>

			{/* Entries */}
			{[0, 1, 2].map(i => (
				<div
					key={i}
					className='flex items-center gap-3 px-4 py-3'
					style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
				>
					<Skeleton height={12} width={44} radius='sm' />
					<Skeleton height={12} radius='sm' className='flex-1' />
					<Skeleton height={22} width={22} radius='sm' />
					<Skeleton height={22} width={22} radius='sm' />
				</div>
			))}

			{/* Add form */}
			<div
				className='px-4 py-3 flex items-end gap-2'
				style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
			>
				<div className='flex flex-col gap-1'>
					<Skeleton height={10} width={28} radius='sm' />
					<Skeleton height={32} width={96} radius='sm' />
				</div>
				<div className='flex flex-col gap-1 flex-1'>
					<Skeleton height={10} width={60} radius='sm' />
					<Skeleton height={32} radius='sm' />
				</div>
				<Skeleton height={32} width={80} radius='sm' />
			</div>
		</div>
	)
}

function DayEntryFormSkeleton() {
	return (
		<div
			className='flex-2/3 rounded-xl border border-white/5 p-4'
			style={{ background: 'var(--mantine-color-dark-7)' }}
		>
			<Stack gap='md'>
				{/* Date input */}
				<div>
					<Skeleton height={10} width={32} radius='sm' mb={6} />
					<Skeleton height={36} radius='sm' />
				</div>

				{/* Segments label */}
				<div>
					<Skeleton height={10} width={120} radius='sm' mb={10} />
					<Stack gap='xs'>
						{[0, 1].map(i => (
							<Group key={i} gap='xs'>
								<Skeleton height={36} radius='sm' className='flex-1' />
								<Skeleton height={36} radius='sm' className='flex-1' />
								<Skeleton height={36} width={120} radius='sm' />
								<Skeleton height={32} width={32} radius='sm' />
							</Group>
						))}
					</Stack>
					<Skeleton height={28} width={140} radius='sm' mt={8} />
				</div>

				{/* Divider */}
				<Skeleton height={1} radius='sm' />

				{/* Notes */}
				<div>
					<Skeleton height={10} width={150} radius='sm' mb={6} />
					<Skeleton height={60} radius='sm' />
				</div>

				{/* Submit */}
				<Group justify='flex-end'>
					<Skeleton height={36} width={110} radius='sm' />
				</Group>
			</Stack>
		</div>
	)
}

function DayCardSkeleton() {
	return (
		<div
			className='rounded-xl border border-white/5 p-3'
			style={{ background: 'var(--mantine-color-dark-7)' }}
		>
			<Group justify='space-between' mb={8}>
				<Skeleton height={14} width={100} radius='sm' />
				<Group gap='xs'>
					<Skeleton height={20} width={52} radius='xl' />
					<Skeleton height={22} width={22} radius='sm' />
					<Skeleton height={22} width={22} radius='sm' />
				</Group>
			</Group>
			<Group gap={4}>
				<Skeleton height={20} width={90} radius='xl' />
				<Skeleton height={20} width={70} radius='xl' />
			</Group>
		</div>
	)
}

export default function LogLoading() {
	return (
		<Stack gap='lg'>
			<Title order={2}>Учёт часов</Title>

			<div className='flex lg:items-start gap-5 max-lg:flex-col'>
				<EarningsPanelSkeleton />
				<DayEntryFormSkeleton />
			</div>

			<div>
				<Skeleton height={22} width={180} radius='sm' mb={12} />
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
					{[0, 1, 2, 3, 4, 5].map(i => (
						<DayCardSkeleton key={i} />
					))}
				</div>
			</div>
		</Stack>
	)
}
