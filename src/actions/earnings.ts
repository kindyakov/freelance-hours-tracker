'use server'

import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createEarningEntrySchema, updateEarningEntrySchema } from '@/lib/utils/schemas'

export async function createEarningEntry(input: unknown) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const data = createEarningEntrySchema.parse(input)

  const entry = await prisma.earningEntry.create({
    data: {
      userId:   session.user.id,
      date:     new Date(data.date),
      amount:   data.amount,
      currency: data.currency,
      note:     data.note ?? null,
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/history')
  return entry
}

export async function updateEarningEntry(input: unknown) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const data = updateEarningEntrySchema.parse(input)

  // Ensure the entry belongs to this user before updating
  const existing = await prisma.earningEntry.findUnique({ where: { id: data.id } })
  if (!existing || existing.userId !== session.user.id) throw new Error('Not found')

  const entry = await prisma.earningEntry.update({
    where: { id: data.id },
    data: {
      amount: data.amount,
      note:   data.note ?? null,
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/history')
  return entry
}

export async function deleteEarningEntry(id: string) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const existing = await prisma.earningEntry.findUnique({ where: { id } })
  if (!existing || existing.userId !== session.user.id) throw new Error('Not found')

  const deletedEntry = await prisma.earningEntry.delete({
    where: { id },
    select: {
      id: true,
      date: true,
    },
  })

  revalidatePath('/dashboard')
  revalidatePath('/history')
  return deletedEntry
}
