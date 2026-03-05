import { memo } from 'react'
import { Group, ActionIcon, Text, Select } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { Trash2 } from 'lucide-react'
import { calcHours, detectMidnight } from '@/lib/utils/time'
import { formatHours } from '@/lib/utils/format'
import { CATEGORY_SELECT_DATA } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'

type Props = {
  index: number
  start: string
  end: string
  category: ActivityCategory
  onStartChange: (value: string) => void
  onEndChange: (value: string) => void
  onCategoryChange: (value: ActivityCategory) => void
  onRemove: () => void
  canRemove: boolean
  startError?: string
  endError?: string
}

export const TimeSegmentRow = memo(function TimeSegmentRow({
  index,
  start,
  end,
  category,
  onStartChange,
  onEndChange,
  onCategoryChange,
  onRemove,
  canRemove,
  startError,
  endError,
}: Props) {
  const isValid =
    /^\d{2}:\d{2}$/.test(start) && /^\d{2}:\d{2}$/.test(end)
  const hours = isValid ? calcHours(start, end) : null
  const midnight = isValid ? detectMidnight(start, end) : false

  return (
    <Group align="flex-start" gap="sm">
      <TimeInput
        label={index === 0 ? 'Начало' : undefined}
        value={start}
        onChange={(e) => onStartChange(e.currentTarget.value)}
        error={startError}
        size="sm"
        className="w-28"
        aria-label={`Промежуток ${index + 1} начало`}
      />
      <TimeInput
        label={index === 0 ? 'Конец' : undefined}
        value={end}
        onChange={(e) => onEndChange(e.currentTarget.value)}
        error={endError}
        size="sm"
        className="w-28"
        aria-label={`Промежуток ${index + 1} конец`}
      />
      <Select
        label={index === 0 ? 'Категория' : undefined}
        data={CATEGORY_SELECT_DATA}
        value={category}
        onChange={(v) => { if (v) onCategoryChange(v as ActivityCategory) }}
        allowDeselect={false}
        size="sm"
        className="w-36"
        aria-label={`Промежуток ${index + 1} категория`}
      />

      {hours !== null ? (
        <div className={`${index === 0 ? 'mt-6' : ''} flex items-center`}>
          <Text size="sm" c={midnight ? 'orange' : 'dimmed'}>
            {formatHours(hours)}
            {midnight ? ' +1d' : ''}
          </Text>
        </div>
      ) : null}

      <ActionIcon
        variant="subtle"
        color="red"
        onClick={onRemove}
        disabled={!canRemove}
        className={index === 0 ? 'mt-6' : ''}
        aria-label="Удалить промежуток"
      >
        <Trash2 size={14} />
      </ActionIcon>
    </Group>
  )
})
