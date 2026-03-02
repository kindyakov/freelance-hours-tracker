'use client'

import { create } from 'zustand'
import dayjs from 'dayjs'

type AppState = {
  // The month currently being viewed/edited — always the 1st of the month.
  selectedMonth: Date
  setSelectedMonth: (month: Date) => void

  // Whether the day-entry form drawer is open.
  isLogFormOpen: boolean
  setLogFormOpen: (open: boolean) => void

  // The date currently being edited in the log form (YYYY-MM-DD).
  editingDate: string | null
  setEditingDate: (date: string | null) => void
}

export const useAppStore = create<AppState>()((set) => ({
  selectedMonth: dayjs().startOf('month').toDate(),
  setSelectedMonth: (month) => set({ selectedMonth: month }),

  isLogFormOpen: false,
  setLogFormOpen: (open) => set({ isLogFormOpen: open }),

  editingDate: null,
  setEditingDate: (date) => set({ editingDate: date }),
}))
