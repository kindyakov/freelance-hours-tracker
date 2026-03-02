'use client'

import { BarChart } from '@mantine/charts'
import { Paper, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { totalHoursForSegments } from '@/lib/utils/time'

type Record = {
  date: string | Date
  segments: { start: string; end: string }[]
}

type Props = { records: Record[] }

export default function HoursBarChart({ records }: Props) {
  const data = records.map((r) => ({
    day: dayjs(r.date).format('D MMM'),
    hours: Number(totalHoursForSegments(r.segments).toFixed(2)),
  }))

  return (
    <Paper p="md" radius="md" withBorder>
      <Text fw={600} mb="md">
        Часы по дням
      </Text>
      <BarChart
        h={220}
        data={data}
        dataKey="day"
        series={[{ name: 'hours', color: 'blue.6', label: 'Часы' }]}
        tickLine="none"
        gridAxis="y"
        withTooltip
      />
    </Paper>
  )
}

export function ChartSkeleton() {
  return (
    <Paper p="md" radius="md" withBorder className="animate-pulse">
      <div className="h-4 bg-zinc-700 rounded mb-4 w-32" />
      <div className="h-[220px] bg-zinc-700/40 rounded" />
    </Paper>
  )
}
