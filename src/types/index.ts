export type Segment = {
  id: string
  start: string // HH:MM
  end: string // HH:MM
  order: number
}

export type DayRecord = {
  id: string
  date: string // ISO date string YYYY-MM-DD
  notes: string | null
  segments: Segment[]
}

export type MonthlyEarning = {
  id: string
  month: string // ISO date of the 1st of the month
  amount: number
  currency: string
}

export type MonthlyStats = {
  totalHours: number
  totalDays: number
  avgHoursPerDay: number
  earnings: number
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
