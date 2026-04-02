'use client'

import { useRef, useEffect } from 'react'
import { registerGSAP, gsap } from '@/lib/gsap'
import { clsx } from 'clsx'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  strength?: number
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = 'primary',
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    registerGSAP()
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      gsap.to(el, {
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
        duration: 0.4,
        ease: 'power3.out',
      })
    }
    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    }

    el.addEventListener('mousemove', handleMove as EventListener)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove as EventListener)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  const variants = {
    primary: 'bg-gold text-obsidian hover:bg-amber font-semibold',
    secondary: 'bg-charcoal-2 text-ivory border border-[var(--border)] hover:border-gold',
    outline: 'border border-gold text-gold hover:bg-gold hover:text-obsidian',
    ghost: 'text-[var(--fg)] hover:text-gold',
  }

  const baseClass = clsx(
    'relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm',
    'text-sm tracking-wider uppercase font-medium',
    'transition-colors duration-300 cursor-none',
    'shimmer overflow-hidden',
    variants[variant],
    className
  )

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={baseClass}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} className={baseClass}>
      {children}
    </button>
  )
}
