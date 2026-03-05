import { Stack, Title, Paper, Group, Skeleton } from '@mantine/core'

function MonthCardSkeleton() {
	return (
		<Paper p='md' radius='md' withBorder>
			{/* Month header: title + badges */}
			<Group justify='space-between' mb='md'>
				<Skeleton height={22} width={140} radius='sm' />
				<Group gap='sm'>
					<Skeleton height={20} width={64} radius='xl' />
					<Skeleton height={20} width={48} radius='xl' />
					<Skeleton height={20} width={72} radius='xl' />
				</Group>
			</Group>

			{/* CategoryBreakdown rows */}
			<div className='flex flex-col gap-4 mb-4'>
				{[100, 60, 40].map((w, i) => (
					<div key={i}>
						<Group justify='space-between' mb={6}>
							<Group gap='xs'>
								<Skeleton height={12} width={12} radius='xl' />
								<Skeleton height={12} width={60} radius='sm' />
							</Group>
							<Group gap='xs'>
								<Skeleton height={12} width={36} radius='sm' />
								<Skeleton height={10} width={24} radius='sm' />
							</Group>
						</Group>
						<Skeleton height={8} width={`${w}%`} radius='sm' />
					</div>
				))}
			</div>

			{/* DailyTable rows */}
			<div className='rounded-xl overflow-hidden border border-white/5 mt-4'>
				<div
					className='grid gap-x-4 px-4 py-2'
					style={{
						gridTemplateColumns: '1fr 1fr 1fr 1fr',
						borderBottom: '1px solid rgba(255,255,255,0.05)',
					}}
				>
					{[60, 50, 80, 50].map((w, i) => (
						<Skeleton key={i} height={10} width={w} radius='sm' />
					))}
				</div>
				{[0, 1, 2].map(i => (
					<div
						key={i}
						className='grid gap-x-4 px-4 py-3'
						style={{
							gridTemplateColumns: '1fr 1fr 1fr 1fr',
							borderBottom:
								i < 2 ? '1px solid rgba(255,255,255,0.04)' : undefined,
						}}
					>
						{[80, 40, 60, 40].map((w, j) => (
							<Skeleton key={j} height={12} width={w} radius='sm' />
						))}
					</div>
				))}
			</div>
		</Paper>
	)
}

export default function HistoryLoading() {
	return (
		<Stack gap='xl'>
			<Title order={2}>История</Title>
			<MonthCardSkeleton />
		</Stack>
	)
}
