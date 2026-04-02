'use client'

import { useEffect, useRef } from 'react'
import { registerGSAP, gsap } from '@/lib/gsap'

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    registerGSAP()

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'none',
      })
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      gsap.set(ring, { x: ringX, y: ringY })
      requestAnimationFrame(animateRing)
    }

    const handleMouseEnterHoverable = () => {
      ring?.classList.add('hovering')
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const handleMouseLeaveHoverable = () => {
      ring?.classList.remove('hovering')
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    document.addEventListener('mousemove', handleMouseMove)
    const raf = requestAnimationFrame(animateRing)

    const hoverables = document.querySelectorAll('a, button, [data-cursor]')
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterHoverable)
      el.addEventListener('mouseleave', handleMouseLeaveHoverable)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterHoverable)
        el.removeEventListener('mouseleave', handleMouseLeaveHoverable)
      })
    }
  }, [])

  return { dotRef, ringRef }
}
