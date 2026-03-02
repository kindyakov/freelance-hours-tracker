'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { upsertRecord, deleteRecord } from '@/actions/records'
import type { AddRecordInput } from '@/lib/utils/schemas'

export function recordsQueryKey(month: Date) {
  return ['records', dayjs(month).format('YYYY-MM')]
}

export function useRecords(month: Date) {
  return useQuery({
    queryKey: recordsQueryKey(month),
    queryFn: async () => {
      const res = await fetch(
        `/api/stats?month=${dayjs(month).format('YYYY-MM-DD')}`,
      )
      if (!res.ok) throw new Error('Failed to fetch records')
      const json = await res.json()
      return json.records as Awaited<ReturnType<typeof import('@/app/api/stats/route')['GET']>> extends never
        ? never
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          any[]
    },
  })
}

export function useUpsertRecord(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: AddRecordInput) => upsertRecord(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: recordsQueryKey(month) })
      qc.invalidateQueries({ queryKey: ['monthly-stats', dayjs(month).format('YYYY-MM')] })
    },
  })
}

export function useDeleteRecord(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (recordId: string) => deleteRecord(recordId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: recordsQueryKey(month) })
      qc.invalidateQueries({ queryKey: ['monthly-stats', dayjs(month).format('YYYY-MM')] })
    },
  })
}
