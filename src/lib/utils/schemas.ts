import { z } from 'zod'

export const segmentSchema = z.object({
  start: z.string().regex(/^\d{2}:\d{2}$/, 'Format must be HH:MM'),
  end: z.string().regex(/^\d{2}:\d{2}$/, 'Format must be HH:MM'),
  order: z.number().int().min(0),
})

export const addRecordSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
  notes: z.string().max(500).optional(),
  segments: z.array(segmentSchema).min(1, 'At least one time segment is required'),
})

export const upsertEarningsSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('RUB'),
})

export type AddRecordInput = z.infer<typeof addRecordSchema>
export type UpsertEarningsInput = z.infer<typeof upsertEarningsSchema>
