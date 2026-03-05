import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { calcHours, totalHoursForSegments } from '@/lib/utils/time'
import { CATEGORY_ORDER } from '@/lib/utils/categories'
import type { ActivityCategory } from '@prisma/client'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const monthParam = searchParams.get('month') // YYYY-MM-DD (first of month)

  const monthStart = monthParam
    ? dayjs(monthParam).startOf('month').toDate()
    : dayjs().startOf('month').toDate()
  const monthEnd = dayjs(monthStart).endOf('month').toDate()

  const [records, earningEntries] = await Promise.all([
    prisma.record.findMany({
      where: {
        userId: session.user.id,
        date: { gte: monthStart, lte: monthEnd },
      },
      include: { segments: { orderBy: { order: 'asc' } } },
      orderBy: { date: 'asc' },
    }),
    prisma.earningEntry.findMany({
      where: {
        userId: session.user.id,
        date: { gte: monthStart, lte: monthEnd },
      },
    }),
  ])

  const totalHours = records.reduce(
    (acc, r) => acc + totalHoursForSegments(r.segments),
    0,
  )

  const byCategory = Object.fromEntries(
    CATEGORY_ORDER.map((c) => [c, 0]),
  ) as Record<ActivityCategory, number>

  for (const record of records) {
    for (const seg of record.segments) {
      byCategory[seg.category] += calcHours(seg.start, seg.end)
    }
  }

  const earnings = earningEntries.reduce((s, e) => s + e.amount, 0)

  return NextResponse.json({
    records,
    earnings,
    totalHours,
    totalDays: records.length,
    avgHoursPerDay: records.length > 0 ? totalHours / records.length : 0,
    byCategory,
  })
}
