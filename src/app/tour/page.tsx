import type { Metadata } from 'next'
import TourPageClient from './TourPageClient'

export const metadata: Metadata = {
  title: 'Tour',
  description: 'Wizkid 2025 World Tour – dates, tickets, VIP packages, and live show experience.',
}

export default function TourPage() {
  return <TourPageClient />
}
