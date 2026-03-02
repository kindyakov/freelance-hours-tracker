import { Table, Badge, Text, ActionIcon, Tooltip } from '@mantine/core'
import { Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import { formatHours } from '@/lib/utils/format'
import { totalHoursForSegments } from '@/lib/utils/time'

type Segment = { start: string; end: string }
type Record = {
  id: string
  date: string | Date
  notes: string | null
  segments: Segment[]
}

type Props = {
  records: Record[]
  onDelete?: (id: string) => void
}

export function DailyTable({ records, onDelete }: Props) {
  return (
    <Table.ScrollContainer minWidth={480}>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Segments</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Notes</Table.Th>
            {onDelete ? <Table.Th /> : null}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <Table.Tr key={record.id}>
                <Table.Td>{dayjs(record.date).format('D MMM')}</Table.Td>
                <Table.Td>
                  <div className="flex flex-wrap gap-1">
                    {record.segments.map((seg, i) => (
                      <Badge key={i} variant="outline" size="sm">
                        {seg.start}–{seg.end}
                      </Badge>
                    ))}
                  </div>
                </Table.Td>
                <Table.Td>
                  <Text fw={600}>
                    {formatHours(totalHoursForSegments(record.segments))}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed" truncate maw={200}>
                    {record.notes ?? '—'}
                  </Text>
                </Table.Td>
                {onDelete ? (
                  <Table.Td>
                    <Tooltip label="Delete record">
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() => onDelete(record.id)}
                        aria-label="Delete record"
                      >
                        <Trash2 size={14} />
                      </ActionIcon>
                    </Tooltip>
                  </Table.Td>
                ) : null}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={onDelete ? 5 : 4}>
                <Text c="dimmed" ta="center" py="md">
                  No records this month.
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}
