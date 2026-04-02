'use client'

import { useEffect, useRef } from 'react'
import { registerGSAP, gsap } from '@/lib/gsap'

type GSAPContextCallback = (context: gsap.Context) => void

export function useGSAP(callback: GSAPContextCallback, deps: React.DependencyList = []) {
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    registerGSAP()
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!)
    })

    return () => {
      contextRef.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return contextRef
}
