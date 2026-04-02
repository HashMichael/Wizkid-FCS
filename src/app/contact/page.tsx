import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch – bookings, press inquiries, and fan mail for Wizkid.',
}

export default function ContactPage() {
  return <ContactPageClient />
}
