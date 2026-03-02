import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

// Prisma 7 requires an explicit driver adapter.
// PrismaNeon uses Neon's HTTP/WebSocket transport — no persistent TCP connection,
// which is correct for serverless/edge deployments.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createClient(): PrismaClient {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
