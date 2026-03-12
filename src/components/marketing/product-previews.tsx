import { Badge, Group, Text } from '@mantine/core'

export function DashboardPreview() {
  return (
    <div className='space-y-4'>
      <div className='grid gap-3 sm:grid-cols-3'>
        {[
          { label: 'Часы за месяц', value: '124.5' },
          { label: 'Рабочих дней', value: '18' },
          { label: 'Заработок', value: '96 000 ₽' },
        ].map(card => (
          <div
            key={card.label}
            className='rounded-2xl border border-white/8 bg-white/5 p-4'
          >
            <Text size='xs' style={{ color: '#b09a87' }}>
              {card.label}
            </Text>
            <Text mt={6} fw={800} className='text-lg text-white'>
              {card.value}
            </Text>
          </div>
        ))}
      </div>
      <div className='grid gap-3 lg:grid-cols-[1.35fr_0.95fr]'>
        <div className='rounded-[1.4rem] border border-white/8 bg-[#120f0d] p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <Text fw={700} className='text-white'>
              Нагрузка по дням
            </Text>
            <Badge radius='xl' variant='light' color='orange'>
              Март
            </Badge>
          </div>
          <div className='flex h-36 items-end gap-2'>
            {[48, 82, 58, 96, 63, 78, 41, 90, 66, 70].map((height, index) => (
              <div
                key={index}
                className='flex-1 rounded-t-full'
                style={{
                  height: `${height}%`,
                  background:
                    'linear-gradient(180deg, rgba(244,175,37,0.95) 0%, rgba(249,115,22,0.45) 100%)',
                }}
              />
            ))}
          </div>
        </div>
        <div className='rounded-[1.4rem] border border-white/8 bg-[#120f0d] p-5'>
          <Text fw={700} className='text-white'>
            Категории
          </Text>
          <div className='mt-5 space-y-4'>
            {[
              ['Работа', '72%', '#f4af25'],
              ['Встречи', '16%', '#f97316'],
              ['Обучение', '12%', '#c16a2d'],
            ].map(([label, value, color]) => (
              <div key={label}>
                <div className='mb-2 flex items-center justify-between'>
                  <Text size='sm' style={{ color: '#d4c9bd' }}>
                    {label}
                  </Text>
                  <Text size='sm' fw={700} style={{ color: '#e8e0d5' }}>
                    {value}
                  </Text>
                </div>
                <div className='h-2 rounded-full bg-white/8'>
                  <div
                    className='h-2 rounded-full'
                    style={{ width: value, background: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LogPreview() {
  return (
    <div className='grid gap-3 lg:grid-cols-[1.05fr_0.95fr]'>
      <div className='rounded-[1.4rem] border border-white/8 bg-[#120f0d] p-5'>
        <Text fw={700} className='text-white'>
          Новый рабочий день
        </Text>
        <div className='mt-4 space-y-3'>
          {[
            'Дата: 12 марта 2026',
            '09:30 - 12:15 · Работа',
            '13:00 - 14:00 · Встреча',
            '14:30 - 17:40 · Работа',
          ].map(row => (
            <div
              key={row}
              className='rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm'
              style={{ color: '#d4c9bd' }}
            >
              {row}
            </div>
          ))}
        </div>
      </div>
      <div className='rounded-[1.4rem] border border-white/8 bg-[#120f0d] p-5'>
        <Text fw={700} className='text-white'>
          Заработок за месяц
        </Text>
        <div className='mt-4 space-y-3'>
          {[
            ['05 марта', '+ 18 000 ₽'],
            ['12 марта', '+ 24 000 ₽'],
            ['18 марта', '+ 32 000 ₽'],
          ].map(([label, value]) => (
            <div
              key={label}
              className='flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3'
            >
              <Text size='sm' style={{ color: '#d4c9bd' }}>
                {label}
              </Text>
              <Text fw={700} className='text-white'>
                {value}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HistoryPreview() {
  return (
    <div className='space-y-3'>
      {[
        ['Март 2026', '124.5 ч', '96 000 ₽'],
        ['Февраль 2026', '118.0 ч', '84 000 ₽'],
        ['Январь 2026', '131.0 ч', '102 000 ₽'],
      ].map(([month, hours, earnings]) => (
        <div
          key={month}
          className='rounded-[1.4rem] border border-white/8 bg-[#120f0d] p-4'
        >
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <Text fw={700} className='text-white'>
              {month}
            </Text>
            <Group gap='xs'>
              <Badge radius='xl' variant='light' color='orange'>
                {hours}
              </Badge>
              <Badge radius='xl' variant='light' color='green'>
                {earnings}
              </Badge>
            </Group>
          </div>
          <div className='mt-4 grid gap-2 sm:grid-cols-3'>
            {[
              ['Работа', '88 ч'],
              ['Встречи', '22 ч'],
              ['Обучение', '14 ч'],
            ].map(([label, value]) => (
              <div
                key={`${month}-${label}`}
                className='rounded-2xl bg-white/4 px-4 py-3'
              >
                <Text size='xs' style={{ color: '#b09a87' }}>
                  {label}
                </Text>
                <Text mt={5} fw={700} className='text-white'>
                  {value}
                </Text>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
