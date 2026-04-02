'use client'

import { useCustomCursor } from '@/hooks/useCustomCursor'

export default function CustomCursor() {
  const { dotRef, ringRef } = useCustomCursor()

  return (
    <>
      <div ref={dotRef as React.RefObject<HTMLDivElement>} className="cursor-dot" />
      <div ref={ringRef as React.RefObject<HTMLDivElement>} className="cursor-ring" />
    </>
  )
}
