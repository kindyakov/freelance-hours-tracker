import { redirect } from 'next/navigation'
import { Stack, Title, Paper, Text, Group, Badge } from '@mantine/core'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DailyTable } from '@/components/dashboard/DailyTable'
import { formatHours, formatRub } from '@/lib/utils/format'
import { totalHoursForSegments } from '@/lib/utils/time'
import dayjs from 'dayjs'

export default async function HistoryPage() {
  const session = await getSession()
  if (!session?.user?.id) redirect('/login')

  // Fetch last 6 months of data — parallel
  const [allRecords, allEarnings] = await Promise.all([
    prisma.record.findMany({
      where: { userId: session.user.id },
      include: { segments: { orderBy: { order: 'asc' } } },
      orderBy: { date: 'desc' },
    }),
    prisma.earning.findMany({
      where: { userId: session.user.id },
      orderBy: { month: 'desc' },
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

  const earningsByMonth = new Map(
    allEarnings.map((e) => [dayjs(e.month).format('YYYY-MM'), e]),
  )

  const months = Array.from(byMonth.entries()).sort(([a], [b]) =>
    b.localeCompare(a),
  )

  return (
    <Stack gap="xl">
      <Title order={2}>История</Title>

      {months.length > 0 ? (
        months.map(([monthKey, records]) => {
          const totalHours = records.reduce(
            (acc, r) => acc + totalHoursForSegments(r.segments),
            0,
          )
          const earning = earningsByMonth.get(monthKey)

          return (
            <Paper key={monthKey} p="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>
                  {dayjs(monthKey, 'YYYY-MM').format('MMMM YYYY')}
                </Title>
                <Group gap="sm">
                  <Badge variant="light" color="blue">
                    {formatHours(totalHours)}
                  </Badge>
                  <Badge variant="light" color="teal">
                    {records.length} {records.length === 1 ? 'день' : records.length < 5 ? 'дня' : 'дней'}
                  </Badge>
                  {earning ? (
                    <Badge variant="light" color="green">
                      {formatRub(earning.amount)}
                    </Badge>
                  ) : null}
                </Group>
              </Group>

              <DailyTable records={records} />
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
