'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import type { MonthlyStats } from '@/types'

export function monthlyStatsQueryKey(month: Date) {
  return ['monthly-stats', dayjs(month).format('YYYY-MM')]
}

export function useMonthlyStats(month: Date) {
  return useQuery({
    queryKey: monthlyStatsQueryKey(month),
    queryFn: async (): Promise<MonthlyStats> => {
      const res = await fetch(
        `/api/stats?month=${dayjs(month).format('YYYY-MM-DD')}`,
      )
      if (!res.ok) throw new Error('Failed to fetch monthly stats')
      const json = await res.json()
      return {
        totalHours: json.totalHours,
        totalDays: json.totalDays,
        avgHoursPerDay: json.avgHoursPerDay,
        earnings: json.earning?.amount ?? 0,
      }
    },
  })
}
