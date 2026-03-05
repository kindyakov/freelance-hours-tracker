import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Stack, Title } from '@mantine/core'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { StatCards, StatCardsSkeleton } from '@/components/dashboard/StatCards'
import { DailyTable } from '@/components/dashboard/DailyTable'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { ChartSkeleton } from '@/components/dashboard/HoursBarChart'
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown'
import { calcHours, totalHoursForSegments } from '@/lib/utils/time'
import { CATEGORY_ORDER } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'
import dayjs from 'dayjs'

export default async function DashboardPage() {
	const session = await getSession()
	if (!session?.user?.id) redirect('/login')

	const monthStart = dayjs().startOf('month').toDate()
	const monthEnd = dayjs().endOf('month').toDate()

	// Parallel fetch — never await sequentially when data is independent.
	const [records, earningEntries] = await Promise.all([
		prisma.record.findMany({
			where: {
				userId: session.user.id,
				date: { gte: monthStart, lte: monthEnd },
			},
			include: { segments: { orderBy: { order: 'asc' } } },
			orderBy: { date: 'asc' },
		}),
		prisma.earningEntry.findMany({
			where: { userId: session.user.id },
			orderBy: { date: 'asc' },
		}),
	])

	const totalHours = records.reduce(
		(acc: number, r: typeof records[number]) => acc + totalHoursForSegments(r.segments),
		0,
	)

	const byCategory = Object.fromEntries(
		CATEGORY_ORDER.map(c => [c, 0]),
	) as Record<ActivityCategory, number>

	for (const record of records) {
		for (const seg of record.segments) {
			byCategory[seg.category as ActivityCategory] += calcHours(seg.start, seg.end)
		}
	}

	// Current month earnings total
	const currentMonthEarnings = earningEntries
		.filter(e => dayjs(e.date).isSame(monthStart, 'month'))
		.reduce((s: number, e: typeof earningEntries[number]) => s + e.amount, 0)

	// Aggregate entries by month for the area chart
	const earningsByMonthMap = new Map<string, number>()
	for (const entry of earningEntries) {
		const key = dayjs(entry.date).format('YYYY-MM')
		earningsByMonthMap.set(key, (earningsByMonthMap.get(key) ?? 0) + entry.amount)
	}
	const allEarnings = Array.from(earningsByMonthMap.entries()).map(([month, amount]) => ({
		month: dayjs(month, 'YYYY-MM').startOf('month').toDate(),
		amount,
	}))

	const stats = {
		totalHours,
		totalDays: records.length,
		avgHoursPerDay: records.length > 0 ? totalHours / records.length : 0,
		earnings: currentMonthEarnings,
		byCategory,
	}

	return (
		<Stack gap='lg'>
			<Title order={2}>Дашборд</Title>

			<Suspense fallback={<StatCardsSkeleton />}>
				<StatCards stats={stats} />
			</Suspense>

			{/* DashboardCharts is a Client Component — dynamic ssr:false is valid there */}
			<Suspense fallback={<ChartSkeleton />}>
				<DashboardCharts records={records} allEarnings={allEarnings} />
			</Suspense>

			<div className='flex w-full gap-5 max-lg:flex-col'>
				<CategoryBreakdown byCategory={byCategory} totalHours={totalHours} />

				<DailyTable records={records} />
			</div>
		</Stack>
	)
}
