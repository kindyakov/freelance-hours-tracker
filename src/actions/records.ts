'use server'

import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { addRecordSchema } from '@/lib/utils/schemas'

export async function upsertRecord(input: unknown) {
  // Auth guard FIRST — never skip this
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const data = addRecordSchema.parse(input)
  const date = new Date(data.date)

  const record = await prisma.record.upsert({
    where: {
      userId_date: {
        userId: session.user.id,
        date,
      },
    },
    update: {
      notes: data.notes ?? null,
      segments: {
        deleteMany: {},
        create: data.segments,
      },
    },
    create: {
      userId: session.user.id,
      date,
      notes: data.notes ?? null,
      segments: {
        create: data.segments,
      },
    },
    include: {
      segments: { orderBy: { order: 'asc' } },
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/history')
  return record
}

export async function deleteRecord(recordId: string) {
  // Auth guard FIRST
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  // The `userId` filter prevents deleting another user's data.
  await prisma.record.delete({
    where: {
      id: recordId,
      userId: session.user.id,
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/history')
}
