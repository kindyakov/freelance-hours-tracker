'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { upsertRecord, deleteRecord } from '@/actions/records'
import type { AddRecordInput } from '@/lib/utils/schemas'
import { monthlyStatsQueryKey } from './useMonthlyStats'
import type { DayRecord } from '@/types'

export function recordsQueryKey(month: Date) {
  return ['records', dayjs(month).format('YYYY-MM')]
}

export function allRecordsQueryKey() {
  return ['records', 'all']
}

export function useRecords(month: Date) {
  return useQuery({
    queryKey: recordsQueryKey(month),
    queryFn: async (): Promise<DayRecord[]> => {
      const res = await fetch(`/api/records?month=${dayjs(month).format('YYYY-MM-DD')}`)
      if (!res.ok) throw new Error('Failed to fetch records')
      const json = await res.json()
      return json.records as DayRecord[]
    },
  })
}

export function useAllRecords() {
  return useQuery({
    queryKey: allRecordsQueryKey(),
    queryFn: async (): Promise<DayRecord[]> => {
      const res = await fetch('/api/records?scope=all')
      if (!res.ok) throw new Error('Failed to fetch all records')
      const json = await res.json()
      return json.records as DayRecord[]
    },
  })
}

export function useUpsertRecord(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: AddRecordInput) => upsertRecord(input),
    onSuccess: (record) => {
      const affectedMonth = dayjs(record.date).toDate()
      qc.invalidateQueries({ queryKey: recordsQueryKey(month) })
      qc.invalidateQueries({ queryKey: recordsQueryKey(affectedMonth) })
      qc.invalidateQueries({ queryKey: allRecordsQueryKey() })
      qc.invalidateQueries({ queryKey: monthlyStatsQueryKey(month) })
      qc.invalidateQueries({ queryKey: monthlyStatsQueryKey(affectedMonth) })
    },
  })
}

export function useDeleteRecord(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (recordId: string) => deleteRecord(recordId),
    onSuccess: (deletedRecord) => {
      const affectedMonth = deletedRecord?.date
        ? dayjs(deletedRecord.date).toDate()
        : month
      qc.invalidateQueries({ queryKey: recordsQueryKey(month) })
      qc.invalidateQueries({ queryKey: recordsQueryKey(affectedMonth) })
      qc.invalidateQueries({ queryKey: allRecordsQueryKey() })
      qc.invalidateQueries({ queryKey: monthlyStatsQueryKey(month) })
      qc.invalidateQueries({ queryKey: monthlyStatsQueryKey(affectedMonth) })
    },
  })
}
