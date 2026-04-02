import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import MarqueeSection from '@/components/home/MarqueeSection'
import StatsSection from '@/components/home/StatsSection'
import LatestRelease from '@/components/home/LatestRelease'
import TourPreview from '@/components/home/TourPreview'
import ShopTeaser from '@/components/home/ShopTeaser'
import NewsletterCTA from '@/components/home/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Wizkid – Starboy | Official Website',
  description: 'Official website of Wizkid. Music, tour dates, shop, and more.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <LatestRelease />
      <StatsSection />
      <TourPreview />
      <ShopTeaser />
      <NewsletterCTA />
    </>
  )
}
