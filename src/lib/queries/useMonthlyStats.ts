'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import type { DayRecord, MonthlyStats } from '@/types'
import { CATEGORY_ORDER } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'

export function monthlyStatsQueryKey(month: Date) {
  return ['monthly-stats', dayjs(month).format('YYYY-MM')]
}

type MonthlyStatsApiResponse = {
  records: DayRecord[]
  earnings: number
  totalHours: number
  totalDays: number
  avgHoursPerDay: number
  byCategory: Partial<Record<ActivityCategory, number>>
}

async function fetchMonthlyStats(month: Date): Promise<MonthlyStatsApiResponse> {
  const res = await fetch(`/api/stats?month=${dayjs(month).format('YYYY-MM-DD')}`)
  if (!res.ok) throw new Error('Failed to fetch monthly stats')
  return res.json()
}

export function useMonthlyStatsWithRecords(month: Date) {
  return useQuery({
    queryKey: monthlyStatsQueryKey(month),
    queryFn: () => fetchMonthlyStats(month),
  })
}

export function useMonthlyStats(month: Date) {
  return useQuery({
    queryKey: monthlyStatsQueryKey(month),
    queryFn: () => fetchMonthlyStats(month),
    select: (json): MonthlyStats => {
      const byCategory = Object.fromEntries(
        CATEGORY_ORDER.map((c) => [c, json.byCategory?.[c] ?? 0]),
      ) as Record<ActivityCategory, number>

      return {
        totalHours: json.totalHours,
        totalDays: json.totalDays,
        avgHoursPerDay: json.avgHoursPerDay,
        earnings: json.earnings ?? 0,
        byCategory,
      }
    },
  })
}
