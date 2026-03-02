import { defineConfig } from 'prisma/config'
import { loadEnvConfig } from '@next/env'

// Prisma CLI does not read .env.local — load it the same way Next.js does.
loadEnvConfig(process.cwd())

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Neon uses the same URL for both queries and migrations.
    // Falls back to empty string so `prisma generate` runs without a live DB.
    url: process.env.DATABASE_URL ?? '',
  },
})
