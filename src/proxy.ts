import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isAuthenticated = !!session?.user?.id

  const isPublicPath =
    nextUrl.pathname.startsWith('/login') ||
    nextUrl.pathname.startsWith('/api/auth')

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  if (isAuthenticated && nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  // Run on all routes except Next.js internals and static files.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
