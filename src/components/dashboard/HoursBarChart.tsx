'use client'

import { BarChart } from '@mantine/charts'
import { Paper, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { calcHours } from '@/lib/utils/time'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'

type Segment = { start: string; end: string; category: ActivityCategory }
type DayRecord = {
	date: string | Date
	segments: Segment[]
}

type Props = { records: DayRecord[] }

export default function HoursBarChart({ records }: Props) {
	// Determine which categories have any data this month
	const activeCategories = CATEGORY_ORDER.filter(cat =>
		records.some(r => r.segments.some(s => s.category === cat)),
	)

	const data = records.map(r => {
		const point: Record<string, string | number> = {
			day: dayjs(r.date).format('D MMM'),
		}
		for (const cat of activeCategories) {
			point[cat] = Number(
				r.segments
					.filter(s => s.category === cat)
					.reduce((acc, s) => acc + calcHours(s.start, s.end), 0)
					.toFixed(2),
			)
		}
		return point
	})

	const series = activeCategories.map(cat => ({
		name: cat,
		color: CATEGORY_META[cat].color,
		label: CATEGORY_META[cat].label,
	}))

	return (
		<Paper p='md' radius='md' withBorder>
			<Text fw={600} mb='md'>
				Часы по дням
			</Text>
			<BarChart
				h={220}
				data={data}
				dataKey='day'
				series={series}
				type='stacked'
				tickLine='none'
				gridAxis='y'
				withTooltip
				withLegend
			/>
		</Paper>
	)
}

export function ChartSkeleton() {
	return (
		<Paper
			p='md'
			radius='md'
			withBorder
			className='animate-pulse flex-1/2 w-full'
		>
			<div className='h-4 bg-zinc-700 rounded mb-4 w-32' />
			<div className='h-55 bg-zinc-700/40 rounded' />
		</Paper>
	)
}
