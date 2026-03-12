import { Text, Title } from '@mantine/core'

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className='max-w-3xl'>
      <Text
        span
        fw={700}
        className='uppercase tracking-[0.24em]'
        style={{ color: '#f4af25', fontSize: '0.78rem' }}
      >
        {eyebrow}
      </Text>
      <Title order={2} mt='sm' className='text-3xl text-white md:text-4xl'>
        {title}
      </Title>
      <Text mt='md' size='lg' c='dimmed'>
        {description}
      </Text>
    </div>
  )
}
