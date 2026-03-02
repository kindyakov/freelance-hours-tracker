import { memo } from 'react'
import { Paper, Text, Group, Badge, ActionIcon, Tooltip } from '@mantine/core'
import { Pencil, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import { totalHoursForSegments } from '@/lib/utils/time'
import { formatHours } from '@/lib/utils/format'

type Segment = { start: string; end: string; order: number }
type Record = {
  id: string
  date: string | Date
  notes: string | null
  segments: Segment[]
}

type Props = {
  record: Record
  onEdit: (date: string) => void
  onDelete: (id: string) => void
}

export const DayEntryCard = memo(function DayEntryCard({
  record,
  onEdit,
  onDelete,
}: Props) {
  const totalHours = totalHoursForSegments(record.segments)

  return (
    <Paper p="sm" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={600}>{dayjs(record.date).format('ddd, D MMM')}</Text>
        <Group gap="xs">
          <Badge variant="light" color="blue">
            {formatHours(totalHours)}
          </Badge>
          <Tooltip label="Редактировать">
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={() => onEdit(dayjs(record.date).format('YYYY-MM-DD'))}
              aria-label="Редактировать запись"
            >
              <Pencil size={14} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Удалить">
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={() => onDelete(record.id)}
              aria-label="Удалить запись"
            >
              <Trash2 size={14} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <div className="flex flex-wrap gap-1">
        {record.segments.map((seg, i) => (
          <Badge key={i} variant="outline" size="sm">
            {seg.start}–{seg.end}
          </Badge>
        ))}
      </div>

      {record.notes ? (
        <Text size="xs" c="dimmed" mt="xs">
          {record.notes}
        </Text>
      ) : null}
    </Paper>
  )
})
