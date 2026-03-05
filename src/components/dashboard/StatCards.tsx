import { Clock, CalendarDays, TrendingUp, Wallet } from 'lucide-react'
import { formatHours, formatRub } from '@/lib/utils/format'
import type { MonthlyStats } from '@/types'

type Props = { stats: MonthlyStats }

const CARDS = [
	{
		key: 'totalHours' as const,
		label: 'Всего часов',
		icon: Clock,
		// Static Tailwind classes — must NOT be dynamic strings
		glowClass: 'bg-orange-400/10 group-hover:bg-orange-400/20',
		iconClass: 'bg-orange-400/15 text-orange-400',
		format: (v: number) => formatHours(v),
	},
	{
		key: 'totalDays' as const,
		label: 'Дней',
		icon: CalendarDays,
		glowClass: 'bg-yellow-400/10 group-hover:bg-yellow-400/20',
		iconClass: 'bg-yellow-400/15 text-yellow-400',
		format: (v: number) => `${v}`,
	},
	{
		key: 'avgHoursPerDay' as const,
		label: 'Среднее / день',
		icon: TrendingUp,
		glowClass: 'bg-teal-400/10 group-hover:bg-teal-400/20',
		iconClass: 'bg-teal-400/15 text-teal-400',
		format: (v: number) => formatHours(v),
	},
	{
		key: 'earnings' as const,
		label: 'Заработок',
		icon: Wallet,
		glowClass: 'bg-green-400/10 group-hover:bg-green-400/20',
		iconClass: 'bg-green-400/15 text-green-400',
		format: (v: number) => formatRub(v),
	},
]

export function StatCards({ stats }: Props) {
	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
			{CARDS.map(({ key, label, icon: Icon, glowClass, iconClass, format }) => (
				<div
					key={key}
					className='group relative overflow-hidden rounded-xl p-6 border border-white/5'
					style={{ background: 'var(--mantine-color-dark-7)' }}
				>
					<div className='absolute -right-4 -top-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all'></div>

					{/* Icon */}
					<div
						className={`relative inline-flex p-2 rounded-lg mb-4 ${iconClass}`}
					>
						<Icon size={20} />
					</div>

					{/* Label */}
					<p
						className='text-xs font-semibold uppercase tracking-wider'
						style={{ color: 'var(--mantine-color-dark-2)' }}
					>
						{label}
					</p>

					{/* Value */}
					<p
						className='text-2xl font-black mt-1'
						style={{ color: 'var(--mantine-color-dark-0)' }}
					>
						{format(stats[key])}
					</p>
				</div>
			))}
		</div>
	)
}

export function StatCardsSkeleton() {
	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
			{[0, 1, 2, 3].map(i => (
				<div
					key={i}
					className='animate-pulse rounded-xl p-6 border border-white/5'
					style={{ background: 'var(--mantine-color-dark-7)' }}
				>
					<div
						className='size-10 rounded-lg mb-4'
						style={{ background: 'var(--mantine-color-dark-5)' }}
					/>
					<div
						className='h-3 rounded w-20 mb-2'
						style={{ background: 'var(--mantine-color-dark-5)' }}
					/>
					<div
						className='h-7 rounded w-24'
						style={{ background: 'var(--mantine-color-dark-5)' }}
					/>
				</div>
			))}
		</div>
	)
}
