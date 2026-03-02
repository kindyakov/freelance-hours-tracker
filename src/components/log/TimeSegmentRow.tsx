import { memo } from 'react'
import { Group, TextInput, ActionIcon, Text } from '@mantine/core'
import { Trash2 } from 'lucide-react'
import { calcHours, detectMidnight } from '@/lib/utils/time'
import { formatHours } from '@/lib/utils/format'

type Props = {
  index: number
  start: string
  end: string
  onStartChange: (value: string) => void
  onEndChange: (value: string) => void
  onRemove: () => void
  canRemove: boolean
  startError?: string
  endError?: string
}

export const TimeSegmentRow = memo(function TimeSegmentRow({
  index,
  start,
  end,
  onStartChange,
  onEndChange,
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
      <TextInput
        label={index === 0 ? 'Начало' : undefined}
        placeholder="09:00"
        value={start}
        onChange={(e) => onStartChange(e.currentTarget.value)}
        error={startError}
        size="sm"
        className="w-24"
        aria-label={`Промежуток ${index + 1} начало`}
      />
      <TextInput
        label={index === 0 ? 'Конец' : undefined}
        placeholder="17:30"
        value={end}
        onChange={(e) => onEndChange(e.currentTarget.value)}
        error={endError}
        size="sm"
        className="w-24"
        aria-label={`Промежуток ${index + 1} конец`}
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
