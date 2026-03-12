import {
  BenefitsSection,
  FinalCtaSection,
  HeroSection,
  LandingHeader,
  LandingShell,
  PainSection,
  ProductSection,
  StepsSection,
} from './landing-sections'

export function LandingPage() {
  return (
    <main className='relative overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-168'
        style={{
          background:
            'radial-gradient(circle at 18% 18%, rgba(244,175,37,0.2), transparent 28%), radial-gradient(circle at 84% 12%, rgba(249,115,22,0.22), transparent 24%), linear-gradient(180deg, rgba(22,18,16,0.7) 0%, rgba(13,11,8,0) 100%)',
        }}
      />

      <LandingShell>
        <LandingHeader />
        <HeroSection />
        <PainSection />
        <BenefitsSection />
        <ProductSection />
        <StepsSection />
        <FinalCtaSection />
      </LandingShell>
    </main>
  )
}
