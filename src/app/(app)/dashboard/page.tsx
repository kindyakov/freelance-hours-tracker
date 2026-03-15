'use client'

import { Stack, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { StatCards, StatCardsSkeleton } from '@/components/dashboard/StatCards'
import { DailyTable } from '@/components/dashboard/DailyTable'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { ChartSkeleton } from '@/components/dashboard/HoursBarChart'
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown'
import { useAppStore } from '@/store/useAppStore'
import { useMonthlyStatsWithRecords } from '@/lib/queries/useMonthlyStats'
import { useAllEarningEntries } from '@/lib/queries/useEarnings'
import { CATEGORY_ORDER } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'

export default function DashboardPage() {
	const { selectedMonth } = useAppStore()
	const {
		data: monthlyData,
		isLoading: isMonthlyDataLoading,
		error: monthlyDataError,
	} = useMonthlyStatsWithRecords(selectedMonth)
	const {
		data: allEarningEntries = [],
		isLoading: isAllEarningsLoading,
		error: allEarningsError,
	} = useAllEarningEntries()

	if (monthlyDataError || allEarningsError) {
		return (
			<Stack gap='lg'>
				<Title order={2}>Дашборд</Title>
				<Text c='red.4'>Не удалось загрузить данные. Обновите страницу.</Text>
			</Stack>
		)
	}

	const allEarningsByMonth = new Map<string, number>()
	for (const entry of allEarningEntries) {
		const key = dayjs(entry.date).format('YYYY-MM')
		allEarningsByMonth.set(
			key,
			(allEarningsByMonth.get(key) ?? 0) + entry.amount,
		)
	}

	const allEarnings = Array.from(allEarningsByMonth.entries()).map(
		([month, amount]) => ({
			month: dayjs(month, 'YYYY-MM').startOf('month').toDate(),
			amount,
		}),
	)

	const records = monthlyData?.records ?? []
	const byCategory = Object.fromEntries(
		CATEGORY_ORDER.map(category => [
			category,
			monthlyData?.byCategory?.[category] ?? 0,
		]),
	) as Record<ActivityCategory, number>
	const stats = monthlyData
		? {
				totalHours: monthlyData.totalHours,
				totalDays: monthlyData.totalDays,
				avgHoursPerDay: monthlyData.avgHoursPerDay,
				earnings: monthlyData.earnings ?? 0,
				byCategory,
			}
		: null

	return (
		<Stack gap='lg'>
			<Title order={2}>Дашборд</Title>

			{isMonthlyDataLoading || !stats ? (
				<StatCardsSkeleton />
			) : (
				<StatCards stats={stats} />
			)}

			{isMonthlyDataLoading || isAllEarningsLoading ? (
				<ChartSkeleton />
			) : (
				<DashboardCharts records={records} allEarnings={allEarnings} />
			)}

			<div className='flex w-full items-start gap-5 max-lg:flex-col'>
				{stats ? (
					<CategoryBreakdown
						byCategory={stats.byCategory}
						totalHours={stats.totalHours}
					/>
				) : null}
				<DailyTable records={records} />
			</div>
		</Stack>
	)
}
