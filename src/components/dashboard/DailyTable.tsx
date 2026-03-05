'use client'

import { Badge, ActionIcon, Tooltip } from '@mantine/core'
import { Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import { formatHours } from '@/lib/utils/format'
import { totalHoursForSegments } from '@/lib/utils/time'
import { CATEGORY_META } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'

type Segment = { start: string; end: string; category?: ActivityCategory }
type DayRecord = {
	id: string
	date: string | Date
	notes: string | null
	segments: Segment[]
}

type Props = {
	records: DayRecord[]
	onDelete?: (id: string) => void
}

const TH = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider'
const TD = 'px-4 py-3'

export function DailyTable({ records, onDelete }: Props) {
	return (
		<div
			className='flex-2/3 rounded-xl overflow-hidden border border-white/5'
			style={{ background: 'var(--mantine-color-dark-7)' }}
		>
			<div className='overflow-x-auto'>
				<table className='w-full min-w-120 border-collapse'>
					<thead>
						<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
							<th className={TH} style={{ color: 'var(--mantine-color-dark-2)' }}>Дата</th>
							<th className={TH} style={{ color: 'var(--mantine-color-dark-2)' }}>Промежутки</th>
							<th className={TH} style={{ color: 'var(--mantine-color-dark-2)' }}>Итого</th>
							<th className={TH} style={{ color: 'var(--mantine-color-dark-2)' }}>Заметки</th>
							{onDelete ? <th className={TH} /> : null}
						</tr>
					</thead>
					<tbody>
						{records.length > 0 ? (
							records.map((record, idx) => (
								<tr
									key={record.id}
									className='transition-colors hover:bg-white/3'
									style={idx < records.length - 1
										? { borderBottom: '1px solid rgba(255,255,255,0.04)' }
										: undefined}
								>
									<td className={TD}>
										<span
											className='text-sm font-semibold'
											style={{ color: 'var(--mantine-color-dark-0)' }}
										>
											{dayjs(record.date).format('D MMM')}
										</span>
									</td>
									<td className={TD}>
										<div className='flex flex-wrap gap-1'>
											{record.segments.map((seg, i) => {
												const meta = seg.category ? CATEGORY_META[seg.category] : null
												return (
													<Badge key={i} variant='light' size='sm' color={meta?.badgeColor}>
														{meta ? `${meta.label} · ` : ''}
														{seg.start}–{seg.end}
													</Badge>
												)
											})}
										</div>
									</td>
									<td className={TD}>
										<span
											className='text-sm font-bold'
											style={{ color: 'var(--mantine-color-dark-0)' }}
										>
											{formatHours(totalHoursForSegments(record.segments))}
										</span>
									</td>
									<td className={TD}>
										<span
											className='text-sm block truncate max-w-50'
											style={{ color: 'var(--mantine-color-dark-3)' }}
										>
											{record.notes ?? '—'}
										</span>
									</td>
									{onDelete ? (
										<td className={TD}>
											<Tooltip label='Удалить запись'>
												<ActionIcon
													variant='subtle'
													color='red'
													size='sm'
													onClick={() => onDelete(record.id)}
													aria-label='Удалить запись'
												>
													<Trash2 size={14} />
												</ActionIcon>
											</Tooltip>
										</td>
									) : null}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={onDelete ? 5 : 4}
									className='px-4 py-8 text-center text-sm'
									style={{ color: 'var(--mantine-color-dark-3)' }}
								>
									Записей за этот месяц нет.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
