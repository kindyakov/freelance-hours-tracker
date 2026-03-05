export type { ActivityCategory } from '@prisma/client'
import type { ActivityCategory } from '@prisma/client'

export type Segment = {
  id: string
  start: string // HH:MM
  end: string // HH:MM
  order: number
  category: ActivityCategory
}

export type DayRecord = {
  id: string
  date: string // ISO date string YYYY-MM-DD
  notes: string | null
  segments: Segment[]
}

export type EarningEntry = {
  id:       string
  date:     string // ISO date of the specific payment day
  amount:   number
  currency: string
  note:     string | null
}

export type MonthlyStats = {
  totalHours: number
  totalDays: number
  avgHoursPerDay: number
  earnings: number
  byCategory: Record<ActivityCategory, number>
}

// Extends the NextAuth session type to include user.id
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
