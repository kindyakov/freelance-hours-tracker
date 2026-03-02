import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { totalHoursForSegments } from '@/lib/utils/time'

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

  const [records, earning] = await Promise.all([
    prisma.record.findMany({
      where: {
        userId: session.user.id,
        date: { gte: monthStart, lte: monthEnd },
      },
      include: { segments: { orderBy: { order: 'asc' } } },
      orderBy: { date: 'asc' },
    }),
    prisma.earning.findFirst({
      where: {
        userId: session.user.id,
        month: monthStart,
      },
    }),
  ])

  const totalHours = records.reduce(
    (acc, r) => acc + totalHoursForSegments(r.segments),
    0,
  )

  return NextResponse.json({
    records,
    earning,
    totalHours,
    totalDays: records.length,
    avgHoursPerDay: records.length > 0 ? totalHours / records.length : 0,
  })
}
