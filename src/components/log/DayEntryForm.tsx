'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  Button,
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
import {
  createDayEntryFormState,
  emptySegment,
  type SegmentDraft,
} from './day-entry-form-state'
import { useUpsertRecord, useRecords } from '@/lib/queries/useRecords'
import { useAppStore } from '@/store/useAppStore'
import { totalHoursForSegments } from '@/lib/utils/time'
import { formatHours } from '@/lib/utils/format'
import type { ActivityCategory, DayRecord } from '@/types'

function DayEntryFormInner({
  selectedMonth,
  editingDate,
  editingRecord,
  onClearEditing,
}: {
  selectedMonth: Date
  editingDate: string | null
  editingRecord: DayRecord | null
  onClearEditing: () => void
}) {
  const initialState = useMemo(
    () => createDayEntryFormState({ editingDate, record: editingRecord }),
    [editingDate, editingRecord],
  )

  const { mutateAsync, isPending } = useUpsertRecord(selectedMonth)
  const [date, setDate] = useState<Date | null>(initialState.date)
  const [segments, setSegments] = useState<SegmentDraft[]>(initialState.segments)
  const [notes, setNotes] = useState(initialState.notes)
  const [errors, setErrors] = useState<Record<string, string>>(initialState.errors)

  const resetForm = useCallback(() => {
    const nextState = createDayEntryFormState({ editingDate: null, record: null })
    setDate(nextState.date)
    setSegments(nextState.segments)
    setNotes(nextState.notes)
    setErrors(nextState.errors)
  }, [])

  const addSegment = useCallback(() => {
    setSegments(prev => [...prev, emptySegment(prev.length)])
  }, [])

  const removeSegment = useCallback((index: number) => {
    setSegments(prev => prev.filter((_, i) => i !== index))
  }, [])

  const updateSegment = useCallback(
    (index: number, field: 'start' | 'end', value: string) => {
      setSegments(prev =>
        prev.map((segment, i) =>
          i === index ? { ...segment, [field]: value } : segment,
        ),
      )
    },
    [],
  )

  const updateCategory = useCallback((index: number, value: ActivityCategory) => {
    setSegments(prev =>
      prev.map((segment, i) =>
        i === index ? { ...segment, category: value } : segment,
      ),
    )
  }, [])

  function handleCancel() {
    onClearEditing()
    resetForm()
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    const timeRegex = /^\d{2}:\d{2}$/

    if (!date) {
      newErrors.date = 'Укажите дату'
    }

    segments.forEach((segment, index) => {
      if (!timeRegex.test(segment.start)) {
        newErrors[`seg-${index}-start`] = 'Формат ЧЧ:ММ'
      }
      if (!timeRegex.test(segment.end)) {
        newErrors[`seg-${index}-end`] = 'Формат ЧЧ:ММ'
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
      onClearEditing()
      resetForm()
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось сохранить запись',
        color: 'red',
      })
    }
  }

  const validSegments = segments.filter(
    segment =>
      /^\d{2}:\d{2}$/.test(segment.start) &&
      /^\d{2}:\d{2}$/.test(segment.end),
  )
  const totalHours = totalHoursForSegments(validSegments)

  return (
    <Paper p='md' radius='md' withBorder className='flex-2/3'>
      <form onSubmit={handleSubmit}>
        <Stack gap='md'>
          <DateInput
            label='Дата'
            placeholder='Выберите дату'
            value={date}
            onChange={value => setDate(value ? new Date(value) : null)}
            error={errors.date}
            maxDate={new Date()}
          />

          <div>
            <Text size='sm' fw={500} mb='xs'>
              Временные промежутки
            </Text>
            <Stack gap='xs'>
              {segments.map((segment, index) => (
                <TimeSegmentRow
                  key={index}
                  index={index}
                  start={segment.start}
                  end={segment.end}
                  category={segment.category}
                  onStartChange={value => updateSegment(index, 'start', value)}
                  onEndChange={value => updateSegment(index, 'end', value)}
                  onCategoryChange={value => updateCategory(index, value)}
                  onRemove={() => removeSegment(index)}
                  canRemove={segments.length > 1}
                  startError={errors[`seg-${index}-start`]}
                  endError={errors[`seg-${index}-end`]}
                />
              ))}
            </Stack>
            <Button
              variant='subtle'
              size='xs'
              leftSection={<Plus size={14} />}
              onClick={addSegment}
              mt='xs'
            >
              Добавить промежуток
            </Button>
          </div>

          {totalHours > 0 ? (
            <Text size='sm' c='blue'>
              Итого: {formatHours(totalHours)}
            </Text>
          ) : null}

          <Divider />

          <Textarea
            label='Заметки (необязательно)'
            placeholder='Над чем работали?'
            value={notes}
            onChange={e => setNotes(e.currentTarget.value)}
            maxLength={500}
            autosize
            minRows={2}
          />

          <Group justify='flex-end'>
            {editingDate ? (
              <Button
                variant='subtle'
                color='gray'
                type='button'
                onClick={handleCancel}
              >
                Отменить
              </Button>
            ) : null}
            <Button type='submit' loading={isPending}>
              {editingDate ? 'Сохранить изменения' : 'Сохранить'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}

export function DayEntryForm() {
  const { selectedMonth, editingDate, setEditingDate } = useAppStore()
  const { data: records = [] } = useRecords(selectedMonth)

  const editingRecord = useMemo(
    () =>
      editingDate
        ? (records.find(
            record => dayjs(record.date).format('YYYY-MM-DD') === editingDate,
          ) ?? null)
        : null,
    [editingDate, records],
  )

  const formKey = editingDate
    ? `edit:${editingDate}:${editingRecord?.id ?? 'pending'}`
    : `new:${dayjs(selectedMonth).format('YYYY-MM')}`

  return (
    <DayEntryFormInner
      key={formKey}
      selectedMonth={selectedMonth}
      editingDate={editingDate}
      editingRecord={editingRecord}
      onClearEditing={() => setEditingDate(null)}
    />
  )
}
