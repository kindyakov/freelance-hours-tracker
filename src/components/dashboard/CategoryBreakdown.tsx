import { Paper, Text, Group, Progress, ColorSwatch } from '@mantine/core'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/utils/categories'
import { formatHours } from '@/lib/utils/format'
import type { ActivityCategory } from '@prisma/client'

type Props = {
	byCategory: Record<ActivityCategory, number>
	totalHours: number
}

export function CategoryBreakdown({ byCategory, totalHours }: Props) {
	if (totalHours === 0) return null

	const activeCategories = CATEGORY_ORDER.filter(cat => byCategory[cat] > 0)

	return (
		<Paper p='md' radius='md' withBorder className='flex-1/3'>
			<Text fw={600} size='sm' tt='uppercase' c='dimmed' mb='md'>
				По категориям
			</Text>
			<div className='flex flex-col gap-4'>
				{activeCategories.map(cat => {
					const hours = byCategory[cat]
					const pct = (hours / totalHours) * 100
					const meta = CATEGORY_META[cat]

					return (
						<div key={cat}>
							<Group justify='space-between' mb={6}>
								<Group gap='xs'>
									<ColorSwatch
										size={12}
										color={`var(--mantine-color-${meta.badgeColor}-6)`}
									/>
									<Text size='sm' fw={500}>
										{meta.label}
									</Text>
								</Group>
								<Group gap='xs'>
									<Text size='sm' fw={600}>
										{formatHours(hours)}
									</Text>
									<Text size='xs' c='dimmed'>
										{pct.toFixed(0)}%
									</Text>
								</Group>
							</Group>
							<Progress
								value={pct}
								color={meta.badgeColor}
								size='md'
								radius='sm'
							/>
						</div>
					)
				})}
			</div>
		</Paper>
	)
}
