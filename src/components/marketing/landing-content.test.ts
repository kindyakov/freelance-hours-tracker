import test from 'node:test'
import assert from 'node:assert/strict'
import {
  benefits,
  painPoints,
  productWindows,
  steps,
  trustChips,
} from './landing-content.ts'

test('landing content keeps the expected six-section support data', () => {
  assert.equal(painPoints.length, 3)
  assert.equal(benefits.length, 3)
  assert.equal(productWindows.length, 3)
  assert.equal(steps.length, 3)
  assert.equal(trustChips.length, 4)
})

test('landing product windows stay ordered by dashboard, log, history', () => {
  assert.deepEqual(
    productWindows.map(window => window.eyebrow),
    ['Dashboard', 'Log', 'History'],
  )
})
