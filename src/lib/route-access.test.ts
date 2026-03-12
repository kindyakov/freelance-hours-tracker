import test from 'node:test'
import assert from 'node:assert/strict'
import { isPublicPath } from './route-access.ts'

test('home, auth endpoints, robots and sitemap stay public', () => {
  assert.equal(isPublicPath('/'), true)
  assert.equal(isPublicPath('/login'), true)
  assert.equal(isPublicPath('/api/auth/signin'), true)
  assert.equal(isPublicPath('/robots.txt'), true)
  assert.equal(isPublicPath('/sitemap.xml'), true)
})

test('private app screens remain protected', () => {
  assert.equal(isPublicPath('/dashboard'), false)
  assert.equal(isPublicPath('/log'), false)
  assert.equal(isPublicPath('/history'), false)
  assert.equal(isPublicPath('/api/stats'), false)
})
