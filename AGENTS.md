# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 App Router app. Keep route entry points in `src/app`, with authenticated screens under `src/app/(app)` and auth pages under `src/app/(auth)`. Put reusable UI in `src/components` (`dashboard`, `log`, `layout`, `providers`), server-side mutations in `src/actions`, shared helpers in `src/lib`, Zustand state in `src/store`, and shared types in `src/types`. Database schema and migrations live in `prisma/schema.prisma` and `prisma/migrations`. Static assets belong in `public/`.

## Build, Test, and Development Commands
- `npm run dev` starts the local dev server.
- `npm run build` creates a production build.
- `npm run start` serves the production build locally.
- `npm run lint` runs the Next.js ESLint config.
- `npx tsc --noEmit` performs strict type-checking.
- `npx prisma generate` refreshes the Prisma client after schema changes.
- `npx prisma migrate deploy` applies committed migrations.
- `npx prisma studio` opens the database inspector.

If you use the repo’s terminal helpers, prefer `rtk npm run dev`, `rtk git status`, and similar filtered commands.

## Coding Style & Naming Conventions
TypeScript is strict; keep it that way. Use the `@/*` path alias for imports from `src`. Follow the established React style: functional components, single quotes, no semicolons, and focused modules. Name components and providers with PascalCase filenames such as `DayEntryForm.tsx`, hooks with `useX` camelCase names such as `useRecords.ts`, and utility modules with concise lowercase names such as `format.ts`. Keep page-level logic in `src/app` and move reusable logic out of route files.

## Testing Guidelines
There is no committed automated test suite yet. Until one exists, every change must at least pass `npm run lint` and `npx tsc --noEmit`. When you add tests, use `*.test.ts` or `*.test.tsx` naming and keep them close to the code they verify. Prioritize time calculations, server actions, query helpers, and Prisma-backed flows.

## Commit & Pull Request Guidelines
Recent history is inconsistent; do not copy the low-signal commits. Use short Conventional Commit messages such as `feat: add dashboard loading skeleton` or `fix: validate empty time segments`. Keep pull requests scoped, explain user-visible changes, call out schema or env updates, link the issue when available, and include screenshots for dashboard, log, or history UI changes.

## Security & Configuration Tips
Never commit `.env.local` or live credentials. Keep database and auth secrets local, including `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, and GitHub OAuth keys. Any Prisma schema change must ship with a migration.
