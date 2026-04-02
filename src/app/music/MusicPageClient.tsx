'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'
import { discography, pressQuotes, streamingPlatforms } from '@/lib/data/music'
import MagneticButton from '@/components/ui/MagneticButton'

type FilterType = 'all' | 'album' | 'single' | 'feature' | 'collab'

export default function MusicPageClient() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [flippedId, setFlippedId] = useState<string | null>(null)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'album', label: 'Albums' },
    { key: 'single', label: 'Singles' },
    { key: 'collab', label: 'Collabs' },
  ]

  const filtered = filter === 'all' ? discography : discography.filter(a => a.type === filter)

  useEffect(() => {
    registerGSAP()

    gsap.fromTo(headerRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.2 })

    gsap.fromTo(
      '.album-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.albums-grid', start: 'top 80%', once: true },
      }
    )

    gsap.fromTo(
      '.streaming-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '.streaming-section', start: 'top 80%', once: true },
      }
    )

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  const moveUnderline = (index: number) => {
    const tab = tabsRef.current[index]
    const bar = filterBarRef.current
    if (!tab || !bar) return
    const tabRect = tab.getBoundingClientRect()
    const barRect = bar.getBoundingClientRect()
    gsap.to(underlineRef.current, {
      x: tabRect.left - barRect.left,
      width: tabRect.width,
      duration: 0.4,
      ease: 'expo.out',
    })
  }

  const handleFilterChange = (key: FilterType, index: number) => {
    setFilter(key)
    moveUnderline(index)
    setFlippedId(null)
    gsap.fromTo('.album-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'expo.out' })
  }

  return (
    <div className="pt-24">
      {/* Cinematic Header */}
      <div ref={headerRef} className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {discography.slice(0, 3).map((album, i) => (
            <div key={album.id} className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}>
              <Image src={album.cover} alt={album.title} fill className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.8) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <span className="section-label mb-3 block">Discography</span>
          <h1 className="font-display text-5xl md:text-8xl font-light italic text-ivory">
            The Music
          </h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[60px] z-40 border-b border-[var(--border)] glass">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div ref={filterBarRef} className="relative flex gap-0">
            {filters.map(({ key, label }, i) => (
              <button
                key={key}
                ref={el => { tabsRef.current[i] = el }}
                onClick={() => handleFilterChange(key, i)}
                className={`px-6 py-5 text-xs tracking-widest uppercase transition-colors duration-300 relative
                  ${filter === key ? 'text-gold' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'}`}
              >
                {label}
              </button>
            ))}
            <span
              ref={underlineRef}
              className="absolute bottom-0 left-0 h-px bg-gold transition-none"
              style={{ width: 80 }}
            />
          </div>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="albums-grid max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(album => (
            <div
              key={album.id}
              className="album-card group cursor-none"
              onClick={() => setFlippedId(flippedId === album.id ? null : album.id)}
            >
              {flippedId === album.id ? (
                // Back face - tracklist
                <div className="relative aspect-square bg-[var(--bg-2)] border border-gold/30 rounded-sm p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gold text-xs tracking-widest uppercase mb-1">{album.year}</p>
                      <h3 className="font-display text-xl font-semibold text-[var(--fg)]">{album.title}</h3>
                    </div>
                    <button onClick={() => setFlippedId(null)} className="text-[var(--fg-muted)] hover:text-gold text-lg">×</button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                    {album.tracks.map((track, i) => (
                      <div key={i} className="flex items-center gap-3 py-1.5 text-[var(--fg-muted)] hover:text-gold transition-colors group/track">
                        <span className="text-xs w-4 text-center opacity-50">{i + 1}</span>
                        <Play size={10} className="opacity-0 group-hover/track:opacity-100 flex-shrink-0" />
                        <span className="text-xs truncate">{track}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <p className="text-xs text-[var(--fg-muted)]">{album.streams} streams</p>
                  </div>
                </div>
              ) : (
                // Front face - album art
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image src={album.cover} alt={album.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                    <p className="text-white text-xs tracking-widest uppercase mb-1">{album.year} · {album.type}</p>
                    <h3 className="text-ivory font-display text-lg font-semibold">{album.title}</h3>
                    <p className="text-ivory/50 text-xs mt-1">{album.tracks.length} tracks · {album.streams}</p>
                    <p className="text-gold text-xs mt-2 tracking-wider">Click for tracklist →</p>
                  </div>
                  {album.id === 'made-in-lagos' && (
                    <div className="absolute top-4 left-4">
                      <span className="badge-limited">Grammy Nominated</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Press Quotes Carousel */}
      <div className="py-24 grain" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <span className="section-label mb-16 block text-center">Press</span>
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="text-8xl font-display text-gold/10 leading-none absolute -top-8 left-0 select-none">"</div>
            <p className="font-display text-2xl md:text-3xl italic font-light text-[var(--fg)] leading-relaxed mb-6 transition-all duration-500">
              {pressQuotes[quoteIndex].quote}
            </p>
            <p className="section-label">{pressQuotes[quoteIndex].source}</p>

            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setQuoteIndex((quoteIndex - 1 + pressQuotes.length) % pressQuotes.length)}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2">
                {pressQuotes.map((_, i) => (
                  <button key={i} onClick={() => setQuoteIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === quoteIndex ? 'bg-gold w-4' : 'bg-[var(--fg-muted)]'}`} />
                ))}
              </div>
              <button
                onClick={() => setQuoteIndex((quoteIndex + 1) % pressQuotes.length)}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Streaming Platforms */}
      <div className="streaming-section py-24 max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block">Stream Now</span>
          <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)]">
            Available Everywhere
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {streamingPlatforms.map(platform => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="streaming-card glass rounded-sm p-6 text-center hover-lift border border-[var(--border)] hover:border-gold/30 group shimmer transition-all duration-400"
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold"
                style={{ background: `${platform.color}20`, border: `1px solid ${platform.color}40`, color: platform.color }}>
                {platform.name[0]}
              </div>
              <p className="text-[var(--fg)] text-sm font-medium mb-1">{platform.name}</p>
              <p className="text-[var(--fg-muted)] text-xs">{platform.monthlyListeners}</p>
              <div className="flex items-center justify-center gap-1 mt-4 text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={10} /> Listen
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
