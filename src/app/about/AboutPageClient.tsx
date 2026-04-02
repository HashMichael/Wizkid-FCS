'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { registerGSAP, gsap, ScrollTrigger, TextPlugin } from '@/lib/gsap'

const milestones = [
  { year: '1990', title: 'Born in Surulere', desc: 'Ayodeji Ibrahim Balogun is born on July 16, 1990, in Surulere, Lagos State, Nigeria — the youngest of 3 children.' },
  { year: '2001', title: 'First Recording', desc: 'At just 11 years old, Wizkid records his first song with his church choir. The calling was clear from the very beginning.' },
  { year: '2009', title: 'Signs to EME', desc: 'Aged 18, he signs to Banky W\'s Empire Mates Entertainment (EME) label after releasing his debut mixtape "Superstar."' },
  { year: '2011', title: 'Superstar Album', desc: 'His debut album "Superstar" releases to critical acclaim, producing hits like "Holla At Your Boy" and "Pakurumo."' },
  { year: '2014', title: 'Ayo Album', desc: '"Ayo" (meaning happiness) cements his status as Africa\'s biggest pop star with the massive hit "Jaiye Jaiye."' },
  { year: '2016', title: 'Drake\'s "One Dance"', desc: 'Wizkid co-writes and features on Drake\'s "One Dance" — the most streamed song of 2016, introducing him to 100M+ new listeners.' },
  { year: '2017', title: 'Sounds From the Other Side', desc: 'His third album breaks internationally. "Come Closer" with Drake becomes an Afrobeats crossover anthem.' },
  { year: '2020', title: 'Made in Lagos', desc: 'The masterpiece. Released during the pandemic, it sells out arenas worldwide and earns a Grammy nomination for Best Global Music Album.' },
  { year: '2021', title: 'Essence Goes Global', desc: '"Essence" ft. Tems peaks at #9 on the Billboard Hot 100 — the highest ever chart position for a Nigerian artist at the time.' },
  { year: '2022', title: 'More Love Less Ego', desc: 'His fifth album drops on his birthday, debuting at #1 across 12 countries. The Wizkid era shows no signs of slowing down.' },
  { year: '2024', title: 'World Tour Continues', desc: 'Wizkid sells out O2 Arena, MSG, and FNB Stadium — three of the world\'s largest venues — in the same year.' },
]

const collaborators = [
  'Drake', 'Beyoncé', 'Tems', 'Burna Boy', 'Justin Bieber', 'H.E.R', 'Skepta',
  'Damian Marley', 'Brent Faiyaz', 'Asake', 'Tiwa Savage', 'Chris Brown', 'Ayra Star', 'Buju', 'Olamide', 'Sars', 'DJ Tunez', 'Mavo', 'Tyla', 'Akon', 'Fola', 'Odeal', 'Metro Booming', 'Shensea', 'Zlatan', 'Anais Cardot', 'Young John'
]

const awards = [
  { name: 'Grammy', detail: 'Best Global Music Album Nom 2022', color: '#FFD700' },
  { name: 'BET', detail: '3× Award Winner', color: '#D4AF37' },
  { name: 'MOBO', detail: '3× Award Winner', color: '#C0C0C0' },
  { name: 'MTV Africa', detail: '5× Award Winner', color: '#FF6B00' },
  { name: 'Billboard', detail: 'Afrobeats Artist of the Year', color: '#D4AF37' },
  { name: 'Headies', detail: '12× Award Winner', color: '#228B22' },
]

export default function AboutPageClient() {
  const typeRef = useRef<HTMLParagraphElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    // Typewriter opening
    if (typeRef.current) {
      gsap.fromTo(
        typeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: 0.5 }
      )
      gsap.to(typeRef.current, {
        text: { value: 'From Surulere to the world stage.', delimiter: '' },
        duration: 2.5,
        ease: 'none',
        delay: 0.8,
      })
    }

    // Timeline cards alternate entrance
    gsap.utils.toArray('.timeline-item-left').forEach((el) => {
      gsap.fromTo(el as Element, { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: el as Element, start: 'top 80%', once: true }
      })
    })
    gsap.utils.toArray('.timeline-item-right').forEach((el) => {
      gsap.fromTo(el as Element, { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: el as Element, start: 'top 80%', once: true }
      })
    })

    gsap.fromTo('.collab-chip', { scale: 0.8, opacity: 0 }, {
      scale: 1, opacity: 1, stagger: 0.04, duration: 0.5, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.collabs-section', start: 'top 80%', once: true }
    })

    gsap.fromTo('.award-card', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: '.awards-section', start: 'top 80%', once: true }
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <div className="pt-24">
      {/* Typewriter opening */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, var(--bg) 0%, var(--bg-2) 100%)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)` }} />
        <div ref={heroRef} className="text-center px-6">
          <p ref={typeRef} className="font-display text-3xl md:text-5xl lg:text-7xl italic font-light text-[var(--fg)] max-w-3xl mx-auto leading-tight min-h-[1.2em]">
            &nbsp;
          </p>
          <div className="mt-16 flex items-center justify-center gap-6 opacity-60">
            <span className="w-16 h-px bg-gold" />
            <span className="section-label">Est. 1990 · Lagos, Nigeria</span>
            <span className="w-16 h-px bg-gold" />
          </div>
        </div>
      </div>

      {/* Biography sections */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <span className="section-label mb-6 block">The Story</span>
            <h2 className="font-display text-4xl md:text-5xl font-light italic text-[var(--fg)] mb-8 leading-tight">
              Born to Make Music
            </h2>
            <div className="space-y-5 text-[var(--fg-muted)] leading-relaxed">
              <p>Ayodeji Ibrahim Balogun — known to the world as Wizkid — was born in the bustling Lagos neighbourhood of Surulere on July 16, 1990. The youngest of three children and raised in a household blending Christianity and Islam, music was in his blood from day one.</p>
              <p>By age eleven, he was recording songs with his church choir. By fifteen, he had collaborated with veteran Nigerian artists. By eighteen, he signed his first record deal. By thirty, he had conquered the globe.</p>
              <p>His journey is not just a personal triumph — it is the story of Afrobeats going from the streets of Lagos to Madison Square Garden, from local radio to the Grammy stage.</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden gold-glow">
            <Image
              src="/Wizkid!s.png"
              alt="Wizkid"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <span className="section-label mb-16 block text-center">Timeline</span>
          <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)] text-center mb-20">
            A Life in Music
          </h2>
          <div className="timeline-line hidden md:block" />
          <div className="space-y-8 md:space-y-0 relative">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`md:flex ${i % 2 === 0 ? 'md:justify-end' : ''} md:w-1/2 ${i % 2 !== 0 ? 'md:ml-auto md:pl-16' : 'md:pr-16'}`}
              >
                <div className={`timeline-item-${i % 2 === 0 ? 'left' : 'right'} glass rounded-sm border border-[var(--border)] hover:border-gold/30 transition-colors duration-400 p-6 md:p-8 max-w-lg w-full`}>
                  <p className="text-gold font-mono-display text-3xl mb-2">{m.year}</p>
                  <h3 className="font-display text-xl font-semibold text-[var(--fg)] mb-3">{m.title}</h3>
                  <p className="text-[var(--fg-muted)] text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaborators */}
      <div className="collabs-section py-24 grain" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <span className="section-label mb-6 block">The Network</span>
          <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)] mb-16">
            Collaborators
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {collaborators.map(name => (
              <span
                key={name}
                className="collab-chip px-5 py-2.5 rounded-sm border border-[var(--border)] hover:border-gold/50 text-[var(--fg)] text-sm hover:text-gold transition-all duration-300 cursor-default glass"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy Quote */}
      <div className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 50%, rgba(255,107,0,0.05) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-[8rem] md:text-[12rem] font-display text-gold/5 leading-none absolute -top-8 left-0 select-none">"</div>
          <p className="font-display text-2xl md:text-4xl lg:text-5xl italic font-light text-[var(--fg)] leading-relaxed">
            I make music for the world. But my heart will always be in Lagos.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-gold" />
            <span className="section-label">Wizkid</span>
            <span className="w-12 h-px bg-gold" />
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="awards-section py-24 max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block">Recognition</span>
          <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)]">
            Awards & Honours
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {awards.map(award => (
            <div key={award.name} className="award-card glass rounded-sm border border-[var(--border)] hover:border-gold/30 p-6 text-center hover-lift transition-all duration-400">
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-sm"
                style={{ background: `${award.color}20`, border: `1px solid ${award.color}40`, color: award.color }}>
                ★
              </div>
              <p className="font-mono-display text-lg text-[var(--fg)] tracking-wide mb-1">{award.name}</p>
              <p className="text-[var(--fg-muted)] text-xs leading-relaxed">{award.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
