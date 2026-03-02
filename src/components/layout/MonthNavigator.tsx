'use client'

import { ActionIcon, Text } from '@mantine/core'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from 'dayjs'
import { useAppStore } from '@/store/useAppStore'

export function MonthNavigator() {
  const { selectedMonth, setSelectedMonth } = useAppStore()
  const current = dayjs(selectedMonth)

  function prev() {
    setSelectedMonth(current.subtract(1, 'month').startOf('month').toDate())
  }

  function next() {
    setSelectedMonth(current.add(1, 'month').startOf('month').toDate())
  }

  return (
    <div className="flex items-center gap-2">
      <ActionIcon variant="subtle" onClick={prev} aria-label="Previous month">
        <ChevronLeft size={16} />
      </ActionIcon>
      <Text fw={600} size="sm" className="min-w-28 text-center">
        {current.format('MMMM YYYY')}
      </Text>
      <ActionIcon variant="subtle" onClick={next} aria-label="Next month">
        <ChevronRight size={16} />
      </ActionIcon>
    </div>
  )
}
