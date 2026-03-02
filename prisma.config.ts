import { defineConfig } from 'prisma/config'

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
