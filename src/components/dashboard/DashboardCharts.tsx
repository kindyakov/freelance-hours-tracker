'use client'

import dynamic from 'next/dynamic'
import { ChartSkeleton } from './HoursBarChart'
import type { ActivityCategory } from '@prisma/client'

// dynamic() with ssr:false must live in a Client Component.
// Recharts (~200 kb gzipped) is kept out of the server bundle.
const HoursBarChart = dynamic(() => import('./HoursBarChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
})

const EarningsAreaChart = dynamic(() => import('./EarningsAreaChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
})

type Segment = {
  start: string
  end: string
  category: ActivityCategory
}

type DayRecord = {
  date: string | Date
  segments: Segment[]
}

type EarningPoint = {
  month: string | Date
  amount: number
}

type Props = {
  records: DayRecord[]
  allEarnings: EarningPoint[]
}

export function DashboardCharts({ records, allEarnings }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <HoursBarChart records={records} />
      <EarningsAreaChart data={allEarnings} />
    </div>
  )
}
