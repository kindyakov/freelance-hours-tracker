import { Paper, Text, Group, ThemeIcon } from '@mantine/core'
import { Clock, CalendarDays, TrendingUp, Wallet } from 'lucide-react'
import { formatHours, formatRub } from '@/lib/utils/format'
import type { MonthlyStats } from '@/types'

type Props = { stats: MonthlyStats }

const CARDS = [
  {
    key: 'totalHours' as const,
    label: 'Total Hours',
    icon: Clock,
    color: 'blue',
    format: (v: number) => formatHours(v),
  },
  {
    key: 'totalDays' as const,
    label: 'Days Logged',
    icon: CalendarDays,
    color: 'teal',
    format: (v: number) => `${v}`,
  },
  {
    key: 'avgHoursPerDay' as const,
    label: 'Avg / Day',
    icon: TrendingUp,
    color: 'violet',
    format: (v: number) => formatHours(v),
  },
  {
    key: 'earnings' as const,
    label: 'Earnings',
    icon: Wallet,
    color: 'green',
    format: (v: number) => formatRub(v),
  },
]

export function StatCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {CARDS.map(({ key, label, icon: Icon, color, format }) => (
        <Paper key={key} p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
              {label}
            </Text>
            <ThemeIcon variant="light" color={color} size="sm">
              <Icon size={14} />
            </ThemeIcon>
          </Group>
          <Text fw={700} size="xl">
            {format(stats[key])}
          </Text>
        </Paper>
      ))}
    </div>
  )
}

export function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[0, 1, 2, 3].map((i) => (
        <Paper key={i} p="md" radius="md" withBorder className="animate-pulse">
          <div className="h-4 bg-zinc-700 rounded mb-3 w-20" />
          <div className="h-7 bg-zinc-700 rounded w-28" />
        </Paper>
      ))}
    </div>
  )
}
