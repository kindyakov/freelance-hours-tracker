import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const monthParam = searchParams.get('month') // YYYY-MM-DD

  const monthStart = monthParam
    ? dayjs(monthParam).startOf('month').toDate()
    : dayjs().startOf('month').toDate()
  const monthEnd = dayjs(monthStart).endOf('month').toDate()

  const entries = await prisma.earningEntry.findMany({
    where: {
      userId: session.user.id,
      date: { gte: monthStart, lte: monthEnd },
    },
    orderBy: { date: 'asc' },
  })

  const total = entries.reduce((s, e) => s + e.amount, 0)

  return NextResponse.json({ entries, total })
}
