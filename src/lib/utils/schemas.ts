import { z } from 'zod'
const activityCategorySchema = z.enum(
  ['WORK', 'LEARNING', 'PERSONAL', 'OTHER'] as const,
)

export const segmentSchema = z.object({
  start:    z.string().regex(/^\d{2}:\d{2}$/, 'Format must be HH:MM'),
  end:      z.string().regex(/^\d{2}:\d{2}$/, 'Format must be HH:MM'),
  order:    z.number().int().min(0),
  category: activityCategorySchema.default('WORK'),
})

export const addRecordSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
  notes: z.string().max(500).optional(),
  segments: z.array(segmentSchema).min(1, 'At least one time segment is required'),
})

export const createEarningEntrySchema = z.object({
  date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
  amount:   z.number().positive('Amount must be positive'),
  currency: z.string().default('RUB'),
  note:     z.string().optional(),
})

export const updateEarningEntrySchema = z.object({
  id:     z.string(),
  amount: z.number().positive('Amount must be positive'),
  note:   z.string().optional(),
})

export type AddRecordInput = z.infer<typeof addRecordSchema>
export type CreateEarningEntryInput = z.infer<typeof createEarningEntrySchema>
export type UpdateEarningEntryInput = z.infer<typeof updateEarningEntrySchema>
