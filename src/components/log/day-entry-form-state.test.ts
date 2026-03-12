import test from 'node:test'
import assert from 'node:assert/strict'
import type { ActivityCategory, DayRecord } from '../../types/index.ts'
import { createDayEntryFormState } from './day-entry-form-state.ts'

test('createDayEntryFormState returns defaults for new entries', () => {
  const state = createDayEntryFormState({
    editingDate: null,
    record: null,
  })

  assert.equal(state.notes, '')
  assert.equal(state.errors.date, undefined)
  assert.equal(state.segments.length, 1)
  assert.equal(state.segments[0]?.category, 'WORK')
})

test('createDayEntryFormState hydrates fields from existing record', () => {
  const record: DayRecord = {
    id: 'rec-1',
    date: '2026-03-12',
    notes: 'Client work',
    segments: [
      {
        id: 'seg-1',
        start: '09:00',
        end: '12:00',
        order: 0,
        category: 'WORK' as ActivityCategory,
      },
      {
        id: 'seg-2',
        start: '13:00',
        end: '14:00',
        order: 1,
        category: 'MEETING' as ActivityCategory,
      },
    ],
  }

  const state = createDayEntryFormState({
    editingDate: '2026-03-12',
    record,
  })

  assert.equal(state.date?.toISOString().slice(0, 10), '2026-03-12')
  assert.equal(state.notes, 'Client work')
  assert.deepEqual(
    state.segments.map(segment => ({
      start: segment.start,
      end: segment.end,
      order: segment.order,
      category: segment.category,
    })),
    [
      { start: '09:00', end: '12:00', order: 0, category: 'WORK' },
      { start: '13:00', end: '14:00', order: 1, category: 'MEETING' },
    ],
  )
})

