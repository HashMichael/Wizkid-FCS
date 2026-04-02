import type { Metadata } from 'next'
import ShopPageClient from './ShopPageClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Official Wizkid merchandise – limited edition drops, apparel, accessories, and collectibles.',
}

export default function ShopPage() {
  return <ShopPageClient />
}
