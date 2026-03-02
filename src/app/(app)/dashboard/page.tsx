import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Stack, Title } from '@mantine/core'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { StatCards, StatCardsSkeleton } from '@/components/dashboard/StatCards'
import { DailyTable } from '@/components/dashboard/DailyTable'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { ChartSkeleton } from '@/components/dashboard/HoursBarChart'
import { totalHoursForSegments } from '@/lib/utils/time'
import dayjs from 'dayjs'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session?.user?.id) redirect('/login')

  const monthStart = dayjs().startOf('month').toDate()
  const monthEnd = dayjs().endOf('month').toDate()

  // Parallel fetch — never await sequentially when data is independent.
  const [records, currentEarning, allEarnings] = await Promise.all([
    prisma.record.findMany({
      where: {
        userId: session.user.id,
        date: { gte: monthStart, lte: monthEnd },
      },
      include: { segments: { orderBy: { order: 'asc' } } },
      orderBy: { date: 'asc' },
    }),
    prisma.earning.findFirst({
      where: { userId: session.user.id, month: monthStart },
    }),
    prisma.earning.findMany({
      where: { userId: session.user.id },
      orderBy: { month: 'asc' },
      take: 12,
    }),
  ])

  const totalHours = records.reduce(
    (acc, r) => acc + totalHoursForSegments(r.segments),
    0,
  )

  const stats = {
    totalHours,
    totalDays: records.length,
    avgHoursPerDay: records.length > 0 ? totalHours / records.length : 0,
    earnings: currentEarning?.amount ?? 0,
  }

  return (
    <Stack gap="lg">
      <Title order={2}>Дашборд</Title>

      <Suspense fallback={<StatCardsSkeleton />}>
        <StatCards stats={stats} />
      </Suspense>

      {/* DashboardCharts is a Client Component — dynamic ssr:false is valid there */}
      <Suspense fallback={<ChartSkeleton />}>
        <DashboardCharts records={records} allEarnings={allEarnings} />
      </Suspense>

      <DailyTable records={records} />
    </Stack>
  )
}
