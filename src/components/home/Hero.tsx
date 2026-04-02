'use client'

import { useEffect, useRef } from 'react'
import { registerGSAP, gsap } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    const tl = gsap.timeline({ delay: 0.3 })

    // Animate background
    tl.fromTo(bgRef.current, { scale: 1.1 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0)
    tl.fromTo(overlayRef.current, { opacity: 0.9 }, { opacity: 0.65, duration: 2, ease: 'expo.out' }, 0)

    // Animate title letters
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter')
      tl.fromTo(
        letters,
        { y: '100%', opacity: 0, skewY: 8 },
        { y: '0%', opacity: 1, skewY: 0, stagger: 0.04, duration: 1, ease: 'expo.out' },
        0.4
      )
    }

    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      0.9
    )
    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
      1.1
    )
    tl.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      1.5
    )

    return () => { tl.kill() }
  }, [])

  const titleLetters = 'WIZKID'.split('')

  return (
    <section ref={containerRef} className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop&q=90')`,
        }}
      />

      {/* Dark overlay with gradient */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.85) 100%)',
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Pre-label */}
        <div className="mb-6 opacity-80">
          <span className="section-label">Official Website</span>
        </div>

        {/* Big title - split letters */}
        <h1
          ref={titleRef}
          className="overflow-hidden leading-none mb-6 select-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 18rem)' }}
        >
          {titleLetters.map((letter, i) => (
            <span
              key={i}
              className="letter inline-block font-mono-display text-ivory"
              style={{ letterSpacing: '-0.02em' }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-display text-xl md:text-3xl italic text-gold/90 font-light mb-12 tracking-wide"
        >
          Born in Lagos. Made for the World.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton href="/music" variant="primary">
            Listen Now
          </MagneticButton>
          <MagneticButton href="/tour" variant="outline">
            Tour Dates
          </MagneticButton>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/40"
      >
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </section>
  )
}
