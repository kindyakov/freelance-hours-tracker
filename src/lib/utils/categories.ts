import type { ActivityCategory } from '@prisma/client'

export const CATEGORY_META: Record<
  ActivityCategory,
  { label: string; color: string; badgeColor: string }
> = {
  WORK:     { label: 'Фриланс',      color: 'orange.5', badgeColor: 'orange' },
  LEARNING: { label: 'Обучение',     color: 'yellow.5', badgeColor: 'yellow' },
  PERSONAL: { label: 'Свои проекты', color: 'teal.6',   badgeColor: 'teal'   },
  OTHER:    { label: 'Другое',       color: 'gray.5',   badgeColor: 'gray'   },
}

export const CATEGORY_ORDER: ActivityCategory[] = ['WORK', 'LEARNING', 'PERSONAL', 'OTHER']

export const CATEGORY_SELECT_DATA = CATEGORY_ORDER.map((cat) => ({
  value: cat,
  label: CATEGORY_META[cat].label,
}))
