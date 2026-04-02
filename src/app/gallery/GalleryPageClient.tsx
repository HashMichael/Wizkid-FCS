'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'
import { galleryItems, videoGallery, type GalleryItem } from '@/lib/data/gallery'

type FilterType = 'all' | 'live' | 'studio' | 'fashion' | 'events'

export default function GalleryPageClient() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [videoModal, setVideoModal] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'live', label: 'Live' },
    { key: 'studio', label: 'Studio' },
    { key: 'fashion', label: 'Fashion' },
    { key: 'events', label: 'Events' },
  ]

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(g => g.category === filter)

  useEffect(() => {
    registerGSAP()
    gsap.fromTo(headerRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.2 })
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  useEffect(() => {
    registerGSAP()
    gsap.fromTo(
      '.gallery-item',
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'expo.out' }
    )
  }, [filter])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null ? Math.max(0, i - 1) : null)
      if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null ? Math.min(filtered.length - 1, i + 1) : null)
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, filtered.length])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null || videoModal !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex, videoModal])

  return (
    <div className="pt-24">
      {/* Hero mosaic */}
      <div ref={headerRef} className="relative overflow-hidden" style={{ height: '55vh', minHeight: 400 }}>
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 gap-1 opacity-60">
          {galleryItems.slice(0, 8).map((item, i) => (
            <div key={item.id} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.8) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="section-label mb-4">Visual Archive</span>
          <h1 className="font-display text-5xl md:text-8xl font-light italic text-ivory">Gallery</h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[60px] z-40 border-b border-[var(--border)] glass">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex gap-0">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-4 text-xs tracking-widest uppercase transition-colors duration-300
                ${filter === key ? 'text-gold border-b border-gold' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="gallery-item break-inside-avoid cursor-none group relative overflow-hidden rounded-sm"
              onClick={() => setLightboxIndex(i)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                  {item.location && (
                    <p className="text-ivory text-xs tracking-wide mb-1">{item.location}</p>
                  )}
                  {item.year && (
                    <p className="text-gold/70 text-xs">{item.year}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Gallery */}
      <div className="py-24 grain" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block">Video</span>
            <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)]">
              Music Videos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {videoGallery.map(video => (
              <div
                key={video.id}
                className="group relative rounded-sm overflow-hidden cursor-none"
                onClick={() => setVideoModal(video.youtubeId)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-400" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-btn group-hover:scale-110 transition-transform duration-400">
                      <Play size={24} className="text-gold ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[var(--fg)] text-sm font-medium mb-1 group-hover:text-gold transition-colors duration-300">{video.title}</h3>
                  <p className="text-[var(--fg-muted)] text-xs">{video.views} views · {video.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center"
          style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--fg)] hover:border-gold hover:text-gold transition-all duration-300 z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={18} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--fg)] hover:border-gold hover:text-gold transition-all duration-300 z-10"
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? Math.max(0, i - 1) : null) }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--fg)] hover:border-gold hover:text-gold transition-all duration-300 z-10"
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? Math.min(filtered.length - 1, i + 1) : null) }}
          >
            <ChevronRight size={20} />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center px-16" onClick={e => e.stopPropagation()}>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={filtered[lightboxIndex].width}
                height={filtered[lightboxIndex].height}
                className="max-w-full max-h-[80vh] object-contain rounded-sm"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-ivory/70 text-sm">{filtered[lightboxIndex].alt}</p>
              {filtered[lightboxIndex].location && (
                <p className="text-gold/60 text-xs mt-1">{filtered[lightboxIndex].location} · {filtered[lightboxIndex].year}</p>
              )}
              <p className="text-[var(--fg-muted)] text-xs mt-2">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center p-6"
          style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)' }}
          onClick={() => setVideoModal(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--fg)] hover:border-gold hover:text-gold transition-all duration-300"
            onClick={() => setVideoModal(null)}
          >
            <X size={18} />
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${videoModal}?autoplay=1`}
              className="w-full h-full rounded-sm"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
