'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Instagram, Twitter, Youtube, Music2 } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'

const footerLinks = {
  Music: [
    { label: 'Discography', href: '/music' },
    { label: 'Latest Release', href: '/music' },
    { label: 'Music Videos', href: '/music' },
    { label: 'On Streaming', href: '/music' },
  ],
  Tour: [
    { label: 'Tour Dates', href: '/tour' },
    { label: 'VIP Packages', href: '/tour' },
    { label: 'Past Shows', href: '/tour' },
  ],
  More: [
    { label: 'About Wizkid', href: '/about' },
    { label: 'Shop', href: '/shop' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    if (!bgTextRef.current) return

    gsap.to(bgTextRef.current, {
      x: '-15%',
      ease: 'none',
      scrollTrigger: {
        trigger: bgTextRef.current.closest('footer'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg-2)]">
      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      {/* Background text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center pointer-events-none overflow-hidden"
      >
        <span className="font-mono-display text-[20vw] font-bold text-[var(--fg)] opacity-[0.03] whitespace-nowrap select-none tracking-tight">
          WIZKID · STARBOY · AYODEJI ·
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-mono-display text-3xl text-gold tracking-[0.15em]">WZK</span>
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse-gold inline-block mb-1.5" />
            </div>
            <p className="text-[var(--fg-muted)] text-sm leading-relaxed mb-8 max-w-xs">
              Ayodeji Ibrahim Balogun. Born in Surulere, Lagos. The most important African artist of his generation.
            </p>
            {/* Newsletter */}
            <div>
              <p className="section-label mb-4">Stay Connected</p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input-luxury flex-1 text-sm"
                />
                <button className="px-5 py-2 bg-gold text-obsidian text-xs tracking-widest uppercase font-semibold hover:bg-amber transition-colors duration-300 flex-shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="section-label mb-6">{category}</p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--fg-muted)] text-sm hover:text-gold transition-colors duration-300 animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[var(--fg-muted)] text-xs tracking-wider">
            © {new Date().getFullYear()} Wizkid. All Rights Reserved. Made with ♡ in Lagos.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Twitter, href: '#', label: 'X / Twitter' },
              { icon: Youtube, href: '#', label: 'YouTube' },
              { icon: Music2, href: '#', label: 'Spotify' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--fg-muted)] hover:text-gold hover:border-gold transition-all duration-300 hover:scale-110"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--fg-muted)]">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
