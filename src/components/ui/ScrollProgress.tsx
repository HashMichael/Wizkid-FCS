'use client'

import { useEffect, useRef } from 'react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    const bar = barRef.current
    if (!bar) return

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{
  width: '100%',
  transformOrigin: 'left',
  transform: 'scaleX(0)',
}}
    />
  )
}
