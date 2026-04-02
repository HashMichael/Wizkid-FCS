'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { registerGSAP, gsap } from '@/lib/gsap'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/tour', label: 'Tour' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    registerGSAP()
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate navbar in on mount
  useEffect(() => {
    registerGSAP()
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.5 }
    )
  }, [])

  // Mobile menu open/close
  useEffect(() => {
    registerGSAP()
    const overlay = overlayRef.current
    const links = linksRef.current
    if (!overlay || !links) return

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(overlay, { x: '0%', duration: 0.7, ease: 'expo.inOut' })
      gsap.fromTo(
        links.querySelectorAll('.mobile-link'),
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'expo.out', delay: 0.3 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, { x: '100%', duration: 0.6, ease: 'expo.inOut' })
    }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5'
        )}
        style={{ background: scrolled ? 'var(--navbar-bg)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 group">
            <div className="flex items-baseline gap-1">
              <span className="font-mono-display text-2xl text-gold tracking-[0.15em]">WZK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-gold inline-block mb-1" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300 animated-underline pb-1',
                  pathname === link.href ? 'text-gold' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full glass border border-[var(--border)]"
              aria-label="Open menu"
            >
              <Menu size={18} className="text-[var(--fg)]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[80] translate-x-full"
        style={{ background: 'var(--bg)' }}
      >
        <div className="absolute inset-0 opacity-5 noise-overlay pointer-events-none" />
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full glass border border-[var(--border)]"
          aria-label="Close menu"
        >
          <X size={20} className="text-[var(--fg)]" />
        </button>

        <div ref={linksRef} className="flex flex-col justify-center items-start h-full px-12 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'mobile-link font-display text-5xl sm:text-6xl font-light italic py-2 transition-colors duration-300',
                pathname === link.href ? 'text-gold' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-12 flex items-center gap-6 mobile-link">
            {['Instagram', 'X / Twitter', 'Spotify', 'YouTube'].map(s => (
              <a key={s} href="#" className="text-xs tracking-widest uppercase text-[var(--fg-muted)] hover:text-gold transition-colors duration-300">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
