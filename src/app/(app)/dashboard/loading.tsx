import { Stack, Title, Skeleton } from '@mantine/core'
import { StatCardsSkeleton } from '@/components/dashboard/StatCards'
import { ChartSkeleton } from '@/components/dashboard/HoursBarChart'

export default function DashboardLoading() {
	return (
		<Stack gap='lg'>
			<Title order={2}>Дашборд</Title>
			<StatCardsSkeleton />
			<div className='flex gap-5 max-lg:flex-col'>
				<ChartSkeleton />
				<ChartSkeleton />
			</div>
			<div className='flex w-full gap-5 max-lg:flex-col'>
				<Skeleton height={180} radius='md' className='flex-1/3' />
				<Skeleton height={180} radius='md' className='flex-2/3' />
			</div>
		</Stack>
	)
}
