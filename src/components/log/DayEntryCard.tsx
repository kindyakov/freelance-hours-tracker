import { memo } from 'react'
import { Paper, Text, Group, Badge, ActionIcon, Tooltip } from '@mantine/core'
import { Pencil, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import { totalHoursForSegments } from '@/lib/utils/time'
import { formatHours } from '@/lib/utils/format'
import { CATEGORY_META } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'

type Segment = { start: string; end: string; order: number; category: ActivityCategory }
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
          <Badge variant="light" color="orange">
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
        {record.segments.map((seg, i) => {
          const meta = CATEGORY_META[seg.category]
          return (
            <Badge key={i} variant="light" size="sm" color={meta.badgeColor}>
              {meta.label} · {seg.start}–{seg.end}
            </Badge>
          )
        })}
      </div>

      {record.notes ? (
        <Text size="xs" c="dimmed" mt="xs">
          {record.notes}
        </Text>
      ) : null}
    </Paper>
  )
})
