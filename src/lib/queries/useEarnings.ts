'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { upsertEarnings } from '@/actions/earnings'
import type { UpsertEarningsInput } from '@/lib/utils/schemas'

export function earningsQueryKey(month: Date) {
  return ['earnings', dayjs(month).format('YYYY-MM')]
}

export function useEarnings(month: Date) {
  return useQuery({
    queryKey: earningsQueryKey(month),
    queryFn: async () => {
      const res = await fetch(
        `/api/stats?month=${dayjs(month).format('YYYY-MM-DD')}`,
      )
      if (!res.ok) throw new Error('Failed to fetch earnings')
      const json = await res.json()
      return json.earning as { id: string; amount: number; currency: string } | null
    },
  })
}

export function useUpsertEarnings(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: UpsertEarningsInput) => upsertEarnings(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: earningsQueryKey(month) })
      qc.invalidateQueries({ queryKey: ['monthly-stats', dayjs(month).format('YYYY-MM')] })
    },
  })
}
