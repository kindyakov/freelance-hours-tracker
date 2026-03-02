'use client'

import { Stack, Title, SimpleGrid, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { DayEntryForm } from '@/components/log/DayEntryForm'
import { DayEntryCard } from '@/components/log/DayEntryCard'
import { EarningsInput } from '@/components/log/EarningsInput'
import { useAppStore } from '@/store/useAppStore'
import { useRecords, useDeleteRecord } from '@/lib/queries/useRecords'
import { useEarnings } from '@/lib/queries/useEarnings'
import dayjs from 'dayjs'

export default function LogPage() {
  const { selectedMonth, setEditingDate } = useAppStore()
  const { data: records = [], isLoading } = useRecords(selectedMonth)
  const { data: earning } = useEarnings(selectedMonth)
  const { mutateAsync: deleteRecord } = useDeleteRecord(selectedMonth)

  async function handleDelete(id: string) {
    try {
      await deleteRecord(id)
      notifications.show({
        title: 'Удалено',
        message: 'Запись удалена',
        color: 'orange',
      })
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось удалить запись',
        color: 'red',
      })
    }
  }

  function handleEdit(date: string) {
    setEditingDate(date)
    // Scroll to the form — simple UX without opening a modal
    document.getElementById('day-entry-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const monthLabel = dayjs(selectedMonth).format('MMMM YYYY')

  return (
    <Stack gap="lg">
      <Title order={2}>Учёт часов</Title>

      <EarningsInput initialAmount={earning?.amount} />

      <div id="day-entry-form">
        <DayEntryForm />
      </div>

      <div>
        <Title order={4} mb="sm">
          {monthLabel} — {records.length} {records.length === 1 ? 'день' : records.length < 5 ? 'дня' : 'дней'}
        </Title>

        {isLoading ? (
          <Text c="dimmed">Загрузка…</Text>
        ) : records.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="sm">
            {records.map((record) => (
              <DayEntryCard
                key={record.id}
                record={record}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text c="dimmed" ta="center" py="xl">
            Записей за {monthLabel} нет. Добавьте выше.
          </Text>
        )}
      </div>
    </Stack>
  )
}
