import test from 'node:test'
import assert from 'node:assert/strict'
import { absoluteUrl, buildSoftwareApplicationSchema, getSiteUrl } from './site.ts'

test('getSiteUrl prefers explicit public site env', () => {
  const siteUrl = getSiteUrl({
    NEXT_PUBLIC_SITE_URL: 'https://hours.example.com',
    NEXTAUTH_URL: 'https://auth.example.com',
  })

  assert.equal(siteUrl, 'https://hours.example.com')
})

test('getSiteUrl falls back to localhost when env is missing', () => {
  const siteUrl = getSiteUrl({})

  assert.equal(siteUrl, 'http://localhost:3000')
})

test('absoluteUrl resolves paths against the configured site url', () => {
  const url = absoluteUrl('/login', 'https://hours.example.com')

  assert.equal(url, 'https://hours.example.com/login')
})

test('buildSoftwareApplicationSchema returns a russian software application graph', () => {
  const schema = buildSoftwareApplicationSchema('https://hours.example.com')

  assert.equal(schema['@type'], 'SoftwareApplication')
  assert.equal(schema.url, 'https://hours.example.com/')
  assert.equal(schema.inLanguage, 'ru-RU')
  assert.equal(schema.codeRepository, 'https://github.com/kindyakov/freelance-hours-tracker')
  assert.match(schema.description, /прост/i)
})
