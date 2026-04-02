'use client'

import { useEffect, useRef } from 'react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'

interface ScrollTriggerConfig {
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  markers?: boolean
}

export function useScrollTrigger(
  animationFn: (tl: gsap.core.Timeline) => void,
  config: ScrollTriggerConfig,
  deps: React.DependencyList = []
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    registerGSAP()

    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start || 'top 80%',
          end: config.end || 'bottom 20%',
          scrub: config.scrub || false,
          pin: config.pin || false,
          onEnter: config.onEnter,
          onLeave: config.onLeave,
          onEnterBack: config.onEnterBack,
          markers: config.markers || false,
        },
      })
      tlRef.current = tl
      animationFn(tl)
    })

    return () => {
      ctxRef.current?.revert()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return tlRef
}
