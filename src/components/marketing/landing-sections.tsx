import { ArrowRight, Flame, FolderKanban, Github } from 'lucide-react'
import {
  Badge,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { SITE_NAME, SITE_REPOSITORY_URL } from '@/lib/site'
import {
  benefits,
  painPoints,
  productWindows,
  sectionContent,
  steps,
  trustChips,
  type ProductPreviewKey,
} from './landing-content'
import { ProductWindow } from './ProductWindow'
import { SectionHeading } from './SectionHeading'
import {
  DashboardPreview,
  HistoryPreview,
  LogPreview,
} from './product-previews'

function PreviewByKey({ preview }: { preview: ProductPreviewKey }) {
  switch (preview) {
    case 'dashboard':
      return <DashboardPreview />
    case 'log':
      return <LogPreview />
    case 'history':
      return <HistoryPreview />
  }
}

export function LandingHeader() {
  return (
    <header className='landing-reveal mb-14 flex flex-col gap-5 rounded-4xl border border-white/8 bg-white/3 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between'>
      <div className='flex items-center gap-3'>
        <div
          className='flex size-12 items-center justify-center rounded-2xl text-[#0d0b08]'
          style={{ background: 'linear-gradient(135deg, #f4af25, #f97316)' }}
        >
          <Flame size={22} />
        </div>
        <div>
          <Text fw={800} className='text-lg text-white'>
            {SITE_NAME}
          </Text>
          <Text size='sm' style={{ color: '#b09a87' }}>
            {sectionContent.headerSubtitle}
          </Text>
        </div>
      </div>
      <Group gap='sm'>
        <Button
          component='a'
          href={SITE_REPOSITORY_URL}
          target='_blank'
          rel='noreferrer'
          variant='default'
          radius='xl'
          className='landing-button landing-button-secondary'
          leftSection={<Github size={16} />}
          styles={{
            root: {
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
              color: '#e8e0d5',
            },
          }}
        >
          GitHub
        </Button>
        <Button
          component='a'
          href='/login'
          radius='xl'
          color='orange'
          className='landing-button landing-button-primary'
          rightSection={<ArrowRight size={16} />}
        >
          Открыть приложение
        </Button>
      </Group>
    </header>
  )
}

export function HeroSection() {
  return (
    <section className='pb-24 pt-6 md:pb-28 md:pt-10'>
      <div className='grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]'>
        <div className='landing-reveal landing-delay-1'>
          <Badge radius='xl' variant='light' color='orange'>
            {sectionContent.heroBadge}
          </Badge>
          <Title
            order={1}
            mt='lg'
            className='max-w-3xl text-4xl text-white md:text-6xl md:leading-[1.02]'
          >
            {sectionContent.heroTitle}
          </Title>
          <Text
            mt='xl'
            size='xl'
            className='max-w-2xl'
            style={{ color: '#d4c9bd' }}
          >
            {sectionContent.heroDescription}
          </Text>
          <Group mt='xl' gap='md'>
            <Button
              component='a'
              href={SITE_REPOSITORY_URL}
              target='_blank'
              rel='noreferrer'
              size='lg'
              radius='xl'
              color='orange'
              className='landing-button landing-button-primary'
              leftSection={<Github size={18} />}
            >
              Смотреть код на GitHub
            </Button>
            <Button
              component='a'
              href='/login'
              size='lg'
              radius='xl'
              variant='default'
              className='landing-button landing-button-secondary'
              rightSection={<ArrowRight size={18} />}
              styles={{
                root: {
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: '#e8e0d5',
                },
              }}
            >
              Войти через GitHub
            </Button>
          </Group>
          <div className='mt-8 flex flex-wrap gap-3'>
            {trustChips.map(item => (
              <span
                key={item}
                className='landing-chip rounded-full border border-white/8 px-4 py-2 text-sm'
                style={{
                  color: '#d4c9bd',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <Paper
          radius={32}
          p='lg'
          withBorder
          className='landing-reveal landing-delay-2 landing-float landing-card'
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            background:
              'linear-gradient(180deg, rgba(25,20,16,0.92) 0%, rgba(15,12,9,0.98) 100%)',
            boxShadow: '0 38px 110px rgba(0,0,0,0.4)',
          }}
        >
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <Text size='sm' fw={700} style={{ color: '#f4af25' }}>
                {sectionContent.previewEyebrow}
              </Text>
              <Title order={3} className='text-white'>
                {sectionContent.previewTitle}
              </Title>
            </div>
            <Group gap='xs'>
              <Badge radius='xl' variant='light' color='orange'>
                Dashboard
              </Badge>
              <Badge radius='xl' variant='light' color='yellow'>
                {sectionContent.previewTag}
              </Badge>
            </Group>
          </div>
          <DashboardPreview />
        </Paper>
      </div>
    </section>
  )
}

export function PainSection() {
  return (
    <section className='landing-reveal landing-delay-2 py-20'>
      <SectionHeading {...sectionContent.problem} />
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg' mt='xl'>
        {painPoints.map(point => (
          <Paper
            key={point.title}
            radius={28}
            p='xl'
            withBorder
            className='landing-card'
            style={{
              borderColor: 'rgba(255,255,255,0.07)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
            }}
          >
            <ThemeIcon radius='xl' size={44} variant='light' color='orange'>
              <FolderKanban size={20} />
            </ThemeIcon>
            <Title order={3} mt='lg' className='text-white'>
              {point.title}
            </Title>
            <Text mt='sm' style={{ color: '#b09a87' }}>
              {point.description}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </section>
  )
}

export function BenefitsSection() {
  return (
    <section className='landing-reveal landing-delay-2 py-20'>
      <SectionHeading {...sectionContent.benefits} />
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg' mt='xl'>
        {benefits.map(({ icon: Icon, title, description }) => (
          <Paper
            key={title}
            radius={28}
            p='xl'
            withBorder
            className='landing-card'
            style={{
              borderColor: 'rgba(255,255,255,0.07)',
              background:
                'radial-gradient(circle at top right, rgba(244,175,37,0.12), transparent 35%), linear-gradient(180deg, rgba(26,22,18,0.98), rgba(18,15,12,0.98))',
            }}
          >
            <ThemeIcon
              radius='xl'
              size={48}
              variant='gradient'
              gradient={{ from: 'orange', to: 'yellow', deg: 135 }}
            >
              <Icon size={22} />
            </ThemeIcon>
            <Title order={3} mt='lg' className='text-white'>
              {title}
            </Title>
            <Text mt='sm' style={{ color: '#b09a87' }}>
              {description}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </section>
  )
}

export function ProductSection() {
  return (
    <section className='landing-reveal landing-delay-2 py-20'>
      <SectionHeading {...sectionContent.product} />
      <Stack gap='lg' mt='xl'>
        {productWindows.map(item => (
          <ProductWindow
            key={item.eyebrow}
            icon={item.icon}
            eyebrow={item.eyebrow}
            title={item.title}
            description={item.description}
          >
            <PreviewByKey preview={item.preview} />
          </ProductWindow>
        ))}
      </Stack>
    </section>
  )
}

export function StepsSection() {
  return (
    <section className='landing-reveal landing-delay-2 py-20'>
      <SectionHeading {...sectionContent.steps} />
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing='lg' mt='xl'>
        {steps.map(item => (
          <Paper
            key={item.step}
            radius={28}
            p='xl'
            withBorder
            className='landing-card'
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <Text fw={800} className='text-4xl' style={{ color: '#f4af25' }}>
              {item.step}
            </Text>
            <Title order={3} mt='md' className='text-white'>
              {item.title}
            </Title>
            <Text mt='sm' style={{ color: '#b09a87' }}>
              {item.description}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </section>
  )
}

export function FinalCtaSection() {
  return (
    <section className='landing-reveal landing-delay-2 py-20'>
      <Paper
        radius={36}
        p='xl'
        withBorder
        className='landing-card'
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background:
            'radial-gradient(circle at top left, rgba(244,175,37,0.16), transparent 28%), linear-gradient(180deg, rgba(27,22,18,0.98), rgba(16,13,10,1))',
        }}
      >
        <div className='grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end'>
          <div className='landing-reveal landing-delay-1'>
            <Badge radius='xl' variant='light' color='orange'>
              {sectionContent.finalCtaBadge}
            </Badge>
            <Title
              order={2}
              mt='lg'
              className='max-w-2xl text-3xl text-white md:text-5xl'
            >
              {sectionContent.finalCtaTitle}
            </Title>
            <Text
              mt='lg'
              size='lg'
              className='max-w-2xl'
              style={{ color: '#d4c9bd' }}
            >
              Репозиторий открыт на GitHub:{' '}
              <a
                href={SITE_REPOSITORY_URL}
                target='_blank'
                rel='noreferrer'
                className='underline decoration-[#f4af25]/60 underline-offset-4'
              >
                {SITE_REPOSITORY_URL}
              </a>
              . {sectionContent.finalCtaDescription}
            </Text>
          </div>
          <div className='space-y-4'>
            <Button
              component='a'
              href={SITE_REPOSITORY_URL}
              target='_blank'
              rel='noreferrer'
              fullWidth
              size='lg'
              radius='xl'
              color='orange'
              className='landing-button landing-button-primary'
              leftSection={<Github size={18} />}
            >
              Перейти в GitHub
            </Button>
            <Button
              component='a'
              href='/login'
              fullWidth
              size='lg'
              radius='xl'
              variant='default'
              className='landing-button landing-button-secondary'
              rightSection={<ArrowRight size={18} />}
              styles={{
                root: {
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: '#e8e0d5',
                },
              }}
            >
              Открыть демо / вход
            </Button>
            <Text size='sm' style={{ color: '#b09a87' }}>
              {sectionContent.finalCtaFootnote}
            </Text>
          </div>
        </div>
      </Paper>
    </section>
  )
}

export function LandingShell({ children }: { children: React.ReactNode }) {
  return <Container size='xl' className='relative py-6 md:py-8'>{children}</Container>
}
