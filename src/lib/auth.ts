import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  pages: { signIn: '/login' },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
})

// Deduplicate auth() calls within the same request tree.
// Safe to call in multiple Server Components — React.cache ensures one DB hit.
export const getSession = cache(auth)
