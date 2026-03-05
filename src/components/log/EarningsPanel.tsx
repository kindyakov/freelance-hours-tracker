'use client'

import { useState } from 'react'
import {
  NumberInput,
  Button,
  Group,
  Text,
  ActionIcon,
  Tooltip,
  Skeleton,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import dayjs from 'dayjs'
import { useAppStore } from '@/store/useAppStore'
import {
  useEarningEntries,
  useCreateEarningEntry,
  useUpdateEarningEntry,
  useDeleteEarningEntry,
} from '@/lib/queries/useEarnings'
import { formatRub } from '@/lib/utils/format'
import type { EarningEntry } from '@/types'

export function EarningsPanel() {
  const { selectedMonth } = useAppStore()
  const { data, isLoading } = useEarningEntries(selectedMonth)
  const { mutateAsync: create, isPending: isCreating } = useCreateEarningEntry(selectedMonth)
  const { mutateAsync: update } = useUpdateEarningEntry(selectedMonth)
  const { mutateAsync: remove } = useDeleteEarningEntry(selectedMonth)

  // Add form state
  const monthStart = dayjs(selectedMonth).startOf('month').toDate()
  const monthEnd   = dayjs(selectedMonth).endOf('month').toDate()
  const todayInMonth = (() => {
    const today = new Date()
    if (today >= monthStart && today <= monthEnd) return today
    return monthEnd
  })()

  const [addDate, setAddDate]     = useState<Date | null>(todayInMonth)
  const [addAmount, setAddAmount] = useState<number | string>('')

  // Inline edit state: id → edited amount
  const [editingId, setEditingId]       = useState<string | null>(null)
  const [editAmount, setEditAmount]     = useState<number | string>('')

  async function handleAdd() {
    if (!addDate || !addAmount) return
    try {
      await create({
        date:     dayjs(addDate).format('YYYY-MM-DD'),
        amount:   Number(addAmount),
        currency: 'RUB',
      })
      setAddAmount('')
      notifications.show({ title: 'Добавлено', message: formatRub(Number(addAmount)), color: 'green' })
    } catch {
      notifications.show({ title: 'Ошибка', message: 'Не удалось добавить запись', color: 'red' })
    }
  }

  function startEdit(entry: EarningEntry) {
    setEditingId(entry.id)
    setEditAmount(entry.amount)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditAmount('')
  }

  async function handleUpdate(id: string) {
    try {
      await update({ id, amount: Number(editAmount) })
      setEditingId(null)
      notifications.show({ title: 'Обновлено', message: formatRub(Number(editAmount)), color: 'green' })
    } catch {
      notifications.show({ title: 'Ошибка', message: 'Не удалось обновить запись', color: 'red' })
    }
  }

  async function handleDelete(id: string, amount: number) {
    try {
      await remove(id)
      notifications.show({ title: 'Удалено', message: formatRub(amount), color: 'orange' })
    } catch {
      notifications.show({ title: 'Ошибка', message: 'Не удалось удалить запись', color: 'red' })
    }
  }

  const entries = data?.entries ?? []
  const total   = data?.total ?? 0

  return (
    <div
      className='flex-1/3 rounded-xl border border-white/5 overflow-hidden'
      style={{ background: 'var(--mantine-color-dark-7)' }}
    >
      {/* Header */}
      <div
        className='flex items-center justify-between px-4 py-3'
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <Text fw={600} size='sm' tt='uppercase' style={{ color: 'var(--mantine-color-dark-2)', letterSpacing: '0.05em' }}>
          Заработок · {dayjs(selectedMonth).format('MMMM YYYY')}
        </Text>
        {isLoading ? (
          <Skeleton h={18} w={80} radius='sm' />
        ) : (
          <Text fw={700} size='sm' style={{ color: 'var(--mantine-color-orange-4)' }}>
            {formatRub(total)}
          </Text>
        )}
      </div>

      {/* Entries list */}
      <div className='flex flex-col'>
        {isLoading ? (
          [0, 1].map(i => (
            <div key={i} className='flex items-center gap-3 px-4 py-3' style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <Skeleton h={14} w={50} radius='sm' />
              <Skeleton h={14} w={80} radius='sm' className='flex-1' />
            </div>
          ))
        ) : entries.length === 0 ? (
          <div className='px-4 py-4'>
            <Text size='sm' style={{ color: 'var(--mantine-color-dark-3)' }}>
              Записей нет — добавьте первую ниже.
            </Text>
          </div>
        ) : (
          entries.map((entry, idx) => (
            <div
              key={entry.id}
              className='flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/3'
              style={idx < entries.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.04)' } : undefined}
            >
              <Text size='sm' fw={500} w={50} style={{ color: 'var(--mantine-color-dark-2)', flexShrink: 0 }}>
                {dayjs(entry.date).format('D MMM')}
              </Text>

              {editingId === entry.id ? (
                <>
                  <NumberInput
                    value={editAmount}
                    onChange={setEditAmount}
                    min={1}
                    step={1000}
                    hideControls
                    size='xs'
                    className='flex-1'
                    rightSection={<Text size='xs' c='dimmed'>₽</Text>}
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleUpdate(entry.id)
                      if (e.key === 'Escape') cancelEdit()
                    }}
                  />
                  <ActionIcon variant='subtle' color='green' size='sm' onClick={() => handleUpdate(entry.id)}>
                    <Check size={14} />
                  </ActionIcon>
                  <ActionIcon variant='subtle' color='gray' size='sm' onClick={cancelEdit}>
                    <X size={14} />
                  </ActionIcon>
                </>
              ) : (
                <>
                  <Text size='sm' fw={600} className='flex-1' style={{ color: 'var(--mantine-color-dark-0)' }}>
                    {formatRub(entry.amount)}
                  </Text>
                  <Tooltip label='Редактировать'>
                    <ActionIcon variant='subtle' color='gray' size='sm' onClick={() => startEdit(entry)}>
                      <Pencil size={13} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label='Удалить'>
                    <ActionIcon variant='subtle' color='red' size='sm' onClick={() => handleDelete(entry.id, entry.amount)}>
                      <Trash2 size={13} />
                    </ActionIcon>
                  </Tooltip>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add form */}
      <div
        className='px-4 py-3 flex items-end gap-2'
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <DateInput
          label='Дата'
          value={addDate}
          onChange={(v: string | null) => setAddDate(v ? new Date(v) : null)}
          minDate={monthStart}
          maxDate={monthEnd}
          valueFormat='D MMM'
          size='xs'
          className='w-28'
          clearable={false}
        />
        <NumberInput
          label='Сумма (₽)'
          value={addAmount}
          onChange={setAddAmount}
          placeholder='10 000'
          min={1}
          step={1000}
          hideControls
          size='xs'
          className='flex-1'
        />
        <Button
          size='xs'
          onClick={handleAdd}
          loading={isCreating}
          disabled={!addAmount || !addDate}
        >
          Добавить
        </Button>
      </div>
    </div>
  )
}
