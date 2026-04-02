'use client'

import { useEffect, useRef } from 'react'
import { registerGSAP, gsap } from '@/lib/gsap'

export function useMagneticEffect(strength = 0.4) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    registerGSAP()
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power3.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref as React.RefObject<HTMLElement>
}
