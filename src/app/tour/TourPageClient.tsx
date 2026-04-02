'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Calendar, Clock, Star } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'
import { tourDates, vipPackages, testimonials } from '@/lib/data/tour'

function Countdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return (
    <div className="flex items-center gap-4 md:gap-8">
      {[
        { val: time.d, label: 'Days' },
        { val: time.h, label: 'Hours' },
        { val: time.m, label: 'Min' },
        { val: time.s, label: 'Sec' },
      ].map(({ val, label }) => (
        <div key={label} className="text-center">
          <div className="font-mono-display text-4xl md:text-6xl text-gold leading-none">
            {String(val).padStart(2, '0')}
          </div>
          <div className="text-xs tracking-widest uppercase text-[var(--fg-muted)] mt-1">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function TourPageClient() {
  const [filter, setFilter] = useState<string>('All')
  const [modalDate, setModalDate] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  const continents = ['All', 'Africa', 'Europe', 'North America', 'Asia']
  const filteredDates = filter === 'All' ? tourDates : tourDates.filter(d => d.continent === filter)

  useEffect(() => {
    registerGSAP()
    gsap.fromTo(headerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.2 })
    gsap.fromTo('.vip-card', { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: '.vip-section', start: 'top 80%', once: true } })
    gsap.fromTo('.testimonial-card', { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.testimonials-section', start: 'top 80%', once: true } })
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  useEffect(() => {
    registerGSAP()
    gsap.fromTo('.tour-row', { x: -30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'expo.out' })
  }, [filter])

  const statusMap = {
    'on-sale': { label: 'On Sale', cls: 'badge-sale' },
    'sold-out': { label: 'Sold Out', cls: 'badge-sold' },
    'vip-available': { label: 'VIP', cls: 'badge-vip' },
  }

  return (
    <div className="pt-24">
      {/* Hero with countdown */}
      <div ref={headerRef} className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://i.ytimg.com/vi/yO6DYZLzwC8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAtv_Cf8kb-7EGMs92q23HZTOiffA')` }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.85) 100%)' }} />
        </div>
        <div className="relative z-10 text-center px-6 py-24">
          <span className="section-label mb-6 block">World Tour 2025</span>
          <h1 className="font-display text-5xl md:text-8xl font-light italic text-ivory mb-6">
            Live Experience
          </h1>
          <p className="text-[var(--fg-muted)] mb-12">Next Show: London, O2 Arena · April 12, 2025</p>
          <Countdown targetDate="2025-04-12T19:30:00Z" />
        </div>
      </div>

      {/* Filter + Tour Dates */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-light italic text-[var(--fg)]">
            All Dates
          </h2>
          <div className="flex flex-wrap gap-2">
            {continents.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm border transition-all duration-300
                  ${filter === c ? 'bg-gold text-obsidian border-gold' : 'border-[var(--border)] text-[var(--fg-muted)] hover:border-gold/50 hover:text-[var(--fg)]'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div ref={tableRef} className="space-y-1">
          {filteredDates.map(date => (
            <div
              key={date.id}
              className="tour-row glass rounded-sm border border-[var(--border)] hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 gap-4">
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Calendar size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-mono-display text-xl text-[var(--fg)] tracking-wide">{date.city}</h3>
                      <span className="text-[var(--fg-muted)] text-xs">{date.country}</span>
                      <span className={statusMap[date.status].cls}>{statusMap[date.status].label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[var(--fg-muted)] text-xs">
                      <span className="flex items-center gap-1"><MapPin size={10} />{date.venue}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{date.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[var(--fg-muted)] text-sm hidden md:block">{new Date(date.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  {date.status !== 'sold-out' ? (
                    <button
                      onClick={() => setModalDate(date.id)}
                      className="px-5 py-2.5 bg-gold text-obsidian text-xs tracking-widest uppercase font-bold hover:bg-amber transition-colors duration-300"
                    >
                      Tickets
                    </button>
                  ) : (
                    <span className="px-5 py-2.5 border border-[var(--border)] text-[var(--fg-muted)] text-xs tracking-widest uppercase">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP Packages */}
      <div className="vip-section py-24 grain" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">Exclusive</span>
            <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)]">VIP Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vipPackages.map(pkg => (
              <div
                key={pkg.name}
                className={`vip-card rounded-sm p-8 border shimmer transition-all duration-500 hover-lift relative
                  ${pkg.highlight
                    ? 'border-gold/50 gold-glow'
                    : 'glass border-[var(--border)] hover:border-gold/30'
                  }`}
                style={pkg.highlight ? { background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(255,107,0,0.05) 100%)' } : {}}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-limited px-4 py-1">Most Popular</span>
                  </div>
                )}
                <h3 className="font-mono-display text-2xl text-[var(--fg)] mb-2 tracking-wide">{pkg.name}</h3>
                <p className="font-display text-4xl italic text-gold mb-8">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[var(--fg-muted)]">
                      <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 text-xs tracking-widest uppercase font-bold transition-colors duration-300
                  ${pkg.highlight ? 'bg-gold text-obsidian hover:bg-amber' : 'border border-gold text-gold hover:bg-gold hover:text-obsidian'}`}>
                  Book VIP
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section py-24 max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block">Fan Stories</span>
          <h2 className="font-display text-4xl md:text-5xl font-light italic text-[var(--fg)]">From the Crowd</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card glass rounded-sm p-6 border border-[var(--border)] hover:border-gold/20 transition-colors duration-400">
              <div className="flex mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="font-display italic text-[var(--fg)] text-base leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="text-sm font-medium text-[var(--fg)]">{t.name}</p>
                <p className="text-xs text-[var(--fg-muted)] mt-0.5">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Modal */}
      {modalDate && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-6"
          style={{ background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={() => setModalDate(null)}
        >
          <div
            className="glass rounded-sm border border-gold/30 p-10 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            {(() => {
              const d = tourDates.find(t => t.id === modalDate)!
              return (
                <>
                  <h3 className="font-mono-display text-3xl text-[var(--fg)] mb-2">{d.city}</h3>
                  <p className="text-[var(--fg-muted)] text-sm mb-1">{d.venue}</p>
                  <p className="text-gold text-sm mb-8">{new Date(d.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · {d.time}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button className="py-3.5 border border-gold text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-all duration-300">
                      Standard
                    </button>
                    <button className="py-3.5 bg-gold text-obsidian text-xs tracking-widest uppercase font-bold hover:bg-amber transition-colors duration-300">
                      VIP Access
                    </button>
                  </div>
                  <button onClick={() => setModalDate(null)} className="w-full text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors tracking-widest uppercase">
                    Close
                  </button>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
