'use client'

import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d0800 0%, #1a0f00 40%, #080808 100%)',
      }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <span className="section-label mb-6 block">Inner Circle</span>
        <h2 className="font-display text-4xl md:text-6xl font-light italic text-ivory mb-6">
          Be First to Know
        </h2>
        <p className="text-[var(--fg-muted)] text-base mb-12 leading-relaxed">
          New music drops. Exclusive tour presales. Limited merch releases.
          <br />No spam. Just Wizkid.
        </p>

        {submitted ? (
          <div className="text-gold font-display text-2xl italic">
            Welcome to the inner circle. ✦
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/5 border border-gold/20 text-ivory placeholder:text-ivory/30 text-sm outline-none focus:border-gold/60 transition-colors duration-300 rounded-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gold text-obsidian text-xs tracking-widest uppercase font-bold hover:bg-amber transition-colors duration-300 flex items-center gap-2 justify-center flex-shrink-0"
            >
              Join <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
