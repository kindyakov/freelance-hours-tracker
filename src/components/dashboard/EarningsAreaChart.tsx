'use client'

import { AreaChart } from '@mantine/charts'
import { Paper, Text } from '@mantine/core'
import dayjs from 'dayjs'

type EarningPoint = {
  month: string | Date
  amount: number
}

type Props = { data: EarningPoint[] }

export default function EarningsAreaChart({ data }: Props) {
  const chartData = data.map((e) => ({
    month: dayjs(e.month).format('MMM YY'),
    earnings: e.amount,
  }))

  return (
    <Paper p="md" radius="md" withBorder>
      <Text fw={600} mb="md">
        Earnings Trend
      </Text>
      <AreaChart
        h={220}
        data={chartData}
        dataKey="month"
        series={[{ name: 'earnings', color: 'green.6', label: 'Earnings (₽)' }]}
        tickLine="none"
        gridAxis="y"
        withTooltip
        curveType="monotone"
        fillOpacity={0.2}
      />
    </Paper>
  )
}
