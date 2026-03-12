import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  benefits,
  painPoints,
  productWindows,
  steps,
  trustChips,
} from './landing-content.ts'

function readSource(path: string) {
  return readFileSync(resolve(path), 'utf8')
}

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

test('hero uses dashboard preview card content from the approved reference', () => {
  const source = readSource('src/components/marketing/landing-sections.tsx')

  assert.match(source, /<HeroPreviewCard \/>/)
  assert.doesNotMatch(source, /<HeroSimplicityPanel \/>/)
})

test('interactive hero preview is isolated in a dedicated client component', () => {
  const sectionSource = readSource('src/components/marketing/landing-sections.tsx')
  const previewSource = readSource('src/components/marketing/HeroPreviewCard.tsx')

  assert.match(sectionSource, /import \{ HeroPreviewCard \} from '\.\/HeroPreviewCard'/)
  assert.match(previewSource, /'use client'/)
  assert.match(previewSource, /onPointerMove=\{handlePointerMove\}/)
  assert.match(previewSource, /--hero-preview-rotate-x/)
})

test('hero card does not combine reveal and float animations on the same element', () => {
  const source = readSource('src/components/marketing/landing-sections.tsx')

  assert.doesNotMatch(
    source,
    /landing-reveal landing-delay-2 landing-float landing-card/,
  )
})
