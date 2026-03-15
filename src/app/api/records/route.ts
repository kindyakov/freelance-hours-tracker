import { NextRequest, NextResponse } from 'next/server'
import dayjs from 'dayjs'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const scope = searchParams.get('scope')
  const monthParam = searchParams.get('month') // YYYY-MM-DD

  const monthStart = monthParam
    ? dayjs(monthParam).startOf('month').toDate()
    : dayjs().startOf('month').toDate()
  const monthEnd = dayjs(monthStart).endOf('month').toDate()

  const records = await prisma.record.findMany({
    where:
      scope === 'all'
        ? { userId: session.user.id }
        : {
            userId: session.user.id,
            date: { gte: monthStart, lte: monthEnd },
          },
    include: { segments: { orderBy: { order: 'asc' } } },
    orderBy: { date: scope === 'all' ? 'desc' : 'asc' },
  })

  return NextResponse.json({ records })
}
