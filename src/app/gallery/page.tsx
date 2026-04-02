import type { Metadata } from 'next'
import GalleryPageClient from './GalleryPageClient'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Official Wizkid photo and video gallery – live performances, studio sessions, fashion, and events.',
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
