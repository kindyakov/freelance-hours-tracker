'use client'

import {
  Table,
  TableScrollContainer,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
  Badge,
  Text,
  ActionIcon,
  Tooltip,
} from '@mantine/core'
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
    <TableScrollContainer minWidth={480}>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <TableThead>
          <TableTr>
            <TableTh>Дата</TableTh>
            <TableTh>Промежутки</TableTh>
            <TableTh>Итого</TableTh>
            <TableTh>Заметки</TableTh>
            {onDelete ? <TableTh /> : null}
          </TableTr>
        </TableThead>
        <TableTbody>
          {records.length > 0 ? (
            records.map((record) => (
              <TableTr key={record.id}>
                <TableTd>{dayjs(record.date).format('D MMM')}</TableTd>
                <TableTd>
                  <div className="flex flex-wrap gap-1">
                    {record.segments.map((seg, i) => (
                      <Badge key={i} variant="outline" size="sm">
                        {seg.start}–{seg.end}
                      </Badge>
                    ))}
                  </div>
                </TableTd>
                <TableTd>
                  <Text fw={600}>
                    {formatHours(totalHoursForSegments(record.segments))}
                  </Text>
                </TableTd>
                <TableTd>
                  <Text size="sm" c="dimmed" truncate maw={200}>
                    {record.notes ?? '—'}
                  </Text>
                </TableTd>
                {onDelete ? (
                  <TableTd>
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
                  </TableTd>
                ) : null}
              </TableTr>
            ))
          ) : (
            <TableTr>
              <TableTd colSpan={onDelete ? 5 : 4}>
                <Text c="dimmed" ta="center" py="md">
                  Записей за этот месяц нет.
                </Text>
              </TableTd>
            </TableTr>
          )}
        </TableTbody>
      </Table>
    </TableScrollContainer>
  )
}
