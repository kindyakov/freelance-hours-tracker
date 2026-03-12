import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function readSource(path: string) {
  return readFileSync(resolve(path), 'utf8')
}

test('header uses shared layout nav link class for text navigation', () => {
  const source = readSource('src/components/layout/Header.tsx')

  assert.match(source, /className='layout-nav-link'/)
})

test('footer uses shared layout nav link class for legal navigation', () => {
  const source = readSource('src/components/layout/Footer.tsx')

  assert.match(source, /className='layout-nav-link'/)
})
