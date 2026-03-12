import test from 'node:test'
import assert from 'node:assert/strict'
import { calcHours, detectMidnight, totalHoursForSegments } from './time.ts'

test('calcHours handles same-day and overnight segments', () => {
  assert.equal(calcHours('09:00', '11:30'), 2.5)
  assert.equal(calcHours('22:00', '01:00'), 3)
})

test('detectMidnight and totalHoursForSegments reflect overnight input', () => {
  assert.equal(detectMidnight('22:00', '01:00'), true)
  assert.equal(
    totalHoursForSegments([
      { start: '09:00', end: '10:30' },
      { start: '22:00', end: '01:00' },
    ]),
    4.5,
  )
})
