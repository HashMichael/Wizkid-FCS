'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'

const featuredDates = [
  { city: 'London', venue: 'O2 Arena', date: 'Apr 12, 2025', status: 'on-sale' as const },
  { city: 'New York', venue: 'Madison Square Garden', date: 'May 3, 2025', status: 'vip-available' as const },
  { city: 'Paris', venue: 'Accor Arena', date: 'May 24, 2025', status: 'on-sale' as const },
]

const statusLabel = {
  'on-sale': { label: 'On Sale', class: 'badge-sale' },
  'vip-available': { label: 'VIP', class: 'badge-vip' },
  'sold-out': { label: 'Sold Out', class: 'badge-sold' },
}

export default function TourPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    registerGSAP()
    gsap.fromTo(
      sectionRef.current?.querySelectorAll('.tour-card') ?? [],
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="py-24 grain" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-label">World Tour 2025</span>
            <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)] mt-4">
              See Him Live
            </h2>
          </div>
          <MagneticButton href="/tour" variant="outline">
            All Dates <ArrowRight size={14} />
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredDates.map((show, i) => (
            <div
              key={i}
              className="tour-card glass rounded-sm p-8 hover-lift border border-[var(--border)] hover:border-gold/30 transition-all duration-500 shimmer group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={statusLabel[show.status].class}>
                  {statusLabel[show.status].label}
                </span>
                <span className="text-3xl font-mono-display text-gold/30 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="font-mono-display text-4xl text-[var(--fg)] tracking-wide mb-2">
                {show.city}
              </h3>

              <div className="flex items-center gap-2 text-[var(--fg-muted)] text-xs mb-1">
                <MapPin size={11} />
                <span>{show.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--fg-muted)] text-xs mb-8">
                <Calendar size={11} />
                <span>{show.date}</span>
              </div>

              <Link
                href="/tour"
                className="flex items-center gap-2 text-gold text-xs tracking-widest uppercase font-medium group-hover:gap-4 transition-all duration-300"
              >
                Get Tickets <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
