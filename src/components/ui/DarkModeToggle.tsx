'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import { registerGSAP, gsap } from '@/lib/gsap'

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    registerGSAP()
  }, [])

  const handleToggle = () => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotate: 0, scale: 1 },
        {
          rotate: 360,
          scale: 1.2,
          duration: 0.5,
          ease: 'back.out(2)',
          onComplete: () => {
            gsap.to(iconRef.current, { scale: 1, duration: 0.2 })
          },
        }
      )
    }
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) return (
    <button className="w-10 h-10 flex items-center justify-center rounded-full glass" aria-label="Toggle theme">
      <Sun size={16} className="opacity-0" />
    </button>
  )

  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 flex items-center justify-center rounded-full glass border border-[var(--border)] hover:border-gold transition-colors duration-300"
      aria-label="Toggle dark/light mode"
    >
      <div ref={iconRef}>
        {theme === 'dark' ? (
          <Sun size={16} className="text-gold" />
        ) : (
          <Moon size={16} className="text-gold" />
        )}
      </div>
    </button>
  )
}
