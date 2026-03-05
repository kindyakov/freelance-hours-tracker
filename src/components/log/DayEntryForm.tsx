'use client'

import { useState, useCallback, useEffect } from 'react'
import {
	Button,
	TextInput,
	Textarea,
	Stack,
	Group,
	Paper,
	Text,
	Divider,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import { Plus } from 'lucide-react'
import dayjs from 'dayjs'
import { TimeSegmentRow } from './TimeSegmentRow'
import { useUpsertRecord, useRecords } from '@/lib/queries/useRecords'
import { useAppStore } from '@/store/useAppStore'
import { totalHoursForSegments } from '@/lib/utils/time'
import { formatHours } from '@/lib/utils/format'
import type { ActivityCategory } from '@prisma/client'

type SegmentDraft = {
	start: string
	end: string
	order: number
	category: ActivityCategory
}

const emptySegment = (order: number): SegmentDraft => ({
	start: '',
	end: '',
	order,
	category: 'WORK',
})

function resetForm(
	setDate: (d: Date | null) => void,
	setSegments: (s: SegmentDraft[]) => void,
	setNotes: (n: string) => void,
	setErrors: (e: Record<string, string>) => void,
) {
	setDate(new Date())
	setSegments([emptySegment(0)])
	setNotes('')
	setErrors({})
}

export function DayEntryForm() {
	const { selectedMonth, editingDate, setEditingDate } = useAppStore()
	const { mutateAsync, isPending } = useUpsertRecord(selectedMonth)
	const { data: records = [] } = useRecords(selectedMonth)

	const [date, setDate] = useState<Date | null>(new Date())
	const [segments, setSegments] = useState<SegmentDraft[]>([emptySegment(0)])
	const [notes, setNotes] = useState('')
	const [errors, setErrors] = useState<Record<string, string>>({})

	// Pre-populate form when editingDate is set
	useEffect(() => {
		if (!editingDate) return
		const record = records.find(
			r => dayjs(r.date).format('YYYY-MM-DD') === editingDate,
		)
		if (!record) return
		setDate(new Date(editingDate))
		setSegments(
			record.segments.map((s: { start: string; end: string; category: ActivityCategory }, i: number) => ({
				start:    s.start,
				end:      s.end,
				order:    i,
				category: s.category,
			})),
		)
		setNotes(record.notes ?? '')
		setErrors({})
	}, [editingDate, records])

	const addSegment = useCallback(() => {
		setSegments(prev => [...prev, emptySegment(prev.length)])
	}, [])

	const removeSegment = useCallback((index: number) => {
		setSegments(prev => prev.filter((_, i) => i !== index))
	}, [])

	const updateSegment = useCallback(
		(index: number, field: 'start' | 'end', value: string) => {
			setSegments(prev =>
				prev.map((seg, i) => (i === index ? { ...seg, [field]: value } : seg)),
			)
		},
		[],
	)

	const updateCategory = useCallback(
		(index: number, value: ActivityCategory) => {
			setSegments(prev =>
				prev.map((seg, i) => (i === index ? { ...seg, category: value } : seg)),
			)
		},
		[],
	)

	function handleCancel() {
		setEditingDate(null)
		resetForm(setDate, setSegments, setNotes, setErrors)
	}

	function validate(): boolean {
		const newErrors: Record<string, string> = {}
		const timeRegex = /^\d{2}:\d{2}$/

		if (!date) {
			newErrors.date = 'Укажите дату'
		}

		segments.forEach((seg, i) => {
			if (!timeRegex.test(seg.start)) {
				newErrors[`seg-${i}-start`] = 'Формат ЧЧ:ММ'
			}
			if (!timeRegex.test(seg.end)) {
				newErrors[`seg-${i}-end`] = 'Формат ЧЧ:ММ'
			}
		})

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!validate()) return

		try {
			await mutateAsync({
				date: dayjs(date).format('YYYY-MM-DD'),
				notes: notes.trim() || undefined,
				segments,
			})
			notifications.show({
				title: 'Запись сохранена',
				message: `Записано ${formatHours(totalHoursForSegments(segments))} за ${dayjs(date).format('D MMM')}`,
				color: 'green',
			})
			setEditingDate(null)
			resetForm(setDate, setSegments, setNotes, setErrors)
		} catch {
			notifications.show({
				title: 'Ошибка',
				message: 'Не удалось сохранить запись',
				color: 'red',
			})
		}
	}

	const validSegments = segments.filter(
		s => /^\d{2}:\d{2}$/.test(s.start) && /^\d{2}:\d{2}$/.test(s.end),
	)
	const totalHours = totalHoursForSegments(validSegments)

	return (
		<Paper p='md' radius='md' withBorder className='flex-2/3'>
			<form onSubmit={handleSubmit}>
				<Stack gap='md'>
					<DateInput
						label='Дата'
						placeholder='Выберите дату'
						value={date}
						onChange={v => setDate(v ? new Date(v) : null)}
						error={errors.date}
						maxDate={new Date()}
					/>

					<div>
						<Text size='sm' fw={500} mb='xs'>
							Временные промежутки
						</Text>
						<Stack gap='xs'>
							{segments.map((seg, i) => (
								<TimeSegmentRow
									key={i}
									index={i}
									start={seg.start}
									end={seg.end}
									category={seg.category}
									onStartChange={v => updateSegment(i, 'start', v)}
									onEndChange={v => updateSegment(i, 'end', v)}
									onCategoryChange={v => updateCategory(i, v)}
									onRemove={() => removeSegment(i)}
									canRemove={segments.length > 1}
									startError={errors[`seg-${i}-start`]}
									endError={errors[`seg-${i}-end`]}
								/>
							))}
						</Stack>
						<Button
							variant='subtle'
							size='xs'
							leftSection={<Plus size={14} />}
							onClick={addSegment}
							mt='xs'
						>
							Добавить промежуток
						</Button>
					</div>

					{totalHours > 0 ? (
						<Text size='sm' c='blue'>
							Итого: {formatHours(totalHours)}
						</Text>
					) : null}

					<Divider />

					<Textarea
						label='Заметки (необязательно)'
						placeholder='Над чем работали?'
						value={notes}
						onChange={e => setNotes(e.currentTarget.value)}
						maxLength={500}
						autosize
						minRows={2}
					/>

					<Group justify='flex-end'>
						{editingDate ? (
							<Button
								variant='subtle'
								color='gray'
								type='button'
								onClick={handleCancel}
							>
								Отменить
							</Button>
						) : null}
						<Button type='submit' loading={isPending}>
							{editingDate ? 'Сохранить изменения' : 'Сохранить'}
						</Button>
					</Group>
				</Stack>
			</form>
		</Paper>
	)
}
