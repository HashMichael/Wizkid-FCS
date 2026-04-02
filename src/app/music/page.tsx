import type { Metadata } from 'next'
import MusicPageClient from './MusicPageClient'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Wizkid\'s full discography – albums, singles, features, and collabs. Stream Made in Lagos, More Love Less Ego, and more.',
}

export default function MusicPage() {
  return <MusicPageClient />
}
