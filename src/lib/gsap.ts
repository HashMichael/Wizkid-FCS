'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { TextPlugin } from 'gsap/TextPlugin'

let registered = false

export function registerGSAP() {
  if (typeof window === 'undefined' || registered) return
  gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin)
  registered = true

  // Global GSAP defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.9,
  })

  // ScrollTrigger global settings
  ScrollTrigger.defaults({
    markers: false,
  })
}

export { gsap, ScrollTrigger, Flip, TextPlugin }
