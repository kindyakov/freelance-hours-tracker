'use server'

import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { upsertEarningsSchema } from '@/lib/utils/schemas'

export async function upsertEarnings(input: unknown) {
  // Auth guard FIRST
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const data = upsertEarningsSchema.parse(input)
  const month = new Date(data.month)

  const earning = await prisma.earning.upsert({
    where: {
      userId_month: {
        userId: session.user.id,
        month,
      },
    },
    update: {
      amount: data.amount,
      currency: data.currency,
    },
    create: {
      userId: session.user.id,
      month,
      amount: data.amount,
      currency: data.currency,
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/history')
  return earning
}
