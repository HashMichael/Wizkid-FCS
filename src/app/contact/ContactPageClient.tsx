'use client'

import { useEffect, useRef, useState } from 'react'
import { Instagram, Twitter, Youtube, Music2, Video } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'

const contactTypes = ['General', 'Booking', 'Press']

const socials = [
  { name: 'Instagram', handle: '@wizkidayo', icon: Instagram, color: '#E1306C', href: 'https://www.instagram.com/wizkidayo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', followers: '18.6M', },
  { name: 'X / Twitter', handle: '@wizkidayo', icon: Twitter, color: '#1DA1F2', href: 'https://x.com/wizkidayo?s=20', followers: '14.1M' },
  { name: 'YouTube', handle: 'WizkidVevo', icon: Youtube, color: '#FF0000', href: 'www.youtube.com/@StarBoyTV', followers: '8.4M',},
  { name: 'TikTok', handle: '@wizkidayo', icon: Video, color: '#69C9D0', href: 'https://www.tiktok.com/@wizkidayo?is_from_webapp=1&sender_device=pc', followers: '2.7M' },
  { name: 'Spotify', handle: 'Wizkid', icon: Music2, color: '#1DB954', href: 'https://open.spotify.com/artist/3tVQdUvClmAT7URs9V3rsp?si=klOL5qzCTDSuzOYh_ls-3g', followers: '10M+' },
]

const contactCards = [
  {
    type: 'Bookings',
    name: 'WME Entertainment',
    email: 'bookings@wizkidofficial.com',
    note: 'For live performances, festivals, private events, and brand partnerships.',
  },
  {
    type: 'Press & Media',
    name: 'Starboy Press Office',
    email: 'press@wizkidofficial.com',
    note: 'Interview requests, photo licensing, editorial features, and media partnerships.',
  },
  {
    type: 'Label',
    name: 'Sony Music Africa',
    email: 'label@wizkidofficial.com',
    note: 'Music licensing, sync requests, and label-related inquiries.',
  },
]

const fanMessages = [
  { name: 'Amara O.', location: 'Lagos', msg: 'Wizkid you changed my life. Made in Lagos was the soundtrack to the hardest year of my life. Thank you.' },
  { name: 'Tyler B.', location: 'Atlanta', msg: 'I played Essence at my wedding. My wife still cries when she hears it. Pure magic, man.' },
  { name: 'Fatima K.', location: 'Dubai', msg: 'You showed the world what Africa sounds like. Every Naija kid is proud of you.' },
]

export default function ContactPageClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [type, setType] = useState('General')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [particles, setParticles] = useState<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number }[]>([])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }))

    let raf: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`
        ctx.fill()
      })
      // Draw connections
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.06 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    registerGSAP()
    gsap.fromTo(heroRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.2 })
    gsap.fromTo('.contact-card', { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-cards', start: 'top 80%', once: true } })
    gsap.fromTo('.social-card', { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.socials-section', start: 'top 80%', once: true } })
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1800)
  }

  return (
    <div className="pt-24">
      {/* Hero with particles */}
      <div className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #050505 0%, var(--bg) 100%)' }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div ref={heroRef} className="relative z-10 text-center px-6">
          <span className="section-label mb-6 block">Get In Touch</span>
          <h1 className="font-display text-5xl md:text-8xl font-light italic text-ivory mb-4">
            Contact
          </h1>
          <p className="text-[var(--fg-muted)] text-base max-w-md mx-auto">
            Bookings, press, or just a fan message — we read everything.
          </p>
        </div>
      </div>

      {/* Booking / Press Cards */}
      <div className="contact-cards max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {contactCards.map(card => (
            <div key={card.type} className="contact-card glass rounded-sm border border-[var(--border)] hover:border-gold/30 p-8 transition-all duration-400 hover-lift shimmer">
              <span className="section-label mb-4 block">{card.type}</span>
              <h3 className="font-mono-display text-xl text-[var(--fg)] mb-2 tracking-wide">{card.name}</h3>
              <a href={`mailto:${card.email}`} className="text-gold text-sm animated-underline mb-4 block hover:text-amber transition-colors duration-300">
                {card.email}
              </a>
              <p className="text-[var(--fg-muted)] text-sm leading-relaxed">{card.note}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-label mb-4 block">Send a Message</span>
            <h2 className="font-display text-4xl md:text-5xl font-light italic text-[var(--fg)] mb-10">
              We're Listening
            </h2>

            {status === 'sent' ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">✦</div>
                <h3 className="font-display text-3xl italic text-gold mb-3">Message Received</h3>
                <p className="text-[var(--fg-muted)]">We'll get back to you within 48 hours.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-8 text-xs tracking-widest uppercase text-[var(--fg-muted)] hover:text-gold transition-colors duration-300 animated-underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type selector */}
                <div className="flex gap-2">
                  {contactTypes.map(t => (
                    <button key={t} type="button" onClick={() => setType(t)}
                      className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm border transition-all duration-300
                        ${type === t ? 'border-gold text-gold bg-gold/5' : 'border-[var(--border)] text-[var(--fg-muted)] hover:border-gold/40'}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="section-label text-[10px] mb-1 block">Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="input-luxury" placeholder="Your full name" />
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-400 group-focus-within:w-full" />
                  </div>
                  <div className="relative group">
                    <label className="section-label text-[10px] mb-1 block">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="input-luxury" placeholder="your@email.com" />
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-400 group-focus-within:w-full" />
                  </div>
                </div>

                <div className="relative group">
                  <label className="section-label text-[10px] mb-1 block">Subject</label>
                  <input type="text" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="input-luxury" placeholder="What's this about?" />
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-400 group-focus-within:w-full" />
                </div>

                <div className="relative group">
                  <label className="section-label text-[10px] mb-1 block">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="input-luxury resize-none" placeholder="Tell us more..." />
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-400 group-focus-within:w-full" />
                </div>

                <button type="submit" disabled={status === 'sending'}
                  className="px-10 py-4 bg-gold text-obsidian text-xs tracking-widest uppercase font-bold hover:bg-amber transition-colors duration-300 disabled:opacity-60 w-full">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Fan messages */}
          <div>
            <span className="section-label mb-4 block">Fan Board</span>
            <h2 className="font-display text-4xl md:text-5xl font-light italic text-[var(--fg)] mb-10">
              From the Fans
            </h2>
            <div className="space-y-4">
              {fanMessages.map((msg, i) => (
                <div key={i} className="glass rounded-sm border border-[var(--border)] p-6 hover:border-gold/20 transition-colors duration-400">
                  <p className="font-display italic text-[var(--fg)] text-base leading-relaxed mb-4">"{msg.msg}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-bold">
                      {msg.name[0]}
                    </div>
                    <p className="text-sm text-[var(--fg)]">{msg.name}</p>
                    <span className="text-[var(--fg-muted)] text-xs">·</span>
                    <p className="text-xs text-[var(--fg-muted)]">{msg.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="socials-section py-24 grain" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block">Follow Wizkid</span>
            <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)]">
              Stay Connected
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {socials.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card glass rounded-sm border border-[var(--border)] hover:border-gold/30 p-6 text-center hover-lift shimmer transition-all duration-400 group"
              >
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                  <s.icon size={24} style={{ color: s.color }} />
                </div>
                <p className="font-mono-display text-lg text-[var(--fg)] tracking-wide mb-1">{s.name}</p>
                <p className="text-[var(--fg-muted)] text-xs mb-2">{s.handle}</p>
                <p className="text-gold text-sm font-medium">{s.followers}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
