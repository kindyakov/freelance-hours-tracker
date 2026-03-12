# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build (also runs tsc)
npx tsc --noEmit     # type-check only

npx prisma migrate dev --name <name>   # create + apply migration
npx prisma migrate deploy              # apply migrations (production/CI)
npx prisma generate                    # regenerate client after schema changes
npx prisma studio                      # GUI to inspect database

vercel --prod        # deploy to production
vercel env ls        # list env vars on Vercel
```

## Stack versions (breaking changes matter)

| Package | Version | Key gotcha |
|---|---|---|
| Next.js | 16 | `middleware.ts` → `proxy.ts`; `dynamic(ssr:false)` forbidden in Server Components |
| Prisma | 7 | No `url` in `schema.prisma`; URL goes in `prisma.config.ts`; `PrismaClient` requires explicit `adapter` |
| Mantine | 8 | `optimizePackageImports` breaks compound components (`Table.Thead` etc.) — keep Mantine out of that list; use direct named imports (`TableThead`, `TableScrollContainer`) |
| NextAuth | v5 beta | `auth()` export from `src/lib/auth.ts`; session callback must explicitly copy `user.id` |
| Zod | 4 | API mostly compatible with v3 |

## Architecture

**Database:** Supabase PostgreSQL via `@prisma/adapter-pg` (PrismaPg). Singleton in `src/lib/prisma.ts`. The `DATABASE_URL` (pooled, `?pgbouncer=true`) is used at runtime; `DIRECT_URL` (non-pooled) is used by `prisma.config.ts` for migrations.

**Auth:** NextAuth v5, GitHub OAuth provider, Prisma adapter. `src/lib/auth.ts` exports `{ handlers, auth, signIn, signOut }` and a request-deduped `getSession = cache(auth)`. Every Server Action must call `getSession()` as its **first line**.

**Data flow:**
- Server Components (`dashboard/page.tsx`, `history/page.tsx`) fetch directly from Prisma with `Promise.all()` for parallel queries.
- Client Components use TanStack Query hooks in `src/lib/queries/` which hit `/api/stats`.
- Mutations go through Server Actions in `src/actions/` and call `revalidatePath()` after writes.

**State:** Zustand (`src/store/useAppStore.ts`) holds UI-only state: `selectedMonth`, `isLogFormOpen`, `editingDate`. Never put server data here.

**Charts:** `HoursBarChart` and `EarningsAreaChart` are loaded via `next/dynamic` with `ssr: false` inside `DashboardCharts.tsx` (`'use client'`), which is the only way to use `ssr: false` in Next.js 16.

## Key conventions

- **No barrel files** — always import directly from the source file.
- **JSX conditionals** — always `condition ? <X /> : null`, never `condition && <X />`.
- **Mantine compound components** — use named imports (`TableThead`, `TableTd`, etc.), not dot notation (`Table.Thead`), to avoid Turbopack runtime `undefined` errors.
- **`lang="ru"`** — the app is in Russian. All UI strings must be in Russian.
- `formatHours()` outputs `Xч Yм`; `formatRub()` uses `ru-RU` Intl formatter. dayjs locale is set to `ru` in `MonthNavigator.tsx`.

## Environment variables

```
DATABASE_URL=    # Neon/Supabase pooled connection (?pgbouncer=true for Supabase)
DIRECT_URL=      # Non-pooled, used only by prisma.config.ts for migrations
AUTH_SECRET=     # openssl rand -base64 32
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
NEXTAUTH_URL=    # http://localhost:3000 locally, production URL on Vercel
```

When adding env vars to Vercel via CLI, always strip newlines: `printf '%s' "$VALUE" | vercel env add KEY production`.
