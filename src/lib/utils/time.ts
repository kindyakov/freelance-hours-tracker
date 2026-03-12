/**
 * Parse HH:MM into total minutes from midnight.
 */
function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/**
 * Calculate hours between start and end (HH:MM).
 * Handles overnight segments (end < start → crosses midnight).
 */
export function calcHours(start: string, end: string): number {
  const startMin = toMinutes(start)
  let endMin = toMinutes(end)
  if (endMin <= startMin) endMin += 24 * 60
  return (endMin - startMin) / 60
}

/**
 * Returns true when the end time is on the next calendar day.
 */
export function detectMidnight(start: string, end: string): boolean {
  return toMinutes(end) < toMinutes(start)
}

/**
 * Sum hours across all segments of a single day record.
 */
export function totalHoursForSegments(
  segments: { start: string; end: string }[],
): number {
  return segments.reduce((acc, seg) => acc + calcHours(seg.start, seg.end), 0)
}

