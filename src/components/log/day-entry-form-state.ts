import type { ActivityCategory, DayRecord } from '../../types/index.ts'

export type SegmentDraft = {
  start: string
  end: string
  order: number
  category: ActivityCategory
}

export type DayEntryFormState = {
  date: Date | null
  segments: SegmentDraft[]
  notes: string
  errors: Record<string, string>
}

export function emptySegment(order: number): SegmentDraft {
  return {
    start: '',
    end: '',
    order,
    category: 'WORK',
  }
}

export function createDayEntryFormState({
  editingDate,
  record,
}: {
  editingDate: string | null
  record: DayRecord | null
}): DayEntryFormState {
  if (editingDate && record) {
    return {
      date: new Date(editingDate),
      segments: record.segments.map((segment, index) => ({
        start: segment.start,
        end: segment.end,
        order: index,
        category: segment.category,
      })),
      notes: record.notes ?? '',
      errors: {},
    }
  }

  return {
    date: new Date(),
    segments: [emptySegment(0)],
    notes: '',
    errors: {},
  }
}
