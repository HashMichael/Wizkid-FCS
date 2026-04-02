import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story of Wizkid – from Surulere, Lagos to the world stage.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
