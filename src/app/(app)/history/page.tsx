import { redirect } from 'next/navigation'
import { Stack, Title, Paper, Text, Group, Badge } from '@mantine/core'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DailyTable } from '@/components/dashboard/DailyTable'
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown'
import { formatHours, formatRub } from '@/lib/utils/format'
import { calcHours, totalHoursForSegments } from '@/lib/utils/time'
import { CATEGORY_ORDER } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export default async function HistoryPage() {
  const session = await getSession()
  if (!session?.user?.id) redirect('/login')

  const [allRecords, allEarningEntries] = await Promise.all([
    prisma.record.findMany({
      where: { userId: session.user.id },
      include: { segments: { orderBy: { order: 'asc' } } },
      orderBy: { date: 'desc' },
    }),
    prisma.earningEntry.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
    }),
  ])

  // Group records by month
  const byMonth = new Map<string, typeof allRecords>()
  for (const record of allRecords) {
    const key = dayjs(record.date).format('YYYY-MM')
    const existing = byMonth.get(key) ?? []
    existing.push(record)
    byMonth.set(key, existing)
  }

  // Sum earning entries by month
  const earningsByMonth = new Map<string, number>()
  for (const entry of allEarningEntries) {
    const key = dayjs(entry.date).format('YYYY-MM')
    earningsByMonth.set(key, (earningsByMonth.get(key) ?? 0) + entry.amount)
  }

  const months = Array.from(byMonth.entries()).sort(([a], [b]) =>
    b.localeCompare(a),
  )

  return (
    <Stack gap="xl">
      <Title order={2}>История</Title>

      {months.length > 0 ? (
        months.map(([monthKey, records]) => {
          const totalHours = records.reduce(
            (acc: number, r: typeof records[number]) => acc + totalHoursForSegments(r.segments),
            0,
          )
          const monthEarnings = earningsByMonth.get(monthKey) ?? 0

          const byCategory = Object.fromEntries(
            CATEGORY_ORDER.map((c) => [c, 0]),
          ) as Record<ActivityCategory, number>

          for (const record of records) {
            for (const seg of record.segments) {
              byCategory[seg.category as ActivityCategory] += calcHours(seg.start, seg.end)
            }
          }

          return (
            <Paper key={monthKey} p="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>
                  {dayjs(monthKey, 'YYYY-MM').locale('ru').format('MMMM YYYY')}
                </Title>
                <Group gap="sm">
                  <Badge variant="light" color="orange">
                    {formatHours(totalHours)}
                  </Badge>
                  <Badge variant="light" color="yellow">
                    {records.length} {records.length === 1 ? 'день' : records.length < 5 ? 'дня' : 'дней'}
                  </Badge>
                  {monthEarnings > 0 ? (
                    <Badge variant="light" color="green">
                      {formatRub(monthEarnings)}
                    </Badge>
                  ) : null}
                </Group>
              </Group>

              <CategoryBreakdown byCategory={byCategory} totalHours={totalHours} />

              <div className="mt-4">
                <DailyTable records={records} />
              </div>
            </Paper>
          )
        })
      ) : (
        <Text c="dimmed" ta="center" py="xl">
          Записей пока нет. Начните учёт часов на странице «Учёт часов».
        </Text>
      )}
    </Stack>
  )
}
