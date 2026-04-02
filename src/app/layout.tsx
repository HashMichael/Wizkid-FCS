import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Wizkid – Starboy',
    default: 'Wizkid – Starboy | Official Website',
  },
  description:
    'Official website of Wizkid (Ayodeji Ibrahim Balogun) – Grammy-nominated Afrobeats superstar. Music, tour dates, merch, and more.',
  keywords: ['Wizkid', 'Starboy', 'Afrobeats', 'Made in Lagos', 'Essence', 'Nigerian music'],
  openGraph: {
    title: 'Wizkid – Starboy',
    description: 'Born in Lagos. Made for the World.',
    url: 'https://wizkidofficial.com',
    siteName: 'Wizkid Official',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wizkid – Starboy',
    description: 'Born in Lagos. Made for the World.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
