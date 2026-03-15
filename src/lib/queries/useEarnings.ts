'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  createEarningEntry,
  updateEarningEntry,
  deleteEarningEntry,
} from '@/actions/earnings'
import type { CreateEarningEntryInput, UpdateEarningEntryInput } from '@/lib/utils/schemas'
import type { EarningEntry } from '@/types'
import { monthlyStatsQueryKey } from './useMonthlyStats'

export function earningsQueryKey(month: Date) {
  return ['earnings', dayjs(month).format('YYYY-MM')]
}

export function allEarningsQueryKey() {
  return ['earnings', 'all']
}

function invalidateEarnings(qc: ReturnType<typeof useQueryClient>, month: Date) {
  qc.invalidateQueries({ queryKey: earningsQueryKey(month) })
  qc.invalidateQueries({ queryKey: allEarningsQueryKey() })
  qc.invalidateQueries({ queryKey: monthlyStatsQueryKey(month) })
}

export function useEarningEntries(month: Date) {
  return useQuery({
    queryKey: earningsQueryKey(month),
    queryFn: async (): Promise<{ entries: EarningEntry[]; total: number }> => {
      const res = await fetch(`/api/earnings?month=${dayjs(month).format('YYYY-MM-DD')}`)
      if (!res.ok) throw new Error('Failed to fetch earnings')
      return res.json()
    },
  })
}

export function useAllEarningEntries() {
  return useQuery({
    queryKey: allEarningsQueryKey(),
    queryFn: async (): Promise<EarningEntry[]> => {
      const res = await fetch('/api/earnings?scope=all')
      if (!res.ok) throw new Error('Failed to fetch all earnings')
      const json = await res.json()
      return json.entries as EarningEntry[]
    },
  })
}

export function useCreateEarningEntry(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateEarningEntryInput) => createEarningEntry(input),
    onSuccess: (entry) => {
      invalidateEarnings(qc, month)
      invalidateEarnings(qc, dayjs(entry.date).toDate())
    },
  })
}

export function useUpdateEarningEntry(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateEarningEntryInput) => updateEarningEntry(input),
    onSuccess: (entry) => {
      invalidateEarnings(qc, month)
      invalidateEarnings(qc, dayjs(entry.date).toDate())
    },
  })
}

export function useDeleteEarningEntry(month: Date) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteEarningEntry(id),
    onSuccess: (entry) => {
      invalidateEarnings(qc, month)
      if (entry?.date) invalidateEarnings(qc, dayjs(entry.date).toDate())
    },
  })
}
