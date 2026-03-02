'use client'

import { useState, useCallback } from 'react'
import {
  Button,
  TextInput,
  Textarea,
  Stack,
  Group,
  Paper,
  Text,
  Divider,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import { Plus } from 'lucide-react'
import dayjs from 'dayjs'
import { TimeSegmentRow } from './TimeSegmentRow'
import { useUpsertRecord } from '@/lib/queries/useRecords'
import { useAppStore } from '@/store/useAppStore'
import { totalHoursForSegments } from '@/lib/utils/time'
import { formatHours } from '@/lib/utils/format'

type SegmentDraft = { start: string; end: string; order: number }

const emptySegment = (order: number): SegmentDraft => ({
  start: '',
  end: '',
  order,
})

export function DayEntryForm() {
  const { selectedMonth } = useAppStore()
  const { mutateAsync, isPending } = useUpsertRecord(selectedMonth)

  const [date, setDate] = useState<Date | null>(new Date())
  const [segments, setSegments] = useState<SegmentDraft[]>([emptySegment(0)])
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const addSegment = useCallback(() => {
    setSegments((prev) => [...prev, emptySegment(prev.length)])
  }, [])

  const removeSegment = useCallback((index: number) => {
    setSegments((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const updateSegment = useCallback(
    (index: number, field: 'start' | 'end', value: string) => {
      setSegments((prev) =>
        prev.map((seg, i) => (i === index ? { ...seg, [field]: value } : seg)),
      )
    },
    [],
  )

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    const timeRegex = /^\d{2}:\d{2}$/

    if (!date) {
      newErrors.date = 'Укажите дату'
    }

    segments.forEach((seg, i) => {
      if (!timeRegex.test(seg.start)) {
        newErrors[`seg-${i}-start`] = 'Формат ЧЧ:ММ'
      }
      if (!timeRegex.test(seg.end)) {
        newErrors[`seg-${i}-end`] = 'Формат ЧЧ:ММ'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    try {
      await mutateAsync({
        date: dayjs(date).format('YYYY-MM-DD'),
        notes: notes.trim() || undefined,
        segments,
      })
      notifications.show({
        title: 'Запись сохранена',
        message: `Записано ${formatHours(totalHoursForSegments(segments))} за ${dayjs(date).format('D MMM')}`,
        color: 'green',
      })
      // Reset form
      setSegments([emptySegment(0)])
      setNotes('')
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось сохранить запись',
        color: 'red',
      })
    }
  }

  const validSegments = segments.filter(
    (s) => /^\d{2}:\d{2}$/.test(s.start) && /^\d{2}:\d{2}$/.test(s.end),
  )
  const totalHours = totalHoursForSegments(validSegments)

  return (
    <Paper p="md" radius="md" withBorder>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <DateInput
            label="Дата"
            placeholder="Выберите дату"
            value={date}
            onChange={(v) => setDate(v ? new Date(v) : null)}
            error={errors.date}
            maxDate={new Date()}
          />

          <div>
            <Text size="sm" fw={500} mb="xs">
              Временные промежутки
            </Text>
            <Stack gap="xs">
              {segments.map((seg, i) => (
                <TimeSegmentRow
                  key={i}
                  index={i}
                  start={seg.start}
                  end={seg.end}
                  onStartChange={(v) => updateSegment(i, 'start', v)}
                  onEndChange={(v) => updateSegment(i, 'end', v)}
                  onRemove={() => removeSegment(i)}
                  canRemove={segments.length > 1}
                  startError={errors[`seg-${i}-start`]}
                  endError={errors[`seg-${i}-end`]}
                />
              ))}
            </Stack>
            <Button
              variant="subtle"
              size="xs"
              leftSection={<Plus size={14} />}
              onClick={addSegment}
              mt="xs"
            >
              Добавить промежуток
            </Button>
          </div>

          {totalHours > 0 ? (
            <Text size="sm" c="blue">
              Итого: {formatHours(totalHours)}
            </Text>
          ) : null}

          <Divider />

          <Textarea
            label="Заметки (необязательно)"
            placeholder="Над чем работали?"
            value={notes}
            onChange={(e) => setNotes(e.currentTarget.value)}
            maxLength={500}
            autosize
            minRows={2}
          />

          <Group justify="flex-end">
            <Button type="submit" loading={isPending}>
              Сохранить
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
